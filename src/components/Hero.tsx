import React, { useState, useEffect } from "react";
import { BARBEARIA_CONFIG, GALLERY_PHOTOS } from "../data/barbeariaData";
import { ArrowRight, MapPin } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";

export const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const highResHeroPhoto = GALLERY_PHOTOS[0]; // 01-degrade-com-desenho-lateral
  const texturePhoto = GALLERY_PHOTOS[1]; // 02-degrade-com-topo-texturizado
  const platinumPhoto = GALLERY_PHOTOS[2]; // 03-corte-platinado-com-degrade

  useEffect(() => {
    // Check user's motion preference (WCAG AA)
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) {
      setPrefersReducedMotion(true);
      return;
    }

    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          // Only track scroll within hero visibility range (up to 1200px) to maximize FPS
          if (window.scrollY <= 1200) {
            setScrollY(window.scrollY);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Multi-plane parallax speeds (pixels offset based on scrollY)
  const offsetGlow = prefersReducedMotion ? 0 : scrollY * 0.12;
  const offsetHeadline = prefersReducedMotion ? 0 : scrollY * 0.10;
  const offsetActions = prefersReducedMotion ? 0 : scrollY * 0.18;
  const offsetStats = prefersReducedMotion ? 0 : scrollY * 0.25;
  const offsetMainCard = prefersReducedMotion ? 0 : scrollY * 0.16;
  const offsetFloatingCard1 = prefersReducedMotion ? 0 : scrollY * 0.42;
  const offsetFloatingCard2 = prefersReducedMotion ? 0 : scrollY * 0.52;

  return (
    <section
      id="inicio"
      className="relative min-h-[92vh] lg:min-h-screen pt-28 pb-16 flex items-center justify-center overflow-hidden bg-transparent"
    >
      {/* Background subtle radial glow with slow deep parallax */}
      <div
        className="absolute top-1/4 left-1/2 w-[600px] h-[600px] bg-[#d4af37]/8 rounded-full blur-[140px] pointer-events-none will-change-transform"
        style={{
          transform: `translate3d(-50%, calc(-50% + ${offsetGlow}px), 0)`,
        }}
      />
      <div className="absolute bottom-0 inset-x-0 h-40 bg-gradient-to-t from-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Brand copy and actions with layered parallax */}
          <div className="lg:col-span-7 flex flex-col justify-center text-left">
            
            {/* Layer 1: Location & Brand kicker + Headline */}
            <div
              className="will-change-transform"
              style={{
                transform: `translate3d(0, ${offsetHeadline}px, 0)`,
              }}
            >
              {/* Location & Brand kicker (clean unboxed text) */}
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-widest text-[#d4af37] uppercase mb-4 font-serif">
                <span className="w-6 h-[1.5px] bg-[#d4af37]" />
                <span>BARBEARIA INVICTUS</span>
                <span aria-hidden="true" className="text-[#6b7280]">·</span>
                <span className="text-[#9ca3af] flex items-center gap-1 font-sans">
                  <MapPin className="w-3.5 h-3.5 text-[#d4af37] animate-icon-pulse" />
                  JUNDIAÍ — SP
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] font-extrabold text-[#f5f5f7] leading-[1.15] tracking-tight mb-6 max-w-2xl text-balance drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                ATENDIMENTO DE ALTO NÍVEL PARA QUEM EXIGE O MELHOR.
              </h1>
            </div>

            {/* Layer 2: Complementary Text & Action Buttons */}
            <div
              className="will-change-transform"
              style={{
                transform: `translate3d(0, ${offsetActions}px, 0)`,
              }}
            >
              <p className="text-base sm:text-lg text-[#c2c7d4] leading-relaxed mb-8 max-w-xl">
                {BARBEARIA_CONFIG.heroDescription}
              </p>

              {/* Action Buttons with 3D Depth */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-10">
                <a
                  href={`${BARBEARIA_CONFIG.whatsappUrl}?text=${encodeURIComponent(
                    BARBEARIA_CONFIG.defaultWhatsappMessage
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-3d btn-3d-gold inline-flex items-center justify-center gap-3 px-7 py-3.5 text-sm font-bold text-[#0d0f12] bg-[#d4af37] hover:bg-[#ecc94b] rounded-md shadow-lg shadow-[#d4af37]/20 whitespace-nowrap group"
                >
                  <WhatsAppIcon className="w-5 h-5 shrink-0 text-[#0d0f12] animate-icon-pulse" />
                  <span>AGENDAR PELO WHATSAPP</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </a>

                <a
                  href="#servicos"
                  className="btn-3d btn-3d-dark inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-medium text-[#e5e7eb] bg-[#171a22] hover:bg-[#20242e] border border-[#d4af37]/30 hover:border-[#d4af37]/60 rounded-md whitespace-nowrap"
                >
                  <span>CONHECER NOSSOS SERVIÇOS</span>
                </a>
              </div>
            </div>

            {/* Layer 3: Micro Highlights strip with Smoked Glass cards & accelerated parallax */}
            <div
              className="pt-6 border-t border-[#1f242e]/80 grid grid-cols-3 gap-3.5 max-w-xl will-change-transform"
              style={{
                transform: `translate3d(0, ${offsetStats}px, 0)`,
              }}
            >
              <div className="p-2.5 rounded-xl card-smoke-glass transition-transform hover:-translate-y-1">
                <p className="text-xl sm:text-2xl font-bold font-serif text-[#f3e5ab] tabular-nums">100%</p>
                <p className="text-xs text-[#a0a6b5] mt-0.5">Trabalhos Reais</p>
              </div>
              <div className="p-2.5 rounded-xl card-smoke-glass transition-transform hover:-translate-y-1">
                <p className="text-xl sm:text-2xl font-bold font-serif text-[#f3e5ab] tabular-nums">5.0 ★</p>
                <p className="text-xs text-[#a0a6b5] mt-0.5">Avaliação Google</p>
              </div>
              <div className="p-2.5 rounded-xl card-smoke-glass transition-transform hover:-translate-y-1">
                <p className="text-xl sm:text-2xl font-bold font-serif text-[#f3e5ab] tabular-nums">Jd. Tarumã</p>
                <p className="text-xs text-[#a0a6b5] mt-0.5">Fácil Estacionar</p>
              </div>
            </div>

          </div>

          {/* Right Column: Hero High-Res Editorial Composition with Floating Multi-Plane Parallax */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Layer 4: Primary High-Resolution Real Cut Photo Card */}
              <div
                className="relative rounded-2xl overflow-hidden card-smoke-glass shadow-2xl bg-[#141720] aspect-square group will-change-transform"
                style={{
                  transform: `translate3d(0, ${offsetMainCard}px, 0)`,
                }}
              >
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
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b0c10]/95 via-transparent to-black/20 pointer-events-none" />

                {/* Badge caption on bottom with Smoked Glass */}
                <div className="absolute bottom-3 left-3 right-3 p-3 card-smoke-glass rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-semibold text-[#d4af37] tracking-wider uppercase block">
                      Trabalho Real da Invictus
                    </span>
                    <span className="text-xs text-[#f5f5f7] font-medium block">
                      Degradê com Desenho Lateral
                    </span>
                  </div>
                  <span className="self-start sm:self-center text-[10px] text-[#b0b6c4] bg-[#1a1e27]/90 px-2.5 py-0.5 rounded border border-[#2b303d] shrink-0">
                    Kauan Barbearia
                  </span>
                </div>
              </div>

              {/* Layer 5: Side Floating Preview Card 1 (Platinum Cut) with High Parallax Speed */}
              <div
                className="hidden sm:flex items-center gap-3 absolute -bottom-6 -left-6 card-smoke-glass p-2.5 rounded-xl shadow-2xl max-w-xs transition-all will-change-transform z-20"
                style={{
                  transform: `translate3d(0, ${offsetFloatingCard1}px, 0)`,
                }}
              >
                <div className="w-14 h-14 rounded-lg overflow-hidden shrink-0 border border-[#d4af37]/30 bg-[#161922]">
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
                  <p className="text-[11px] text-[#a0a6b5]">Procedimento de Química</p>
                </div>
              </div>

              {/* Layer 6: Side Floating Preview Card 2 (Textured Cut) with Counter/Max Parallax Speed */}
              <div
                className="hidden sm:flex items-center gap-3 absolute -top-5 -right-5 card-smoke-glass p-2.5 rounded-xl shadow-2xl transition-all will-change-transform z-20"
                style={{
                  transform: `translate3d(0, ${offsetFloatingCard2}px, 0)`,
                }}
              >
                <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 border border-[#d4af37]/30 bg-[#161922]">
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
