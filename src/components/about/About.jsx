import React from 'react';
import { Award, Compass, BookOpen, Layers, CheckCircle2 } from 'lucide-react';
import { PHOTOGRAPHER_CONFIG, TIMELINE_EVENTS } from '../../data/portfolioData';
import BlurText from '../common/BlurText';

export default function About() {
  return (
    <section
      id="about"
      className="relative py-28 sm:py-36 px-4 sm:px-8 md:px-12 bg-[#070708] border-t border-editorial-border/60"
    >
      <div className="max-w-7xl mx-auto">
        {/* Large Editorial Manifesto Statement */}
        <div className="border-b border-editorial-border pb-16">
          <h2 className="font-serif italic text-3xl sm:text-5xl md:text-6xl lg:text-7xl text-white font-normal leading-[1.1] max-w-5xl">
            "{PHOTOGRAPHER_CONFIG.statement}"
          </h2>
        </div>

        {/* Dual-Column Editorial Spread: Portrait + Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 py-16 sm:py-20 border-b border-editorial-border items-start">
          {/* Left Column: Portrait & Fine Frame */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-sm overflow-hidden border border-editorial-border bg-editorial-card p-2 sm:p-3 shadow-2xl">
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm">
                <img
                  src={PHOTOGRAPHER_CONFIG.aboutPortrait}
                  alt={`${PHOTOGRAPHER_CONFIG.name} portrait`}
                  className="w-full h-full object-cover filter grayscale contrast-110 brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between font-mono text-[10px] text-white/70">
                  <span>ATELIER PARIS — 2026</span>
                  <span className="text-accent-lime">LEICA SL2-S</span>
                </div>
              </div>
            </div>

            {/* Studio Coordinates Badge */}
            <div className="mt-4 p-4 rounded border border-editorial-border/60 bg-white/[0.02] flex items-center justify-between font-mono text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-accent-lime" />
                <span>STUDIO MARAIS / 75004 PARIS</span>
              </div>
              <span className="text-white/60">EST. 2018</span>
            </div>
          </div>

          {/* Right Column: Biography, Technique & Practice */}
          <div className="lg:col-span-7 space-y-8 text-neutral-300 font-sans leading-relaxed">
            <div className="space-y-4 text-base sm:text-lg font-light text-neutral-200">
              <p>
                Alex Kane is an art director and editorial photographer working at the intersection of haute couture, cinematic portraiture, and architectural geometry. Educated between the École Nationale Supérieure des Arts Décoratifs in Paris and Kyoto University of the Arts, Kane’s visual style is defined by natural chiaroscuro, tactile textural fidelity, and quiet emotional gravity.
              </p>
              <p className="text-neutral-400">
                Rejecting the sterile homogeny of modern hyper-retouched commercial photography, the studio adheres to analogue methodologies: shooting with Leica rangefinders and medium-format digital backs, sculpting sets with continuous tungsten and diffused north daylight, and preserving organic skin and fabric integrity.
              </p>
            </div>

            {/* Stats Counter Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-editorial-border font-mono">
              {PHOTOGRAPHER_CONFIG.stats.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-3xl sm:text-4xl font-bold text-white font-display">
                    {stat.value}
                  </div>
                  <div className="text-[11px] uppercase tracking-wider text-neutral-400 leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Specialties Matrix */}
            <div className="pt-6 border-t border-editorial-border">
              <h4 className="font-mono text-xs text-accent-lime uppercase tracking-widest mb-4">
                [ CORE SPECIALIZATIONS ]
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-mono text-xs text-neutral-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent-lime" />
                  <span>Editorial Cover Art</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent-lime" />
                  <span>Haute Couture Campaigns</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent-lime" />
                  <span>Intimate Portraiture</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent-lime" />
                  <span>Monograph Books</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent-lime" />
                  <span>Architectural Space</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-accent-lime" />
                  <span>Remote Documentaries</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Career Timeline Highlights */}
        <div className="pt-16 sm:pt-20">
          <div className="flex items-center justify-between mb-10 pb-4 border-b border-editorial-border">
            <h3 className="font-display font-bold text-2xl sm:text-3xl uppercase tracking-tight text-white">
              CAREER CHRONOLOGY & EXHIBITIONS
            </h3>
            <span className="font-mono text-xs text-neutral-400 hidden sm:inline">
              2018 — PRESENT
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TIMELINE_EVENTS.map((event, idx) => (
              <div
                key={idx}
                className="p-6 rounded border border-editorial-border/80 bg-editorial-card/50 hover:border-editorial-borderHover transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="font-mono text-xs text-accent-lime font-bold mb-2">
                    {event.year}
                  </div>
                  <h4 className="font-display font-bold text-lg text-white mb-1">
                    {event.title}
                  </h4>
                  <div className="font-mono text-[11px] text-neutral-400 mb-3 uppercase">
                    {event.place}
                  </div>
                  <p className="font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed">
                    {event.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
