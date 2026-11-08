import React, { useEffect, useState, useRef } from "react";

export const ScrollProgressBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [direction, setDirection] = useState<"forward" | "backward">("forward");
  const [isScrolling, setIsScrolling] = useState(false);
  const [activeTool, setActiveTool] = useState<"scissor" | "razor">("scissor");
  const lastScrollY = useRef(0);
  const scrollTimeout = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      if (docHeight > 0) {
        const progress = Math.min(Math.max((currentY / docHeight) * 100, 0), 100);
        setScrollProgress(progress);
      }

      // Detect scroll direction:
      // Ida: Scrolling down -> progress moves left to right -> Forward
      // Volta: Scrolling up -> progress moves right to left -> Backward (Inverte a tesoura)
      if (currentY > lastScrollY.current + 2) {
        setDirection("forward");
      } else if (currentY < lastScrollY.current - 2) {
        setDirection("backward");
      }

      lastScrollY.current = currentY;
      setIsScrolling(true);

      if (scrollTimeout.current) {
        window.clearTimeout(scrollTimeout.current);
      }
      scrollTimeout.current = window.setTimeout(() => {
        setIsScrolling(false);
      }, 700);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) window.clearTimeout(scrollTimeout.current);
    };
  }, []);

  return (
    <div
      role="progressbar"
      aria-label="Progresso de leitura com tesoura horizontal e navalha minimalista da Barbearia Invictus"
      aria-valuenow={Math.round(scrollProgress)}
      aria-valuemin={0}
      aria-valuemax={100}
      className="fixed top-0 left-0 right-0 h-[4px] z-[70] bg-[#12141c]/60 backdrop-blur-[2px] pointer-events-none select-none"
    >
      {/* Linha Dourada da Barra de Progresso ("O Risquinho") */}
      <div
        className="h-full bg-gradient-to-r from-[#8c671a] via-[#f3e5ab] to-[#d4af37] shadow-[0_0_12px_rgba(212,175,55,0.9)] relative"
        style={{ width: `${scrollProgress}%` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-pulse" />
      </div>

      {/* Seletor Sutil de Ferramenta (Tesoura Horizontal / Navalha Minimalista) */}
      <div className="absolute top-1.5 right-3 pointer-events-auto flex items-center gap-1.5 bg-[#141722]/90 border border-[#d4af37]/30 rounded-full px-2 py-0.5 shadow-lg backdrop-blur-md">
        <button
          type="button"
          onClick={() => setActiveTool("scissor")}
          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full transition-all ${
            activeTool === "scissor"
              ? "bg-[#d4af37] text-[#0d0f14] shadow"
              : "text-[#a0a6b5] hover:text-[#f3e5ab]"
          }`}
          title="Tesoura horizontal de corte"
        >
          ✂️ Tesoura
        </button>
        <button
          type="button"
          onClick={() => setActiveTool("razor")}
          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full transition-all ${
            activeTool === "razor"
              ? "bg-[#d4af37] text-[#0d0f14] shadow"
              : "text-[#a0a6b5] hover:text-[#f3e5ab]"
          }`}
          title="Navalha minimalista"
        >
          🪒 Navalha
        </button>
      </div>

      {/* Ferramenta Dinâmica na Ponta da Barra */}
      <div
        className="absolute top-1/2 -translate-y-1/2 transition-all duration-75 ease-out pointer-events-none"
        style={{
          left: `${Math.max(scrollProgress, 1.2)}%`,
          transform: "translate(-50%, -50%)",
          opacity: scrollProgress > 0.5 ? 1 : 0.75,
        }}
      >
        {activeTool === "scissor" ? (
          /* =========================================================================
             TESOURA HORIZONTAL DE BARBEIRO (IDA E VOLTA COM INVERSÃO)
             - Movimento estritamente horizontal
             - Na ida: lâminas apontam para a direita (-->), cabos visíveis à esquerda
             - Na volta: inverte horizontalmente (<--), lâminas apontam para a esquerda
             - Cabos (argolas com apoio de dedo) totalmente visíveis
             ========================================================================= */
          <div
            className={`relative flex items-center justify-center filter drop-shadow-[0_2px_10px_rgba(212,175,55,0.75)] transition-transform duration-200 ${
              direction === "backward" ? "scale-x-[-1]" : "scale-x-100"
            } ${isScrolling ? "scale-y-110" : "scale-y-100"}`}
            title="Tesoura horizontal de corte Invictus"
          >
            {/* Faísca / micro-corte horizontal */}
            <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#fef08a] blur-[2px] opacity-75 animate-ping" />
            
            {/* SVG Horizontal de Alta Fidelidade (64x28): Cabos à esquerda, lâminas à direita */}
            <svg
              width="58"
              height="26"
              viewBox="0 0 64 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="overflow-visible"
            >
              <defs>
                <linearGradient id="scis-steel" x1="28" y1="6" x2="62" y2="22" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="50%" stopColor="#cbd5e1" />
                  <stop offset="100%" stopColor="#64748b" />
                </linearGradient>
                <linearGradient id="scis-gold-handle" x1="2" y1="4" x2="30" y2="24" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#fef08a" />
                  <stop offset="50%" stopColor="#d4af37" />
                  <stop offset="100%" stopColor="#8c671a" />
                </linearGradient>
              </defs>

              {/* Lâmina e Cabo Superior com animação de corte horizontal */}
              <g className={isScrolling ? "animate-snip-upper-horiz" : ""}>
                {/* Lâmina Superior Horizontal (de 28 a 60) */}
                <path
                  d="M 28 14 L 60 11 L 30 13 Z"
                  fill="url(#scis-steel)"
                  stroke="#f3e5ab"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
                <line x1="28" y1="14" x2="60" y2="11" stroke="#ffffff" strokeWidth="1.2" />

                {/* Haste e Argola Superior do Cabo (anéis para os dedos visíveis) */}
                <path d="M 28 14 L 18 8" stroke="url(#scis-gold-handle)" strokeWidth="2.8" strokeLinecap="round" />
                <circle cx="10" cy="7" r="5.5" stroke="url(#scis-gold-handle)" strokeWidth="2.4" fill="#0d0f14" />
                {/* Apoio de Dedo Curvado (Tang) */}
                <path d="M 5 6 Q 0 3 1 0" stroke="#f3e5ab" strokeWidth="1.8" strokeLinecap="round" fill="none" />
              </g>

              {/* Lâmina e Cabo Inferior com animação de corte horizontal */}
              <g className={isScrolling ? "animate-snip-lower-horiz" : ""}>
                {/* Lâmina Inferior Horizontal (de 28 a 60) */}
                <path
                  d="M 28 14 L 60 17 L 30 15 Z"
                  fill="url(#scis-steel)"
                  stroke="#f3e5ab"
                  strokeWidth="1.2"
                  strokeLinejoin="round"
                />
                <line x1="28" y1="14" x2="60" y2="17" stroke="#ffffff" strokeWidth="1.2" />

                {/* Haste e Argola Inferior do Cabo */}
                <path d="M 28 14 L 18 20" stroke="url(#scis-gold-handle)" strokeWidth="2.8" strokeLinecap="round" />
                <circle cx="10" cy="21" r="5.5" stroke="url(#scis-gold-handle)" strokeWidth="2.4" fill="#0d0f14" />
              </g>

              {/* Parafuso Central de Tensão Dourado (Pivot Pin) */}
              <circle cx="28" cy="14" r="2.8" fill="#fef08a" stroke="#8c671a" strokeWidth="1" />
              <line x1="26.5" y1="14" x2="29.5" y2="14" stroke="#111" strokeWidth="0.8" />
            </svg>
          </div>
        ) : (
          /* =========================================================================
             NAVALHA ULTRA-MINIMALISTA (Sleek Razor Blade Silhouette)
             - Geometria purista, minimalista e limpa
             - Lâmina afiada em titânio e espinha dourada discreta
             ========================================================================= */
          <div
            className={`relative flex items-center justify-center filter drop-shadow-[0_2px_8px_rgba(212,175,55,0.8)] ${
              direction === "backward" ? "scale-x-[-1]" : "scale-x-100"
            }`}
            title="Navalha minimalista Invictus"
          >
            {/* Ponto de contato preciso (micro glint) */}
            <span className="absolute -left-0.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#fef08a]" />

            {/* SVG Minimalista */}
            <svg
              width="36"
              height="20"
              viewBox="0 0 36 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="transform -rotate-6"
            >
              {/* Lâmina minimalista reta com fio polido */}
              <path
                d="M 6 10 L 32 3 L 34 8 L 8 15 Z"
                fill="#f1f5f9"
                stroke="#d4af37"
                strokeWidth="1"
              />
              {/* Fio de corte com reflexo branco */}
              <line x1="8" y1="15" x2="34" y2="8" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" />
              {/* Espinha dourada ultra-fina */}
              <line x1="6" y1="10" x2="32" y2="3" stroke="#d4af37" strokeWidth="2" strokeLinecap="round" />
              {/* Cabo articulado minimalista estilizado */}
              <path d="M 6 10 Q 0 14 2 18" stroke="#8c671a" strokeWidth="2" strokeLinecap="round" fill="none" />
              {/* Pino central */}
              <circle cx="6" cy="10" r="1.5" fill="#fef08a" stroke="#1e293b" strokeWidth="0.6" />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
};
