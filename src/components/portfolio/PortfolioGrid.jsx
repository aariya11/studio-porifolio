import React, { useState, useMemo } from 'react';
import { CATEGORIES, PROJECTS } from '../../data/portfolioData';
import ProjectCard from './ProjectCard';
import { playFocusClick } from '../../utils/sound';

export default function PortfolioGrid({ onSelectProject }) {
  const [selectedCategory, setSelectedCategory] = useState('ALL');

  // Filter projects according to selected category
  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'ALL') return PROJECTS;
    return PROJECTS.filter(
      (p) => p.category.toUpperCase() === selectedCategory.toUpperCase()
    );
  }, [selectedCategory]);

  // Counts for badges
  const getCategoryCount = (category) => {
    if (category === 'ALL') return PROJECTS.length;
    return PROJECTS.filter(
      (p) => p.category.toUpperCase() === category.toUpperCase()
    ).length;
  };

  const handleCategorySelect = (cat) => {
    playFocusClick();
    setSelectedCategory(cat);
  };

  return (
    <section
      id="work"
      className="relative py-24 sm:py-32 px-4 sm:px-8 md:px-12 bg-editorial-black border-t border-editorial-border/60"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Metadata & Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-editorial-border/60">
          <div>
            <div className="font-mono text-xs text-accent-lime uppercase tracking-widest mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-accent-lime" />
              <span>02 / EDITORIAL ARCHIVE</span>
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-white">
              SELECTED WORKS
            </h2>
          </div>

          <p className="font-sans text-sm sm:text-base text-editorial-muted max-w-md leading-relaxed">
            Curated editorial stories, campaign commissions, and personal monographs captured between Paris, Tokyo, and remote terrains worldwide.
          </p>
        </div>

        {/* Filter Bar with Category Counts */}
        <div className="py-8 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 min-w-max">
            {CATEGORIES.map((cat) => {
              const count = getCategoryCount(cat);
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => handleCategorySelect(cat)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 ${
                    isSelected
                      ? 'bg-white text-black font-bold shadow-lg'
                      : 'bg-white/[0.04] text-neutral-400 hover:text-white hover:bg-white/[0.08] border border-editorial-border'
                  }`}
                >
                  <span>{cat}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                      isSelected
                        ? 'bg-black/20 text-black'
                        : 'bg-white/10 text-neutral-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Editorial Masonry Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8 pt-4">
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onSelectProject={onSelectProject}
            />
          ))}
        </div>

        {/* Bottom Portfolio Note */}
        <div className="mt-16 pt-8 border-t border-editorial-border/40 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-neutral-400">
          <div>
            SHOWING {filteredProjects.length} OF {PROJECTS.length} CURATED STORIES
          </div>
          <div className="flex items-center gap-2">
            <span>ARCHIVAL PRINTS & COMMERCIAL LICENSES AVAILABLE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent-lime" />
          </div>
        </div>
      </div>
    </section>
  );
}
