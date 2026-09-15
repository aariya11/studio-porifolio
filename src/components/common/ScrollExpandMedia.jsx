import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Maximize2, Minimize2, Play, Pause, Volume2, VolumeX, Sparkles, Film } from 'lucide-react';
import { playFocusClick, playShutterSound } from '../../utils/sound';

/**
 * ScrollExpandMedia Component
 *
 * Highly optimized, GPU-composited scroll-driven media expansion.
 * Uses Framer Motion MotionValues (scale, x, opacity) on the compositor thread
 * with ZERO DOM layout reflow and ZERO React re-renders during scroll.
 */
export default function ScrollExpandMedia({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title = 'KYOTO CHRONICLES',
  date = 'MONOGRAPH / 2026',
  scrollToExpand = 'Scroll down to expand film reel',
  textBlend = false,
  children,
  id = 'monograph'
}) {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const audioFiredRef = useRef(false);

  // Responsive breakpoint check
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check, { passive: true });
    return () => window.removeEventListener('resize', check);
  }, []);

  // Framer Motion useScroll tied strictly to container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Pure GPU-composited motion transforms (no layout recalculations!)
  const scale = useTransform(
    scrollYProgress,
    [0, 0.7],
    [isMobile ? 0.55 : 0.4, 1.0]
  );

  const bgOpacity = useTransform(scrollYProgress, [0, 0.55], [0.85, 0]);

  // Title split translations: left word shifts left, right words shift right
  const titleXLeft = useTransform(
    scrollYProgress,
    [0, 0.65],
    ['0%', isMobile ? '-130%' : '-110%']
  );
  const titleXRight = useTransform(
    scrollYProgress,
    [0, 0.65],
    ['0%', isMobile ? '130%' : '110%']
  );

  const titleOpacity = useTransform(scrollYProgress, [0, 0.55, 0.7], [1, 0.8, 0]);

  // Subtitle translations
  const subXLeft = useTransform(scrollYProgress, [0, 0.5], ['0%', '-80%']);
  const subXRight = useTransform(scrollYProgress, [0, 0.5], ['0%', '80%']);
  const subOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  // Scrim & shadow depth
  const scrimOpacity = useTransform(scrollYProgress, [0, 0.7], [0.6, 0.15]);
  const hintOpacity = useTransform(scrollYProgress, [0, 0.25], [1, 0]);

  // Reveal children once expanded
  const contentOpacity = useTransform(scrollYProgress, [0.72, 0.88], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.72, 0.88], [30, 0]);

  // Listen to milestone for sound trigger & state flag without continuous re-renders
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      if (v >= 0.72 && !audioFiredRef.current) {
        playShutterSound();
        audioFiredRef.current = true;
        setIsExpanded(true);
      } else if (v < 0.65 && audioFiredRef.current) {
        audioFiredRef.current = false;
        setIsExpanded(false);
      }
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  // Quick manual toggle expansion button
  const toggleExpand = useCallback(() => {
    playFocusClick();
    if (!containerRef.current) return;
    const top = containerRef.current.offsetTop;
    const height = containerRef.current.offsetHeight;

    if (isExpanded) {
      window.scrollTo({ top, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: top + height * 0.75, behavior: 'smooth' });
      playShutterSound();
    }
  }, [isExpanded]);

  // Video play/pause
  const toggleVideo = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    playFocusClick();
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  // Video mute
  const toggleMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    playFocusClick();
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  const titleWords = title ? title.split(' ') : ['KYOTO', 'CHRONICLES'];
  const firstWord = titleWords[0] || '';
  const restOfTitle = titleWords.slice(1).join(' ') || '';

  return (
    <div
      ref={containerRef}
      id={id}
      className="relative w-full min-h-[220vh] bg-editorial-black"
    >
      {/* Sticky Viewport Frame */}
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        {/* Background Mood Image (fades out as media expands) */}
        <motion.div
          className="absolute inset-0 z-0 h-full w-full pointer-events-none will-change-transform"
          style={{ opacity: bgOpacity }}
        >
          {bgImageSrc && (
            <img
              src={bgImageSrc}
              alt="Background Atmosphere"
              className="w-full h-full object-cover object-center filter brightness-[0.4] contrast-[1.1]"
              loading="eager"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-editorial-black via-editorial-black/60 to-editorial-black/80" />
        </motion.div>

        {/* Top Floating Badge & Controls */}
        <div className="absolute top-6 left-6 md:left-12 z-20 flex items-center gap-3 pointer-events-none">
          <div className="w-2 h-2 rounded-full bg-accent-lime animate-pulse" />
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-editorial-text-muted">
            35mm Visual Monograph Reel
          </span>
        </div>

        <div className="absolute top-6 right-6 md:right-12 z-20 flex items-center gap-2">
          <button
            onClick={toggleExpand}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-editorial-black/80 hover:bg-editorial-black border border-white/15 hover:border-accent-lime/60 backdrop-blur-md transition-colors text-editorial-text hover:text-white font-mono text-[11px] tracking-wider uppercase group"
            title={isExpanded ? 'Collapse Monograph' : 'Expand Monograph'}
            aria-label={isExpanded ? 'Collapse Monograph' : 'Expand Monograph'}
          >
            {isExpanded ? (
              <>
                <Minimize2 className="w-3.5 h-3.5 text-accent-lime group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">COLLAPSE</span>
              </>
            ) : (
              <>
                <Maximize2 className="w-3.5 h-3.5 text-accent-lime group-hover:scale-110 transition-transform" />
                <span className="hidden sm:inline">EXPAND REEL</span>
              </>
            )}
          </button>
        </div>

        {/* Center Stage: Transforming Media & Titles */}
        <div className="relative z-10 w-full max-w-7xl px-4 sm:px-6 flex flex-col items-center justify-center">
          {/* Morphing Media Card Container (GPU-scaled via transform: scale) */}
          <motion.div
            className="relative w-[92vw] sm:w-[86vw] md:w-[78vw] max-w-5xl aspect-[16/10] sm:aspect-[16/9] max-h-[78vh] rounded-xl sm:rounded-2xl overflow-hidden border border-white/15 bg-neutral-950 will-change-transform shadow-[0_10px_40px_rgba(0,0,0,0.8)]"
            style={{
              scale,
              transformOrigin: 'center center'
            }}
          >
            {mediaType === 'video' ? (
              mediaSrc && mediaSrc.includes('youtube.com') ? (
                <div className="relative w-full h-full pointer-events-none">
                  <iframe
                    width="100%"
                    height="100%"
                    src={
                      mediaSrc.includes('embed')
                        ? mediaSrc +
                          (mediaSrc.includes('?') ? '&' : '?') +
                          'autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0'
                        : mediaSrc.replace('watch?v=', 'embed/') +
                          '?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0'
                    }
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={title}
                  />
                </div>
              ) : videoError ? (
                <div className="relative w-full h-full">
                  <img
                    src={posterSrc || bgImageSrc}
                    alt={title || 'Editorial Monograph'}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <motion.div
                    className="absolute inset-0 bg-editorial-black/40 pointer-events-none will-change-transform"
                    style={{ opacity: scrimOpacity }}
                  />
                </div>
              ) : (
                <div className="relative w-full h-full group">
                  <video
                    ref={videoRef}
                    src={mediaSrc}
                    poster={posterSrc}
                    autoPlay
                    muted={isMuted}
                    loop
                    playsInline
                    preload="metadata"
                    onError={() => setVideoError(true)}
                    className="w-full h-full object-cover"
                    controls={false}
                  />

                  {/* Gradient Scrim */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-editorial-black/70 via-transparent to-editorial-black/40 pointer-events-none will-change-transform"
                    style={{ opacity: scrimOpacity }}
                  />

                  {/* Playback Controls (hover reveal) */}
                  <div className="absolute bottom-4 right-4 z-30 flex items-center gap-2 bg-editorial-black/80 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={toggleVideo}
                      className="p-1 text-editorial-text hover:text-accent-lime transition-colors"
                      aria-label={isPlaying ? 'Pause video' : 'Play video'}
                    >
                      {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={toggleMute}
                      className="p-1 text-editorial-text hover:text-accent-lime transition-colors"
                      aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
                    >
                      {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              )
            ) : (
              <div className="relative w-full h-full">
                <img
                  src={mediaSrc}
                  alt={title || 'Editorial Monograph'}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <motion.div
                  className="absolute inset-0 bg-editorial-black/40 pointer-events-none will-change-transform"
                  style={{ opacity: scrimOpacity }}
                />
              </div>
            )}

            {/* Sub-label & instruction on media */}
            <div className="absolute bottom-4 left-0 right-0 flex flex-col items-center text-center pointer-events-none z-10 px-4">
              {date && (
                <motion.p
                  className="font-mono text-[11px] sm:text-xs tracking-[0.3em] uppercase text-accent-lime font-medium drop-shadow-md will-change-transform"
                  style={{ x: subXLeft, opacity: subOpacity }}
                >
                  {date}
                </motion.p>
              )}
              {scrollToExpand && (
                <motion.p
                  className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-white/70 mt-1 will-change-transform"
                  style={{ x: subXRight, opacity: subOpacity }}
                >
                  {scrollToExpand}
                </motion.p>
              )}
            </div>
          </motion.div>

          {/* Splitting Title Overlay: Uses pure MotionValue X transforms */}
          <div
            className={`absolute inset-0 flex items-center justify-center text-center gap-2 sm:gap-4 pointer-events-none select-none flex-col ${
              textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
            }`}
          >
            <motion.h2
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-black text-white tracking-tight uppercase leading-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] will-change-transform"
              style={{ x: titleXLeft, opacity: titleOpacity }}
            >
              {firstWord}
            </motion.h2>
            <motion.h2
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-black text-center text-white tracking-tight uppercase leading-none drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] will-change-transform"
              style={{ x: titleXRight, opacity: titleOpacity }}
            >
              {restOfTitle}
            </motion.h2>
          </div>

          {/* Hint Down Arrow at bottom */}
          <motion.div
            className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none"
            style={{ opacity: hintOpacity }}
          >
            <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white/50">
              SCROLL
            </span>
            <div className="w-3.5 h-6 rounded-full border border-white/25 flex items-start justify-center p-0.5">
              <motion.div
                className="w-1 h-1.5 bg-accent-lime rounded-full"
                animate={{ y: [0, 8, 0] }}
                transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Children Section: Editorial Content Revealed Once Expanded */}
      {children && (
        <motion.section
          className="relative z-20 flex flex-col w-full px-6 py-16 sm:py-24 md:px-16 lg:px-24 bg-editorial-black border-t border-white/10 will-change-transform"
          style={{ opacity: contentOpacity, y: contentY }}
        >
          {children}
        </motion.section>
      )}
    </div>
  );
}
