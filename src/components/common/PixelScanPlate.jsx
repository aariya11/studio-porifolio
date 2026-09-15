import React from 'react';

/**
 * PixelScanPlate
 * GPU-accelerated digital laser transmission reveal on hover.
 * Zero CPU canvas thrashing, zero image CORS issues, 100% smooth 60-120fps.
 */
export default function PixelScanPlate({ isHovered }) {
  if (!isHovered) return null;

  return (
    <div
      className="absolute inset-0 z-10 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      {/* Laser Scanline Beam */}
      <div className="absolute inset-y-0 w-32 -left-32 animate-[scanline_1.2s_cubic-bezier(0.2,0.8,0.2,1)_forwards] bg-gradient-to-r from-transparent via-accent-lime/25 to-transparent pointer-events-none" />

      {/* Leading Sharp Laser Edge */}
      <div className="absolute inset-y-0 w-[1.5px] -left-[1.5px] animate-[scanline_1.2s_cubic-bezier(0.2,0.8,0.2,1)_forwards] bg-accent-lime shadow-[0_0_12px_#C3E41D] pointer-events-none" />

      {/* Sub-pixel Matrix Overlay Texture */}
      <div
        className="absolute inset-0 opacity-20 mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(195, 228, 29, 0.4) 1px, transparent 1px)',
          backgroundSize: '12px 12px'
        }}
      />
    </div>
  );
}
