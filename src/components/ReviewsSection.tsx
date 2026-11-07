import React, { useState, useEffect, useRef } from "react";
import { REVIEWS, BARBEARIA_CONFIG } from "../data/barbeariaData";
import { Star, ChevronLeft, ChevronRight, ExternalLink, Quote } from "lucide-react";

export const ReviewsSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // Auto-play interval with pause on hover
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === REVIEWS.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
    touchStartX.current = null;
  };

  const currentReview = REVIEWS[currentIndex];

  return (
    <section
      id="avaliacoes"
      className="py-24 bg-[#090a0d] relative overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-[#d4af37] uppercase mb-3">
            <Quote className="w-3.5 h-3.5" />
            <span>DEPOIMENTOS REAIS DE CLIENTES</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f5f5f7] tracking-tight mb-4">
            QUEM CONHECE, RECOMENDA.
          </h2>
          <p className="text-base text-[#9ca3af] leading-relaxed">
            A satisfação de quem passa pela Invictus é parte importante da nossa história.
          </p>
        </div>

        {/* Carousel Card Container */}
        <div
          className="relative"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Main Testimonial Card */}
          <div className="relative p-8 sm:p-12 rounded-2xl bg-[#12151d] border border-[#d4af37]/30 shadow-2xl transition-all duration-300 min-h-[280px] flex flex-col justify-between">
            
            {/* Top Stars & Source */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
              <div className="flex items-center gap-1">
                {Array.from({ length: currentReview.stars }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-[#d4af37] fill-[#d4af37]"
                  />
                ))}
              </div>
              <span className="text-xs text-[#9ca3af] bg-[#1a1e27] border border-[#2b303e] px-2.5 py-1 rounded-full">
                {currentReview.source}
              </span>
            </div>

            {/* Testimonial Quote */}
            <blockquote className="text-base sm:text-xl text-[#e5e7eb] italic font-normal leading-relaxed mb-8">
              &ldquo;{currentReview.quote}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="flex items-center justify-between pt-4 border-t border-[#232734]">
              <div>
                <h3 className="font-serif text-base sm:text-lg font-bold text-[#f5f5f7]">
                  {currentReview.author}
                </h3>
                <span className="text-xs text-[#d4af37]">Cliente Barbearia Invictus</span>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handlePrev}
                  className="p-2.5 rounded-full bg-[#1b1e27] hover:bg-[#d4af37] text-[#9ca3af] hover:text-[#0b0c10] border border-[#2d3340] transition-colors focus:outline-none"
                  aria-label="Avaliação anterior"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="p-2.5 rounded-full bg-[#1b1e27] hover:bg-[#d4af37] text-[#9ca3af] hover:text-[#0b0c10] border border-[#2d3340] transition-colors focus:outline-none"
                  aria-label="Próxima avaliação"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-2 mt-6">
            {REVIEWS.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                className={`h-2 rounded-full transition-all ${
                  currentIndex === idx
                    ? "w-8 bg-[#d4af37]"
                    : "w-2 bg-[#2d3340] hover:bg-[#4b5563]"
                }`}
                aria-label={`Ir para avaliação ${idx + 1}`}
              />
            ))}
          </div>

        </div>

        {/* Google Reviews Outlink Button */}
        <div className="mt-12 text-center">
          <a
            href={BARBEARIA_CONFIG.socials.googleReviews}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs sm:text-sm font-semibold text-[#f5f5f7] bg-[#181b22] hover:bg-[#202530] border border-[#d4af37]/40 hover:border-[#d4af37] rounded-md transition-all shadow-sm"
          >
            <span>VER AVALIAÇÕES NO GOOGLE</span>
            <ExternalLink className="w-4 h-4 text-[#d4af37]" />
          </a>
        </div>

      </div>
    </section>
  );
};
