import React, { useState, useEffect, useRef } from 'react';
import { Menu, Volume2, VolumeX, Compass } from 'lucide-react';
import { PHOTOGRAPHER_CONFIG } from '../../data/portfolioData';
import { playFocusClick, playShutterSound } from '../../utils/sound';

export default function Navbar({
  activeSection,
  onOpenMobileMenu,
  soundOn,
  onToggleSound
}) {
  const [scrolled, setScrolled] = useState(false);
  const navRef = useRef(null);
  const itemsRef = useRef([]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Specular rim tracking and dock proximity magnification from Sylva
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    let aimX = 0, aimY = 0, aimSeen = false;
    let specAngle = 2.4, specBright = 0;
    let animId;

    const navItems = itemsRef.current.filter(Boolean);
    const itemStates = navItems.map((el) => ({
      el,
      v: 0,
      vel: 0,
      target: 0,
      w: 0
    }));

    const updateMeasurements = () => {
      itemStates.forEach((st) => {
        if (st.el) {
          const r = st.el.getBoundingClientRect();
          st.w = r.width;
        }
      });
    };
    updateMeasurements();

    let isNearNav = false;

    const handlePointerMove = (e) => {
      if (e.pointerType === 'touch') return;
      aimX = e.clientX;
      aimY = e.clientY;

      // Only check proximity if near top of screen
      if (aimY > 160) {
        if (isNearNav) {
          isNearNav = false;
          nav.style.setProperty('--spec-bright', '0');
          itemStates.forEach((st) => { st.target = 0; });
        }
        return;
      }

      isNearNav = true;
      const r = nav.getBoundingClientRect();
      const cx = r.left + r.width * 0.5;
      const cy = r.top + r.height * 0.5;
      const dx = Math.max(r.left - aimX, 0, aimX - r.right);
      const dy = Math.max(r.top - aimY, 0, aimY - r.bottom);
      const d = Math.hypot(dx, dy);

      const targetAngle = d === 0
        ? Math.atan2(2, -2) + ((aimX - cx) / (r.width * 0.5)) * 0.3
        : Math.atan2(cy - aimY, aimX - cx);

      const raw = Math.max(0, Math.min(1, 1 - d / 180));
      const targetBright = raw * raw;

      specAngle += (((targetAngle - specAngle + Math.PI * 3) % (Math.PI * 2)) - Math.PI) * 0.25;
      specBright += (targetBright - specBright) * 0.25;

      nav.style.setProperty('--spec-angle', `${specAngle.toFixed(3)}rad`);
      nav.style.setProperty('--spec-bright', `${(specBright * 0.9).toFixed(2)}`);

      if (aimX > r.left - 20 && aimX < r.right + 20 && aimY < r.bottom + 40) {
        itemStates.forEach((st) => {
          if (!st.el) return;
          const ir = st.el.getBoundingClientRect();
          const dist = Math.abs(aimX - (ir.left + ir.width * 0.5));
          const prox = Math.max(0, Math.min(1, 1 - dist / 90));
          st.target = prox * prox;
        });
      } else {
        itemStates.forEach((st) => { st.target = 0; });
      }
    };

    const handlePointerLeave = () => {
      isNearNav = false;
      nav.style.setProperty('--spec-bright', '0');
      itemStates.forEach((st) => { st.target = 0; });
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerleave', handlePointerLeave);

    // Spring physics animation loop - only writes to DOM when active
    let lastTime = performance.now();
    let isSettled = true;

    const loop = (now) => {
      animId = requestAnimationFrame(loop);
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      let anyMoving = false;
      itemStates.forEach((st) => {
        if (!st.el) return;
        const diff = st.target - st.v;
        if (Math.abs(diff) > 0.001 || Math.abs(st.vel) > 0.002) {
          anyMoving = true;
          st.vel += diff * 200 * dt;
          st.vel *= Math.exp(-24 * dt);
          st.v += st.vel * dt;

          const scale = 1 + st.v * 0.12;
          const translateY = st.v * 2.5;
          st.el.style.transform = `translateY(${translateY.toFixed(1)}px) scale(${scale.toFixed(3)})`;
        } else if (st.v !== 0) {
          st.v = 0;
          st.vel = 0;
          st.el.style.transform = '';
        }
      });
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, []);

  const navItems = [
    { label: 'WORK', href: '#work', id: 'work' },
    { label: 'MONOGRAPH', href: '#monograph', id: 'monograph' },
    { label: 'ABOUT', href: '#about', id: 'about' },
    { label: 'SERVICES', href: '#services', id: 'services' },
    { label: 'JOURNAL', href: '#journal', id: 'journal' },
    { label: 'CONTACT', href: '#contact', id: 'contact' }
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    playFocusClick();
    if (window.burstAt) {
      window.burstAt(e.clientX, e.clientY);
    }
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[8000] px-4 sm:px-8 transition-all duration-500 ${
        scrolled ? 'py-2.5 sm:py-3' : 'py-5 sm:py-6'
      }`}
    >
      <nav
        ref={navRef}
        data-spec
        aria-label="Primary Navigation Dock"
        className="max-w-6xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2 sm:py-2.5 rounded-full glass-nav shadow-[0_12px_40px_rgba(0,0,0,0.6)] border border-white/10 transition-all duration-300"
      >
        {/* Left: Photographer Monogram with Shutter Spark */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="group flex items-center gap-2.5 text-white hover:text-accent-lime transition-colors"
          aria-label="Alex Kane Home"
        >
          <span className="w-8 h-8 rounded-full bg-white/10 group-hover:bg-accent-lime group-hover:text-black flex items-center justify-center font-mono text-xs font-bold transition-all shadow-md">
            {PHOTOGRAPHER_CONFIG.monogram}
          </span>
          <span className="font-display font-bold text-xs tracking-wider uppercase hidden sm:inline-block">
            {PHOTOGRAPHER_CONFIG.name}
          </span>
        </a>

        {/* Center: Magnifying Dock Navigation Pills */}
        <div className="hidden md:flex items-center gap-1 sm:gap-2">
          {navItems.map((item, idx) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.label}
                ref={(el) => (itemsRef.current[idx] = el)}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative px-4 py-1.5 rounded-full font-mono text-xs tracking-wider transition-colors duration-200 will-change-transform ${
                  isActive
                    ? 'text-black bg-accent-lime font-bold shadow-lg'
                    : 'text-neutral-400 hover:text-white hover:bg-white/10'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Right: Availability Status & Tactile Controls */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Availability Status Badge */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.04] text-[11px] font-mono text-neutral-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-lime opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-lime"></span>
            </span>
            <span className="tracking-wide">COMMISSIONS Q3/Q4</span>
          </div>

          {/* Tactile Leica Shutter Sound Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              if (!soundOn) playShutterSound();
            }}
            type="button"
            className="p-2 rounded-full border border-white/10 hover:border-accent-lime text-neutral-400 hover:text-white transition-all duration-300"
            aria-label={soundOn ? "Mute mechanical shutter audio" : "Enable mechanical shutter audio"}
            title={soundOn ? "Mute shutter audio" : "Enable tactile shutter audio"}
          >
            {soundOn ? (
              <Volume2 className="w-3.5 h-3.5 text-accent-lime" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-neutral-500" />
            )}
          </button>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => {
              playFocusClick();
              onOpenMobileMenu();
            }}
            type="button"
            className="md:hidden p-2 rounded-full border border-white/10 hover:border-white text-white hover:text-accent-lime transition-colors"
            aria-label="Open full-screen navigation menu"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </nav>
    </header>
  );
}
