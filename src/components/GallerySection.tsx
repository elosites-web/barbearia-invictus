import React, { useState } from "react";
import { GALLERY_PHOTOS, GalleryPhoto } from "../data/barbeariaData";
import { ImageLightbox } from "./ImageLightbox";
import { Camera, ZoomIn, Sparkles } from "lucide-react";

export const GallerySection: React.FC = () => {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("todos");

  const highResPhotos = GALLERY_PHOTOS.filter((p) => p.isHighRes);
  const secondaryPhotos = GALLERY_PHOTOS.filter((p) => !p.isHighRes);

  const filteredPhotos = GALLERY_PHOTOS.filter((p) => {
    if (activeFilter === "todos") return true;
    if (activeFilter === "alta-res") return p.isHighRes;
    if (activeFilter === "degrade") return p.category.toLowerCase().includes("degradê") || p.category.toLowerCase().includes("fade");
    if (activeFilter === "quimica") return p.category.toLowerCase().includes("química") || p.category.toLowerCase().includes("luzes");
    if (activeFilter === "desenho") return p.category.toLowerCase().includes("desenho") || p.category.toLowerCase().includes("arte") || p.category.toLowerCase().includes("personalidade");
    return true;
  });

  const handlePrevPhoto = () => {
    if (selectedPhotoIndex === null) return;
    const prevIndex =
      selectedPhotoIndex === 0
        ? GALLERY_PHOTOS.length - 1
        : selectedPhotoIndex - 1;
    setSelectedPhotoIndex(prevIndex);
  };

  const handleNextPhoto = () => {
    if (selectedPhotoIndex === null) return;
    const nextIndex =
      selectedPhotoIndex === GALLERY_PHOTOS.length - 1
        ? 0
        : selectedPhotoIndex + 1;
    setSelectedPhotoIndex(nextIndex);
  };

  return (
    <section id="trabalho" className="py-24 bg-[#090a0e] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#d4af37] uppercase mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>GALERIA DE CORTES REAIS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f5f5f7] tracking-tight mb-4">
            NOSSO TRABALHO FALA POR SI.
          </h2>
          <p className="text-base text-[#9ca3af] leading-relaxed">
            Cada detalhe importa. Confira alguns dos trabalhos realizados pela equipe da Invictus. Fotografias 100% autênticas dos nossos clientes.
          </p>
        </div>

        {/* Filter Segmented Controls */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
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
              className={`px-4 py-2 text-xs sm:text-sm font-medium rounded-md transition-all whitespace-nowrap ${
                activeFilter === filter.id
                  ? "bg-[#d4af37] text-[#0d0f12] shadow-sm font-semibold"
                  : "bg-[#141720] text-[#9ca3af] hover:text-[#f3e5ab] border border-[#232733]"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Marquee High-Res Showcase when in "Todos" or "Destaques" */}
        {(activeFilter === "todos" || activeFilter === "alta-res") && (
          <div className="mb-16">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#d4af37] mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Destaques em Alta Resolução</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {highResPhotos.map((photo) => {
                const globalIndex = GALLERY_PHOTOS.findIndex((p) => p.id === photo.id);
                return (
                  <div
                    key={photo.id}
                    onClick={() => setSelectedPhotoIndex(globalIndex)}
                    className="group relative cursor-pointer overflow-hidden rounded-xl bg-[#141720] border border-[#d4af37]/30 transition-all duration-300 hover:border-[#d4af37] hover:shadow-xl hover:-translate-y-1"
                  >
                    <div className="aspect-square overflow-hidden bg-[#101217]">
                      <picture>
                        <source srcSet={photo.webpSrc} type="image/webp" />
                        <source srcSet={photo.fallbackSrc} type="image/jpeg" />
                        <img
                          src={photo.webpSrc}
                          alt={photo.alt}
                          width={600}
                          height={600}
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          referrerPolicy="no-referrer"
                        />
                      </picture>
                    </div>

                    {/* Gradient Overlay & Details */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity pointer-events-none" />

                    <div className="absolute bottom-0 inset-x-0 p-5 flex items-end justify-between">
                      <div>
                        <span className="text-[11px] font-semibold text-[#d4af37] tracking-wider uppercase block">
                          {photo.category}
                        </span>
                        <h3 className="font-serif text-lg font-bold text-[#f5f5f7]">
                          {photo.title}
                        </h3>
                      </div>
                      <div className="w-9 h-9 rounded-full bg-[#d4af37]/20 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-[#0b0c10] transition-colors">
                        <ZoomIn className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Secondary / Filtered Gallery Grid */}
        <div>
          {activeFilter === "todos" && (
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#9ca3af] mb-6">
              <span>Mais Trabalhos da Equipe Invictus</span>
            </div>
          )}

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {(activeFilter === "todos" ? secondaryPhotos : filteredPhotos).map((photo) => {
              const globalIndex = GALLERY_PHOTOS.findIndex((p) => p.id === photo.id);
              return (
                <div
                  key={photo.id}
                  onClick={() => setSelectedPhotoIndex(globalIndex)}
                  className="group relative cursor-pointer overflow-hidden rounded-lg bg-[#141720] border border-[#252a36] hover:border-[#d4af37]/60 transition-all duration-200 hover:-translate-y-0.5"
                >
                  <div className="aspect-[3/4] overflow-hidden bg-[#101218] flex items-center justify-center">
                    <picture>
                      <source srcSet={photo.webpSrc} type="image/webp" />
                      <source srcSet={photo.fallbackSrc} type="image/jpeg" />
                      <img
                        src={photo.webpSrc}
                        alt={photo.alt}
                        width={300}
                        height={400}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        referrerPolicy="no-referrer"
                      />
                    </picture>
                  </div>

                  {/* Scrim with caption on hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity flex flex-col justify-end p-2.5 pointer-events-none">
                    <p className="text-[11px] font-medium text-[#f5f5f7] line-clamp-1">
                      {photo.title}
                    </p>
                    <span className="text-[9px] text-[#d4af37] block">
                      {photo.category}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Reassurance text */}
        <p className="text-center text-xs text-[#6b7280] mt-8">
          * Todas as fotos acima são registros autênticos de serviços realizados no salão da Barbearia Invictus.
        </p>

      </div>

      {/* Lightbox Modal */}
      {selectedPhotoIndex !== null && (
        <ImageLightbox
          photo={GALLERY_PHOTOS[selectedPhotoIndex]}
          onClose={() => setSelectedPhotoIndex(null)}
          onPrev={handlePrevPhoto}
          onNext={handleNextPhoto}
        />
      )}
    </section>
  );
};
