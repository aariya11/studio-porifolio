import React, { useState, useEffect } from 'react';
import { ShieldCheck, X } from 'lucide-react';

export default function CookieConsent({ onOpenLegal }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('ak_cookie_consent');
      if (!consent) {
        // Subtle delay for cinematic entrance
        const timer = setTimeout(() => setVisible(true), 1500);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      // localStorage disabled or restricted
    }
  }, []);

  const handleAcceptAll = () => {
    try {
      localStorage.setItem('ak_cookie_consent', 'all');
    } catch (e) {}
    setVisible(false);
  };

  const handleEssentialOnly = () => {
    try {
      localStorage.setItem('ak_cookie_consent', 'essential');
    } catch (e) {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Cookie and Privacy Consent"
      className="fixed bottom-4 left-4 right-4 md:left-8 md:right-auto md:max-w-md z-[9000] p-5 rounded-lg glass-nav shadow-2xl border border-editorial-border text-editorial-text animate-fade-in"
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2 text-accent-lime font-mono text-xs uppercase tracking-widest">
          <ShieldCheck className="w-4 h-4" />
          <span>Privacy & Cookie Protocol</span>
        </div>
        <button
          onClick={handleEssentialOnly}
          className="text-editorial-muted hover:text-white p-1"
          aria-label="Dismiss cookie notice with essential settings"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <p className="text-xs text-editorial-muted leading-relaxed mb-4">
        We respect your creative focus. We use minimal browser storage solely for functional preferences (sound toggles, display settings) and zero third-party profiling trackers.
      </p>

      <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
        <button
          onClick={handleAcceptAll}
          className="px-3 py-1.5 bg-accent-lime text-black font-semibold rounded hover:bg-white transition-colors"
        >
          ACCEPT ALL
        </button>
        <button
          onClick={handleEssentialOnly}
          className="px-3 py-1.5 border border-editorial-border hover:border-white text-editorial-text transition-colors rounded"
        >
          ESSENTIAL ONLY
        </button>
        <button
          onClick={() => {
            if (onOpenLegal) onOpenLegal('cookies');
          }}
          className="text-editorial-muted hover:text-white underline underline-offset-4 ml-auto"
        >
          Details
        </button>
      </div>
    </div>
  );
}
