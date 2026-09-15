import React from 'react';
import { CLIENT_PLACEHOLDERS } from '../../data/portfolioData';

export default function Clients() {
  return (
    <section className="py-20 sm:py-28 px-4 sm:px-8 md:px-12 bg-[#08080a] border-t border-editorial-border/60">
      <div className="max-w-7xl mx-auto">
        {/* Header & Notice */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 pb-8 border-b border-editorial-border/60 font-mono text-xs">
          <div className="text-white uppercase tracking-widest font-medium">
            SELECTED EDITORIAL & BRAND PARTNERS
          </div>
          <div className="text-neutral-400 text-[11px] uppercase tracking-wider">
            COMMISSIONS & CAMPAIGNS
          </div>
        </div>

        {/* Minimalist Editorial Grid Wall */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-px bg-editorial-border/60 my-8 border border-editorial-border/60 rounded overflow-hidden">
          {CLIENT_PLACEHOLDERS.map((client, idx) => (
            <div
              key={idx}
              className="group bg-[#070708] hover:bg-[#0f0f13] transition-colors p-6 sm:p-8 flex flex-col items-center justify-center text-center aspect-[4/3]"
            >
              <span className="font-display font-black text-lg sm:text-xl md:text-2xl tracking-tighter text-neutral-300 group-hover:text-white transition-colors">
                {client.name}
              </span>
              <span className="mt-2 font-mono text-[10px] text-neutral-400 uppercase tracking-widest group-hover:text-accent-lime transition-colors">
                {client.note}
              </span>
            </div>
          ))}
          {/* Studio Seal Placeholder */}
          <div className="hidden lg:flex bg-[#070708] hover:bg-[#0f0f13] p-6 sm:p-8 flex-col items-center justify-center text-center aspect-[4/3]">
            <span className="font-mono text-xs text-accent-lime font-bold">
              AK / STUDIO ARCHIVE
            </span>
            <span className="mt-2 font-mono text-[9px] text-neutral-400">
              PARIS • TOKYO
            </span>
          </div>
        </div>

        <p className="font-mono text-[11px] text-neutral-400 text-center sm:text-left">
          * Brand names represented above indicate stylistic editorial reference and commission archive prototypes. Replaceable in configuration.
        </p>
      </div>
    </section>
  );
}
