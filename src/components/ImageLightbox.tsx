import React, { useEffect } from "react";
import { GalleryPhoto, BARBEARIA_CONFIG } from "../data/barbeariaData";
import { X, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react";

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
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, onPrev, onNext]);

  if (!photo) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 sm:p-6"
      onClick={onClose}
    >
      {/* Lightbox Modal Container */}
      <div
        className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center justify-center"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white bg-[#1a1d24]/80 hover:bg-[#1a1d24] rounded-full border border-white/20 transition-all focus:outline-none"
          aria-label="Fechar visualização"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Navigation buttons */}
        <button
          type="button"
          onClick={onPrev}
          className="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 p-2.5 text-white/80 hover:text-white bg-[#1a1d24]/90 hover:bg-[#d4af37] hover:text-[#0b0c10] rounded-full border border-white/20 transition-all focus:outline-none z-10"
          aria-label="Foto anterior"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          type="button"
          onClick={onNext}
          className="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 p-2.5 text-white/80 hover:text-white bg-[#1a1d24]/90 hover:bg-[#d4af37] hover:text-[#0b0c10] rounded-full border border-white/20 transition-all focus:outline-none z-10"
          aria-label="Próxima foto"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Image wrapper */}
        <div className="relative rounded-lg overflow-hidden border border-[#d4af37]/30 bg-[#0e1015] shadow-2xl max-h-[72vh] flex items-center justify-center">
          <picture>
            <source srcSet={photo.webpSrc} type="image/webp" />
            <source srcSet={photo.fallbackSrc} type="image/jpeg" />
            <img
              src={photo.webpSrc}
              alt={photo.alt}
              loading="eager"
              decoding="async"
              className={`max-h-[72vh] w-auto max-w-full object-contain ${
                !photo.isHighRes ? "max-w-md" : ""
              }`}
              referrerPolicy="no-referrer"
            />
          </picture>
        </div>

        {/* Caption & WhatsApp Action */}
        <div className="mt-4 w-full flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left bg-[#12141c]/90 border border-[#262b36] p-3.5 rounded-lg">
          <div>
            <span className="text-[11px] font-semibold text-[#d4af37] tracking-wider uppercase block">
              {photo.category}
            </span>
            <p className="text-sm font-bold text-[#f5f5f7]">{photo.title}</p>
          </div>

          <a
            href={`${BARBEARIA_CONFIG.whatsappUrl}?text=${encodeURIComponent(
              `Olá! Vi a foto de "${photo.title}" no site da Barbearia Invictus e gostaria de agendar um corte com esse estilo.`
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-[#0d0f12] bg-[#d4af37] hover:bg-[#ecc94b] rounded-md transition-all whitespace-nowrap"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>QUERO UM CORTE ASSIM</span>
          </a>
        </div>
      </div>
    </div>
  );
};
