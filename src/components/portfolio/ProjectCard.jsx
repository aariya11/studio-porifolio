import React, { useState } from 'react';
import { ArrowUpRight, Camera } from 'lucide-react';
import { playShutterSound } from '../../utils/sound';
import PixelScanPlate from '../common/PixelScanPlate';

export default function ProjectCard({
  project,
  onSelectProject,
  onQuickPreview
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Dynamic aspect ratio classes
  const getAspectClass = () => {
    switch (project.aspectRatio) {
      case 'portrait':
        return 'aspect-[4/5] md:col-span-6 lg:col-span-6';
      case 'landscape':
        return 'aspect-[16/10] md:col-span-6 lg:col-span-6';
      case 'square':
        return 'aspect-square md:col-span-6 lg:col-span-6';
      case 'panoramic':
        return 'aspect-[16/9] sm:aspect-[21/9] md:col-span-12 lg:col-span-12';
      default:
        return 'aspect-[4/5] md:col-span-6 lg:col-span-6';
    }
  };

  const handleClick = (e) => {
    playShutterSound();
    if (window.burstAt) {
      window.burstAt(e.clientX, e.clientY);
    }
    onSelectProject(project);
  };

  return (
    <article
      data-cursor="view"
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative overflow-hidden rounded-md cursor-pointer border border-editorial-border/60 hover:border-editorial-borderHover transition-all duration-700 bg-editorial-card flex flex-col justify-end portal-plate ${getAspectClass()}`}
    >
      {/* Background Image Container with 3D Depth Portal */}
      <div className="absolute inset-0 z-0 overflow-hidden portal-media">
        {/* Placeholder skeleton */}
        {!isLoaded && (
          <div className="absolute inset-0 bg-neutral-900 animate-pulse" />
        )}
        <img
          src={project.coverImage}
          alt={`${project.title} — ${project.category} Photography by Alex Kane`}
          onLoad={() => setIsLoaded(true)}
          loading="lazy"
          className={`w-full h-full object-cover filter contrast-[1.08] transition-all duration-700 ease-out group-hover:contrast-[1.12] ${
            isLoaded ? 'opacity-90' : 'opacity-0'
          }`}
        />
        {/* Pixel Scanline Transmission Plate */}
        <PixelScanPlate
          imageSrc={project.coverImage}
          isHovered={isHovered}
        />
        {/* Atmospheric vignette & gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070708] via-[#070708]/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />
      </div>

      {/* Top Card Bar: Number & Category Badge */}
      <div className="absolute top-0 left-0 right-0 p-5 sm:p-6 z-10 flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold text-accent-lime bg-black/60 backdrop-blur-md px-2.5 py-1 rounded border border-accent-lime/20">
            {project.number}
          </span>
          <span className="font-mono text-[11px] uppercase tracking-wider text-neutral-300 bg-black/40 backdrop-blur-md px-2 py-1 rounded border border-white/10">
            {project.category}
          </span>
        </div>

        {/* View Story Arrow Icon */}
        <div className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-accent-lime group-hover:text-black group-hover:border-accent-lime transition-all duration-300 transform group-hover:scale-110 shadow-lg">
          <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>

      {/* Bottom Information Panel */}
      <div className="relative z-10 p-5 sm:p-7 transition-transform duration-500">
        {/* Location & Year */}
        <div className="flex items-center gap-2 font-mono text-xs text-neutral-400 mb-1.5 uppercase tracking-wider">
          <span>{project.location}</span>
          <span className="text-white/30">•</span>
          <span>{project.year}</span>
        </div>

        {/* Project Title */}
        <h3 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-white group-hover:text-accent-lime transition-colors duration-300 tracking-tight leading-tight">
          {project.title}
        </h3>

        {/* Short Description: slides smoothly on hover */}
        <p className="mt-2 font-sans text-xs sm:text-sm text-neutral-300 line-clamp-2 max-w-xl leading-relaxed opacity-85 group-hover:opacity-100 transition-opacity">
          {project.shortDesc}
        </p>

        {/* Metadata Footer bar (Camera & Client) */}
        <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-2 font-mono text-[10px] text-neutral-400">
          <div className="flex items-center gap-1.5 text-neutral-400">
            <Camera className="w-3 h-3 text-accent-lime" />
            <span className="truncate max-w-[200px]">{project.camera}</span>
          </div>
          <span className="text-neutral-400 uppercase tracking-wider">
            {project.client}
          </span>
        </div>
      </div>
    </article>
  );
}
