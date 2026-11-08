import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { GalleryPhoto, BARBEARIA_CONFIG, GALLERY_PHOTOS } from "../data/barbeariaData";
import { X, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";

interface ImageLightboxProps {
  photo: GalleryPhoto | null;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  currentIndex?: number;
  totalPhotos?: number;
}

export const ImageLightbox: React.FC<ImageLightboxProps> = ({
  photo,
  onClose,
  onPrev,
  onNext,
  currentIndex = 0,
  totalPhotos = GALLERY_PHOTOS.length,
}) => {
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // 1. Trava estrita de scroll no body
  useEffect(() => {
    if (!photo) return;

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

  // 2. Atalhos de teclado (Esc para fechar, Setas Esquerda/Direita)
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

  // 3. Suporte a gesto de deslizar (touch swipe) para mobile portrait e landscape
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    // Apenas considera swipe horizontal se o movimento horizontal for maior que o vertical
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) {
        onNext(); // swipe esquerda -> próxima foto
      } else {
        onPrev(); // swipe direita -> foto anterior
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  if (!photo) return null;

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Visualização em alta resolução: ${photo.title}`}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/94 backdrop-blur-md p-2 sm:p-4 md:p-6 select-none animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Botão Fechar no Topo Direito (Sempre Acessível em Qualquer Resolução) */}
      <button
        type="button"
        onClick={onClose}
        className="btn-3d btn-3d-dark absolute top-3 right-3 sm:top-5 sm:right-5 z-40 flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-[#161922]/95 hover:bg-[#202533] border border-[#d4af37]/45 rounded-full shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
        aria-label="Fechar visualização da foto"
      >
        <X className="w-4 h-4 text-[#d4af37]" />
        <span className="hidden xs:inline">Fechar</span>
      </button>

      {/* Indicador de Foto Superior */}
      <div className="absolute top-3 left-3 sm:top-5 sm:left-6 z-40 flex items-center gap-2 bg-[#12141d]/90 border border-[#d4af37]/30 px-3 py-1.5 rounded-full backdrop-blur-md shadow-lg">
        <span className="text-[11px] font-bold text-[#d4af37]">
          Foto {currentIndex + 1} de {totalPhotos}
        </span>
      </div>

      {/* =========================================================================
          SELETORES DE VAI E VEM (SETAS LATERAIS < >) OTIMIZADOS
          Botões 3D com destaque dourado, tamanho confortável e alto contraste
          ========================================================================= */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        className="btn-3d btn-3d-dark absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 z-40 p-3 sm:p-4 text-[#f3e5ab] hover:text-[#0b0c10] bg-[#141722]/90 hover:bg-[#d4af37] border border-[#d4af37]/50 rounded-full shadow-2xl transition-all group focus:outline-none"
        aria-label="Foto anterior da galeria"
        title="Foto anterior (Seta para a esquerda)"
      >
        <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 group-hover:-translate-x-0.5 transition-transform" />
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        className="btn-3d btn-3d-dark absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 z-40 p-3 sm:p-4 text-[#f3e5ab] hover:text-[#0b0c10] bg-[#141722]/90 hover:bg-[#d4af37] border border-[#d4af37]/50 rounded-full shadow-2xl transition-all group focus:outline-none"
        aria-label="Próxima foto da galeria"
        title="Próxima foto (Seta para a direita)"
      >
        <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 group-hover:translate-x-0.5 transition-transform" />
      </button>

      {/* =========================================================================
          CONTAINER CENTRAL RESPONSIVO (VERTICAL E HORIZONTAL / LANDSCAPE)
          Adapta-se perfeitamente tanto a telas verticais quanto telas horizontais
          ========================================================================= */}
      <div
        className="relative max-w-4xl w-full flex flex-col items-center justify-center my-auto px-1 sm:px-2 pt-10 sm:pt-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Moldura da Imagem com Altura Dinâmica para Caber em Mobile Landscape (h < 500px) */}
        <div className="relative rounded-2xl overflow-hidden border border-[#d4af37]/45 bg-[#0b0d12] shadow-[0_20px_60px_rgba(0,0,0,0.95)] max-h-[56vh] landscape:max-h-[64vh] sm:max-h-[68vh] md:max-h-[72vh] flex items-center justify-center group">
          <picture>
            <source srcSet={photo.webpSrc} type="image/webp" />
            <source srcSet={photo.fallbackSrc} type="image/jpeg" />
            <img
              src={photo.webpSrc}
              alt={photo.alt}
              loading="eager"
              decoding="sync"
              className="max-h-[56vh] landscape:max-h-[64vh] sm:max-h-[68vh] md:max-h-[72vh] w-auto max-w-full object-contain select-none transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </picture>
        </div>

        {/* Barra de Informações do Corte & Botão de Agendamento */}
        <div className="mt-3 w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left card-smoke-glass p-3 sm:p-4 rounded-xl shadow-2xl backdrop-blur-md">
          <div className="min-w-0">
            <span className="text-[10px] sm:text-[11px] font-semibold text-[#d4af37] tracking-wider uppercase block">
              {photo.category} · Trabalho Autêntico Invictus
            </span>
            <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#ffffff] truncate">
              {photo.title}
            </h3>
          </div>

          {/* Atalho de Agendamento Direto para o Estilo Específico */}
          <div className="flex items-center gap-2 shrink-0">
            <a
              href={`${BARBEARIA_CONFIG.whatsappUrl}?text=${encodeURIComponent(
                `Olá! Vi a foto de "${photo.title}" no site da Barbearia Invictus e gostaria de agendar um corte nesse estilo.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-3d btn-3d-gold inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 text-xs sm:text-sm font-bold text-[#0d0f12] bg-[#d4af37] hover:bg-[#ecc94b] rounded-lg shadow-lg whitespace-nowrap"
            >
              <WhatsAppIcon className="w-4 h-4 shrink-0 text-[#0d0f12]" />
              <span>QUERO ESSE CORTE</span>
            </a>
          </div>
        </div>

        {/* Rodapé Tátil para Mobile com Navegação Rápida */}
        <div className="flex sm:hidden items-center justify-between w-full mt-2 px-1 text-xs text-[#a0a6b5]">
          <button
            type="button"
            onClick={onPrev}
            className="btn-3d btn-3d-dark px-3 py-1.5 rounded-lg text-[#f3e5ab] text-xs font-semibold flex items-center gap-1 border border-[#d4af37]/30"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            <span>Anterior</span>
          </button>
          <span className="text-[11px] text-[#d4af37]">Deslize para o lado ↔</span>
          <button
            type="button"
            onClick={onNext}
            className="btn-3d btn-3d-dark px-3 py-1.5 rounded-lg text-[#f3e5ab] text-xs font-semibold flex items-center gap-1 border border-[#d4af37]/30"
          >
            <span>Próxima</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
