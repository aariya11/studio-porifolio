import React from 'react';
import ScrollExpandMedia from '../common/ScrollExpandMedia';
import { ArrowRight, BookOpen, Film, Camera, Sparkles, MapPin } from 'lucide-react';
import { playFocusClick, playShutterSound } from '../../utils/sound';

/**
 * FeaturedMonograph Section
 * Uses ScrollExpandMedia animation to deliver a cinematic visual monograph experience.
 */
export default function FeaturedMonograph({ onSelectProject, onOpenLightbox, onInquireService }) {
  // Stills from the Kyoto / Tokyo film series
  const monographStills = [
    {
      src: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=85',
      caption: 'Plate I — Rain over Kabukicho crossing, 03:42 AM',
      exif: 'Leica M11 • Noctilux 50mm • f/1.0 • 1/125s'
    },
    {
      src: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1200&q=85',
      caption: 'Plate II — Lantern shadows in Pontocho alley',
      exif: 'Leica M11 • Summicron 35mm • f/2.0 • 1/60s'
    },
    {
      src: 'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1200&q=85',
      caption: 'Plate III — Dissolving mist over the Kamogawa riverbed',
      exif: 'Leica M11 • Elmarit 28mm • f/4.0 • 1/250s'
    }
  ];

  const handleOpenStillLightbox = (index) => {
    playShutterSound();
    if (onOpenLightbox) {
      onOpenLightbox(
        monographStills.map((s) => s.src),
        index,
        'KYOTO CHRONICLES — 35MM MONOGRAPH ARCHIVE'
      );
    }
  };

  const handleScrollToWork = () => {
    playFocusClick();
    const workElem = document.getElementById('work');
    if (workElem) {
      workElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="monograph" className="relative w-full">
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc="https://assets.mixkit.co/videos/preview/mixkit-silhouette-of-a-person-standing-in-front-of-a-window-41588-large.mp4"
        posterSrc="https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1800&q=85"
        bgImageSrc="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=2000&q=85"
        title="KYOTO CHRONICLES"
        date="LIMITED MONOGRAPH / 2026"
        scrollToExpand="SCROLL OR CLICK TO EXPAND 35MM REEL"
        textBlend={false}
        stickyMode={true}
      >
        {/* Editorial Children Reveal Content */}
        <div className="max-w-7xl mx-auto w-full">
          {/* Header Row */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-white/10 items-start">
            <div className="lg:col-span-4">
              <div className="flex items-center gap-2 mb-3">
                <Film className="w-4 h-4 text-accent-lime" />
                <span className="font-mono text-xs uppercase tracking-[0.25em] text-accent-lime">
                  Director's Cut Reel & Folio
                </span>
              </div>
              <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal leading-tight">
                Between Shadow <br />
                <span className="italic text-editorial-text-muted">and Amber Ember</span>
              </h3>
              <div className="mt-4 flex items-center gap-2 text-editorial-text-muted font-mono text-xs">
                <MapPin className="w-3.5 h-3.5 text-accent-lime" />
                <span>Kyoto & Tokyo, Japan • October 2025</span>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-4 text-editorial-text-muted text-sm sm:text-base leading-relaxed font-light">
              <p>
                A three-month clandestine nocturnal study across Kyoto's lantern-lit stone alleyways and Tokyo’s damp asphalt crossways. Shot entirely on custom 35mm motion picture emulsions and ultra-fast prime optics under available amber, neon, and damp moonlight.
              </p>
              <p>
                The monograph investigates how darkness is never empty in Japanese urban architecture: it is a textured space, calibrated to absorb memory and diffuse silence.
              </p>

              {/* Technical Specifications Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-white/5 text-left">
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-editorial-text-muted/60">
                    Capture Format
                  </span>
                  <span className="font-mono text-xs text-editorial-text">
                    Leica M11 + Noctilux
                  </span>
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-editorial-text-muted/60">
                    Emulsion
                  </span>
                  <span className="font-mono text-xs text-editorial-text">
                    Vision3 500T Stock
                  </span>
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-editorial-text-muted/60">
                    Soundscape
                  </span>
                  <span className="font-mono text-xs text-editorial-text">
                    Binaural Rain 96kHz
                  </span>
                </div>
                <div>
                  <span className="block font-mono text-[10px] uppercase tracking-widest text-editorial-text-muted/60">
                    Print Run
                  </span>
                  <span className="font-mono text-xs text-accent-lime">
                    300 Signed Folios
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Photographic Stills Grid */}
          <div className="py-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent-lime block mb-1">
                  Selected Plates
                </span>
                <h4 className="font-display text-xl sm:text-2xl text-white tracking-wide uppercase font-semibold">
                  Archival Contact Sheets
                </h4>
              </div>
              <span className="font-mono text-xs text-editorial-text-muted hidden sm:inline-block">
                Click plate to inspect full-screen
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {monographStills.map((still, idx) => (
                <div
                  key={idx}
                  onClick={() => handleOpenStillLightbox(idx)}
                  className="group relative cursor-pointer overflow-hidden rounded-lg border border-white/10 bg-editorial-surface transition-all duration-500 hover:border-accent-lime/50"
                >
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={still.src}
                      alt={still.caption}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <div className="p-4 bg-editorial-black/80 backdrop-blur-sm border-t border-white/5">
                    <p className="font-serif text-sm text-editorial-text line-clamp-1 group-hover:text-white transition-colors">
                      {still.caption}
                    </p>
                    <p className="font-mono text-[11px] text-editorial-text-muted/70 mt-1">
                      {still.exif}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-8 flex flex-wrap items-center justify-between gap-4 border-t border-white/10">
            <button
              onClick={handleScrollToWork}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-accent-lime text-black font-mono text-xs uppercase tracking-widest font-semibold hover:bg-accent-lime-hover transition-all duration-300 group shadow-[0_0_20px_rgba(195,228,29,0.3)]"
            >
              <span>Explore The Full Portfolio</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center gap-4 text-editorial-text-muted font-mono text-xs">
              <span className="inline-block w-2 h-2 rounded-full bg-accent-lime/60" />
              <span>Limited Folio Editions Shipping Worldwide</span>
            </div>
          </div>
        </div>
      </ScrollExpandMedia>
    </section>
  );
}
