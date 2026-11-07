import React from "react";
import { BARBEARIA_CONFIG, SERVICES } from "../data/barbeariaData";
import { MessageCircle, Scissors, Sparkles, Check, Info } from "lucide-react";

export const ServicesSection: React.FC = () => {
  return (
    <section id="servicos" className="py-24 bg-[#0b0c10] relative">
      {/* Decorative subtle divider */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#d4af37]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#d4af37] uppercase mb-3">
            <Scissors className="w-3.5 h-3.5" />
            <span>CARDÁPIO DE SERVIÇOS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f5f5f7] tracking-tight mb-4">
            SERVIÇOS E VALORES
          </h2>
          <p className="text-base text-[#9ca3af] leading-relaxed">
            Transparência, técnica de ponta e produtos selecionados. Escolha o procedimento e agende seu horário com praticidade diretamente no WhatsApp.
          </p>
        </div>

        {/* Services Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {SERVICES.map((service) => {
            const isFeatured = service.id === "corte";

            return (
              <div
                key={service.id}
                className={`relative flex flex-col justify-between p-6 sm:p-7 rounded-xl transition-all duration-300 card-dark card-dark-hover ${
                  isFeatured
                    ? "border-[#d4af37]/50 shadow-[0_0_25px_rgba(212,175,55,0.08)] bg-gradient-to-b from-[#1b1e26] to-[#12141a]"
                    : "border-[#252932]"
                }`}
              >
                {/* Featured Badge if applicable */}
                {service.tag && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#d4af37] text-[#0d0f12] text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow">
                    {service.tag}
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
                  <div className="mb-5 pb-5 border-b border-[#252932]">
                    <div className="flex items-baseline gap-1">
                      <span className="font-serif text-3xl font-extrabold text-[#f3e5ab] tabular-nums">
                        {service.price}
                      </span>
                      {service.id === "quimica" && (
                        <span className="text-xs text-[#9ca3af] font-medium">/ a partir</span>
                      )}
                    </div>
                    {service.priceNote && (
                      <p className="text-[11px] text-[#d4af37] mt-1 font-medium flex items-center gap-1">
                        <Info className="w-3 h-3 shrink-0" />
                        <span>{service.priceNote}</span>
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-sm text-[#9ca3af] leading-relaxed mb-6">
                    {service.description}
                  </p>
                </div>

                {/* Individual CTA Button */}
                <div className="pt-2">
                  <a
                    href={`${BARBEARIA_CONFIG.whatsappUrl}?text=${encodeURIComponent(
                      service.whatsappMessage
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-md text-xs sm:text-sm font-semibold transition-all ${
                      isFeatured
                        ? "bg-[#d4af37] hover:bg-[#ecc94b] text-[#0d0f12] shadow-md shadow-[#d4af37]/20"
                        : "bg-[#181b22] hover:bg-[#222631] text-[#e5e7eb] border border-[#d4af37]/30 hover:border-[#d4af37]/60"
                    }`}
                  >
                    <MessageCircle className="w-4 h-4 shrink-0 fill-current" />
                    <span>AGENDAR ESTE SERVIÇO</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Informative Note for Chemical Services */}
        <div className="mt-10 p-5 rounded-xl bg-[#12141a] border border-[#d4af37]/20 max-w-3xl mx-auto flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
          <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center shrink-0 text-[#d4af37]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[#f5f5f7] mb-1">
              Dúvidas sobre procedimentos químicos ou corte personalizado?
            </h4>
            <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
              O valor dos procedimentos químicos (platinado, luzes, coloração) varia conforme o comprimento do cabelo e o processo técnico. Envie uma foto de referência pelo WhatsApp para confirmar o orçamento e o tempo estimado de procedimento com o Kauan.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
