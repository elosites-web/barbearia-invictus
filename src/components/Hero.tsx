import React from "react";
import { BARBEARIA_CONFIG, GALLERY_PHOTOS } from "../data/barbeariaData";
import { ArrowRight, MapPin } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";

export const Hero: React.FC = () => {
  const highResHeroPhoto = GALLERY_PHOTOS[0]; // 01-degrade-com-desenho-lateral
  const texturePhoto = GALLERY_PHOTOS[1]; // 02-degrade-com-topo-texturizado
  const platinumPhoto = GALLERY_PHOTOS[2]; // 03-corte-platinado-com-degrade

  return (
    <section
      id="inicio"
      className="relative min-h-[92vh] lg:min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-[#090a0d]"
    >
      {/* Background subtle radial glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#d4af37]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-[#0b0c10] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Brand copy and actions */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            {/* Location & Brand kicker (clean unboxed text) */}
            <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-widest text-[#d4af37] uppercase mb-4">
              <span className="w-6 h-[1.5px] bg-[#d4af37]" />
              <span>BARBEARIA INVICTUS</span>
              <span aria-hidden="true" className="text-[#6b7280]">·</span>
              <span className="text-[#9ca3af] flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#d4af37]" />
                JUNDIAÍ — SP
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-[#f5f5f7] leading-[1.15] tracking-tight mb-6 max-w-2xl text-balance">
              ATENDIMENTO DE ALTO NÍVEL PARA QUEM EXIGE O MELHOR.
            </h1>

            {/* Complementary Text */}
            <p className="text-base sm:text-lg text-[#9ca3af] leading-relaxed mb-8 max-w-xl">
              {BARBEARIA_CONFIG.heroDescription}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
              <a
                href={`${BARBEARIA_CONFIG.whatsappUrl}?text=${encodeURIComponent(
                  BARBEARIA_CONFIG.defaultWhatsappMessage
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 px-7 py-3.5 text-sm font-semibold text-[#0d0f12] bg-[#d4af37] hover:bg-[#ecc94b] active:scale-[0.98] transition-all rounded-md shadow-lg shadow-[#d4af37]/20 whitespace-nowrap group"
              >
                <WhatsAppIcon className="w-5 h-5 shrink-0" />
                <span>AGENDAR PELO WHATSAPP</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="#servicos"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-[#e5e7eb] bg-[#171a22] hover:bg-[#20242e] border border-[#d4af37]/25 hover:border-[#d4af37]/50 active:scale-[0.98] transition-all rounded-md whitespace-nowrap"
              >
                <span>CONHECER NOSSOS SERVIÇOS</span>
              </a>
            </div>

            {/* Micro Highlights strip */}
            <div className="pt-6 border-t border-[#1f242e] grid grid-cols-3 gap-4 max-w-xl">
              <div>
                <p className="text-xl sm:text-2xl font-bold font-serif text-[#f3e5ab] tabular-nums">100%</p>
                <p className="text-xs text-[#9ca3af] mt-0.5">Trabalhos Reais</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold font-serif text-[#f3e5ab] tabular-nums">5.0 ★</p>
                <p className="text-xs text-[#9ca3af] mt-0.5">Avaliação Google</p>
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold font-serif text-[#f3e5ab] tabular-nums">Jd. Tarumã</p>
                <p className="text-xs text-[#9ca3af] mt-0.5">Fácil Estacionar</p>
              </div>
            </div>

          </div>

          {/* Right Column: Hero High-Res Editorial Composition */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Primary High-Resolution Real Cut Photo */}
              <div className="relative rounded-xl overflow-hidden border border-[#d4af37]/30 shadow-2xl bg-[#141720] aspect-square group">
                <picture>
                  <source srcSet={highResHeroPhoto.webpSrc} type="image/webp" />
                  <source srcSet={highResHeroPhoto.fallbackSrc} type="image/jpeg" />
                  <img
                    src={highResHeroPhoto.webpSrc}
                    alt={highResHeroPhoto.alt}
                    width={1440}
                    height={1440}
                    loading="eager"
                    decoding="sync"
                    fetchPriority="high"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                </picture>
                
                {/* Measured Scrim for contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10]/90 via-transparent to-black/20 pointer-events-none" />

                {/* Badge caption on bottom */}
                <div className="absolute bottom-3 left-3 right-3 p-2.5 sm:p-3 bg-[#0d0f14]/90 backdrop-blur-md rounded-lg border border-[#d4af37]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-semibold text-[#d4af37] tracking-wider uppercase block">
                      Trabalho Real da Invictus
                    </span>
                    <span className="text-xs text-[#e5e7eb] font-medium block">
                      Degradê com Desenho Lateral
                    </span>
                  </div>
                  <span className="self-start sm:self-center text-[10px] text-[#9ca3af] bg-[#1a1e27] px-2 py-0.5 rounded border border-[#2b303d] shrink-0">
                    Kauan Barbearia
                  </span>
                </div>
              </div>

              {/* Side Floating Preview Card 1 (Platinum Cut) */}
              <div className="hidden sm:flex items-center gap-3 absolute -bottom-6 -left-6 bg-[#11141c]/95 backdrop-blur-md p-2.5 rounded-lg border border-[#d4af37]/30 shadow-2xl max-w-xs">
                <div className="w-14 h-14 rounded-md overflow-hidden shrink-0 border border-[#d4af37]/20 bg-[#161922]">
                  <picture>
                    <source srcSet={platinumPhoto.webpSrc} type="image/webp" />
                    <source srcSet={platinumPhoto.fallbackSrc} type="image/jpeg" />
                    <img
                      src={platinumPhoto.webpSrc}
                      alt={platinumPhoto.alt}
                      width={144}
                      height={144}
                      loading="eager"
                      decoding="async"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </picture>
                </div>
                <div className="text-left pr-2">
                  <p className="text-xs font-semibold text-[#f5f5f7]">Corte Platinado & Fade</p>
                  <p className="text-[11px] text-[#9ca3af]">Procedimento de Química</p>
                </div>
              </div>

              {/* Side Floating Preview Card 2 (Textured Cut) */}
              <div className="hidden sm:flex items-center gap-3 absolute -top-5 -right-5 bg-[#11141c]/95 backdrop-blur-md p-2.5 rounded-lg border border-[#d4af37]/30 shadow-2xl">
                <div className="w-12 h-12 rounded-md overflow-hidden shrink-0 border border-[#d4af37]/20 bg-[#161922]">
                  <picture>
                    <source srcSet={texturePhoto.webpSrc} type="image/webp" />
                    <source srcSet={texturePhoto.fallbackSrc} type="image/jpeg" />
                    <img
                      src={texturePhoto.webpSrc}
                      alt={texturePhoto.alt}
                      width={144}
                      height={144}
                      loading="eager"
                      decoding="async"
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </picture>
                </div>
                <div className="text-left pr-2">
                  <p className="text-xs font-semibold text-[#f5f5f7]">Topo Texturizado</p>
                  <p className="text-[11px] text-[#d4af37]">Acabamento de Nuca</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
