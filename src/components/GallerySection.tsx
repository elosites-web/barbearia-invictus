import React, { useState, useRef } from "react";
import { GALLERY_PHOTOS, GalleryPhoto } from "../data/barbeariaData";
import { ImageLightbox } from "./ImageLightbox";
import { Camera, ZoomIn, Sparkles, ChevronLeft, ChevronRight } from "lucide-react";
import { getResponsiveSizes } from "../utils/imageUtils";

/**
 * Componente otimizado de imagem de galeria com Lazy Loading, Decodificação Assíncrona,
 * priorização baixa de rede para elementos fora da viewport, e skeleton shimmer para CLS = 0.
 */
const LazyGalleryImage: React.FC<{
  webpSrc: string;
  fallbackSrc: string;
  alt: string;
  width: number;
  height: number;
  sizes: string;
  aspectClass: string;
}> = ({ webpSrc, fallbackSrc, alt, width, height, sizes, aspectClass }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`${aspectClass} overflow-hidden bg-[#101217] relative`}>
      {/* Skeleton Shimmer enquanto a imagem é decodificada de forma assíncrona */}
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#141722] via-[#222738] to-[#141722] animate-pulse" />
      )}

      <picture>
        <source srcSet={webpSrc} type="image/webp" />
        <source srcSet={fallbackSrc} type="image/jpeg" />
        <img
          src={webpSrc}
          alt={alt}
          width={width}
          height={height}
          sizes={sizes}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          onLoad={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
          referrerPolicy="no-referrer"
        />
      </picture>

      {/* Sobreposição de Brilho Dourado Suave (Golden Glow Sheen) */}
      <div className="absolute inset-0 bg-gradient-to-tr from-[#d4af37]/0 via-[#fef08a]/15 to-[#d4af37]/35 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none mix-blend-screen" />
    </div>
  );
};

