import React, { useState } from "react";
import { FAQ_ITEMS } from "../data/barbeariaData";
import { HelpCircle, ChevronDown } from "lucide-react";

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-20 bg-transparent border-t border-[#1a1e27]/40 relative scroll-mt-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold tracking-widest text-[#d4af37] uppercase mb-3">
            <HelpCircle className="w-3.5 h-3.5 animate-icon-float" />
            <span>TIRA-DÚVIDAS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#f5f5f7] tracking-tight mb-3">
            PERGUNTAS FREQUENTES
          </h2>
          <p className="text-sm text-[#9ca3af]">
            Informações práticas sobre atendimento, agendamentos e formas de pagamento.
          </p>
        </div>

        {/* Accordion List with Smoked Glassmorphism Effect */}
        <div className="space-y-3.5">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl card-smoke-glass overflow-hidden transition-all duration-300"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(idx)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] group cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-serif text-base sm:text-lg font-bold text-[#f5f5f7] pr-4 group-hover:text-[#f3e5ab] transition-colors drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                    {item.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full bg-[#1b1f29]/90 border border-[#2d3340] flex items-center justify-center shrink-0 text-[#d4af37] transition-all duration-300 shadow-md ${
                      isOpen ? "rotate-180 bg-[#d4af37]/25 border-[#d4af37]/50" : "group-hover:border-[#d4af37]/40"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4 animate-icon-pulse" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm text-[#c0c5d2] leading-relaxed border-t border-[#1c202a]/60">
                    {item.answer}
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
