import React, { useState, useEffect } from 'react';
import { Menu, Volume2, VolumeX, Circle } from 'lucide-react';
import { PHOTOGRAPHER_CONFIG } from '../../data/portfolioData';
import { playFocusClick, playShutterSound } from '../../utils/sound';

export default function Navbar({
  activeSection,
  onOpenMobileMenu,
  soundOn,
  onToggleSound
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'WORK', href: '#work', id: 'work' },
    { label: 'ABOUT', href: '#about', id: 'about' },
    { label: 'SERVICES', href: '#services', id: 'services' },
    { label: 'JOURNAL', href: '#journal', id: 'journal' },
    { label: 'CONTACT', href: '#contact', id: 'contact' }
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    playFocusClick();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[8000] px-4 sm:px-8 transition-all duration-500 ${
        scrolled ? 'py-3 sm:py-4' : 'py-5 sm:py-7'
      }`}
    >
      <nav
        aria-label="Main Navigation"
        className="max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2.5 sm:py-3 rounded-full glass-nav shadow-2xl transition-all duration-300"
      >
        {/* Left: Photographer Name & Monogram */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, '#hero')}
          className="group flex items-center gap-2.5 text-white hover:text-accent-lime transition-colors"
          aria-label="Alex Kane Home"
        >
          <span className="w-7 h-7 rounded-full bg-white/10 group-hover:bg-accent-lime group-hover:text-black flex items-center justify-center font-mono text-xs font-bold transition-all">
            {PHOTOGRAPHER_CONFIG.monogram}
          </span>
          <span className="font-display font-bold text-sm tracking-wider uppercase hidden sm:inline-block">
            {PHOTOGRAPHER_CONFIG.name}
          </span>
        </a>

        {/* Center: Desktop Nav Links with Active Indicator */}
        <div className="hidden md:flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={`relative px-3.5 py-1.5 rounded-full font-mono text-xs tracking-wider transition-all duration-300 ${
                  isActive
                    ? 'text-black bg-accent-lime font-bold shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Right: Availability Indicator & Sound Toggle / Mobile Trigger */}
        <div className="flex items-center gap-3 sm:gap-4">
          {/* Availability Status Badge (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full border border-editorial-border bg-white/[0.03] text-[11px] font-mono text-neutral-300">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-lime opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-lime"></span>
            </span>
            <span className="tracking-wide">COMMISSIONS Q3/Q4</span>
          </div>

          {/* Sound / Shutter Feedback Toggle */}
          <button
            onClick={() => {
              onToggleSound();
              if (!soundOn) playShutterSound();
            }}
            type="button"
            className="p-2 rounded-full border border-editorial-border hover:border-accent-lime text-neutral-400 hover:text-white transition-all duration-300"
            aria-label={soundOn ? "Mute mechanical shutter audio" : "Enable mechanical shutter audio"}
            title={soundOn ? "Mute shutter audio" : "Enable tactile shutter audio"}
          >
            {soundOn ? (
              <Volume2 className="w-3.5 h-3.5 text-accent-lime" />
            ) : (
              <VolumeX className="w-3.5 h-3.5 text-neutral-500" />
            )}
          </button>

          {/* Mobile Menu Button (Hamburger) */}
          <button
            onClick={() => {
              playFocusClick();
              onOpenMobileMenu();
            }}
            type="button"
            className="md:hidden p-2 rounded-full border border-editorial-border hover:border-white text-white hover:text-accent-lime transition-colors"
            aria-label="Open full-screen navigation menu"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </nav>
    </header>
  );
}
