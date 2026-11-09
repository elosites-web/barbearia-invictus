import React from "react";
import { AMENITIES } from "../data/barbeariaData";
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
        return <UserCheck className="w-6 h-6 text-[#d4af37] animate-icon-pulse" />;
      case "Sparkles":
        return <Sparkles className="w-6 h-6 text-[#d4af37] animate-icon-pulse" />;
      case "Coffee":
        return <Coffee className="w-6 h-6 text-[#d4af37] animate-icon-float" />;
      case "DoorOpen":
        return <DoorOpen className="w-6 h-6 text-[#d4af37] animate-icon-wiggle" />;
      case "Smile":
        return <Smile className="w-6 h-6 text-[#d4af37] animate-icon-wiggle" />;
      case "CreditCard":
        return <CreditCard className="w-6 h-6 text-[#d4af37] animate-icon-float" />;
      case "Smartphone":
        return <Smartphone className="w-6 h-6 text-[#d4af37] animate-icon-pulse" />;
      default:
        return <ShieldCheck className="w-6 h-6 text-[#d4af37] animate-icon-pulse" />;
    }
  };

  return (
    <section id="experiencia" className="py-24 bg-transparent relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#d4af37] uppercase mb-3">
            <Compass className="w-3.5 h-3.5 animate-icon-float" />
            <span>ESTRUTURA & COMODIDADES</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f5f5f7] tracking-tight mb-4">
            MAIS DO QUE UM CORTE. UMA BOA EXPERIÊNCIA.
          </h2>
          <p className="text-base text-[#9ca3af] leading-relaxed">
            Aqui você encontra um ambiente pensado para o seu conforto, com atendimento cuidadoso, recepção de qualidade e facilidade no pagamento.
          </p>
        </div>

        {/* Amenities Bento Grid with Smoked Glassmorphism Effect */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {AMENITIES.map((item, idx) => {
            const isLarge = idx === 0;
            return (
              <div
                key={item.id}
                className={`p-7 rounded-2xl card-smoke-glass card-smoke-glass-hover flex flex-col justify-between ${
                  isLarge
                    ? "md:col-span-2 lg:col-span-2 border-[#d4af37]/45 shadow-[0_0_30px_rgba(212,175,55,0.1)]"
                    : ""
                }`}
              >
                <div>
                  <div className="w-13 h-13 rounded-xl bg-[#181d28]/90 border border-[#d4af37]/35 flex items-center justify-center mb-5 shadow-lg">
                    {getIcon(item.iconName)}
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#f5f5f7] mb-2 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#b2b7c4] leading-relaxed">
                    {item.description}
                  </p>
                </div>

                {isLarge && (
                  <div className="mt-6 pt-4 border-t border-[#232734]/80 flex items-center gap-2 text-xs text-[#d4af37] font-medium">
                    <ShieldCheck className="w-4 h-4 animate-icon-pulse shrink-0" />
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
