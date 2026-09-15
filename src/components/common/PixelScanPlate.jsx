import React, { useRef, useState, useEffect } from 'react';

/**
 * PixelScanPlate
 * Botanical / Digital transmission reveal effect from Sylva:
 * Samples the image pixels on an offscreen canvas and renders pulsating dots
 * along a stepped scanline wave that advances across the photograph on hover or mount.
 */
export default function PixelScanPlate({ imageSrc, isHovered }) {
  const canvasRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    if (!isHovered) {
      setActive(false);
      return;
    }

    setActive(true);
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const ctx = canvasEl.getContext('2d');
    if (!ctx) return;

    let animId;
    const box = canvasEl.getBoundingClientRect();
    if (!box.width || !box.height) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvasEl.width = Math.max(1, Math.round(box.width * dpr));
    canvasEl.height = Math.max(1, Math.round(box.height * dpr));
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const cols = 48;
    const rows = Math.max(16, Math.round(cols * (box.height / box.width)));

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = imageSrc;

    let rgba = null;
    const sampleCanvas = document.createElement('canvas');
    sampleCanvas.width = cols;
    sampleCanvas.height = rows;
    const sCtx = sampleCanvas.getContext('2d', { willReadFrequently: true });

    img.onload = () => {
      try {
        sCtx.drawImage(img, 0, 0, cols, rows);
        rgba = sCtx.getImageData(0, 0, cols, rows).data;
      } catch (e) {
        // Fallback tone
      }
    };

    const CUT_STEPS = 12;
    const CUT_MS = 1350;
    const startedAt = performance.now();

    const paint = (now) => {
      const t = Math.min(1, (now - startedAt) / CUT_MS);
      const stepped = Math.floor(t * CUT_STEPS) / CUT_STEPS;
      const front = stepped;
      const tailFade = t < 0.85 ? 1 : (1 - t) / 0.15;

      ctx.clearRect(0, 0, box.width, box.height);

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const an = (x + 0.5) / cols;
          const delta = an - front;
          if (delta < -0.18 || delta > 0.18) continue;

          const band = 1 - Math.abs(delta) / 0.18;
          const pulse = 0.65 + 0.35 * Math.sin(x * 2.7 + y * 1.9 + t * 24);
          const alpha = Math.max(0, band * pulse * tailFade);
          if (alpha < 0.08) continue;

          let r = 195, g = 228, b = 29;
          if (rgba) {
            const q = (y * cols + x) * 4;
            r = Math.min(255, rgba[q] * 1.15 + 20);
            g = Math.min(255, rgba[q + 1] * 1.15 + 24);
            b = Math.min(255, rgba[q + 2] * 1.1 + 14);
          }

          let px = ((x + 0.5) * box.width) / cols;
          let py = ((y + 0.5) * box.height) / rows;
          const jitter = (1 - band) * 4;
          px += Math.sin(y * 3.1 + x) * jitter;
          py += Math.cos(x * 2.4 - y) * jitter;
          const radius = (0.6 + band * 1.2) * Math.max(0.75, box.width / 320);

          ctx.fillStyle = `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${(alpha * 0.9).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(px, py, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      if (t < 1) {
        animId = requestAnimationFrame(paint);
      } else {
        ctx.clearRect(0, 0, box.width, box.height);
      }
    };

    animId = requestAnimationFrame(paint);

    return () => {
      cancelAnimationFrame(animId);
      if (ctx) ctx.clearRect(0, 0, box.width, box.height);
    };
  }, [isHovered, imageSrc]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 z-20 w-full h-full pointer-events-none mix-blend-screen transition-opacity duration-300 ${
          active ? 'opacity-100' : 'opacity-0'
        }`}
        aria-hidden="true"
      />
      {isHovered && <div className="scanline-beam" aria-hidden="true" />}
    </>
  );
}
