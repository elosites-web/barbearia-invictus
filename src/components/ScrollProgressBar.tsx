import React, { useEffect, useState } from "react";

/**
 * Barra de progresso de rolagem minimalista e discreta da Barbearia Invictus.
 * - Espessura reduzida (2.5px) para não competir com o cabeçalho nem com o conteúdo.
 * - Leitura precisa do progresso de rolagem da página.
 * - Visual limpo em tom dourado sutil, sem animações ou elementos extravagantes.
 */
export const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (docHeight > 0) {
        const progress = Math.min(Math.max((currentY / docHeight) * 100, 0), 100);
        setScrollProgress(progress);
      } else {
        setScrollProgress(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      role="progressbar"
      aria-label="Progresso de leitura da página"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 right-0 h-[2.5px] z-[70] bg-[#12141c]/50 backdrop-blur-[1px] pointer-events-none select-none"
    >
      <div
        className="h-full bg-gradient-to-r from-[#8c671a] via-[#d4af37] to-[#f3e5ab] transition-[width] duration-100 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};
