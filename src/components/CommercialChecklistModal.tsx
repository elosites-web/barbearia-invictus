import React, { useEffect, useRef } from "react";
import { COMMERCIAL_CHECKLIST, BARBEARIA_CONFIG } from "../data/barbeariaData";
import {
  X,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  FileText,
  MessageCircle,
  Camera,
  Search,
  Smartphone,
} from "lucide-react";

interface CommercialChecklistModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CommercialChecklistModal: React.FC<CommercialChecklistModalProps> = ({
  isOpen,
  onClose,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Focus management & scroll lock
  useEffect(() => {
    if (!isOpen) return;

    previousActiveElement.current = document.activeElement as HTMLElement | null;

    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;

    document.body.style.overflow = "hidden";
    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }

    // Set initial focus
    const focusTimer = setTimeout(() => {
      const closeBtn = modalRef.current?.querySelector<HTMLButtonElement>("button");
      closeBtn?.focus();
    }, 50);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      // Focus trap
      if (e.key === "Tab" && modalRef.current) {
        const focusable = modalRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (focusable.length === 0) return;

        const firstElement = focusable[0];
        const lastElement = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === firstElement) {
          e.preventDefault();
          lastElement.focus();
        } else if (!e.shiftKey && document.activeElement === lastElement) {
          e.preventDefault();
          firstElement.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
      previousActiveElement.current?.focus?.();
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-checklist-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-3 sm:p-5 md:p-6 overflow-y-auto animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="relative max-w-2xl w-full card-smoke-glass rounded-2xl p-5 sm:p-7 md:p-8 shadow-2xl my-auto max-h-[92dvh] overflow-y-auto focus:outline-none border border-[#d4af37]/40"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Executivo */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-[#232734]/80 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#d4af37] mb-1 font-serif">
              <FileText className="w-4 h-4 text-[#d4af37]" />
              <span>Documento de Apresentação Comercial</span>
            </div>
            <h2 id="modal-checklist-title" className="font-serif text-xl sm:text-2xl font-bold text-[#f5f5f7]">
              Checklist da Proposta Comercial — Barbearia Invictus
            </h2>
            <p className="text-xs sm:text-sm text-[#a0a6b5] mt-1 leading-relaxed">
              Guia executivo para alinhamento de informações com o proprietário <strong>{BARBEARIA_CONFIG.owner}</strong>.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="btn-3d btn-3d-dark p-2 text-[#9ca3af] hover:text-white bg-[#1a1e27] hover:bg-[#252a37] rounded-lg transition-colors shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37]"
            aria-label="Fechar modal do checklist"
          >
            <X className="w-5 h-5 text-[#d4af37]" />
          </button>
        </div>

        {/* Pilares Comerciais Concretos e Demonstráveis */}
        <div className="mb-7">
          <h3 className="text-xs font-bold text-[#e5e7eb] uppercase tracking-wider font-serif mb-3">
            Pilares da Nova Presença Digital:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl card-smoke-glass border border-[#262c3b]">
              <div className="flex items-center gap-2 text-[#f3e5ab] font-bold mb-1.5">
                <MessageCircle className="w-4 h-4 text-[#25D366] shrink-0" />
                <span>Contato facilitado pelo WhatsApp</span>
              </div>
              <p className="text-[#a0a6b5] leading-relaxed">
                O visitante encontra serviços, informações e caminhos diretos para conversar com a barbearia.
              </p>
            </div>

            <div className="p-3.5 rounded-xl card-smoke-glass border border-[#262c3b]">
              <div className="flex items-center gap-2 text-[#f3e5ab] font-bold mb-1.5">
                <Camera className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>Trabalhos reais em destaque</span>
              </div>
              <p className="text-[#a0a6b5] leading-relaxed">
                Galeria baseada nas fotografias disponibilizadas para apresentar o trabalho autêntico da equipe.
              </p>
            </div>

            <div className="p-3.5 rounded-xl card-smoke-glass border border-[#262c3b]">
              <div className="flex items-center gap-2 text-[#f3e5ab] font-bold mb-1.5">
                <Search className="w-4 h-4 text-[#4285F4] shrink-0" />
                <span>Presença preparada para buscas locais</span>
              </div>
              <p className="text-[#a0a6b5] leading-relaxed">
                Estrutura inicial de SEO local e informações comerciais organizada para facilitar a identificação da barbearia pelos mecanismos de busca.
              </p>
            </div>

            <div className="p-3.5 rounded-xl card-smoke-glass border border-[#262c3b]">
              <div className="flex items-center gap-2 text-[#f3e5ab] font-bold mb-1.5">
                <Smartphone className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>Experiência adaptada ao celular</span>
              </div>
              <p className="text-[#a0a6b5] leading-relaxed">
                Layout responsivo para facilitar a consulta dos serviços, fotografias, avaliações e contatos em diferentes dispositivos.
              </p>
            </div>
          </div>
        </div>

        {/* 9 Itens do Checklist com Status Transparente */}
        <div className="mb-7">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs font-bold text-[#e5e7eb] uppercase tracking-wider font-serif">
              Status dos Itens do Projeto:
            </h3>
            <span className="text-[10px] text-[#9ca3af]">9 itens para validação</span>
          </div>

          <div className="space-y-3">
            {COMMERCIAL_CHECKLIST.map((item) => {
              const isApplied = item.statusType === "success";
              const isWarning = item.statusType === "warning";

              return (
                <div
                  key={item.itemNumber}
                  className="p-3.5 rounded-xl card-smoke-glass border border-[#262c3b] flex items-start gap-3"
                >
                  <div className="mt-0.5 shrink-0">
                    {isApplied ? (
                      <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
                    ) : isWarning ? (
                      <AlertTriangle className="w-4 h-4 text-[#ecc94b]" />
                    ) : (
                      <HelpCircle className="w-4 h-4 text-[#93c5fd]" />
                    )}
                  </div>

                  <div className="text-xs w-full">
                    <div className="flex flex-wrap items-center justify-between gap-1.5 mb-1">
                      <span className="font-bold text-[#f5f5f7]">
                        ITEM {item.itemNumber} — {item.topic.toUpperCase()}
                      </span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                          isApplied
                            ? "bg-[#22c55e]/15 text-[#86efac] border border-[#22c55e]/30"
                            : isWarning
                            ? "bg-[#eab308]/15 text-[#fde047] border border-[#eab308]/30"
                            : "bg-[#3b82f6]/15 text-[#bfdbfe] border border-[#3b82f6]/30"
                        }`}
                      >
                        {item.status}
                      </span>
                    </div>
                    <p className="text-[#a0a6b5] leading-relaxed text-[11px] sm:text-xs">
                      {item.details}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mensagem Comercial e Fechamento */}
        <div className="pt-5 border-t border-[#232734]/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-[#9ca3af] leading-relaxed text-center sm:text-left">
            Este protótipo apresenta uma proposta de modernização da presença digital da Barbearia Invictus. A publicação definitiva depende da aprovação do projeto e da confirmação das informações comerciais e materiais necessários.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="btn-3d btn-3d-gold w-full sm:w-auto px-5 py-2.5 text-xs font-bold text-[#0d0f12] bg-[#d4af37] hover:bg-[#ecc94b] rounded-md transition-colors whitespace-nowrap shrink-0"
          >
            Continuar conhecendo a proposta
          </button>
        </div>
      </div>
    </div>
  );
};
