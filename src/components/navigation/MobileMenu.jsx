import React, { useEffect, useState } from 'react';
import { X, ArrowUpRight, Volume2, VolumeX, Globe } from 'lucide-react';
import { PHOTOGRAPHER_CONFIG } from '../../data/portfolioData';
import { playFocusClick } from '../../utils/sound';

export default function MobileMenu({
  isOpen,
  onClose,
  activeSection,
  soundOn,
  onToggleSound,
  onOpenLegal
}) {
  const [parisTime, setParisTime] = useState('');
  const [tokyoTime, setTokyoTime] = useState('');

  // Live world clocks
  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setParisTime(
        now.toLocaleTimeString('en-GB', {
          timeZone: 'Europe/Paris',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      );
      setTokyoTime(
        now.toLocaleTimeString('en-GB', {
          timeZone: 'Asia/Tokyo',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit'
        })
      );
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  // Trap escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const navLinks = [
    { label: 'WORK', href: '#work', number: '01' },
    { label: 'MONOGRAPH', href: '#monograph', number: '02' },
    { label: 'ABOUT', href: '#about', number: '03' },
    { label: 'SERVICES', href: '#services', number: '04' },
    { label: 'JOURNAL', href: '#journal', number: '05' },
    { label: 'CONTACT', href: '#contact', number: '06' },
  ];

  const handleLinkClick = (href) => {
    playFocusClick();
    onClose();
    const elem = document.querySelector(href);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Navigation Menu"
      className="fixed inset-0 z-[9990] bg-[#070708]/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 lg:hidden overflow-y-auto transition-all"
    >
      {/* Top Header inside overlay */}
      <div className="flex items-center justify-between border-b border-editorial-border pb-6">
        <div className="flex items-center gap-3">
          <span className="font-display font-bold text-xl tracking-tight text-white">
            {PHOTOGRAPHER_CONFIG.name}
          </span>
          <span className="text-[10px] font-mono tracking-widest text-accent-lime uppercase border border-accent-lime/30 px-1.5 py-0.5 rounded">
            INDEX
          </span>
        </div>

        <button
          onClick={() => {
            playFocusClick();
            onClose();
          }}
          className="p-2.5 rounded-full border border-editorial-border hover:border-white text-white hover:text-accent-lime transition-colors"
          aria-label="Close navigation menu"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Navigation Links */}
      <nav className="my-auto py-8">
        <ul className="space-y-4 sm:space-y-6">
          {navLinks.map((link) => {
            const isActive = activeSection === link.label.toLowerCase();
            return (
              <li key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.href);
                  }}
                  className="group flex items-baseline justify-between text-3xl sm:text-4xl md:text-5xl font-display font-bold tracking-tight text-white hover:text-accent-lime transition-colors duration-300"
                >
                  <span className="flex items-baseline gap-3">
                    <span className="font-mono text-xs text-editorial-subtle group-hover:text-accent-lime">
                      {link.number}
                    </span>
                    <span>{link.label}</span>
                  </span>
                  <ArrowUpRight className="w-5 h-5 text-editorial-subtle group-hover:text-accent-lime transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Bottom Metadata & Status */}
      <div className="pt-6 border-t border-editorial-border space-y-6">
        {/* World Clocks */}
        <div className="grid grid-cols-2 gap-4 font-mono text-xs text-editorial-muted">
          <div className="border border-editorial-border/60 p-2.5 rounded">
            <div className="text-white/60 mb-0.5 flex items-center gap-1.5">
              <Globe className="w-3 h-3 text-accent-lime" /> PARIS (CET)
            </div>
            <div className="text-white font-medium">{parisTime || '12:00:00'}</div>
          </div>
          <div className="border border-editorial-border/60 p-2.5 rounded">
            <div className="text-white/60 mb-0.5 flex items-center gap-1.5">
              <Globe className="w-3 h-3 text-accent-lime" /> TOKYO (JST)
            </div>
            <div className="text-white font-medium">{tokyoTime || '20:00:00'}</div>
          </div>
        </div>

        {/* Audio Toggle & Contact */}
        <div className="flex items-center justify-between text-xs font-mono">
          <button
            onClick={onToggleSound}
            className="flex items-center gap-2 text-editorial-muted hover:text-white border border-editorial-border px-3 py-1.5 rounded transition-colors"
          >
            {soundOn ? (
              <>
                <Volume2 className="w-4 h-4 text-accent-lime" />
                <span>SHUTTER AUDIO [ON]</span>
              </>
            ) : (
              <>
                <VolumeX className="w-4 h-4 text-editorial-subtle" />
                <span>SHUTTER AUDIO [MUTED]</span>
              </>
            )}
          </button>

          <a
            href={`mailto:${PHOTOGRAPHER_CONFIG.email}`}
            className="text-accent-lime hover:underline"
          >
            {PHOTOGRAPHER_CONFIG.email}
          </a>
        </div>
      </div>
    </div>
  );
}
