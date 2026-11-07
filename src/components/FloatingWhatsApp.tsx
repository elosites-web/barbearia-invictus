import React, { useState, useEffect } from "react";
import { BARBEARIA_CONFIG } from "../data/barbeariaData";
import { WhatsAppIcon } from "./WhatsAppIcon";

export const FloatingWhatsApp: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Exibe o botão flutuante estritamente após 30 segundos do carregamento da página
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 30000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <aside
      aria-label="Atendimento rápido pelo WhatsApp"
      className={`fixed bottom-6 right-6 z-40 flex items-center gap-3 group transition-all duration-700 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-8 pointer-events-none"
      }`}
    >
      {/* Tooltip com identidade visual da barbearia */}
      <div className="hidden sm:flex flex-col items-end px-3.5 py-2 text-right bg-[#0f1218]/95 backdrop-blur-md rounded-lg border border-[#d4af37]/40 shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none transform translate-x-2 group-hover:translate-x-0">
        <span className="text-[11px] font-semibold text-[#f3e5ab] uppercase tracking-wider font-serif">
          Barbearia Invictus
        </span>
        <span className="text-xs text-[#e5e7eb] font-medium flex items-center gap-1.5 mt-0.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#25D366] animate-pulse" />
          Agendar pelo WhatsApp
        </span>
      </div>

      {/* Container do Botão com efeito de pulso em gradiente */}
      <div className="relative flex items-center justify-center">
        
        {/* Efeito de Pulso 1: Anel expansivo em gradiente dourado (Ping) */}
        <span
          className="absolute -inset-2.5 rounded-full bg-gradient-to-tr from-[#d4af37] via-[#f3e5ab] to-[#aa841e] opacity-40 animate-ping pointer-events-none"
          aria-hidden="true"
        />

        {/* Efeito de Pulso 2: Halo suave e constante em gradiente (Pulse) */}
        <span
          className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-[#d4af37]/70 via-[#ecc94b]/40 to-[#aa841e]/70 blur-[6px] animate-pulse pointer-events-none"
          aria-hidden="true"
        />

        {/* Botão de Ação estilizado na identidade visual Invictus (Dark Luxury + Dourado) */}
        <a
          href={`${BARBEARIA_CONFIG.whatsappUrl}?text=${encodeURIComponent(
            BARBEARIA_CONFIG.defaultWhatsappMessage
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex items-center justify-center w-14 h-14 sm:w-15 sm:h-15 rounded-full bg-gradient-to-b from-[#1c1f28] via-[#101217] to-[#08090d] text-[#f3e5ab] border-2 border-[#d4af37] shadow-[0_8px_25px_rgba(212,175,55,0.35)] hover:shadow-[0_10px_35px_rgba(212,175,55,0.6)] hover:border-[#f5e6b3] hover:text-white hover:scale-105 active:scale-95 transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#d4af37]/50"
          aria-label="Abrir conversa no WhatsApp oficial da Barbearia Invictus"
        >
          {/* Brilho radial interno discreto */}
          <span
            className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(212,175,55,0.25),transparent_70%)] pointer-events-none"
            aria-hidden="true"
          />

          {/* Logotipo Oficial do WhatsApp com acabamento dourado Invictus */}
          <WhatsAppIcon className="w-7 h-7 sm:w-8 sm:h-8 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />

          {/* Ponto indicador de atendimento ativo no topo */}
          <span
            className="absolute top-0 right-0 flex h-3.5 w-3.5 -mt-0.5 -mr-0.5"
            title="Atendimento online"
          >
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#25D366] border border-[#0d0f14]" />
          </span>
        </a>
      </div>
    </aside>
  );
};
