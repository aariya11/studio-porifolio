import React, { useEffect, useRef } from 'react';

/**
 * Ambient Atmospheric Motes & Interactive Cursor Pollen Spray
 * Lightweight HTML5 2D/Canvas particle simulation based on the Sylva particle physics:
 *  - Power-law distributed ambient floating light motes
 *  - Distance-based cursor spray emission
 *  - Global window.burstAt(x, y) callback for pill/button click sparks
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
    window.addEventListener('resize', handleResize);

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    // Ambient floating motes
    const AMBIENT_COUNT = Math.min(140, Math.round((width * height) / 14000));
    const motes = [];
    for (let i = 0; i < AMBIENT_COUNT; i++) {
      motes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -0.15 - Math.random() * 0.45,
        radius: 0.6 + Math.pow(Math.random(), 2.2) * 1.8,
        alpha: 0.15 + Math.random() * 0.5,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.02 + Math.random() * 0.03
      });
    }

    // Cursor spray & bursts
    const bursts = [];
    const MAX_BURSTS = 300;

    const spawnSparks = (x, y, count = 35, boost = 1) => {
      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = (Math.random() * 3 + 1) * boost;
        bursts.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1.2 * boost,
          radius: (Math.random() * 1.5 + 0.8) * Math.min(boost, 1.6),
          alpha: 0.9,
          decay: 0.015 + Math.random() * 0.02,
          color: Math.random() > 0.4 ? 'rgba(195, 228, 29,' : 'rgba(245, 245, 240,'
        });
        if (bursts.length > MAX_BURSTS) bursts.shift();
      }
    };

    // Expose window.burstAt for clicks across the app
    window.burstAt = (x, y) => {
      spawnSparks(x, y, 45, 1.8);
    };

    // Cursor trail tracking
    let lastX = -9999, lastY = -9999;
    const handleMouseMove = (e) => {
      if (lastX > -1000) {
        const dx = e.clientX - lastX;
        const dy = e.clientY - lastY;
        const dist = Math.hypot(dx, dy);
        if (dist > 18) {
          spawnSparks(e.clientX, e.clientY, 1, 0.6);
        }
      }
      lastX = e.clientX;
      lastY = e.clientY;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    let lastTime = performance.now();

    const loop = (now) => {
      animId = requestAnimationFrame(loop);
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      // Render Ambient Motes
      for (let i = 0; i < motes.length; i++) {
        const m = motes[i];
        m.x += m.vx;
        m.y += m.vy;
        m.twinklePhase += m.twinkleSpeed;

        if (m.y < -10) m.y = height + 10;
        if (m.x < -10) m.x = width + 10;
        if (m.x > width + 10) m.x = -10;

        const currentAlpha = m.alpha * (0.6 + 0.4 * Math.sin(m.twinklePhase));
        ctx.fillStyle = `rgba(220, 235, 205, ${currentAlpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(m.x, m.y, m.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Render Bursts & Cursor Sparks
      for (let i = bursts.length - 1; i >= 0; i--) {
        const b = bursts[i];
        b.x += b.vx;
        b.y += b.vy;
        b.vy += 0.05; // Gentle gravity
        b.vx *= 0.98; // Friction
        b.alpha -= b.decay;

        if (b.alpha <= 0) {
          bursts.splice(i, 1);
          continue;
        }

        ctx.fillStyle = `${b.color}${b.alpha.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      delete window.burstAt;
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[40]"
      aria-hidden="true"
    />
  );
}
