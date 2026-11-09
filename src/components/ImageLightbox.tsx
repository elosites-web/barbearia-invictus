import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { GalleryPhoto, BARBEARIA_CONFIG, GALLERY_PHOTOS } from "../data/barbeariaData";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
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
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // 1. Gerenciamento de Foco e Bloqueio Estrito de Scroll no Body
  useEffect(() => {
    if (!photo) return;

    previousActiveElement.current = document.activeElement as HTMLElement | null;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const originalTouchAction = document.body.style.touchAction;

    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // Foco inicial no botão fechar para acessibilidade
    const focusTimer = setTimeout(() => {
      const closeBtn = modalRef.current?.querySelector<HTMLButtonElement>("#lightbox-close-btn");
      closeBtn?.focus();
    }, 50);

    // 2. Atalhos de Teclado (Esc para fechar, Setas Esquerda/Direita) e Focus Trap
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        onPrev();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        onNext();
        return;
      }

      // Ciclo de foco preso dentro do modal
      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      document.body.style.touchAction = originalTouchAction;
      // Devolve o foco ao elemento que abriu a fotografia ao fechar
      previousActiveElement.current?.focus?.();
    };
  }, [photo, onClose, onPrev, onNext]);

  // 3. Gesto de deslizar horizontal (touch swipe) sem conflito com gestos verticais
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    // Apenas considera se o deslocamento horizontal for maior que o vertical e passar de 35px
    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 35) {
      if (diffX > 0) {
        onNext(); // swipe esquerda -> próxima
      } else {
        onPrev(); // swipe direita -> anterior
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  if (!photo) return null;

  return createPortal(
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      aria-label={`Visualização da fotografia: ${photo.title}`}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-between bg-black/95 backdrop-blur-md p-3 sm:p-5 md:p-6 select-none animate-in fade-in duration-200 overflow-hidden"
      onClick={onClose}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        paddingTop: "max(12px, env(safe-area-inset-top))",
        paddingBottom: "max(12px, env(safe-area-inset-bottom))",
      }}
    >
      {/* =========================================================================
          BARRA SUPERIOR: INDICADOR COMPACTO E BOTÃO FECHAR DISCRETO
          ========================================================================= */}
      <div
        className="w-full max-w-5xl flex items-center justify-between z-30 shrink-0 px-1 py-1"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Indicador de Posição Compacto */}
        <div className="flex items-center gap-2 bg-[#12141d]/90 border border-[#d4af37]/35 px-3 py-1 rounded-full backdrop-blur-md shadow-md text-xs font-semibold text-[#f3e5ab]">
          <span>{currentIndex + 1} de {totalPhotos}</span>
        </div>

        {/* Botão Fechar no Topo Direito (Discreto e com Foco Acessível) */}
        <button
          id="lightbox-close-btn"
          type="button"
          onClick={onClose}
          className="btn-3d btn-3d-dark inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#161922]/95 hover:bg-[#202533] border border-[#d4af37]/45 rounded-full shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
          aria-label="Fechar visualização ampliada"
        >
          <X className="w-4 h-4 text-[#d4af37]" />
          <span>Fechar</span>
        </button>
      </div>

      {/* =========================================================================
          ÁREA CENTRAL: IMAGEM COM MÁXIMO APROVEITAMENTO DA VIEWPORT
          - Centralizada vertical e horizontalmente
          - Proporção original preservada com object-contain
          - Sem ampliação artificial para fotos de baixa resolução
          - Setas laterais visíveis no Desktop fora da área da imagem
          ========================================================================= */}
      <div className="relative w-full max-w-5xl flex-1 flex items-center justify-center my-auto min-h-0 px-2 sm:px-6">
        
        {/* Seta Lateral Esquerda — Desktop (Fora da área da foto sem sobrepor) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="btn-3d btn-3d-dark hidden md:flex absolute -left-2 lg:-left-6 top-1/2 -translate-y-1/2 z-30 p-3 text-[#f3e5ab] hover:text-[#0b0c10] bg-[#141722]/90 hover:bg-[#d4af37] border border-[#d4af37]/50 rounded-full shadow-2xl transition-all group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
          aria-label="Fotografia anterior"
          title="Foto anterior (Seta esquerda)"
        >
          <ChevronLeft className="w-5 h-5 lg:w-6 lg:h-6 group-hover:-translate-x-0.5 transition-transform" />
        </button>

        {/* Moldura Centralizada da Fotografia */}
        <div
          className={`relative flex items-center justify-center rounded-2xl overflow-hidden border border-[#d4af37]/40 bg-[#090b0f] shadow-[0_24px_70px_rgba(0,0,0,0.95)] max-h-[64dvh] landscape:max-h-[68dvh] sm:max-h-[70dvh] md:max-h-[72dvh] w-auto ${
            photo.isHighRes ? "max-w-3xl" : "max-w-[420px]"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <picture>
            <source srcSet={photo.webpSrc} type="image/webp" />
            <source srcSet={photo.fallbackSrc} type="image/jpeg" />
            <img
              src={photo.webpSrc}
              alt={photo.alt}
              loading="eager"
              decoding="sync"
              className="max-h-[64dvh] landscape:max-h-[68dvh] sm:max-h-[70dvh] md:max-h-[72dvh] w-auto max-w-full object-contain select-none"
              referrerPolicy="no-referrer"
            />
          </picture>
        </div>

        {/* Seta Lateral Direita — Desktop (Fora da área da foto sem sobrepor) */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="btn-3d btn-3d-dark hidden md:flex absolute -right-2 lg:-right-6 top-1/2 -translate-y-1/2 z-30 p-3 text-[#f3e5ab] hover:text-[#0b0c10] bg-[#141722]/90 hover:bg-[#d4af37] border border-[#d4af37]/50 rounded-full shadow-2xl transition-all group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
          aria-label="Próxima fotografia"
          title="Próxima foto (Seta direita)"
        >
          <ChevronRight className="w-5 h-5 lg:w-6 lg:h-6 group-hover:translate-x-0.5 transition-transform" />
        </button>

      </div>

      {/* =========================================================================
          RODAPÉ INTEGRADO: INFORMAÇÕES E BOTÃO WHATSAPP
          - Sem comandos duplicados de Anterior/Próxima no mobile (gesto horizontal prioritário)
          - Ajusta-se dinamicamente sem disputar espaço com a imagem
          ========================================================================= */}
      <div
        className="w-full max-w-3xl z-30 shrink-0 mt-2 card-smoke-glass p-3 sm:p-4 rounded-xl shadow-2xl border border-[#2b3142]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <div className="min-w-0 w-full sm:w-auto">
            <span className="text-[10px] sm:text-[11px] font-semibold text-[#d4af37] tracking-wider uppercase block">
              {photo.category} · Trabalho Autêntico Invictus
            </span>
            <h3 className="text-sm sm:text-base font-bold text-[#ffffff] truncate">
              {photo.title}
            </h3>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-center sm:justify-end shrink-0">
            {/* Navegação Rápida Compacta no Mobile (sem duplicação desnecessária) */}
            <div className="flex md:hidden items-center gap-1.5 mr-1">
              <button
                type="button"
                onClick={onPrev}
                className="btn-3d btn-3d-dark p-2 rounded-lg text-[#f3e5ab] border border-[#d4af37]/35 flex items-center justify-center min-w-[36px] min-h-[36px]"
                aria-label="Fotografia anterior"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={onNext}
                className="btn-3d btn-3d-dark p-2 rounded-lg text-[#f3e5ab] border border-[#d4af37]/35 flex items-center justify-center min-w-[36px] min-h-[36px]"
                aria-label="Próxima fotografia"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Botão de Agendamento Direto no WhatsApp */}
            <a
              href={`${BARBEARIA_CONFIG.whatsappUrl}?text=${encodeURIComponent(
                `Olá! Vi a foto de "${photo.title}" no site da Barbearia Invictus e gostaria de agendar um corte nesse estilo.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-3d btn-3d-gold flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold text-[#0d0f12] bg-[#d4af37] hover:bg-[#ecc94b] rounded-lg shadow-md whitespace-nowrap"
            >
              <WhatsAppIcon className="w-4 h-4 shrink-0 text-[#0d0f12]" />
              <span>QUERO ESSE CORTE</span>
            </a>
          </div>
        </div>

        {/* Dica tátil sutil para mobile */}
        <p className="text-[10px] text-[#717b91] text-center mt-2 sm:hidden">
          Dica: Deslize horizontalmente ↔ para navegar entre as fotos
        </p>
      </div>

    </div>,
    document.body
  );
};
