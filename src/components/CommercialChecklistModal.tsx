import React, { useEffect } from "react";
import { COMMERCIAL_CHECKLIST, BARBEARIA_CONFIG } from "../data/barbeariaData";
import { X, CheckCircle2, Clock, AlertTriangle, ShieldCheck, ArrowRight } from "lucide-react";

interface CommercialChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommercialChecklistModal: React.FC<CommercialChecklistModalProps> = ({
  isOpen,
  onClose,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="relative max-w-2xl w-full bg-[#12151d] border border-[#d4af37]/40 rounded-2xl p-6 sm:p-8 shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#232734] mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#d4af37] mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Apresentação Comercial & Checklist Técnico</span>
            </div>
            <h3 className="font-serif text-2xl font-bold text-[#f5f5f7]">
              Proposta de Modernização — Barbearia Invictus
            </h3>
            <p className="text-xs text-[#9ca3af] mt-1">
              Documento executivo para alinhamento com o proprietário <strong>{BARBEARIA_CONFIG.owner}</strong>.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-[#9ca3af] hover:text-white bg-[#1a1e27] hover:bg-[#252a37] rounded-lg transition-colors"
            aria-label="Fechar modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Executive summary pillars */}
        <div className="space-y-4 mb-8">
          <h4 className="text-sm font-bold text-[#e5e7eb] uppercase tracking-wider">
            Evoluções em relação ao site Wix anterior:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-lg bg-[#161a23] border border-[#262c3b]">
              <p className="font-semibold text-[#f3e5ab] mb-1">✦ Conversão Direta no WhatsApp</p>
              <p className="text-[#9ca3af]">
                Cada serviço possui botão próprio com mensagem pré-preenchida, eliminando atrito de agendamento.
              </p>
            </div>
            <div className="p-3.5 rounded-lg bg-[#161a23] border border-[#262c3b]">
              <p className="font-semibold text-[#f3e5ab] mb-1">✦ 100% Fotos Reais & Autênticas</p>
              <p className="text-[#9ca3af]">
                Sem banco de imagens genérico. Apenas os cortes reais e de alta definição realizados na Invictus.
              </p>
            </div>
            <div className="p-3.5 rounded-lg bg-[#161a23] border border-[#262c3b]">
              <p className="font-semibold text-[#f3e5ab] mb-1">✦ SEO Local Google & Schema</p>
              <p className="text-[#9ca3af]">
                Configuração Schema.org BarberShop para destacar o endereço, telefone e horário no Google de Jundiaí.
              </p>
            </div>
            <div className="p-3.5 rounded-lg bg-[#161a23] border border-[#262c3b]">
              <p className="font-semibold text-[#f3e5ab] mb-1">✦ Mobile-First Ultrarrápido</p>
              <p className="text-[#9ca3af]">
                Carregamento leve e instantâneo no celular, sem os travamentos do construtor antigo.
              </p>
            </div>
          </div>
        </div>

        {/* Checklist for Kauan */}
        <div className="mb-8">
          <h4 className="text-sm font-bold text-[#e5e7eb] uppercase tracking-wider mb-3">
            O que ainda depende de confirmação com Kauan:
          </h4>
          <div className="space-y-3">
            {COMMERCIAL_CHECKLIST.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-lg bg-[#0e1016] border border-[#232734] flex items-start gap-3"
              >
                {item.status.includes("Pendente") || item.status.includes("confirmar") ? (
                  <AlertTriangle className="w-4 h-4 text-[#ecc94b] shrink-0 mt-0.5" />
                ) : (
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                )}
                <div className="text-xs">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="font-bold text-[#f5f5f7]">{item.topic}</span>
                    <span className="text-[10px] text-[#9ca3af] bg-[#1a1e27] px-1.5 py-0.5 rounded border border-[#2b303d]">
                      {item.status}
                    </span>
                  </div>
                  <p className="text-[#9ca3af]">{item.details}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer actions */}
        <div className="pt-4 border-t border-[#232734] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[11px] text-[#6b7280]">
            Pronto para publicação e integração comercial definitiva.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold text-[#0d0f12] bg-[#d4af37] hover:bg-[#ecc94b] rounded-md transition-colors"
          >
            Continuar Navegando no Protótipo
          </button>
        </div>
      </div>
    </div>
  );
};
