import React, { useRef, useEffect } from 'react';
import { ChevronDown, Compass, Sparkles } from 'lucide-react';
import { PHOTOGRAPHER_CONFIG } from '../../data/portfolioData';
import BlurText from '../common/BlurText';
import LiquidMetalButton from '../common/LiquidMetalButton';
import { playShutterSound } from '../../utils/sound';

export default function Hero({ onExploreClick }) {
  const heroRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    let pointerX = 0, pointerY = 0;
    let smoothX = 0, smoothY = 0;
    let lastX = null, lastY = null;
    let animId;
    let isVisible = true;

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.05 });
    observer.observe(hero);

    const handlePointerMove = (e) => {
      if (e.pointerType === 'touch' || !isVisible) return;
      const rect = hero.getBoundingClientRect();
      pointerX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      pointerY = ((e.clientY - rect.top) / rect.height) * 2 - 1;
    };

    const handlePointerLeave = () => {
      pointerX = 0;
      pointerY = 0;
    };

    hero.addEventListener('pointermove', handlePointerMove, { passive: true });
    hero.addEventListener('pointerleave', handlePointerLeave);

    const loop = () => {
      animId = requestAnimationFrame(loop);
      if (!isVisible) return;

      smoothX += (pointerX - smoothX) * 0.055;
      smoothY += (pointerY - smoothY) * 0.055;

      const nx = Math.round(smoothX * 1000) / 1000;
      const ny = Math.round(smoothY * 1000) / 1000;

      if (nx !== lastX || ny !== lastY) {
        lastX = nx;
        lastY = ny;
        hero.style.setProperty('--px', nx);
        hero.style.setProperty('--py', ny);
      }
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      hero.removeEventListener('pointermove', handlePointerMove);
      hero.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-editorial-black select-none pt-24 pb-10 px-4 sm:px-8 md:px-12"
    >
      {/* Full-Bleed Photographic Background with Parallax */}
      <div className="absolute inset-0 z-0 scale-105 par transition-transform duration-700 ease-out will-change-transform" style={{ '--pd': 6, '--pr': 0.6 }}>
        <img
          src={PHOTOGRAPHER_CONFIG.heroPortrait}
          alt={`${PHOTOGRAPHER_CONFIG.name} — Editorial Portrait`}
          className="w-full h-full object-cover object-center opacity-30 filter grayscale contrast-125 brightness-90 transition-opacity duration-1000"
          loading="eager"
          fetchPriority="high"
        />
        {/* Layered cinematic gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070708] via-[#070708]/60 to-[#070708]/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#070708]/90 via-transparent to-[#070708]/90" />
      </div>

      {/* Top Metadata Header Line */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 pt-6 border-b border-editorial-border/40 pb-4 font-mono text-[11px] sm:text-xs text-editorial-muted tracking-widest uppercase par" style={{ '--pd': 8, '--pr': 0.8 }}>
        <div className="flex items-center gap-3">
          <span className="text-accent-lime font-bold">01 / ARCHIVE</span>
          <span className="hidden sm:inline text-white/30">•</span>
          <span className="text-white/80">{PHOTOGRAPHER_CONFIG.role}</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-1.5 text-neutral-400">
            <Compass className="w-3.5 h-3.5 text-accent-lime" />
            <span>{PHOTOGRAPHER_CONFIG.coordinates}</span>
          </div>
          <span className="text-white/70 border border-editorial-border px-2.5 py-0.5 rounded-full">
            {PHOTOGRAPHER_CONFIG.basedIn}
          </span>
        </div>
      </div>

      {/* Centerpiece: Huge Editorial Photographer Name & Portrait Interplay */}
      <div className="relative z-10 w-full max-w-7xl mx-auto my-auto py-8 sm:py-12 flex flex-col items-center justify-center text-center">
        {/* Monogram tag */}
        <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md par" style={{ '--pd': 12, '--pr': 1.0 }}>
          <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
          <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-white/80">
            SELECTED PHOTOGRAPHIC MONOGRAPHS
          </span>
        </div>

        {/* Oversized Name with blur reveal animation & multiplane 3D tilt */}
        <div className="relative w-full flex flex-col items-center justify-center par" style={{ '--pd': 18, '--pr': 1.2 }}>
          <div className="w-full overflow-visible">
            <h1 className="font-display font-black text-[13vw] sm:text-[14vw] md:text-[13vw] lg:text-[12rem] xl:text-[14rem] leading-[0.8] tracking-tighter uppercase text-white hover:text-accent-lime transition-colors duration-500 select-none">
              <BlurText
                text={PHOTOGRAPHER_CONFIG.firstName}
                delay={60}
                animateBy="letters"
                direction="bottom"
                className="justify-center whitespace-nowrap drop-shadow-2xl"
              />
            </h1>
            <h1 className="font-display font-black text-[13vw] sm:text-[14vw] md:text-[13vw] lg:text-[12rem] xl:text-[14rem] leading-[0.8] tracking-tighter uppercase text-neutral-300 hover:text-accent-lime transition-colors duration-500 select-none">
              <BlurText
                text={PHOTOGRAPHER_CONFIG.lastName}
                delay={60}
                animateBy="letters"
                direction="bottom"
                className="justify-center whitespace-nowrap"
              />
            </h1>
          </div>

          {/* Central Portrait Vignette Bubble */}
          <div 
            onClick={() => {
              playShutterSound();
              if (window.burstAt) {
                const el = document.getElementById('hero-portrait');
                if (el) {
                  const r = el.getBoundingClientRect();
                  window.burstAt(r.left + r.width / 2, r.top + r.height / 2);
                }
              }
            }}
            id="hero-portrait"
            data-cursor="view"
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer par"
            style={{ '--pd': 24, '--pr': 2.2 }}
            title="Click for mechanical shutter & spark"
          >
            <div className="relative w-20 h-28 sm:w-28 sm:h-40 md:w-36 md:h-52 rounded-full overflow-hidden border-2 border-accent-lime/60 group-hover:border-accent-lime shadow-[0_0_50px_rgba(0,0,0,0.8)] transition-all duration-500 group-hover:scale-105 group-hover:rotate-1">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=85"
                alt="Portrait Focus"
                className="w-full h-full object-cover grayscale contrast-125 brightness-95 group-hover:scale-110 group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-accent-lime/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[9px] bg-black/90 text-accent-lime border border-accent-lime/40 px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              LEICA M11
            </div>
          </div>
        </div>

        {/* Editorial Subtitle Statement */}
        <div className="max-w-2xl mx-auto mt-6 sm:mt-10 px-4 par" style={{ '--pd': 14, '--pr': 1.0 }}>
          <p className="font-sans text-base sm:text-lg md:text-xl font-light text-neutral-300 tracking-wide leading-relaxed">
            <BlurText
              text={PHOTOGRAPHER_CONFIG.tagline}
              delay={35}
              animateBy="words"
              direction="bottom"
              className="justify-center"
            />
          </p>
        </div>

        {/* WebGL2 Liquid Metal Dispersion Shader Action Button */}
        <div className="mt-8 sm:mt-10 par" style={{ '--pd': 16, '--pr': 1.1 }}>
          <LiquidMetalButton
            onClick={onExploreClick}
            ariaLabel="Explore the photographic archive"
          >
            <Sparkles className="w-3.5 h-3.5 text-accent-lime" />
            <span>EXPLORE ARCHIVE</span>
          </LiquidMetalButton>
        </div>
      </div>

      {/* Bottom Row: Metadata & Scroll Indicator */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex items-end justify-between pt-6 border-t border-editorial-border/40 font-mono text-xs text-editorial-muted par" style={{ '--pd': 10, '--pr': 0.7 }}>
        {/* Left: Global Availability */}
        <div className="flex flex-col gap-1">
          <span className="text-[10px] text-editorial-subtle uppercase tracking-widest">CURRENT ASSIGNMENTS</span>
          <span className="text-white text-xs font-mono flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
            {PHOTOGRAPHER_CONFIG.status}
          </span>
        </div>

        {/* Center/Right: Scroll prompt */}
        <button
          onClick={onExploreClick}
          className="group flex items-center gap-3 text-neutral-400 hover:text-white transition-colors cursor-pointer"
          aria-label="Scroll down to explore portfolio"
        >
          <span className="font-mono text-xs tracking-widest uppercase group-hover:text-accent-lime transition-colors">
            SCROLL TO EXPLORE
          </span>
          <div className="w-8 h-8 rounded-full border border-editorial-border group-hover:border-accent-lime flex items-center justify-center transition-all duration-300 group-hover:translate-y-1">
            <ChevronDown className="w-4 h-4 group-hover:text-accent-lime transition-colors" />
          </div>
        </button>
      </div>
    </section>
  );
}
