import React from 'react';
import { ArrowUpRight, Check, Sparkles } from 'lucide-react';
import { SERVICES } from '../../data/portfolioData';
import { playFocusClick } from '../../utils/sound';

export default function Services({ onSelectServiceForInquiry }) {
  const handleInquire = (service) => {
    playFocusClick();
    onSelectServiceForInquiry(service.title);
  };

  return (
    <section
      id="services"
      className="relative py-28 sm:py-36 px-4 sm:px-8 md:px-12 bg-editorial-black border-t border-editorial-border/60"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-editorial-border/60">
          <div>
            <div className="font-mono text-xs text-accent-lime uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-lime" />
              <span>04 / COMMISSIONS & SERVICES</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-white">
              CAPABILITIES
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base text-editorial-muted max-w-md leading-relaxed">
            From single editorial cover assignments to end-to-end multi-city brand campaigns and limited-edition monographs.
          </p>
        </div>

        {/* 6 Luxury Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-12">
          {SERVICES.map((srv) => (
            <div
              key={srv.number}
              className="group relative rounded-lg border border-editorial-border bg-editorial-card p-6 sm:p-8 hover:border-editorial-borderHover transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                {/* Top Number & Tag */}
                <div className="flex items-center justify-between pb-6 border-b border-editorial-border/60 font-mono text-xs">
                  <span className="text-accent-lime font-bold text-sm">
                    {srv.number}
                  </span>
                  <span className="text-neutral-400 uppercase tracking-wider">
                    {srv.category}
                  </span>
                </div>

                {/* Service Title */}
                <h3 className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-accent-lime transition-colors my-4 leading-snug">
                  {srv.title}
                </h3>

                {/* Description */}
                <p className="font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed mb-6">
                  {srv.description}
                </p>

                {/* Deliverables List */}
                <div className="space-y-2.5 mb-8 font-mono text-xs text-neutral-400">
                  <div className="text-[10px] uppercase tracking-widest text-neutral-400 mb-2 font-bold">
                    [ INCLUDED DELIVERABLES ]
                  </div>
                  {srv.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <Check className="w-3.5 h-3.5 text-accent-lime shrink-0 mt-0.5" />
                      <span className="text-neutral-300 leading-tight">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Investment & Inquiry Action */}
              <div className="pt-6 border-t border-editorial-border/60">
                <div className="flex items-baseline justify-between mb-4 font-mono text-xs">
                  <span className="text-neutral-400">INVESTMENT GUIDE</span>
                  <span className="text-white font-bold">{srv.investment}</span>
                </div>

                <button
                  onClick={() => handleInquire(srv)}
                  className="w-full py-3 px-4 rounded border border-editorial-border group-hover:border-accent-lime group-hover:bg-accent-lime group-hover:text-black font-mono text-xs font-bold uppercase tracking-wider text-white transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>INQUIRE COMMISSION</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
