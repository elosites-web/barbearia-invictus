import React, { useState, useEffect } from "react";
import { BARBEARIA_CONFIG } from "../data/barbeariaData";
import { WhatsAppIcon } from "./WhatsAppIcon";

interface Ripple {
  id: number;
  x: number;
  y: number;
  size: number;
}

export const FloatingWhatsApp: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handlePointerDown = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const size = Math.max(rect.width, rect.height) * 2.6;

    const newRipple: Ripple = {
      id: Date.now() + Math.random(),
      x,
      y,
      size,
    };

    setRipples((prev) => [...prev, newRipple]);

    window.setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== newRipple.id));
    }, 520);
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    let hasScheduledAfterHero = false;

    const checkHeroAndSchedule = () => {
      const hero = document.getElementById("inicio");
      // Define limite inferior da seção Hero
      const heroBottom = hero
        ? hero.offsetTop + hero.offsetHeight - 80
        : window.innerHeight * 0.85;
      const isCurrentlyInHero = window.scrollY < heroBottom;

      if (isCurrentlyInHero) {
        // O botão flutuante NUNCA pode aparecer na hero
        setIsVisible(false);
        if (timer) {
          clearTimeout(timer);
          timer = null;
        }
        hasScheduledAfterHero = false;
      } else {
        // Usuário saiu da hero: agendar exibição para 20 segundos após sair da hero
        if (!hasScheduledAfterHero && !timer) {
          hasScheduledAfterHero = true;
          timer = setTimeout(() => {
            // Verifica se o usuário ainda permanece fora da hero antes de exibir
            const currentHero = document.getElementById("inicio");
            const currentHeroBottom = currentHero
              ? currentHero.offsetTop + currentHero.offsetHeight - 80
              : window.innerHeight * 0.85;

            if (window.scrollY >= currentHeroBottom) {
              setIsVisible(true);
            }
          }, 20000); // 20 segundos
        }
      }
    };

    window.addEventListener("scroll", checkHeroAndSchedule, { passive: true });
    window.addEventListener("resize", checkHeroAndSchedule, { passive: true });
    checkHeroAndSchedule();

    return () => {
      if (timer) clearTimeout(timer);
      window.removeEventListener("scroll", checkHeroAndSchedule);
      window.removeEventListener("resize", checkHeroAndSchedule);
    };
  }, []);

  return (
    <aside
      aria-label="Atendimento rápido pelo WhatsApp"
      className={`fixed bottom-6 right-6 z-40 flex items-center gap-3 group select-none transition-all duration-500 ease-out ${
        isVisible
          ? "opacity-100 pointer-events-auto animate-spring-bounce"
          : "opacity-0 translate-y-10 pointer-events-none"
      }`}
    >
      {/* Tooltip com identidade visual da barbearia */}
      <div className="hidden sm:flex flex-col items-end px-3.5 py-2 text-right bg-[#0f1218]/95 backdrop-blur-md rounded-lg border border-[#d4af37]/40 shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform translate-x-2 group-hover:translate-x-0">
        <span className="text-[11px] font-semibold text-[#f3e5ab] uppercase tracking-wider font-serif">
          Barbearia Invictus
        </span>
        <span className="text-xs text-[#e5e7eb] font-medium flex items-center gap-1.5 mt-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ecc94b] animate-pulse" />
          Agendar pelo WhatsApp
        </span>
      </div>

      {/* Container do Botão com efeito de pulso em gradiente dourado e profundidade 3D */}
      <div className="relative flex items-center justify-center">
        
        {/* Efeito de Pulso 1: Anel expansivo em gradiente dourado (Ping) */}
        <span
          className="absolute -inset-2.5 rounded-full bg-gradient-to-tr from-[#d4af37] via-[#f3e5ab] to-[#aa841e] opacity-35 animate-ping pointer-events-none"
          aria-hidden="true"
        />

        {/* Efeito de Pulso 2: Halo suave e constante em gradiente (Pulse) */}
        <span
          className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-[#d4af37]/60 via-[#ecc94b]/30 to-[#aa841e]/60 blur-[6px] animate-pulse pointer-events-none"
          aria-hidden="true"
        />

        {/* Botão de Ação estilizado com profundidade 3D (saltado e clique mecânico) */}
        <a
          href={`${BARBEARIA_CONFIG.whatsappUrl}?text=${encodeURIComponent(
            BARBEARIA_CONFIG.defaultWhatsappMessage
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          onPointerDown={handlePointerDown}
          className="btn-3d btn-3d-gold relative flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-b from-[#1c1f28] via-[#101217] to-[#08090d] text-[#f3e5ab] border-2 border-[#d4af37] shadow-[0_6px_0_#8c671a,0_10px_25px_rgba(212,175,55,0.35)] hover:border-[#f5e6b3] transition-all duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#d4af37]/50 active:scale-95"
          aria-label="Abrir conversa no WhatsApp oficial da Barbearia Invictus"
        >
          {/* Efeito sutil de ripple circular que expande a partir do ponto do clique/toque */}
          <span
            className="absolute inset-0 rounded-full overflow-hidden pointer-events-none z-10"
            aria-hidden="true"
          >
            {ripples.map((ripple) => (
              <span
                key={ripple.id}
                className="absolute rounded-full bg-gradient-to-tr from-[#ecc94b]/55 via-[#fef08a]/45 to-[#d4af37]/35 shadow-[0_0_12px_rgba(236,201,75,0.6)] mix-blend-screen animate-ripple"
                style={{
                  left: `${ripple.x}px`,
                  top: `${ripple.y}px`,
                  width: `${ripple.size}px`,
                  height: `${ripple.size}px`,
                }}
              />
            ))}
          </span>

          {/* Brilho radial interno discreto */}
          <span
            className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(212,175,55,0.25),transparent_70%)] pointer-events-none"
            aria-hidden="true"
          />

          {/* Logotipo do WhatsApp do tamanho da bola anterior, mas puramente em amarelo */}
          <WhatsAppIcon
            className="w-8 h-8 sm:w-9 sm:h-9 text-[#ecc94b] group-hover:text-[#fef08a] drop-shadow-[0_2px_8px_rgba(236,201,75,0.6)] transition-all duration-200 animate-icon-pulse shrink-0 relative z-20"
          />

          {/* Ponto indicador de atendimento ativo no topo */}
          <span
            className="absolute top-0 right-0 flex h-3.5 w-3.5 -mt-0.5 -mr-0.5 z-30"
            title="Atendimento online"
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ecc94b] opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#ecc94b] border-2 border-[#0d0f14]" />
          </span>
        </a>
      </div>
    </aside>
  );
};
