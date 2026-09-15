import React, { useEffect, useRef } from 'react';

/**
 * Ambient Atmospheric Motes & Interactive Sparks
 * Lightweight, high-efficiency HTML5 2D Canvas simulation.
 * Minimalist, optimized batch rendering to preserve 60-120fps.
 */
export default function AmbientParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize, { passive: true });

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    // Subtle, sparse floating light motes (restrained for luxury aesthetic)
    const AMBIENT_COUNT = Math.min(32, Math.round((width * height) / 45000));
    const motes = [];
    for (let i = 0; i < AMBIENT_COUNT; i++) {
      motes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.2,
        vy: -0.1 - Math.random() * 0.25,
        size: Math.random() > 0.8 ? 2 : 1.2,
        alpha: 0.12 + Math.random() * 0.35,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.015 + Math.random() * 0.02
      });
    }

    // Spark bursts on clicks
    const bursts = [];
    const MAX_BURSTS = 60;

    const spawnSparks = (x, y, count = 24, boost = 1) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = (Math.random() * 2.5 + 1) * boost;
        bursts.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.0 * boost,
          size: Math.random() * 1.5 + 0.8,
          alpha: 0.85,
          decay: 0.02 + Math.random() * 0.02,
          isLime: Math.random() > 0.4
        });
        if (bursts.length > MAX_BURSTS) bursts.shift();
      }
    };

    // Expose window.burstAt for clicks across the app
    window.burstAt = (x, y) => {
      spawnSparks(x, y, 28, 1.4);
    };

    let lastTime = performance.now();

    const loop = (now) => {
      animId = requestAnimationFrame(loop);
      if (document.hidden) return;

      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      // 1. Render Ambient Motes (batch rendered with white/off-white)
      ctx.fillStyle = '#f5f5f3';
      for (let i = 0; i < motes.length; i++) {
        const m = motes[i];
        m.x += m.vx;
        m.y += m.vy;
        m.twinklePhase += m.twinkleSpeed;

        if (m.y < -10) m.y = height + 10;
        if (m.x < -10) m.x = width + 10;
        if (m.x > width + 10) m.x = -10;

        const currentAlpha = Math.max(0.04, m.alpha + Math.sin(m.twinklePhase) * 0.12);
        ctx.globalAlpha = currentAlpha;
        ctx.fillRect(m.x, m.y, m.size, m.size);
      }

      // 2. Render Bursts
      if (bursts.length > 0) {
        for (let i = bursts.length - 1; i >= 0; i--) {
          const b = bursts[i];
          b.x += b.vx;
          b.y += b.vy;
          b.vy += 0.08; // subtle gravity
          b.alpha -= b.decay;

          if (b.alpha <= 0.02) {
            bursts.splice(i, 1);
            continue;
          }

          ctx.fillStyle = b.isLime ? '#C3E41D' : '#F5F5F0';
          ctx.globalAlpha = Math.max(0, b.alpha);
          ctx.fillRect(b.x, b.y, b.size, b.size);
        }
      }

      ctx.globalAlpha = 1.0;
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.burstAt = undefined;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[45]"
      aria-hidden="true"
    />
  );
}
