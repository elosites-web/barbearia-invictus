import React from "react";
import { BARBEARIA_CONFIG } from "../data/barbeariaData";
import { MessageCircle } from "lucide-react";

export const FloatingWhatsApp: React.FC = () => {
  return (
    <aside
      aria-label="Atendimento rápido"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 group"
    >
      {/* Tooltip on hover (desktop) */}
      <span className="hidden sm:inline-block px-3 py-1.5 text-xs font-semibold text-[#0d0f12] bg-[#f3e5ab] rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
        Agendar pelo WhatsApp
      </span>

      <a
        href={`${BARBEARIA_CONFIG.whatsappUrl}?text=${encodeURIComponent(
          BARBEARIA_CONFIG.defaultWhatsappMessage
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_4px_20px_rgba(37,211,102,0.4)] hover:bg-[#20ba59] active:scale-95 transition-all focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/40"
        aria-label="Abrir conversa no WhatsApp da Barbearia Invictus"
      >
        <MessageCircle className="w-7 h-7 fill-current" />
        
        {/* Subtle ping pulse */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d4af37] opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-[#d4af37]"></span>
        </span>
      </a>
    </aside>
  );
};
