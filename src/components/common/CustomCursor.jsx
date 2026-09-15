import React, { useEffect, useRef, useState } from 'react';

/**
 * Desktop Custom Cursor
 * Lightweight, hardware-accelerated pointer follower.
 * Directly mutates transform on DOM ref to avoid React state re-render churn.
 * Automatically disabled on touch devices and under prefers-reduced-motion.
 */
export default function CustomCursor() {
  const cursorRef = useRef(null);
  const [cursorType, setCursorType] = useState('default');
  const [cursorLabel, setCursorLabel] = useState('');
  const [isEnabled, setIsEnabled] = useState(false);

  useEffect(() => {
    // Check if device has fine pointer and allows motion
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!hasFinePointer || prefersReduced) {
      setIsEnabled(false);
      return;
    }

    setIsEnabled(true);

    const onMouseMove = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
        cursorRef.current.style.opacity = '1';
      }

      const target = e.target;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]');
      if (cursorTarget) {
        const type = cursorTarget.getAttribute('data-cursor');
        if (type === 'view') {
          setCursorType('view');
          setCursorLabel('VIEW');
        } else if (type === 'drag') {
          setCursorType('drag');
          setCursorLabel('DRAG');
        } else if (type === 'arrow') {
          setCursorType('arrow');
          setCursorLabel('→');
        } else if (type === 'close') {
          setCursorType('close');
          setCursorLabel('✕');
        } else {
          setCursorType('pointer');
          setCursorLabel('');
        }
      } else if (target.closest('a, button, [role="button"], input, select, textarea')) {
        setCursorType('pointer');
        setCursorLabel('');
      } else {
        setCursorType('default');
        setCursorLabel('');
      }
    };

    const onMouseLeave = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '0';
      }
    };

    const onMouseEnter = () => {
      if (cursorRef.current) {
        cursorRef.current.style.opacity = '1';
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, []);

  if (!isEnabled) return null;

  const isExpanded = cursorType === 'view' || cursorType === 'drag';
  const isArrow = cursorType === 'arrow' || cursorType === 'close';
  const isPointer = cursorType === 'pointer';

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="custom-cursor-root fixed top-0 left-0 pointer-events-none z-[9999] opacity-0 will-change-transform"
      style={{
        transform: 'translate3d(-100px, -100px, 0)',
        transition: 'opacity 0.2s ease-out'
      }}
    >
      {/* Outer morphing ring/badge */}
      <div
        className={`-translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-all duration-200 ${
          isExpanded
            ? 'w-16 h-16 bg-accent-lime text-black font-mono text-[11px] font-bold tracking-widest shadow-2xl scale-100 opacity-95'
            : isArrow
            ? 'w-11 h-11 bg-white text-black font-mono text-base font-bold scale-100 opacity-90'
            : isPointer
            ? 'w-8 h-8 border border-accent-lime bg-accent-lime/15 scale-110'
            : 'w-2.5 h-2.5 bg-white/90 rounded-full'
        }`}
      >
        {isExpanded && <span>{cursorLabel}</span>}
        {isArrow && <span>{cursorLabel}</span>}
      </div>
    </div>
  );
}
