import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2, Minimize2, Camera, Info } from 'lucide-react';
import { playFocusClick, playShutterSound } from '../../utils/sound';

export default function Lightbox({
  isOpen,
  images = [],
  currentIndex = 0,
  projectTitle = '',
  onClose,
  onNavigate
}) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const containerRef = useRef(null);

  const currentImage = images[currentIndex] || {};

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        handleNext();
      } else if (e.key === 'ArrowLeft') {
        handlePrev();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length]);

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const touchEnd = e.changedTouches[0].clientX;
    const diff = touchStart - touchEnd;

    // Minimum swipe threshold
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    setTouchStart(null);
  };

  const handleNext = () => {
    if (images.length <= 1) return;
    playFocusClick();
    setIsZoomed(false);
    const nextIndex = (currentIndex + 1) % images.length;
    onNavigate(nextIndex);
  };

  const handlePrev = () => {
    if (images.length <= 1) return;
    playFocusClick();
    setIsZoomed(false);
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    onNavigate(prevIndex);
  };

  const toggleZoom = () => {
    playFocusClick();
    setIsZoomed(!isZoomed);
  };

  if (!isOpen || !images.length) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image Lightbox Viewer"
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="fixed inset-0 z-[10000] bg-[#050507]/98 backdrop-blur-3xl flex flex-col justify-between select-none animate-fade-in"
    >
      {/* Top Controls Bar */}
      <div className="relative z-20 flex items-center justify-between p-4 sm:p-6 border-b border-white/10 text-white font-mono text-xs">
        {/* Project Title & Counter */}
        <div className="flex items-center gap-4">
          <span className="font-display font-bold text-sm tracking-wider uppercase">
            {projectTitle}
          </span>
          <span className="text-white/40">•</span>
          <span className="text-accent-lime">
            {String(currentIndex + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
          </span>
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleZoom}
            className="p-2 rounded-full border border-white/15 hover:border-white text-white/80 hover:text-white transition-colors"
            title={isZoomed ? "Reset zoom" : "100% Zoom view"}
            aria-label="Toggle zoom"
          >
            {isZoomed ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <button
            onClick={() => {
              playFocusClick();
              onClose();
            }}
            className="p-2 rounded-full border border-white/15 hover:border-accent-lime text-white hover:text-accent-lime transition-colors"
            aria-label="Close fullscreen lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Image Center Area */}
      <div className="relative flex-1 flex items-center justify-center p-4 sm:p-8 overflow-hidden">
        {/* Previous Navigation Button */}
        {images.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-8 z-30 p-3 rounded-full bg-black/60 hover:bg-black/90 border border-white/15 hover:border-accent-lime text-white hover:text-accent-lime transition-all duration-300"
            aria-label="Previous photograph"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* The Image */}
        <div
          onClick={toggleZoom}
          className={`relative max-w-full max-h-full transition-transform duration-300 ease-out cursor-zoom-in ${
            isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100'
          }`}
        >
          <img
            src={currentImage.src || currentImage}
            alt={currentImage.caption || `${projectTitle} - Image ${currentIndex + 1}`}
            className="max-h-[75vh] sm:max-h-[82vh] w-auto max-w-full object-contain rounded-sm shadow-2xl transition-opacity duration-300"
          />
        </div>

        {/* Next Navigation Button */}
        {images.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-8 z-30 p-3 rounded-full bg-black/60 hover:bg-black/90 border border-white/15 hover:border-accent-lime text-white hover:text-accent-lime transition-all duration-300"
            aria-label="Next photograph"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Bottom Metadata & Caption Bar */}
      <div className="relative z-20 p-4 sm:p-6 border-t border-white/10 bg-black/40 backdrop-blur-md flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-neutral-400">
        <div className="flex items-center gap-2 max-w-2xl text-white/90">
          <Info className="w-3.5 h-3.5 text-accent-lime shrink-0" />
          <span className="font-sans text-xs sm:text-sm">
            {currentImage.caption || "Archival high-resolution scan. Hand-graded tonal curve."}
          </span>
        </div>

        {currentImage.cameraExif && (
          <div className="flex items-center gap-2 text-[11px] text-neutral-400 border border-white/10 px-2.5 py-1 rounded bg-white/5">
            <Camera className="w-3 h-3 text-accent-lime" />
            <span>{currentImage.cameraExif}</span>
          </div>
        )}
      </div>
    </div>
  );
}
