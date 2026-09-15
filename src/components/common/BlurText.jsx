import React, { useState, useEffect, useRef, useMemo } from "react";

/**
 * BlurText animation component
 * Kinematic blur-reveal of typography for editorial impact
 */
export default function BlurText({
  text,
  delay = 40,
  animateBy = "words",
  direction = "top",
  className = "",
  style = {}
}) {
  const [inView, setInView] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  const segments = useMemo(() => {
    return animateBy === "words" ? text.split(" ") : text.split("");
  }, [text, animateBy]);

  return (
    <span ref={ref} className={`inline-flex flex-wrap ${className}`} style={style}>
      {segments.map((segment, i) => (
        <span
          key={i}
          className="inline-block transition-all duration-700 ease-out"
          style={{
            filter: inView ? "blur(0px)" : "blur(12px)",
            opacity: inView ? 1 : 0,
            transform: inView ? "translateY(0)" : `translateY(${direction === "top" ? "-18px" : "18px"})`,
            transitionDelay: `${i * delay}ms`,
          }}
        >
          {segment}
          {animateBy === "words" && i < segments.length - 1 ? "\u00A0" : ""}
        </span>
      ))}
    </span>
  );
}
