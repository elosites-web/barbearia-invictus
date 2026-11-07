import React from "react";
import { AMENITIES, BARBEARIA_CONFIG } from "../data/barbeariaData";
import {
  UserCheck,
  Sparkles,
  Coffee,
  DoorOpen,
  Smile,
  CreditCard,
  Smartphone,
  ShieldCheck,
  Compass,
} from "lucide-react";

export const ExperienceSection: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "UserCheck":
        return <UserCheck className="w-6 h-6 text-[#d4af37]" />;
      case "Sparkles":
        return <Sparkles className="w-6 h-6 text-[#d4af37]" />;
      case "Coffee":
        return <Coffee className="w-6 h-6 text-[#d4af37]" />;
      case "DoorOpen":
        return <DoorOpen className="w-6 h-6 text-[#d4af37]" />;
      case "Smile":
        return <Smile className="w-6 h-6 text-[#d4af37]" />;
      case "CreditCard":
        return <CreditCard className="w-6 h-6 text-[#d4af37]" />;
      case "Smartphone":
        return <Smartphone className="w-6 h-6 text-[#d4af37]" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-[#d4af37]" />;
    }
  };

  return (
    <section id="experiencia" className="py-24 bg-[#0b0c10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#d4af37] uppercase mb-3">
            <Compass className="w-3.5 h-3.5" />
            <span>ESTRUTURA & COMODIDADES</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f5f5f7] tracking-tight mb-4">
            MAIS DO QUE UM CORTE. UMA BOA EXPERIÊNCIA.
          </h2>
          <p className="text-base text-[#9ca3af] leading-relaxed">
            Aqui você encontra um ambiente pensado para o seu conforto, com atendimento cuidadoso, recepção de qualidade e facilidade no pagamento.
          </p>
        </div>

        {/* Amenities Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AMENITIES.map((item, idx) => {
            const isLarge = idx === 0; // First item "Atendimento presencial" has marquee presence
            return (
              <div
                key={item.id}
                className={`p-7 rounded-xl bg-[#12151d] border border-[#232734] hover:border-[#d4af37]/40 transition-all duration-300 flex flex-col justify-between ${
                  isLarge ? "md:col-span-2 lg:col-span-2 bg-gradient-to-br from-[#161922] to-[#11131a]" : ""
                }`}
              >
                <div>
                  <div className="w-12 h-12 rounded-lg bg-[#1a1e27] border border-[#d4af37]/25 flex items-center justify-center mb-5">
                    {getIcon(item.iconName)}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#f5f5f7] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#9ca3af] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {isLarge && (
                  <div className="mt-6 pt-4 border-t border-[#232734] flex items-center gap-2 text-xs text-[#d4af37]">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Compromisso com o estilo e satisfação de cada cliente em Jundiaí</span>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