export const GallerySection: React.FC = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("todos");
  const carouselRef = useRef<HTMLDivElement>(null);

  const highResPhotos = GALLERY_PHOTOS.filter((p) => p.isHighRes);
  const secondaryPhotos = GALLERY_PHOTOS.filter((p) => !p.isHighRes);

  const filteredPhotos = GALLERY_PHOTOS.filter((p) => {
    if (activeFilter === "todos") return true;
    if (activeFilter === "alta-res") return p.isHighRes;
    if (activeFilter === "degrade")
      return p.category.toLowerCase().includes("degradê") || p.category.toLowerCase().includes("fade");
    if (activeFilter === "quimica")
      return p.category.toLowerCase().includes("química") || p.category.toLowerCase().includes("luzes");
    if (activeFilter === "desenho")
      return (
        p.category.toLowerCase().includes("desenho") ||
        p.category.toLowerCase().includes("arte") ||
        p.category.toLowerCase().includes("personalidade")
      );
    return true;
  });

  // Fotos para o carrossel horizontal:
  // Se "todos", exibe as 6 fotos secundárias de forma horizontal sem repetir os 3 destaques.
  // Se filtro específico, exibe as fotos filtradas no carrossel.
  const carouselPhotos =
    activeFilter === "todos"
      ? secondaryPhotos
      : activeFilter === "alta-res"
      ? []
      : filteredPhotos;

  const handlePrevPhoto = () => {
    if (selectedPhotoIndex === null) return;
    const prevIndex =
      selectedPhotoIndex === 0 ? GALLERY_PHOTOS.length - 1 : selectedPhotoIndex - 1;
    setSelectedPhotoIndex(prevIndex);
  };

  const handleNextPhoto = () => {
    if (selectedPhotoIndex === null) return;
    const nextIndex =
      selectedPhotoIndex === GALLERY_PHOTOS.length - 1 ? 0 : selectedPhotoIndex + 1;
    setSelectedPhotoIndex(nextIndex);
  };

  // Controles de navegação do carrossel horizontal
  const handleScrollCarousel = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const scrollAmount = direction === "left" ? -280 : 280;
    carouselRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  return (
    <section id="trabalho" className="py-20 sm:py-24 bg-transparent relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#d4af37] uppercase mb-3">
            <Camera className="w-3.5 h-3.5 animate-icon-float" />
            <span>GALERIA DE CORTES REAIS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f5f5f7] tracking-tight mb-4">
            NOSSO TRABALHO FALA POR SI.
          </h2>
          <p className="text-sm sm:text-base text-[#9ca3af] leading-relaxed">
            Cada detalhe importa. Confira alguns dos trabalhos realizados pela equipe da Invictus. Fotografias 100% autênticas dos nossos clientes.
          </p>
        </div>

        {/* Controles de Filtros Segmentados */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-10 sm:mb-12">
          {[
            { id: "todos", label: "Todos os Trabalhos" },
            { id: "alta-res", label: "Destaques Principais" },
            { id: "degrade", label: "Degradê & Fade" },
            { id: "quimica", label: "Química & Platinado" },
            { id: "desenho", label: "Desenhos & Risquinhos" },
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`btn-3d px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-semibold rounded-md transition-all whitespace-nowrap ${
                activeFilter === filter.id
                  ? "btn-3d-gold bg-[#d4af37] text-[#0d0f12]"
                  : "btn-3d-dark bg-[#141720] text-[#9ca3af] hover:text-[#f3e5ab] border border-[#232733]"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* 1. Destaques em Alta Resolução (3 Fotografias Principais) */}
        {(activeFilter === "todos" || activeFilter === "alta-res") && (
          <div className="mb-14 sm:mb-16">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#d4af37] mb-5">
              <Sparkles className="w-3.5 h-3.5 animate-icon-pulse" />
              <span>Destaques em Alta Resolução</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
              {highResPhotos.map((photo) => {
                const globalIndex = GALLERY_PHOTOS.findIndex((p) => p.id === photo.id);
                return (
                  <div
                    key={photo.id}
                    id={`destaque-${photo.id}`}
                    role="button"
                    tabIndex={0}
                    aria-label={`Abrir foto ${photo.title}`}
                    onClick={() => setSelectedPhotoIndex(globalIndex)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedPhotoIndex(globalIndex);
                      }
                    }}
                    className="group relative cursor-pointer overflow-hidden rounded-2xl card-smoke-glass transition-all duration-300 hover:border-[#d4af37] hover:shadow-[0_15px_35px_rgba(212,175,55,0.22)] hover:-translate-y-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
                  >
                    <LazyGalleryImage
                      webpSrc={photo.webpSrc}
                      fallbackSrc={photo.fallbackSrc}
                      alt={photo.alt}
                      width={600}
                      height={600}
                      sizes={getResponsiveSizes("gallery-main")}
                      aspectClass="aspect-square"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-[#090b10]/95 via-[#0c0e14]/40 to-transparent opacity-85 group-hover:opacity-95 transition-opacity pointer-events-none" />

                    <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 flex items-end justify-between backdrop-blur-[2px]">
                      <div>
                        <span className="text-[11px] font-semibold text-[#d4af37] tracking-wider uppercase block drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                          {photo.category}
                        </span>
                        <h3 className="font-serif text-base sm:text-lg font-bold text-[#f5f5f7] drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)] group-hover:text-[#fef08a] transition-colors duration-300">
                          {photo.title}
                        </h3>
                      </div>
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#d4af37]/25 border border-[#d4af37]/50 flex items-center justify-center text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-[#0b0c10] group-hover:scale-110 transition-all duration-300 shadow-lg shrink-0">
                        <ZoomIn className="w-4 h-4 animate-icon-wiggle" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* 2. Carrossel Horizontal Responsivo para as Demais Fotografias */}
        {carouselPhotos.length > 0 && (
          <div>
            {/* Header do Carrossel com Controles Minimalistas */}
            <div className="flex items-center justify-between gap-3 mb-5">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9ca3af]">
                <span>
                  {activeFilter === "todos"
                    ? "Mais Trabalhos da Equipe Invictus"
                    : `Trabalhos Filtrados (${carouselPhotos.length})`}
                </span>
              </div>

              {/* Controles Discretos de Navegação Horizontal */}
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-[#788296] hidden sm:inline mr-1">
                  Arraste ou use as setas
                </span>
                <button
                  type="button"
                  onClick={() => handleScrollCarousel("left")}
                  className="btn-3d btn-3d-dark p-2 rounded-full text-[#f3e5ab] hover:text-[#0b0c10] bg-[#141720]/90 hover:bg-[#d4af37] border border-[#d4af37]/40 transition-colors shadow-md flex items-center justify-center focus:outline-none focus-visible:ring-1 focus-visible:ring-[#d4af37]"
                  aria-label="Rolar fotos para a esquerda"
                  title="Fotos anteriores"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => handleScrollCarousel("right")}
                  className="btn-3d btn-3d-dark p-2 rounded-full text-[#f3e5ab] hover:text-[#0b0c10] bg-[#141720]/90 hover:bg-[#d4af37] border border-[#d4af37]/40 transition-colors shadow-md flex items-center justify-center focus:outline-none focus-visible:ring-1 focus-visible:ring-[#d4af37]"
                  aria-label="Rolar fotos para a direita"
                  title="Próximas fotos"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Container do Carrossel com Scroll-Snap Fluido e Toque Natural */}
            <div
              ref={carouselRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-4 pt-1 px-1 -mx-1 scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none]"
              style={{ WebkitOverflowScrolling: "touch" }}
            >
              {carouselPhotos.map((photo) => {
                const globalIndex = GALLERY_PHOTOS.findIndex((p) => p.id === photo.id);
                return (
                  <div
                    key={photo.id}
                    id={`foto-${photo.id}`}
                    role="button"
                    tabIndex={0}
                    aria-label={`Abrir foto ${photo.title}`}
                    onClick={() => setSelectedPhotoIndex(globalIndex)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setSelectedPhotoIndex(globalIndex);
                      }
                    }}
                    className="group relative cursor-pointer overflow-hidden rounded-xl bg-[#141720] border border-[#252a36] hover:border-[#d4af37] transition-all duration-300 hover:-translate-y-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] shadow-lg hover:shadow-[0_12px_28px_rgba(212,175,55,0.25)] shrink-0 snap-start w-[180px] sm:w-[210px] md:w-[230px]"
                  >
                    <LazyGalleryImage
                      webpSrc={photo.webpSrc}
                      fallbackSrc={photo.fallbackSrc}
                      alt={photo.alt}
                      width={300}
                      height={400}
                      sizes={getResponsiveSizes("gallery-grid")}
                      aspectClass="aspect-[3/4]"
                    />

                    {/* Legenda em Degradê ao Passar o Mouse */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-75 group-hover:opacity-95 transition-opacity flex flex-col justify-end p-3 pointer-events-none">
                      <p className="text-xs font-semibold text-[#ffffff] line-clamp-1 drop-shadow group-hover:text-[#fef08a] transition-colors duration-300">
                        {photo.title}
                      </p>
                      <span className="text-[10px] text-[#d4af37] block font-medium">
                        {photo.category}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Dica de interação sutil */}
            <p className="text-right text-[11px] text-[#6b7280] mt-1 sm:hidden">
              ← Deslize para explorar mais fotos →
            </p>
          </div>
        )}

        {/* Mensagem de garantia de fotos reais */}
        <p className="text-center text-xs text-[#6b7280] mt-8">
          * Todas as fotos acima são registros autênticos de serviços realizados no salão da Barbearia Invictus.
        </p>

      </div>

      {/* Lightbox Modal com Portal e Navegação Acessível */}
      {selectedPhotoIndex !== null && (
        <ImageLightbox
          photo={GALLERY_PHOTOS[selectedPhotoIndex]}
          currentIndex={selectedPhotoIndex}
          totalPhotos={GALLERY_PHOTOS.length}
          onClose={() => setSelectedPhotoIndex(null)}
          onPrev={handlePrevPhoto}
          onNext={handleNextPhoto}
        />
      )}
    </section>
  );
};
