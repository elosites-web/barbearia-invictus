import React, { useEffect } from "react";
import { BARBEARIA_CONFIG } from "../data/barbeariaData";
import { X, Shield } from "lucide-react";

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({
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
        className="relative max-w-2xl w-full card-smoke-glass rounded-2xl p-6 sm:p-8 shadow-2xl my-8 max-h-[85vh] overflow-y-auto text-[#d1d5db]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#232734]/80 mb-6">
          <div className="flex items-center gap-2.5">
            <div className="p-2.5 rounded-xl bg-[#d4af37]/15 text-[#d4af37] border border-[#d4af37]/30 shadow-md">
              <Shield className="w-5 h-5 animate-icon-pulse" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-[#f5f5f7]">
                Política de Privacidade & Termos de Uso
              </h3>
              <p className="text-xs text-[#a0a6b5]">
                Conformidade com a LGPD (Lei Geral de Proteção de Dados - Lei 13.709/2018)
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="btn-3d btn-3d-dark p-2 text-[#9ca3af] hover:text-white bg-[#1a1e27] hover:bg-[#252a37] rounded-lg transition-colors group"
            aria-label="Fechar política de privacidade"
          >
            <X className="w-5 h-5 animate-icon-wiggle" />
          </button>
        </div>

        {/* Content with Smoked Glass Cards */}
        <div className="space-y-4 text-xs sm:text-sm text-[#b2b7c4] leading-relaxed">
          <div className="p-4 rounded-xl card-smoke-glass">
            <h4 className="font-bold text-[#f5f5f7] mb-1 font-serif">1. Controlador dos Dados</h4>
            <p>
              O controlador dos dados pessoais tratados no âmbito deste site institucional é a{" "}
              <strong>Barbearia Invictus</strong>, sob responsabilidade de <strong>{BARBEARIA_CONFIG.owner}</strong>, estabelecida na Rua Rio de Janeiro, 266, Jardim Tarumã, Jundiaí - SP.
            </p>
          </div>

          <div className="p-4 rounded-xl card-smoke-glass">
            <h4 className="font-bold text-[#f5f5f7] mb-1 font-serif">2. Coleta e Finalidade dos Dados</h4>
            <p>
              Este site não realiza cadastro compulsório, cobrança online ou armazenamento de cookies invasivos. Os únicos dados eventualmente fornecidos pelo usuário ocorrem ao iniciar uma conversa voluntária pelo aplicativo WhatsApp ou pelo endereço de e-mail da barbearia, com o propósito exclusivo de:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-1">
              <li>Identificar o cliente para reserva e agendamento de horário;</li>
              <li>Confirmar ou reagendar procedimentos solicitados;</li>
              <li>Responder a dúvidas sobre serviços e orçamentos.</li>
            </ul>
          </div>

          <div className="p-4 rounded-xl card-smoke-glass">
            <h4 className="font-bold text-[#f5f5f7] mb-1 font-serif">3. Compartilhamento e Armazenamento</h4>
            <p>
              A Barbearia Invictus não comercializa, não aluga e não repassa informações de contato a terceiros. Os dados trafegam diretamente pela infraestrutura de comunicação do WhatsApp (Meta Platforms) ou provedor de e-mail do próprio usuário.
            </p>
          </div>

          <div className="p-4 rounded-xl card-smoke-glass">
            <h4 className="font-bold text-[#f5f5f7] mb-1 font-serif">4. Direitos do Titular (LGPD)</h4>
            <p>
              Em conformidade com o Artigo 18 da Lei 13.709/2018, o titular dos dados possui o direito de solicitar a qualquer momento a confirmação de tratamento, correção de dados incompletos ou a exclusão de seu histórico de mensagens e agendamentos, mediante contato com {BARBEARIA_CONFIG.email}.
            </p>
          </div>

          <div className="p-3.5 bg-[#0d0f14]/90 rounded-xl border border-[#232734] text-[11px] text-[#7d8494]">
            <strong>Nota jurídica:</strong> Este é um modelo padrão adaptado para prestadores de serviços e pequenos negócios locais. Recomenda-se a revisão por assessoria jurídica antes do lançamento comercial definitivo em domínio próprio.
          </div>
        </div>

        {/* Action */}
        <div className="mt-6 pt-4 border-t border-[#232734]/80 flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="btn-3d btn-3d-gold px-5 py-2 text-xs font-bold text-[#0d0f12] bg-[#d4af37] hover:bg-[#ecc94b] rounded-md transition-colors"
          >
            Entendido e Fechar
          </button>
        </div>
      </div>
    </div>
  );
};
