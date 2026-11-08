import React, { useState, useEffect, useRef } from "react";
import { REVIEWS, BARBEARIA_CONFIG } from "../data/barbeariaData";
import {
  Star,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Quote,
  RotateCw,
  Pause,
  Play,
  CheckCircle2,
} from "lucide-react";

export const ReviewsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoSpinning, setIsAutoSpinning] = useState(true);
  const [hasEntered, setHasEntered] = useState(false);
  const [cylinderRadius, setCylinderRadius] = useState(420);
  const sectionRef = useRef<HTMLElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // Dynamic cylinder radius based on viewport width and orientation to ensure no overlapping
  useEffect(() => {
    const updateRadius = () => {
      const w = window.innerWidth;
      const isLandscape = window.matchMedia("(orientation: landscape)").matches;
      if (w < 640) {
        setCylinderRadius(isLandscape ? 340 : 310);
      } else if (w < 1024) {
        setCylinderRadius(430);
      } else {
        setCylinderRadius(530);
      }
    };

    updateRadius();
    window.addEventListener("resize", updateRadius);
    return () => window.removeEventListener("resize", updateRadius);
  }, []);

  // Trigger entrance when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
        }
      },
      { threshold: 0.12 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Continuous cylindrical 3D rotation
  useEffect(() => {
    if (!isAutoSpinning) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isAutoSpinning]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const handleSelectCard = (index: number) => {
    setCurrentIndex(index);
  };

  // Touch Swipe for Mobile & Horizontal Screens
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 35) {
      if (diffX > 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Helper to generate initials for avatar
  const getInitials = (name: string) => {
    const parts = name.trim().split(" ");
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return (parts[0]?.substring(0, 2) || "CL").toUpperCase();
  };

  const totalReviews = REVIEWS.length;
  const angleStep = 360 / totalReviews;

  return (
    <section
      id="avaliacoes"
      ref={sectionRef}
      className="py-24 bg-transparent relative overflow-hidden scroll-mt-24"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#d4af37]/8 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-[#d4af37] uppercase mb-3">
            <Quote className="w-3.5 h-3.5 text-[#d4af37] animate-icon-float" />
            <span>OPINIÃO REAL DOS NOSSOS CLIENTES</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f5f5f7] tracking-tight mb-4">
            QUEM CONHECE, RECOMENDA.
          </h2>
          <p className="text-base text-[#a0a6b5] leading-relaxed">
            Nossa melhor propaganda é a confiança de quem senta na cadeira da Barbearia Invictus.
          </p>

          {/* Interactive 3D Carousel Control Strip with Smoked Glass */}
          <div className="flex items-center justify-center gap-3 mt-6">
            <button
              type="button"
              onClick={() => setIsAutoSpinning(!isAutoSpinning)}
              className="btn-3d btn-3d-dark inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold text-[#f3e5ab] bg-[#141720]/90 border border-[#d4af37]/40 rounded-full shadow-md backdrop-blur-md"
              title={isAutoSpinning ? "Pausar giro do cilindro 3D" : "Iniciar giro automático"}
            >
              {isAutoSpinning ? (
                <>
                  <Pause className="w-3.5 h-3.5 text-[#d4af37] animate-icon-pulse" />
                  <span>Cilindro 3D Ativo</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 text-[#d4af37] animate-icon-pulse" />
                  <span>Girar Cilindro</span>
                </>
              )}
            </button>
            <span className="text-xs text-[#8c92a2] font-medium">
              {currentIndex + 1} de {totalReviews} depoimentos
            </span>
          </div>
        </div>

        {/* =========================================================================
            3D CYLINDRICAL CAROUSEL STAGE
            Os cards giram em formato cilíndrico autêntico (rotateY + translateZ(R))
            ========================================================================= */}
        <div
          className="relative min-h-[420px] sm:min-h-[440px] md:min-h-[470px] flex items-center justify-center py-6 select-none"
          style={{ perspective: "1500px" }}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Cylinder Stage */}
          <div
            className="relative w-full max-w-xl sm:max-w-2xl h-[340px] sm:h-[370px] flex items-center justify-center transition-transform duration-700 ease-out"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            {REVIEWS.map((review, idx) => {
              // Calculate angular position on the cylinder
              let diff = (idx - currentIndex) % totalReviews;
              if (diff > totalReviews / 2) diff -= totalReviews;
              if (diff < -totalReviews / 2) diff += totalReviews;

              const angle = diff * angleStep;
              const isCenter = diff === 0;
              const isFlanking = Math.abs(diff) === 1;
              const isBehind = Math.abs(diff) >= 2;

              // Transform into 3D cylinder coordinates
              const transformStyle = `rotateY(${angle}deg) translateZ(${cylinderRadius}px)`;

              let opacity = 1;
              let zIndex = 20;
              let filter = "none";

              if (isCenter) {
                opacity = 1;
                zIndex = 35;
                filter = "none";
              } else if (isFlanking) {
                opacity = 0.65;
                zIndex = 20;
                filter = "brightness(0.72)";
              } else {
                opacity = isBehind ? 0 : 0.25;
                zIndex = 10;
                filter = "brightness(0.5)";
              }

              const zigzagClass = hasEntered
                ? ""
                : idx % 2 === 0
                ? "animate-zigzag-left"
                : "animate-zigzag-right";

              return (
                <div
                  key={review.id}
                  id={`depoimento-${review.id}`}
                  onClick={() => handleSelectCard(idx)}
                  className={`absolute inset-0 w-full transition-all duration-700 ease-out cursor-pointer ${zigzagClass} ${
                    isBehind ? "pointer-events-none hidden sm:block" : ""
                  }`}
                  style={{
                    transform: transformStyle,
                    zIndex,
                    opacity,
                    filter,
                    backfaceVisibility: "hidden",
                  }}
                >
                  {/* CARD DE VIDRO FUMÊ COM TIPOGRAFIA EM ALTO CONTRASTE */}
                  <div
                    className={`h-full p-6 sm:p-8 md:p-9 rounded-2xl flex flex-col justify-between card-smoke-glass transition-all duration-500 shadow-2xl relative overflow-hidden ${
                      isCenter
                        ? "border-[#d4af37] shadow-[0_20px_50px_rgba(212,175,55,0.25)] ring-1 ring-[#d4af37]/60"
                        : "hover:opacity-90"
                    }`}
                  >
                    {/* Watermark Quote background ornament */}
                    <div className="absolute right-4 top-3 text-[#d4af37]/8 pointer-events-none select-none">
                      <Quote className="w-24 h-24 sm:w-28 sm:h-28" />
                    </div>

                    {/* Top Row: Stars, Google Verified Badge & Date */}
                    <div className="flex items-center justify-between gap-3 relative z-10">
                      <div className="flex items-center gap-1.5">
                        {Array.from({ length: review.stars }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 sm:w-5 h-4 sm:h-5 text-[#d4af37] fill-[#d4af37] animate-star-shimmer drop-shadow-[0_1px_3px_rgba(212,175,55,0.6)]"
                          />
                        ))}
                      </div>

                      <div className="flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold text-[#e2e8f0] bg-[#161a25]/95 border border-[#373e52] px-3 py-1 rounded-full shadow-inner backdrop-blur-md">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e] shrink-0" />
                        <span>Google Reviews</span>
                      </div>
                    </div>

                    {/* Center: Quote Text - Alta Legibilidade, Contraste Puro e Espaçamento Perfeito */}
                    <blockquote className="text-sm sm:text-base md:text-lg text-[#ffffff] font-medium leading-relaxed my-3 sm:my-4 line-clamp-4 relative z-10 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                      &ldquo;{review.quote}&rdquo;
                    </blockquote>

                    {/* Bottom: Client Profile */}
                    <div className="pt-3.5 border-t border-[#252a38]/85 flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-3">
                        {/* Avatar with gold ring monogram */}
                        <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#d4af37] to-[#8c671a] p-[1.5px] shrink-0 shadow-lg">
                          <div className="w-full h-full rounded-full bg-[#10131a] flex items-center justify-center text-[#fef08a] font-bold text-xs sm:text-sm">
                            {getInitials(review.author)}
                          </div>
                        </div>

                        <div>
                          <h3 className="font-serif text-sm sm:text-base font-bold text-[#ffffff] drop-shadow-sm">
                            {review.author}
                          </h3>
                          <span className="text-[11px] text-[#d4af37] font-semibold block">
                            Cliente Verificado · Barbearia Invictus
                          </span>
                        </div>
                      </div>

                      {/* Click indicator on side cards */}
                      {isFlanking && (
                        <span className="hidden sm:inline-block text-[10px] text-[#fef08a] bg-[#1a1e27]/95 px-2.5 py-1 rounded-md border border-[#d4af37]/40 shadow font-semibold">
                          Girar para cá
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* =========================================================================
              SELETORES DE VAI E VEM (SETAS LATERAIS < >) OTIMIZADOS
              Tamanho amplo, botões 3D com profundidade, toque fácil em qualquer tela
              ========================================================================= */}
          <button
            type="button"
            onClick={handlePrev}
            className="btn-3d btn-3d-dark absolute left-1 sm:left-4 md:left-8 z-40 p-3 sm:p-4 rounded-full bg-[#161924]/95 hover:bg-[#d4af37] text-[#f3e5ab] hover:text-[#0b0c10] border border-[#d4af37]/45 transition-colors focus:outline-none backdrop-blur-md shadow-2xl group"
            aria-label="Avaliação anterior no cilindro (vai e volta)"
            title="Girar para o depoimento anterior"
          >
            <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="btn-3d btn-3d-dark absolute right-1 sm:right-4 md:right-8 z-40 p-3 sm:p-4 rounded-full bg-[#161924]/95 hover:bg-[#d4af37] text-[#f3e5ab] hover:text-[#0b0c10] border border-[#d4af37]/45 transition-colors focus:outline-none backdrop-blur-md shadow-2xl group"
            aria-label="Próxima avaliação no cilindro (vai e volta)"
            title="Girar para o próximo depoimento"
          >
            <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* Carousel Dots & Indicator Navigation */}
        <div className="flex items-center justify-center gap-2.5 mt-8">
          {REVIEWS.map((r, idx) => (
            <button
              key={r.id}
              type="button"
              onClick={() => handleSelectCard(idx)}
              className={`btn-3d h-2.5 rounded-full transition-all ${
                currentIndex === idx
                  ? "w-9 bg-[#d4af37] shadow-[0_0_12px_#d4af37]"
                  : "w-2.5 bg-[#252936] hover:bg-[#4b5563]"
              }`}
              aria-label={`Ver avaliação de ${r.author}`}
            />
          ))}
        </div>

        {/* Google Reviews Outlink Button */}
        <div className="mt-12 text-center">
          <a
            href={BARBEARIA_CONFIG.socials.googleReviews}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-3d btn-3d-dark inline-flex items-center gap-2.5 px-6 py-3.5 text-xs sm:text-sm font-bold text-[#f5f5f7] bg-[#141720]/90 hover:bg-[#1c202a] border border-[#d4af37]/45 hover:border-[#d4af37] rounded-md transition-all shadow-xl backdrop-blur-md group"
          >
            <RotateCw className="w-4 h-4 text-[#d4af37] group-hover:rotate-180 transition-transform duration-500" />
            <span>VER MAIS AVALIAÇÕES NO GOOGLE MAPS</span>
            <ExternalLink className="w-4 h-4 text-[#d4af37] animate-icon-float" />
          </a>
        </div>

      </div>
    </section>
  );
};
