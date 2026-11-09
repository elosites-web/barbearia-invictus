import React from "react";
import { BARBEARIA_CONFIG, SERVICES } from "../data/barbeariaData";
import { Scissors, Sparkles, Info } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { FadeInSection } from "./FadeInSection";

export const ServicesSection: React.FC = () => {
  return (
    <section id="servicos" className="py-24 bg-transparent relative scroll-mt-24">
      {/* Decorative subtle divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#d4af37] uppercase mb-3">
            <Scissors className="w-3.5 h-3.5 animate-icon-wiggle" />
            <span>CARDÁPIO DE SERVIÇOS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f5f5f7] tracking-tight mb-4">
            SERVIÇOS E VALORES
          </h2>
          <p className="text-base text-[#9ca3af] leading-relaxed">
            Transparência, técnica de ponta e produtos selecionados. Escolha o procedimento e agende seu horário com praticidade diretamente no WhatsApp.
          </p>
        </div>

        {/* Services Cards Grid with Smoked Glassmorphism Effect & Fade-in-up animations */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {SERVICES.map((service, index) => {
            const isFeatured = service.id === "corte";

            return (
              <FadeInSection
                key={service.id}
                direction="up"
                delay={index * 120}
                className="h-full flex flex-col"
              >
                <div
                  className={`service-card relative flex flex-col justify-between p-6 sm:p-7 rounded-2xl card-smoke-glass h-full ${
                    isFeatured
                      ? "service-card-featured ring-1 ring-[#d4af37]/40"
                      : ""
                  }`}
                >
                  {/* Featured Badge floating gently over the center of the top line */}
                  {service.tag && (
                    <div className="absolute -top-3.5 left-1/2 animate-floating-badge bg-gradient-to-r from-[#d4af37] via-[#f3e5ab] to-[#aa841e] text-[#0d0f12] text-[10px] font-extrabold uppercase tracking-wider px-3.5 py-0.5 rounded-full shadow-[0_4px_14px_rgba(212,175,55,0.45)] flex items-center gap-1 z-30 select-none pointer-events-none">
                      <Sparkles className="w-3 h-3 text-[#0d0f12] animate-icon-pulse" />
                      <span>{service.tag}</span>
                    </div>
                  )}

                  <div>
                    {/* Service Title */}
                    <div className="flex items-start justify-between gap-2 mb-3">
                      <h3 className="font-serif text-xl font-bold text-[#f5f5f7]">
                        {service.name}
                      </h3>
                    </div>

                    {/* Price presentation */}
                    <div className="mb-5 pb-5 border-b border-[#252932]/70">
                      <div className="flex items-baseline gap-1">
                        <span className="font-serif text-3xl font-extrabold text-[#f3e5ab] tabular-nums drop-shadow-[0_2px_4px_rgba(0,0,0,0.6)]">
                          {service.price}
                        </span>
                        {service.id === "quimica" && (
                          <span className="text-xs text-[#9ca3af] font-medium">/ a partir</span>
                        )}
                      </div>
                      {service.priceNote && (
                        <p className="text-[11px] text-[#d4af37] mt-1 font-medium flex items-center gap-1.5">
                          <Info className="w-3.5 h-3.5 shrink-0 animate-icon-float" />
                          <span>{service.priceNote}</span>
                        </p>
                      )}
                    </div>

                    {/* Description */}
                    <p className="text-sm text-[#c5c8d1] leading-relaxed mb-6">
                      {service.description}
                    </p>
                  </div>

                  {/* Individual CTA Button with 3D Depth */}
                  <div className="pt-2">
                    <a
                      href={`${BARBEARIA_CONFIG.whatsappUrl}?text=${encodeURIComponent(
                        service.whatsappMessage
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`btn-3d w-full flex items-center justify-center gap-2 py-3 px-4 rounded-md text-xs sm:text-sm font-semibold transition-all group ${
                        isFeatured
                          ? "btn-3d-gold bg-[#d4af37] hover:bg-[#ecc94b] text-[#0d0f12]"
                          : "btn-3d-dark bg-[#181b22] hover:bg-[#222631] text-[#e5e7eb] border border-[#d4af37]/30 hover:border-[#d4af37]/60"
                      }`}
                    >
                      <WhatsAppIcon className="w-4 h-4 shrink-0 animate-icon-pulse" />
                      <span>AGENDAR ESTE SERVIÇO</span>
                    </a>
                  </div>
                </div>
              </FadeInSection>
            );
          })}
        </div>

        {/* Informative Note for Chemical Services with Smoked Glass */}
        <div className="mt-12 p-6 rounded-2xl card-smoke-glass max-w-3xl mx-auto flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
          <div className="w-11 h-11 rounded-full bg-[#d4af37]/15 border border-[#d4af37]/40 flex items-center justify-center shrink-0 text-[#d4af37] shadow-lg">
            <Sparkles className="w-5 h-5 animate-icon-pulse" />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#f5f5f7] mb-1 font-serif">
              Dúvidas sobre procedimentos químicos ou corte personalizado?
            </h4>
            <p className="text-xs sm:text-sm text-[#b0b5c1] leading-relaxed">
              O valor dos procedimentos químicos (platinado, luzes, coloração) varia conforme o comprimento do cabelo e o processo técnico. Envie uma foto de referência pelo WhatsApp para confirmar o orçamento e o tempo estimado de procedimento com o Kauan.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
