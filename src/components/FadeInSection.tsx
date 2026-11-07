import React, { useEffect, useRef, useState } from "react";

interface FadeInSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "none";
}

export const FadeInSection: React.FC<FadeInSectionProps> = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect user's motion preference (WCAG AA)
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (domRef.current) {
            observer.unobserve(domRef.current);
          }
        }
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    const currentRef = domRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  const getTransform = () => {
    if (isVisible) return "translate-y-0 opacity-100";
    if (direction === "up") return "translate-y-8 opacity-0";
    return "opacity-0";
  };

  return (
    <div
      ref={domRef}
      style={{
        transitionDuration: "800ms",
        transitionDelay: `${delay}ms`,
        transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className={`transition-[opacity,transform] will-change-[opacity,transform] ${getTransform()} ${className}`}
    >
      {children}
    </div>
  );
};
