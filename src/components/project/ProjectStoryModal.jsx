import React, { useEffect } from 'react';
import { X, ArrowLeft, ArrowRight, Camera, MapPin, Calendar, Briefcase, Expand } from 'lucide-react';
import { PROJECTS } from '../../data/portfolioData';
import { playFocusClick, playShutterSound } from '../../utils/sound';

export default function ProjectStoryModal({
  project,
  onClose,
  onSelectProject,
  onOpenLightbox
}) {
  if (!project) return null;

  // Find index for Prev / Next navigation
  const currentIndex = PROJECTS.findIndex((p) => p.id === project.id);
  const prevProject = PROJECTS[(currentIndex - 1 + PROJECTS.length) % PROJECTS.length];
  const nextProject = PROJECTS[(currentIndex + 1) % PROJECTS.length];

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') {
        playFocusClick();
        onSelectProject(prevProject);
      }
      if (e.key === 'ArrowRight') {
        playFocusClick();
        onSelectProject(nextProject);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, prevProject, nextProject, onClose, onSelectProject]);

  // Scroll to top on project switch
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [project.id]);

  const allImages = [
    {
      src: project.coverImage,
      aspect: 'full',
      caption: `${project.title} — Key Visual Plate`,
      cameraExif: project.exif
    },
    ...(project.storySpread || [])
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} Editorial Story`}
      className="fixed inset-0 z-[8500] bg-[#070708] text-editorial-text overflow-y-auto"
    >
      {/* Sticky Top Control Bar */}
      <header className="sticky top-0 z-50 bg-[#070708]/90 backdrop-blur-xl border-b border-editorial-border/80 px-4 sm:px-8 py-4 flex items-center justify-between">
        <button
          onClick={() => {
            playFocusClick();
            onClose();
          }}
          className="flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          <span>BACK TO ARCHIVE</span>
        </button>

        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-accent-lime font-bold">
            {project.number} / {String(PROJECTS.length).padStart(2, '0')}
          </span>
          <button
            onClick={() => {
              playFocusClick();
              onClose();
            }}
            className="p-2 rounded-full border border-editorial-border hover:border-white text-white hover:text-accent-lime transition-colors"
            aria-label="Close project view"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Editorial Story Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-12 sm:py-20">
        {/* Project Header Header Information */}
        <div className="border-b border-editorial-border pb-12">
          <div className="flex flex-wrap items-center gap-3 font-mono text-xs text-accent-lime uppercase tracking-widest mb-4">
            <span>{project.category}</span>
            <span className="text-white/30">•</span>
            <span>{project.location}</span>
            <span className="text-white/30">•</span>
            <span>{project.year}</span>
          </div>

          <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tighter uppercase text-white leading-[0.9] mb-8">
            {project.title}
          </h1>

          {/* Metadata Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 py-6 border-y border-editorial-border/60 font-mono text-xs text-neutral-400">
            <div>
              <div className="text-white/40 mb-1 flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5 text-accent-lime" /> COMMISSION
              </div>
              <div className="text-white font-medium">{project.client}</div>
            </div>
            <div>
              <div className="text-white/40 mb-1 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-accent-lime" /> LOCATION
              </div>
              <div className="text-white font-medium">{project.location}</div>
            </div>
            <div>
              <div className="text-white/40 mb-1 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-accent-lime" /> PRODUCTION
              </div>
              <div className="text-white font-medium">{project.year}</div>
            </div>
            <div>
              <div className="text-white/40 mb-1 flex items-center gap-1.5">
                <Camera className="w-3.5 h-3.5 text-accent-lime" /> SYSTEM
              </div>
              <div className="text-white font-medium truncate">{project.camera}</div>
            </div>
          </div>

          {/* Project Concept & Curatorial Narrative */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-4 font-mono text-xs uppercase tracking-widest text-neutral-400">
              [ CURATORIAL STATEMENT ]
            </div>
            <div className="md:col-span-8 font-sans text-base sm:text-lg text-neutral-200 leading-relaxed space-y-4">
              <p>{project.concept}</p>
            </div>
          </div>
        </div>

        {/* Large Opening Keyframe Image */}
        <section className="my-16 sm:my-24">
          <div
            data-cursor="view"
            onClick={() => {
              playShutterSound();
              onOpenLightbox(allImages, 0, project.title);
            }}
            className="group relative rounded-md overflow-hidden cursor-pointer border border-editorial-border bg-editorial-card shadow-2xl"
          >
            <img
              src={project.coverImage}
              alt={`${project.title} opening plate`}
              className="w-full h-auto max-h-[85vh] object-cover"
            />
            <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-white font-mono text-xs flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <Expand className="w-3.5 h-3.5 text-accent-lime" /> FULLSCREEN
            </div>
            <div className="p-4 sm:p-6 bg-editorial-card/90 border-t border-editorial-border flex flex-col sm:flex-row sm:items-center justify-between gap-2 font-mono text-xs text-neutral-400">
              <span>01 / KEYFRAME MONOLITH</span>
              <span className="text-white/80">{project.exif}</span>
            </div>
          </div>
        </section>

        {/* Photographer Field Note Pull-Quote */}
        {project.photographerNotes && (
          <blockquote className="my-20 py-12 px-6 sm:px-12 border-y border-white/10 bg-editorial-black flex flex-col items-center text-center max-w-4xl mx-auto">
            <span className="font-serif text-5xl text-accent-lime leading-none mb-2 select-none">“</span>
            <p className="font-serif italic text-xl sm:text-2xl md:text-3xl text-white/95 leading-relaxed font-light">
              {project.photographerNotes}
            </p>
            <div className="mt-6 flex items-center gap-3 font-mono text-xs text-editorial-muted uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
              <span>Alex Kane — Field Notes</span>
            </div>
          </blockquote>
        )}

        {/* Alternating Editorial Photo Spread Layout */}
        <div className="space-y-16 sm:space-y-24">
          {/* Dual-Column Asymmetric Spread */}
          {project.storySpread && project.storySpread.length >= 2 && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
              <div
                data-cursor="view"
                onClick={() => {
                  playShutterSound();
                  onOpenLightbox(allImages, 1, project.title);
                }}
                className="md:col-span-7 group cursor-pointer border border-editorial-border hover:border-editorial-borderHover rounded overflow-hidden bg-editorial-card shadow-xl transition-colors"
              >
                <img
                  src={project.storySpread[0].src}
                  alt={project.storySpread[0].caption}
                  className="w-full h-full object-cover"
                />
                <div className="p-4 border-t border-editorial-border font-mono text-xs text-neutral-400 flex justify-between">
                  <span>{project.storySpread[0].caption}</span>
                  <span className="text-accent-lime">{project.storySpread[0].cameraExif}</span>
                </div>
              </div>

              <div
                data-cursor="view"
                onClick={() => {
                  playShutterSound();
                  onOpenLightbox(allImages, 2, project.title);
                }}
                className="md:col-span-5 group cursor-pointer border border-editorial-border hover:border-editorial-borderHover rounded overflow-hidden bg-editorial-card shadow-xl transition-colors md:-translate-y-8"
              >
                <img
                  src={project.storySpread[1].src}
                  alt={project.storySpread[1].caption}
                  className="w-full h-full object-cover"
                />
                <div className="p-4 border-t border-editorial-border font-mono text-xs text-neutral-400 flex justify-between">
                  <span>{project.storySpread[1].caption}</span>
                  <span className="text-accent-lime">{project.storySpread[1].cameraExif}</span>
                </div>
              </div>
            </div>
          )}

          {/* Full-bleed or Panoramic Spread */}
          {project.storySpread && project.storySpread.length >= 3 && (
            <div
              data-cursor="view"
              onClick={() => {
                playShutterSound();
                onOpenLightbox(allImages, 3, project.title);
              }}
              className="group cursor-pointer border border-editorial-border hover:border-editorial-borderHover rounded overflow-hidden bg-editorial-card shadow-xl transition-colors"
            >
              <img
                src={project.storySpread[2].src}
                alt={project.storySpread[2].caption}
                className="w-full max-h-[70vh] object-cover"
              />
              <div className="p-4 sm:p-6 border-t border-editorial-border font-mono text-xs text-neutral-400 flex justify-between">
                <span>{project.storySpread[2].caption}</span>
                <span className="text-accent-lime">{project.storySpread[2].cameraExif}</span>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Pagination: Previous & Next Project Buttons */}
        <div className="mt-28 pt-12 border-t border-editorial-border flex flex-col sm:flex-row items-center justify-between gap-6">
          <button
            onClick={() => {
              playFocusClick();
              onSelectProject(prevProject);
            }}
            className="group flex items-center gap-4 text-left p-4 rounded-lg border border-editorial-border hover:border-accent-lime transition-all w-full sm:w-auto"
          >
            <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-accent-lime group-hover:text-black flex items-center justify-center transition-colors">
              <ArrowLeft className="w-5 h-5" />
            </div>
            <div>
              <div className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
                PREVIOUS STORY
              </div>
              <div className="font-display font-bold text-base text-white group-hover:text-accent-lime transition-colors">
                {prevProject.title}
              </div>
            </div>
          </button>

          <button
            onClick={() => {
              playFocusClick();
              onClose();
            }}
            className="font-mono text-xs text-neutral-400 hover:text-white uppercase tracking-widest border-b border-transparent hover:border-white py-1"
          >
            RETURN TO ALL WORKS
          </button>

          <button
            onClick={() => {
              playFocusClick();
              onSelectProject(nextProject);
            }}
            className="group flex items-center gap-4 text-right p-4 rounded-lg border border-editorial-border hover:border-accent-lime transition-all w-full sm:w-auto justify-end"
          >
            <div>
              <div className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
                NEXT STORY
              </div>
              <div className="font-display font-bold text-base text-white group-hover:text-accent-lime transition-colors">
                {nextProject.title}
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-white/5 group-hover:bg-accent-lime group-hover:text-black flex items-center justify-center transition-colors">
              <ArrowRight className="w-5 h-5" />
            </div>
          </button>
        </div>
      </main>
    </div>
  );
}
