import React from 'react';

/**
 * FilmGrain & Cinematic Vignette overlay
 * Imparts an authentic 35mm analogue texture and subtle edge darkening
 */
export default function FilmGrain({ enabled = true }) {
  if (!enabled) return null;

  return (
    <>
      {/* 35mm Analogue Film Grain Layer */}
      <div 
        aria-hidden="true" 
        className="film-grain select-none pointer-events-none" 
      />
      {/* Cinematic Vignette */}
      <div 
        aria-hidden="true" 
        className="cinematic-vignette select-none pointer-events-none" 
      />
    </>
  );
}
