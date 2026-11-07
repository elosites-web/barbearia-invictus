import React, { useEffect, useState } from "react";

export const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight > 0) {
        const progress = Math.min(Math.max((scrollY / docHeight) * 100, 0), 100);
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();

    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  return (
    <div
      role="progressbar"
      aria-label="Progresso de leitura da página"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[60] bg-transparent pointer-events-none"
    >
      <div
        className="h-full bg-gradient-to-r from-[#b78a28] via-[#f3e5ab] to-[#d4af37] shadow-[0_0_8px_rgba(212,175,55,0.7)] transition-all duration-75 ease-out origin-left"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};
