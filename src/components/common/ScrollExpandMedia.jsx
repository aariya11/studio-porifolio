import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Maximize2, Minimize2, Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { playFocusClick, playShutterSound } from '../../utils/sound';

/**
 * ScrollExpandMedia Component
 *
 * Cinematic scroll-driven media expansion with split typography translations,
 * background image dissolve, and editorial child content reveal.
 * Compatible with both natural page sticky scrolling and interactive wheel/touch gestures.
 */
export default function ScrollExpandMedia({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title = 'KYOTO CHRONICLES',
  date = 'MONOGRAPH / 2026',
  scrollToExpand = 'Scroll down to expand film reel',
  textBlend = true,
  children,
  id = 'monograph',
  stickyMode = true
}) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showContent, setShowContent] = useState(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState(false);
  const [touchStartY, setTouchStartY] = useState(0);
  const [isMobileState, setIsMobileState] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);

  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const audioTriggeredRef = useRef(false);

  // Detect mobile viewport
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobileState(window.innerWidth < 768);
    };
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Reset states on mediaType or mediaSrc change
  useEffect(() => {
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
    audioTriggeredRef.current = false;
  }, [mediaType, mediaSrc]);

  // Framer Motion useScroll hook for natural sticky page scrolling
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Smooth spring progress for natural physical inertia
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 24,
    restDelta: 0.001
  });

  // Track scroll updates from sticky container
  useEffect(() => {
    if (!stickyMode) return;

    const unsubscribe = smoothProgress.on('change', (latest) => {
      const clamped = Math.min(Math.max(latest, 0), 1);
      setScrollProgress(clamped);

      if (clamped >= 0.88) {
        setMediaFullyExpanded(true);
        setShowContent(true);
        if (!audioTriggeredRef.current) {
          playShutterSound();
          audioTriggeredRef.current = true;
        }
      } else if (clamped < 0.7) {
        setShowContent(false);
        setMediaFullyExpanded(false);
        audioTriggeredRef.current = false;
      }
    });

    return () => unsubscribe();
  }, [smoothProgress, stickyMode]);

  // Fallback Wheel & Touch listener when in non-sticky mode or direct focus
  useEffect(() => {
    if (stickyMode) return;

    const handleWheel = (e) => {
      if (mediaFullyExpanded && e.deltaY < 0 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollDelta = e.deltaY * 0.0009;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
          playShutterSound();
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }
      }
    };

    const handleTouchStart = (e) => {
      if (e.touches && e.touches[0]) {
        setTouchStartY(e.touches[0].clientY);
      }
    };

    const handleTouchMove = (e) => {
      if (!touchStartY || !e.touches || !e.touches[0]) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      if (mediaFullyExpanded && deltaY < -20 && window.scrollY <= 5) {
        setMediaFullyExpanded(false);
        e.preventDefault();
      } else if (!mediaFullyExpanded) {
        e.preventDefault();
        const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
        const scrollDelta = deltaY * scrollFactor;
        const newProgress = Math.min(
          Math.max(scrollProgress + scrollDelta, 0),
          1
        );
        setScrollProgress(newProgress);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          setShowContent(true);
          playShutterSound();
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }

        setTouchStartY(touchY);
      }
    };

    const handleTouchEnd = () => {
      setTouchStartY(0);
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY, stickyMode]);

  // Quick manual toggle expansion button
  const toggleExpand = useCallback(() => {
    playFocusClick();
    if (mediaFullyExpanded) {
      setScrollProgress(0);
      setMediaFullyExpanded(false);
      setShowContent(false);
      if (containerRef.current) {
        containerRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      setScrollProgress(1);
      setMediaFullyExpanded(true);
      setShowContent(true);
      playShutterSound();
    }
  }, [mediaFullyExpanded]);

  // Video play/pause toggle
  const toggleVideoPlayback = (e) => {
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

  // Video mute toggle
  const toggleVideoMute = (e) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    playFocusClick();
    videoRef.current.muted = !isMuted;
    setIsMuted(!isMuted);
  };

  // Dynamic animation transformations from user's algorithm
  const mediaWidth = 320 + scrollProgress * (isMobileState ? 650 : 1300);
  const mediaHeight = 420 + scrollProgress * (isMobileState ? 220 : 440);
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);

  const titleWords = title ? title.split(' ') : ['KYOTO', 'CHRONICLES'];
  const firstWord = titleWords[0] || '';
  const restOfTitle = titleWords.slice(1).join(' ') || '';

  return (
    <div
      ref={containerRef}
      id={id}
      className={`relative w-full ${stickyMode ? 'min-h-[220vh]' : 'min-h-[100dvh]'} bg-editorial-black overflow-x-hidden`}
    >
      {/* Sticky Viewport Container */}
      <div
        ref={sectionRef}
        className={`${stickyMode ? 'sticky top-0 h-screen' : 'relative min-h-[100dvh]'} w-full flex flex-col items-center justify-center overflow-hidden transition-colors duration-700 ease-in-out`}
      >
        {/* Background Mood Image (fades out as media expands) */}
        <motion.div
          className="absolute inset-0 z-0 h-full w-full pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 - scrollProgress }}
          transition={{ duration: 0.15 }}
        >
          {bgImageSrc && (
            <img
              src={bgImageSrc}
              alt="Background Atmosphere"
              className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-[1.15]"
              loading="eager"
            />
          )}
          {/* Subtle vignette and grain overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-editorial-black via-editorial-black/50 to-editorial-black/80" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-black/40 to-editorial-black" />
        </motion.div>

        {/* Top Floating Badge & Indicator */}
        <div className="absolute top-8 left-6 md:left-12 z-20 flex items-center gap-3 pointer-events-none">
          <div className="w-2 h-2 rounded-full bg-accent-lime animate-pulse" />
          <span className="font-mono text-[10px] sm:text-xs tracking-[0.25em] uppercase text-editorial-text-muted">
            35mm Visual Monograph Reel
          </span>
        </div>

        {/* Expand / Collapse Floating Control Badge */}
        <div className="absolute top-8 right-6 md:right-12 z-20 flex items-center gap-2">
          <button
            onClick={toggleExpand}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-editorial-black/70 hover:bg-editorial-black border border-white/15 hover:border-accent-lime/60 backdrop-blur-md transition-all duration-300 text-editorial-text hover:text-white font-mono text-[11px] tracking-wider uppercase group"
            title={mediaFullyExpanded ? 'Collapse Monograph' : 'Full Screen Expand'}
            aria-label={mediaFullyExpanded ? 'Collapse Monograph' : 'Full Screen Expand'}
          >
            {mediaFullyExpanded ? (
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

        {/* Center Interactive Expanding Media Card Container */}
        <div className="container mx-auto flex flex-col items-center justify-center relative z-10 w-full h-full px-4">
          <div className="flex flex-col items-center justify-center w-full h-full relative">
            {/* The Morphing Media Box */}
            <div
              className="absolute z-0 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl overflow-hidden border border-white/10 transition-none"
              style={{
                width: `${mediaWidth}px`,
                height: `${mediaHeight}px`,
                maxWidth: '96vw',
                maxHeight: '88vh',
                boxShadow: scrollProgress > 0.5
                  ? '0px 0px 80px rgba(0, 0, 0, 0.9), 0 0 40px rgba(195, 228, 29, 0.08)'
                  : '0px 0px 50px rgba(0, 0, 0, 0.7)'
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
                            'autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1'
                          : mediaSrc.replace('watch?v=', 'embed/') +
                            '?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=' +
                            (mediaSrc.split('v=')[1] || '')
                      }
                      className="w-full h-full rounded-xl"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={title}
                    />
                    <motion.div
                      className="absolute inset-0 bg-editorial-black/30 rounded-xl"
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.45 - scrollProgress * 0.35 }}
                      transition={{ duration: 0.2 }}
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
                      preload="auto"
                      className="w-full h-full object-cover rounded-xl"
                      controls={false}
                      disablePictureInPicture
                      disableRemotePlayback
                    />

                    {/* Dark gradient film tint scrim */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-editorial-black/60 via-transparent to-editorial-black/40 rounded-xl pointer-events-none"
                      initial={{ opacity: 0.7 }}
                      animate={{ opacity: 0.5 - scrollProgress * 0.35 }}
                      transition={{ duration: 0.2 }}
                    />

                    {/* Quick Media playback controls when expanded */}
                    {scrollProgress > 0.8 && (
                      <div className="absolute bottom-4 right-4 z-30 flex items-center gap-2 bg-editorial-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <button
                          onClick={toggleVideoPlayback}
                          className="p-1 text-editorial-text hover:text-accent-lime transition-colors"
                          aria-label={isPlaying ? 'Pause video' : 'Play video'}
                        >
                          {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                        </button>
                        <button
                          onClick={toggleVideoMute}
                          className="p-1 text-editorial-text hover:text-accent-lime transition-colors"
                          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
                        >
                          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    )}
                  </div>
                )
              ) : (
                <div className="relative w-full h-full">
                  <img
                    src={mediaSrc}
                    alt={title || 'Editorial Monograph'}
                    className="w-full h-full object-cover rounded-xl"
                    loading="lazy"
                  />
                  <motion.div
                    className="absolute inset-0 bg-editorial-black/40 rounded-xl pointer-events-none"
                    initial={{ opacity: 0.7 }}
                    animate={{ opacity: 0.6 - scrollProgress * 0.4 }}
                    transition={{ duration: 0.2 }}
                  />
                </div>
              )}

              {/* Sub-label and scroll instruction (moves apart on scroll) */}
              <div className="flex flex-col items-center text-center relative z-10 mt-4 transition-none pointer-events-none">
                {date && (
                  <p
                    className="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-accent-lime/90 font-medium drop-shadow-md"
                    style={{ transform: `translateX(-${textTranslateX}vw)` }}
                  >
                    {date}
                  </p>
                )}
                {scrollToExpand && (
                  <p
                    className="font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-white/70 mt-1 font-light"
                    style={{ transform: `translateX(${textTranslateX}vw)` }}
                  >
                    {scrollToExpand}
                  </p>
                )}
              </div>
            </div>

            {/* Split Title Typography Over The Media */}
            <div
              className={`flex items-center justify-center text-center gap-2 sm:gap-4 w-full relative z-10 transition-none flex-col pointer-events-none select-none ${
                textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
              }`}
            >
              <motion.h2
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-black text-white tracking-tight uppercase transition-none leading-none drop-shadow-2xl"
                style={{ transform: `translateX(-${textTranslateX}vw)` }}
              >
                {firstWord}
              </motion.h2>
              <motion.h2
                className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-display font-black text-center text-white tracking-tight uppercase transition-none leading-none drop-shadow-2xl"
                style={{ transform: `translateX(${textTranslateX}vw)` }}
              >
                {restOfTitle}
              </motion.h2>
            </div>

            {/* Hint Chevron / Progress Indicator at Bottom */}
            <motion.div
              className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
              animate={{ opacity: 1 - scrollProgress * 1.5 }}
              transition={{ duration: 0.2 }}
            >
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/50">
                SCROLL TO IMMERSE
              </span>
              <div className="w-4 h-7 rounded-full border border-white/30 flex items-start justify-center p-1">
                <motion.div
                  className="w-1 h-2 bg-accent-lime rounded-full"
                  animate={{ y: [0, 8, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Children Section: Editorial Content Revealed Once Expanded */}
      {children && (
        <motion.section
          className="relative z-20 flex flex-col w-full px-6 py-12 sm:py-20 md:px-16 lg:px-24 bg-editorial-black border-t border-white/10"
          initial={{ opacity: 0, y: 30 }}
          animate={{
            opacity: showContent ? 1 : 0,
            y: showContent ? 0 : 30
          }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {children}
        </motion.section>
      )}
    </div>
  );
}
