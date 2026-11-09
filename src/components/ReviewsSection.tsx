import React, { useState, useEffect, useRef } from "react";
import { REVIEWS, BARBEARIA_CONFIG } from "../data/barbeariaData";
import { getAuthorInitials } from "../utils/imageUtils";
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
  Scissors,
} from "lucide-react";

/**
 * Avatar do autor com Lazy Loading e Decodificação Assíncrona para PageSpeed Insights.
 * Carrega a foto sob demanda e mantém o monograma em ouro caso a imagem ainda esteja baixando.
 */
const LazyReviewAvatar: React.FC<{
  src?: string;
  author: string;
}> = ({ src, author }) => {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const initials = getAuthorInitials(author);

  return (
    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-br from-[#d4af37] to-[#8c671a] p-[1.5px] shrink-0 shadow-lg relative overflow-hidden">
      {/* Monograma de fundo sempre presente como fallback sem layout shift */}
      <div className="w-full h-full rounded-full bg-[#10131a] flex items-center justify-center text-[#fef08a] font-bold text-xs sm:text-sm select-none">
        {initials}
      </div>

      {src && !hasError && (
        <img
          src={src}
          alt={`Foto de perfil de ${author}`}
          width={44}
          height={44}
          loading="lazy"
          decoding="async"
          fetchPriority="low"
          onLoad={() => setLoaded(true)}
          onError={() => setHasError(true)}
          className={`absolute inset-0 w-full h-full rounded-full object-cover transition-opacity duration-500 ${
            loaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}
    </div>
  );
};

/**
 * Miniatura do corte realizado com Lazy Loading para enriquecer o carrossel de depoimentos.
 */
const LazyCutThumbnail: React.FC<{
  photo: {
    title: string;
    webpSrc: string;
    fallbackSrc: string;
    alt: string;
  };
}> = ({ photo }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-[#131722]/90 border border-[#2b3144] shadow-sm text-[10px] text-[#cbd5e1] w-fit">
      <div className="w-5 h-5 rounded overflow-hidden shrink-0 border border-[#d4af37]/40 bg-[#0d0f14] relative">
        {!loaded && <div className="absolute inset-0 bg-[#252a3a] animate-pulse" />}
        <picture>
          <source srcSet={photo.webpSrc} type="image/webp" />
          <source srcSet={photo.fallbackSrc} type="image/jpeg" />
          <img
            src={photo.webpSrc}
            alt={photo.alt}
            width={20}
            height={20}
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            onLoad={() => setLoaded(true)}
            className={`w-full h-full object-cover transition-opacity duration-300 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          />
        </picture>
      </div>
      <Scissors className="w-2.5 h-2.5 text-[#d4af37] shrink-0" />
      <span className="text-[10px] font-medium text-[#f3e5ab] truncate max-w-[140px] sm:max-w-[200px]">
        {photo.title}
      </span>
    </div>
  );
};

export const ReviewsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoSpinning, setIsAutoSpinning] = useState(true);
  const [hasEntered, setHasEntered] = useState(false);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    const checkScreen = () => {
      setIsLargeScreen(window.innerWidth >= 1024);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  // Trigger entrance when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Continuous auto-rotation when enabled
  useEffect(() => {
    if (!isAutoSpinning) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 5500);

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

  const totalReviews = REVIEWS.length;
  const currentReview = REVIEWS[currentIndex];

  return (
    <section
      id="avaliacoes"
      ref={sectionRef}
      className="py-12 sm:py-16 md:py-24 landscape:py-10 bg-transparent relative overflow-hidden scroll-mt-24"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[#d4af37]/8 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10 landscape:mb-4">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-[#d4af37] uppercase mb-2 sm:mb-3">
            <Quote className="w-3.5 h-3.5 text-[#d4af37] animate-icon-float" />
            <span>OPINIÃO REAL DOS NOSSOS CLIENTES</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#f5f5f7] tracking-tight mb-2 sm:mb-3">
            QUEM CONHECE, RECOMENDA.
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#a0a6b5] leading-relaxed">
            Nossa melhor propaganda é a confiança de quem senta na cadeira da Barbearia Invictus.
          </p>

          {/* Interactive 3D Carousel Control Strip with Smoked Glass */}
          <div className="flex items-center justify-center gap-3 mt-4 sm:mt-5">
            <button
              type="button"
              onClick={() => setIsAutoSpinning(!isAutoSpinning)}
              className="btn-3d btn-3d-dark inline-flex items-center gap-2 px-3.5 py-1 text-xs font-semibold text-[#f3e5ab] bg-[#141720]/90 border border-[#d4af37]/40 rounded-full shadow-md backdrop-blur-md"
              title={isAutoSpinning ? "Pausar giro automático" : "Iniciar giro automático"}
            >
              {isAutoSpinning ? (
                <>
                  <Pause className="w-3 h-3 text-[#d4af37] animate-icon-pulse" />
                  <span>Cilindro Ativo</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-[#d4af37] animate-icon-pulse" />
                  <span>Girar Avaliações</span>
                </>
              )}
            </button>
            <span className="text-xs text-[#8c92a2] font-medium">
              {currentIndex + 1} de {totalReviews} depoimentos
            </span>
          </div>
        </div>

        {/* =========================================================================
            STAGE RESPONSIVO DE DEPOIMENTOS
            - Sem alturas fixas artificiais que cortem o texto.
            - Totalmente adaptado para larguras de 320px a telas grandes.
            - Otimizado para telas com pouca altura (landscape/smartphones).
            - Controles reposicionados para não sobrepor o conteúdo.
            ========================================================================= */}
        <div
          className="relative w-full max-w-2xl mx-auto"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Card Principal Fluido e Adaptável ao Conteúdo */}
          <div className="relative min-h-[260px] sm:min-h-[290px] flex items-center justify-center">
            {REVIEWS.map((review, idx) => {
              const isCenter = idx === currentIndex;
              const isFlankingNext = (currentIndex + 1) % totalReviews === idx;
              const isFlankingPrev = (currentIndex - 1 + totalReviews) % totalReviews === idx;

              // Em telas grandes (desktop >= 1024px), mantemos o efeito de profundidade 3D nas laterais
              if (!isCenter && !isLargeScreen) {
                return null;
              }

              let transformClass = "translate-x-0 scale-100 opacity-100 z-20";
              if (isLargeScreen) {
                if (isFlankingNext) {
                  transformClass = "translate-x-[55%] scale-90 opacity-40 z-10 pointer-events-auto cursor-pointer blur-[0.5px]";
                } else if (isFlankingPrev) {
                  transformClass = "-translate-x-[55%] scale-90 opacity-40 z-10 pointer-events-auto cursor-pointer blur-[0.5px]";
                } else if (!isCenter) {
                  return null;
                }
              }

              return (
                <div
                  key={review.id}
                  id={`depoimento-${review.id}`}
                  onClick={() => !isCenter && handleSelectCard(idx)}
                  className={`w-full transition-all duration-500 ease-out ${
                    isCenter ? "relative z-20" : "absolute inset-0 z-10 hidden lg:block"
                  } ${transformClass}`}
                >
                  {/* CARD DE VIDRO FUMÊ COM TIPOGRAFIA EM ALTO CONTRASTE */}
                  <div
                    className={`p-5 sm:p-7 md:p-8 rounded-2xl flex flex-col justify-between card-smoke-glass transition-all duration-300 shadow-2xl relative overflow-hidden border ${
                      isCenter
                        ? "border-[#d4af37] shadow-[0_16px_40px_rgba(212,175,55,0.20)] ring-1 ring-[#d4af37]/60"
                        : "border-[#282d3b] hover:border-[#d4af37]/50"
                    }`}
                  >
                    {/* Marca d'água sutil de aspas ao fundo */}
                    <div className="absolute right-3 sm:right-4 top-2 sm:top-3 text-[#d4af37]/8 pointer-events-none select-none">
                      <Quote className="w-16 h-16 sm:w-20 sm:h-20" />
                    </div>

                    {/* Linha Superior: Estrelas, Google Verified Badge e Link */}
                    <div className="flex flex-wrap items-center justify-between gap-2 relative z-10 mb-3">
                      <div className="flex items-center gap-1 sm:gap-1.5" aria-label={`${review.stars} estrelas no Google`}>
                        {Array.from({ length: review.stars }).map((_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#d4af37] fill-[#d4af37] animate-star-shimmer drop-shadow-[0_1px_2px_rgba(212,175,55,0.6)]"
                          />
                        ))}
                      </div>

                      <a
                        href={BARBEARIA_CONFIG.socials.googleReviews}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-[#e2e8f0] bg-[#161a25]/95 hover:bg-[#1f2433] border border-[#373e52] hover:border-[#d4af37]/60 px-2.5 py-1 rounded-full shadow-inner backdrop-blur-md transition-colors group"
                        title="Ver avaliações no Google Maps (abre em nova aba)"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e] shrink-0" />
                        <span>Google Reviews</span>
                        <ExternalLink className="w-3 h-3 text-[#d4af37] group-hover:translate-x-0.5 transition-transform" />
                      </a>
                    </div>

                    {/* Centro: Texto do Depoimento Integral - Sem cortes, fluido e legível */}
                    <blockquote className="text-xs sm:text-sm md:text-base text-[#ffffff] font-medium leading-relaxed my-2 sm:my-3 relative z-10 drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)]">
                      &ldquo;{review.quote}&rdquo;
                    </blockquote>

                    {/* Miniatura do Corte com Lazy Loading */}
                    {review.cutPhoto && (
                      <div className="relative z-10 my-2">
                        <LazyCutThumbnail photo={review.cutPhoto} />
                      </div>
                    )}

                    {/* Rodapé do Card: Perfil do Cliente */}
                    <div className="pt-3 border-t border-[#252a38]/85 flex items-center justify-between relative z-10 mt-1">
                      <div className="flex items-center gap-3">
                        {/* Avatar com Lazy Loading e Iniciais */}
                        <LazyReviewAvatar src={review.avatarUrl} author={review.author} />

                        <div>
                          <h3 className="font-serif text-sm sm:text-base font-bold text-[#ffffff] drop-shadow-sm leading-tight">
                            {review.author}
                          </h3>
                          <span className="text-[10px] sm:text-[11px] text-[#d4af37] font-semibold block mt-0.5">
                            Cliente Verificado · Barbearia Invictus
                          </span>
                        </div>
                      </div>

                      {/* Indicador sutil de clique nas cartas laterais */}
                      {!isCenter && (
                        <span className="text-[10px] text-[#fef08a] bg-[#1a1e27]/95 px-2 py-0.5 rounded border border-[#d4af37]/40 shadow font-semibold">
                          Ver este
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Botões Laterais Flutuantes exclusivos para Desktop (não sobrepõem o card) */}
          <button
            type="button"
            onClick={handlePrev}
            className="btn-3d btn-3d-dark hidden lg:flex absolute -left-6 xl:-left-12 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-[#161924]/95 hover:bg-[#d4af37] text-[#f3e5ab] hover:text-[#0b0c10] border border-[#d4af37]/45 transition-colors focus:outline-none backdrop-blur-md shadow-xl group items-center justify-center"
            aria-label="Avaliação anterior"
            title="Depoimento anterior"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          <button
            type="button"
            onClick={handleNext}
            className="btn-3d btn-3d-dark hidden lg:flex absolute -right-6 xl:-right-12 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-[#161924]/95 hover:bg-[#d4af37] text-[#f3e5ab] hover:text-[#0b0c10] border border-[#d4af37]/45 transition-colors focus:outline-none backdrop-blur-md shadow-xl group items-center justify-center"
            aria-label="Próxima avaliação"
            title="Próximo depoimento"
          >
            <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        {/* =========================================================================
            BARRA DE CONTROLE E NAVEGAÇÃO RESPONSIVA (MOBILE & TABLET FRIENDLY)
            Controles com touch-target confortável (mínimo 44px), minimalistas e discretos
            ========================================================================= */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mt-6 sm:mt-8">
          {/* Botão Anterior (toque fácil) */}
          <button
            type="button"
            onClick={handlePrev}
            className="btn-3d btn-3d-dark flex items-center justify-center min-w-[40px] min-h-[40px] p-2 rounded-full bg-[#161924]/90 hover:bg-[#d4af37] text-[#f3e5ab] hover:text-[#0b0c10] border border-[#d4af37]/40 transition-colors focus:outline-none shadow-md"
            aria-label="Avaliação anterior"
            title="Depoimento anterior"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Indicadores / Pontos Minimalistas e Proporcionais */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {REVIEWS.map((r, idx) => (
              <button
                key={r.id}
                type="button"
                onClick={() => handleSelectCard(idx)}
                className={`h-2 rounded-full transition-all duration-300 focus:outline-none ${
                  currentIndex === idx
                    ? "w-7 sm:w-8 bg-[#d4af37] shadow-[0_0_8px_rgba(212,175,55,0.7)]"
                    : "w-2 bg-[#252936] hover:bg-[#4b5563]"
                }`}
                aria-label={`Ver avaliação ${idx + 1} de ${totalReviews} (${r.author})`}
              />
            ))}
          </div>

          {/* Próximo Botão (toque fácil) */}
          <button
            type="button"
            onClick={handleNext}
            className="btn-3d btn-3d-dark flex items-center justify-center min-w-[40px] min-h-[40px] p-2 rounded-full bg-[#161924]/90 hover:bg-[#d4af37] text-[#f3e5ab] hover:text-[#0b0c10] border border-[#d4af37]/40 transition-colors focus:outline-none shadow-md"
            aria-label="Próxima avaliação"
            title="Próximo depoimento"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Link Oficial para Avaliações e Avaliar no Google Maps */}
        <div className="mt-8 sm:mt-10 text-center">
          <a
            href={BARBEARIA_CONFIG.socials.googleReviews}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-3d btn-3d-dark inline-flex items-center gap-2 px-5 py-3 text-xs sm:text-sm font-bold text-[#f5f5f7] bg-[#141720]/90 hover:bg-[#1c202a] border border-[#d4af37]/45 hover:border-[#d4af37] rounded-md transition-all shadow-xl backdrop-blur-md group"
          >
            <RotateCw className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#d4af37] group-hover:rotate-180 transition-transform duration-500" />
            <span>CONSULTAR AVALIAÇÕES REAIS NO GOOGLE</span>
            <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#d4af37] animate-icon-float" />
          </a>
        </div>

      </div>
    </section>
  );
};
