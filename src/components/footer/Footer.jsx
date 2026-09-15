import React, { useState, useEffect } from 'react';
import { ArrowUp, Globe, Instagram, ArrowUpRight, Shield } from 'lucide-react';
import { PHOTOGRAPHER_CONFIG } from '../../data/portfolioData';
import { playFocusClick } from '../../utils/sound';

export default function Footer({ onOpenLegal }) {
  const [parisTime, setParisTime] = useState('');
  const [tokyoTime, setTokyoTime] = useState('');

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

  const scrollToTop = () => {
    playFocusClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'WORK ARCHIVE', href: '#work' },
    { label: 'ABOUT THE STUDIO', href: '#about' },
    { label: 'COMMISSIONS & SERVICES', href: '#services' },
    { label: 'JOURNAL & ESSAYS', href: '#journal' },
    { label: 'INITIATE ENQUIRY', href: '#contact' },
  ];

  return (
    <footer className="relative bg-[#050506] text-editorial-text border-t border-editorial-border pt-20 sm:pt-28 pb-12 px-4 sm:px-8 md:px-12">
      <div className="max-w-7xl mx-auto space-y-16 sm:space-y-24">
        {/* Top Massive Monogram / Name Billboard */}
        <div className="border-b border-editorial-border pb-12 sm:pb-16 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
          <div>
            <div className="font-mono text-xs text-accent-lime uppercase tracking-widest mb-4">
              [ ART DIRECTION & PHOTOGRAPHY ]
            </div>
            <h2 className="font-display font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-white tracking-tighter uppercase leading-[0.85]">
              {PHOTOGRAPHER_CONFIG.name}
            </h2>
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-3 font-mono text-xs text-neutral-400 hover:text-white uppercase tracking-wider transition-colors"
            aria-label="Scroll to top of page"
          >
            <span>BACK TO APEX</span>
            <div className="w-10 h-10 rounded-full border border-editorial-border group-hover:border-accent-lime flex items-center justify-center transition-all group-hover:-translate-y-1">
              <ArrowUp className="w-4 h-4 group-hover:text-accent-lime transition-colors" />
            </div>
          </button>
        </div>

        {/* 4-Column Editorial Directory */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 font-mono text-xs">
          {/* Col 1: Studio Clocks */}
          <div className="space-y-4">
            <div className="text-white/40 uppercase tracking-widest">
              [ TIME ZONES ]
            </div>
            <div className="p-3 rounded border border-editorial-border/60 bg-white/[0.02] space-y-1">
              <div className="flex items-center gap-1.5 text-neutral-400">
                <Globe className="w-3.5 h-3.5 text-accent-lime" />
                <span>PARIS (CET)</span>
              </div>
              <div className="text-white font-bold text-sm tracking-wider">
                {parisTime || '12:00:00'}
              </div>
            </div>
            <div className="p-3 rounded border border-editorial-border/60 bg-white/[0.02] space-y-1">
              <div className="flex items-center gap-1.5 text-neutral-400">
                <Globe className="w-3.5 h-3.5 text-accent-lime" />
                <span>TOKYO (JST)</span>
              </div>
              <div className="text-white font-bold text-sm tracking-wider">
                {tokyoTime || '20:00:00'}
              </div>
            </div>
          </div>

          {/* Col 2: Navigation Directory */}
          <div className="space-y-4">
            <div className="text-white/40 uppercase tracking-widest">
              [ INDEX ]
            </div>
            <ul className="space-y-2.5 font-sans text-sm">
              {navLinks.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => playFocusClick()}
                    className="text-neutral-400 hover:text-white hover:text-accent-lime transition-colors block py-0.5"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Channels & Press */}
          <div className="space-y-4">
            <div className="text-white/40 uppercase tracking-widest">
              [ DISPATCH & SOCIAL ]
            </div>
            <div className="space-y-2 text-neutral-400 font-sans text-sm">
              <div>
                <a
                  href={`mailto:${PHOTOGRAPHER_CONFIG.email}`}
                  className="text-white hover:text-accent-lime underline transition-colors block"
                >
                  {PHOTOGRAPHER_CONFIG.email}
                </a>
                <span className="font-mono text-[11px] text-neutral-400">Direct Inquiries</span>
              </div>

              <div className="pt-2 flex flex-col gap-1.5 font-mono text-xs">
                <a
                  href={PHOTOGRAPHER_CONFIG.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent-lime flex items-center gap-1.5 transition-colors"
                >
                  <span>INSTAGRAM: {PHOTOGRAPHER_CONFIG.instagram}</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-400" />
                </a>
                <a
                  href={PHOTOGRAPHER_CONFIG.behanceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent-lime flex items-center gap-1.5 transition-colors"
                >
                  <span>BEHANCE PORTFOLIO</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-400" />
                </a>
                <a
                  href={PHOTOGRAPHER_CONFIG.vimeoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent-lime flex items-center gap-1.5 transition-colors"
                >
                  <span>VIMEO MOTION REEL</span>
                  <ArrowUpRight className="w-3 h-3 text-neutral-400" />
                </a>
              </div>
            </div>
          </div>

          {/* Col 4: Legal & Compliance */}
          <div className="space-y-4">
            <div className="text-white/40 uppercase tracking-widest">
              [ LEGAL RESPONSIBILITY ]
            </div>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button
                  onClick={() => onOpenLegal('privacy')}
                  className="hover:text-white transition-colors text-left"
                >
                  Privacy Policy (GDPR / CCPA)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('terms')}
                  className="hover:text-white transition-colors text-left"
                >
                  Terms & Conditions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('cookies')}
                  className="hover:text-white transition-colors text-left"
                >
                  Cookie Policy & Preferences
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenLegal('cancellation')}
                  className="hover:text-white transition-colors text-left"
                >
                  Licensing & Cancellation
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-8 border-t border-editorial-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-[11px] text-neutral-400 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} {PHOTOGRAPHER_CONFIG.name}. ALL RIGHTS RESERVED. ARCHIVAL PRINTS & COMMERCIAL LICENSES RESERVED.
          </div>
          <div className="flex items-center gap-2 text-neutral-400">
            <span>PARIS • TOKYO • NEW YORK</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
          </div>
        </div>
      </div>
    </footer>
  );
}
