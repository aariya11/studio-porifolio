import React, { useState, useEffect } from 'react';
import { X, Shield, FileText, Cookie, AlertCircle } from 'lucide-react';
import { LEGAL_CONTENT } from '../../data/portfolioData';
import { playFocusClick } from '../../utils/sound';

export default function LegalModal({ initialTab = 'privacy', isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
  }, [initialTab]);

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const tabs = [
    { id: 'privacy', label: 'PRIVACY POLICY', icon: Shield, data: LEGAL_CONTENT.privacyPolicy },
    { id: 'terms', label: 'TERMS OF SERVICE', icon: FileText, data: LEGAL_CONTENT.termsOfService },
    { id: 'cookies', label: 'COOKIE POLICY', icon: Cookie, data: LEGAL_CONTENT.cookiePolicy },
    { id: 'cancellation', label: 'CANCELLATION & RIGHTS', icon: AlertCircle, data: LEGAL_CONTENT.cancellationPolicy },
  ];

  const currentTabData = tabs.find((t) => t.id === activeTab)?.data || LEGAL_CONTENT.privacyPolicy;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Legal and Privacy Policies"
      className="fixed inset-0 z-[9500] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-4 sm:p-6 md:p-10 animate-fade-in"
    >
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-[#0d0d10] border border-editorial-border rounded-xl shadow-2xl flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="p-5 sm:p-6 border-b border-editorial-border flex items-center justify-between">
          <div className="flex items-center gap-3 font-mono text-xs text-accent-lime uppercase tracking-widest">
            <Shield className="w-4 h-4" />
            <span>LEGAL & COMPLIANCE PROTOCOLS</span>
          </div>
          <button
            onClick={() => {
              playFocusClick();
              onClose();
            }}
            className="p-2 rounded-full border border-editorial-border hover:border-white text-white hover:text-accent-lime transition-colors"
            aria-label="Close legal modal"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Tab Selector */}
        <div className="flex border-b border-editorial-border bg-black/40 overflow-x-auto no-scrollbar font-mono text-xs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  playFocusClick();
                  setActiveTab(tab.id);
                }}
                className={`flex items-center gap-2 px-5 py-3.5 border-b-2 whitespace-nowrap transition-colors ${
                  isActive
                    ? 'border-accent-lime text-white bg-white/5 font-bold'
                    : 'border-transparent text-neutral-400 hover:text-white'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-accent-lime' : ''}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Modal Scrollable Content */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 font-sans">
          <div>
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white uppercase mb-1">
              {currentTabData.title}
            </h3>
            <div className="font-mono text-xs text-neutral-400">
              LAST REVISED: {currentTabData.lastUpdated} • STUDIO LEGAL AFFAIRS
            </div>
          </div>

          <div className="space-y-6 text-sm sm:text-base text-neutral-300 leading-relaxed">
            {currentTabData.sections.map((sec, idx) => (
              <div key={idx} className="space-y-2">
                <h4 className="font-display font-semibold text-white text-base">
                  {sec.heading}
                </h4>
                <p className="text-neutral-400 font-light leading-relaxed">
                  {sec.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="p-4 sm:p-6 border-t border-editorial-border bg-black/50 flex items-center justify-between font-mono text-xs text-neutral-400">
          <span>ALEX KANE STUDIO • ALL RIGHTS RESERVED</span>
          <button
            onClick={() => {
              playFocusClick();
              onClose();
            }}
            className="text-white hover:text-accent-lime uppercase underline"
          >
            DISMISS
          </button>
        </div>
      </div>
    </div>
  );
}
