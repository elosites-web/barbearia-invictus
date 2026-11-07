import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { GalleryPhoto, BARBEARIA_CONFIG } from "../data/barbeariaData";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";

interface ImageLightboxProps {
  photo: GalleryPhoto | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  photo,
  onClose,
  onPrev,
  onNext,
}) => {
  // 1. Trava estrita de scroll no body enquanto a foto estiver aberta
  useEffect(() => {
    if (!photo) return;

    // Calcula largura da barra de rolagem para evitar deslocamento de layout
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const originalTouchAction = document.body.style.touchAction;

    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      document.body.style.touchAction = originalTouchAction;
    };
  }, [photo]);

  // 2. Atalhos de teclado (Esc para fechar, Setas para navegar)
  useEffect(() => {
    if (!photo) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [photo, onClose, onPrev, onNext]);

  if (!photo) return null;

  // 3. createPortal para garantir ancoragem direta na viewport (escapa de transforms ou will-change do CSS pai)
  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Visualização em alta resolução: ${photo.title}`}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/92 backdrop-blur-md p-3 sm:p-6 animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Botão Fechar fixo no topo direito da tela para fácil toque em qualquer dispositivo */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20 flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-white/90 hover:text-white bg-[#161922]/90 hover:bg-[#202533] border border-[#d4af37]/40 rounded-full shadow-lg transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
        aria-label="Fechar visualização da foto"
      >
        <X className="w-4 h-4 text-[#d4af37]" />
        <span className="hidden sm:inline">Fechar</span>
      </button>

      {/* Botões de navegação lateral (Prev / Next) */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 text-white/90 hover:text-[#0b0c10] bg-[#161922]/85 hover:bg-[#d4af37] border border-[#d4af37]/40 rounded-full shadow-xl transition-all active:scale-95 focus:outline-none"
        aria-label="Foto anterior"
      >
        <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 p-2.5 sm:p-3 text-white/90 hover:text-[#0b0c10] bg-[#161922]/85 hover:bg-[#d4af37] border border-[#d4af37]/40 rounded-full shadow-xl transition-all active:scale-95 focus:outline-none"
        aria-label="Próxima foto"
      >
        <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Container Central da Foto e Informações — sempre ancorado perfeitamente no centro da viewport */}
      <div
        className="relative max-w-4xl w-full flex flex-col items-center justify-center my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Moldura da Imagem com dimensões controladas para caber 100% na viewport com legenda */}
        <div className="relative rounded-xl overflow-hidden border border-[#d4af37]/40 bg-[#0c0e13] shadow-[0_10px_40px_rgba(0,0,0,0.8)] max-h-[62vh] sm:max-h-[68vh] flex items-center justify-center">
          <picture>
            <source srcSet={photo.webpSrc} type="image/webp" />
            <source srcSet={photo.fallbackSrc} type="image/jpeg" />
            <img
              src={photo.webpSrc}
              alt={photo.alt}
              loading="eager"
              decoding="sync"
              className="max-h-[62vh] sm:max-h-[68vh] w-auto max-w-full object-contain select-none"
              referrerPolicy="no-referrer"
            />
          </picture>
        </div>

        {/* Barra de Informações do Corte & Botão de Agendamento Oficial */}
        <div className="mt-3.5 w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left bg-[#12151e]/95 border border-[#d4af37]/30 p-3 sm:p-3.5 rounded-xl shadow-2xl backdrop-blur-md">
          <div className="min-w-0">
            <span className="text-[10px] sm:text-[11px] font-semibold text-[#d4af37] tracking-wider uppercase block">
              {photo.category} · Trabalho Real Invictus
            </span>
            <p className="text-sm sm:text-base font-bold text-[#f5f5f7] truncate">
              {photo.title}
            </p>
          </div>

          <a
            href={`${BARBEARIA_CONFIG.whatsappUrl}?text=${encodeURIComponent(
              `Olá! Vi a foto de "${photo.title}" no site da Barbearia Invictus e gostaria de agendar um corte com esse estilo.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs sm:text-sm font-semibold text-[#0d0f12] bg-[#d4af37] hover:bg-[#ecc94b] active:scale-95 rounded-lg shadow-md transition-all whitespace-nowrap shrink-0"
          >
            <WhatsAppIcon className="w-4 h-4 shrink-0" />
            <span>QUERO UM CORTE ASSIM</span>
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
};
