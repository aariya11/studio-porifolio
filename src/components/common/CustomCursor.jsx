import React, { useEffect, useState } from 'react';

/**
 * Desktop Custom Cursor
 * Transforms dynamically based on hovered element data-cursor attributes:
 * - data-cursor="view" -> expands into pill with "VIEW" text
 * - data-cursor="drag" -> expands into pill with "DRAG" text
 * - data-cursor="arrow" -> expands with "→"
 * - data-cursor="close" -> expands with "✕"
 * Automatically disabled on touch devices and under prefers-reduced-motion.
 */
export default function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorState, setCursorState] = useState({
    type: 'default', // 'default', 'view', 'drag', 'arrow', 'close', 'pointer'
    label: ''
  });
  const [isVisible, setIsVisible] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    // Check if device is touch or prefers reduced motion
    const checkTouch = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      setIsTouch(hasTouch || prefersReduced);
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);

      // Determine what element is being hovered
      const target = e.target;
      const cursorTarget = target.closest('[data-cursor]');
      
      if (cursorTarget) {
        const type = cursorTarget.getAttribute('data-cursor');
        if (type === 'view') {
          setCursorState({ type: 'view', label: 'VIEW' });
        } else if (type === 'drag') {
          setCursorState({ type: 'drag', label: 'DRAG' });
        } else if (type === 'arrow') {
          setCursorState({ type: 'arrow', label: '→' });
        } else if (type === 'close') {
          setCursorState({ type: 'close', label: '✕' });
        } else {
          setCursorState({ type: 'pointer', label: '' });
        }
      } else if (target.closest('a, button, [role="button"], input, select, textarea')) {
        setCursorState({ type: 'pointer', label: '' });
      } else {
        setCursorState({ type: 'default', label: '' });
      }
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [isVisible]);

  if (isTouch || !isVisible) return null;

  const isExpanded = cursorState.type === 'view' || cursorState.type === 'drag';
  const isArrow = cursorState.type === 'arrow' || cursorState.type === 'close';
  const isPointer = cursorState.type === 'pointer';

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 pointer-events-none z-[9999] transition-transform ease-out duration-75"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      {/* Outer morphing ring/badge */}
      <div
        className={`-translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-all duration-300 ${
          isExpanded
            ? 'w-20 h-20 bg-accent-lime text-black font-mono text-xs font-bold tracking-widest shadow-2xl scale-100 opacity-95'
            : isArrow
            ? 'w-12 h-12 bg-white text-black font-mono text-base font-bold scale-100 opacity-90'
            : isPointer
            ? 'w-9 h-9 border border-accent-lime bg-accent-lime/10 scale-110'
            : 'w-3 h-3 bg-white/80 rounded-full'
        }`}
      >
        {isExpanded && <span>{cursorState.label}</span>}
        {isArrow && <span>{cursorState.label}</span>}
      </div>
    </div>
  );
}
