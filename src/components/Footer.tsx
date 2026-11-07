import React from "react";
import { BARBEARIA_CONFIG } from "../data/barbeariaData";
import { Instagram, Facebook, Mail, MapPin } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";

interface FooterProps {
  onOpenPrivacyModal: () => void;
  onOpenCommercialModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacyModal,
  onOpenCommercialModal,
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#07080a] border-t border-[#1c202a] text-[#9ca3af] pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#1c202a]">
          
          {/* Brand Col */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden border border-[#d4af37]/40 bg-[#12141a]">
                <picture>
                  <source srcSet={BARBEARIA_CONFIG.logoPath} type="image/webp" />
                  <source srcSet={BARBEARIA_CONFIG.logoFallbackPath} type="image/png" />
                  <img
                    src={BARBEARIA_CONFIG.logoPath}
                    alt="Logotipo Barbearia Invictus"
                    width={40}
                    height={40}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </picture>
              </div>
              <div>
                <span className="font-serif text-xl font-bold tracking-wider text-[#f5f5f7] block">
                  {BARBEARIA_CONFIG.signature}
                </span>
                <span className="text-[10px] font-sans tracking-widest text-[#d4af37] uppercase block -mt-1">
                  {BARBEARIA_CONFIG.signatureSub}
                </span>
              </div>
            </div>

            <p className="text-sm text-[#9ca3af] leading-relaxed mb-6 max-w-sm">
              &ldquo;{BARBEARIA_CONFIG.slogan}&rdquo;
            </p>

            <div className="flex items-center gap-3">
              <a
                href={BARBEARIA_CONFIG.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#141720] hover:bg-[#d4af37] text-[#9ca3af] hover:text-[#0b0c10] border border-[#232734] flex items-center justify-center transition-colors"
                aria-label="Instagram da Barbearia Invictus"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={BARBEARIA_CONFIG.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#141720] hover:bg-[#d4af37] text-[#9ca3af] hover:text-[#0b0c10] border border-[#232734] flex items-center justify-center transition-colors"
                aria-label="Facebook da Barbearia Invictus"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={`${BARBEARIA_CONFIG.whatsappUrl}?text=${encodeURIComponent(
                  BARBEARIA_CONFIG.defaultWhatsappMessage
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-[#141720] hover:bg-[#d4af37] text-[#9ca3af] hover:text-[#0b0c10] border border-[#232734] flex items-center justify-center transition-colors"
                aria-label="WhatsApp da Barbearia Invictus"
              >
                <WhatsAppIcon className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-sm font-bold text-[#f5f5f7] uppercase tracking-wider mb-4">
              Navegação
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#inicio" className="hover:text-[#d4af37] transition-colors">
                  Início
                </a>
              </li>
              <li>
                <a href="#servicos" className="hover:text-[#d4af37] transition-colors">
                  Serviços e Valores
                </a>
              </li>
              <li>
                <a href="#trabalho" className="hover:text-[#d4af37] transition-colors">
                  Galeria de Cortes
                </a>
              </li>
              <li>
                <a href="#experiencia" className="hover:text-[#d4af37] transition-colors">
                  A Barbearia & Comodidades
                </a>
              </li>
              <li>
                <a href="#avaliacoes" className="hover:text-[#d4af37] transition-colors">
                  Depoimentos de Clientes
                </a>
              </li>
              <li>
                <a href="#localizacao" className="hover:text-[#d4af37] transition-colors">
                  Localização e Horários
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-4">
            <h4 className="font-serif text-sm font-bold text-[#f5f5f7] uppercase tracking-wider mb-4">
              Atendimento em Jundiaí
            </h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5" />
                <span>{BARBEARIA_CONFIG.address.full}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <WhatsAppIcon className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>WhatsApp: {BARBEARIA_CONFIG.phoneFormatted}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#d4af37] shrink-0" />
                <span>{BARBEARIA_CONFIG.email}</span>
              </li>
            </ul>

            <div className="mt-5 pt-4 border-t border-[#1c202a]">
              <button
                type="button"
                onClick={onOpenCommercialModal}
                className="text-xs text-[#d4af37] hover:underline"
              >
                → Visualizar Checklist da Proposta para Kauan
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Legal bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6b7280]">
          <p>
            © {currentYear} {BARBEARIA_CONFIG.name}. Todos os direitos reservados.
            <span className="block sm:inline sm:ml-2">
              Controlador dos dados: {BARBEARIA_CONFIG.owner} (Barbearia Invictus).
            </span>
          </p>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onOpenPrivacyModal}
              className="hover:text-[#9ca3af] underline"
            >
              Política de Privacidade (LGPD)
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
