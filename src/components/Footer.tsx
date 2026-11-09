import React from "react";
import { BARBEARIA_CONFIG } from "../data/barbeariaData";
import { Instagram, Facebook, Mail, MapPin, ExternalLink } from "lucide-react";
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
    <footer className="relative bg-[#060709] border-t border-[#1b1f2b] text-[#9ca3af] pt-16 pb-32 sm:pb-36 overflow-hidden">
      
      {/* =========================================================================
          BACKGROUND PERSONALIZADO COM MAQUININHA DE BARBEIRO E NAVALHA (Transparente)
          ========================================================================= */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none z-0 overflow-hidden flex items-center justify-between opacity-[0.16]"
      >
        {/* Maquininha de Barbeiro Profissional Ilustrada à Esquerda */}
        <div className="w-[340px] sm:w-[420px] h-full flex items-center -ml-16 transform -rotate-12">
          <svg viewBox="0 0 200 400" className="w-full h-full fill-none stroke-[#d4af37]" strokeWidth="2.5">
            {/* Lâmina em T (T-Blade) */}
            <path d="M 40,40 L 160,40 L 145,70 L 55,70 Z" fill="#d4af37" fillOpacity="0.3" />
            <path d="M 40,30 L 160,30 L 160,40 L 40,40 Z" fill="#d4af37" fillOpacity="0.5" />
            {/* Dentes da lâmina */}
            {Array.from({ length: 14 }).map((_, i) => (
              <line key={i} x1={46 + i * 8} y1="30" x2={46 + i * 8} y2="18" strokeWidth="2" />
            ))}
            {/* Parafusos de fixação */}
            <circle cx="70" cy="55" r="4" fill="#d4af37" />
            <circle cx="130" cy="55" r="4" fill="#d4af37" />
            {/* Corpo / Carcaça Metálica da Maquininha */}
            <path d="M 55,70 Q 50,110 52,180 Q 54,260 62,310 L 138,310 Q 146,260 148,180 Q 150,110 145,70 Z" fill="#d4af37" fillOpacity="0.1" strokeWidth="3" />
            {/* Ranhuras de empunhadura antiderrapante */}
            {Array.from({ length: 8 }).map((_, i) => (
              <line key={i} x1="68" y1={110 + i * 16} x2="132" y2={110 + i * 16} strokeWidth="1.8" strokeDasharray="4 4" />
            ))}
            {/* Chave liga/desliga mecânica */}
            <rect x="90" y="250" width="20" height="35" rx="4" fill="#d4af37" fillOpacity="0.4" />
            <circle cx="100" cy="268" r="4" fill="#d4af37" />
            {/* Base e argola de suporte */}
            <path d="M 75,310 L 85,340 L 115,340 L 125,310 Z" fill="#d4af37" fillOpacity="0.2" />
            <circle cx="100" cy="355" r="14" strokeWidth="3" />
          </svg>
        </div>

        {/* Navalha de Barbeiro Clássica Ilustrada à Direita */}
        <div className="w-[340px] sm:w-[460px] h-full flex items-center -mr-12 transform rotate-12">
          <svg viewBox="0 0 400 300" className="w-full h-full fill-none stroke-[#d4af37]" strokeWidth="2.5">
            {/* Lâmina aberta em ângulo */}
            <path
              d="M 120,130 L 320,40 C 340,30 365,42 360,65 L 348,105 C 338,125 290,140 260,145 L 120,135 Z"
              fill="#d4af37"
              fillOpacity="0.25"
              strokeWidth="3"
            />
            {/* Fio de corte polido da lâmina */}
            <line x1="120" y1="135" x2="350" y2="105" stroke="#ffffff" strokeWidth="2.5" />
            <path d="M 280,75 L 330,55" strokeWidth="1.5" strokeOpacity="0.6" />
            {/* Espinha da navalha e espigão / tang */}
            <path d="M 120,130 L 60,145 C 45,150 35,138 45,125 C 55,115 70,120 85,125 L 120,130" strokeWidth="2.5" />
            {/* Pino de articulação central */}
            <circle cx="100" cy="132" r="6" fill="#d4af37" strokeWidth="2" />
            <circle cx="100" cy="132" r="2.5" fill="#111" />
            {/* Cabo ergonômico dobrado para baixo */}
            <path
              d="M 100,132 Q 160,210 270,245 Q 330,265 375,225"
              stroke="#d4af37"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
            />
            <path
              d="M 108,138 Q 165,210 268,242"
              stroke="#ffffff"
              strokeWidth="1.5"
              strokeOpacity="0.4"
              fill="none"
            />
          </svg>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Minimalist Top Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 pb-12 border-b border-[#1b1f2b]">
          
          {/* Brand & Slogan Minimalist Column */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-[#d4af37]/40 bg-[#12141a] p-0.5 flex items-center justify-center">
                  <picture>
                    <source srcSet={BARBEARIA_CONFIG.logoPath} type="image/webp" />
                    <source srcSet={BARBEARIA_CONFIG.logoFallbackPath} type="image/png" />
                    <img
                      src={BARBEARIA_CONFIG.logoFallbackPath}
                      alt="Logotipo Barbearia Invictus"
                      width={40}
                      height={40}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-contain"
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
            </div>

            {/* Redes Sociais com SUAS CORES OFICIAIS e Profundidade 3D */}
            <div>
              <span className="text-xs font-semibold text-[#f3e5ab] uppercase tracking-wider block mb-3 font-serif">
                Canais Oficiais
              </span>
              <div className="flex items-center gap-3">
                {/* Instagram (Cor Oficial: Gradiente Magenta / Roxo / Amarelo) */}
                <a
                  href={BARBEARIA_CONFIG.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-3d btn-3d-instagram w-10 h-10 rounded-xl bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-all group"
                  aria-label="Instagram Oficial da Barbearia Invictus"
                  title="Instagram Oficial"
                >
                  <Instagram className="w-5 h-5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] animate-icon-wiggle" />
                </a>

                {/* WhatsApp (Cor Oficial: Verde WhatsApp #25D366) */}
                <a
                  href={`${BARBEARIA_CONFIG.whatsappUrl}?text=${encodeURIComponent(
                    BARBEARIA_CONFIG.defaultWhatsappMessage
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-3d btn-3d-whatsapp w-10 h-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-all group"
                  aria-label="WhatsApp Oficial da Barbearia Invictus"
                  title="WhatsApp Oficial"
                >
                  <WhatsAppIcon className="w-5 h-5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] animate-icon-pulse" />
                </a>

                {/* Facebook (Cor Oficial: Azul Facebook #1877F2) */}
                <a
                  href={BARBEARIA_CONFIG.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-3d btn-3d-facebook w-10 h-10 rounded-xl bg-[#1877F2] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-all group"
                  aria-label="Facebook Oficial da Barbearia Invictus"
                  title="Facebook Oficial"
                >
                  <Facebook className="w-5 h-5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] animate-icon-float" />
                </a>

                {/* Google Maps / Avaliações (Cor Oficial Google #4285F4) */}
                <a
                  href={BARBEARIA_CONFIG.socials.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-3d btn-3d-google w-10 h-10 rounded-xl bg-[#4285F4] text-white flex items-center justify-center shadow-lg hover:scale-105 transition-all group"
                  aria-label="Perfil da Empresa no Google Maps"
                  title="Ver no Google Maps"
                >
                  <MapPin className="w-5 h-5 drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)] animate-icon-pulse" />
                </a>
              </div>
            </div>
          </div>

          {/* Minimalist Navigation Column */}
          <div className="lg:col-span-3">
            <h4 className="font-serif text-sm font-bold text-[#f5f5f7] uppercase tracking-wider mb-4">
              Navegação
            </h4>
            <ul className="space-y-2.5 text-sm">
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
                  A Barbearia & Conforto
                </a>
              </li>
              <li>
                <a href="#avaliacoes" className="hover:text-[#d4af37] transition-colors">
                  Depoimentos de Clientes
                </a>
              </li>
              <li>
                <a href="#localizacao" className="hover:text-[#d4af37] transition-colors">
                  Localização & Horários
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#d4af37] transition-colors">
                  Perguntas Frequentes (FAQ)
                </a>
              </li>
            </ul>
          </div>

          {/* Minimalist Local Info Column */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <h4 className="font-serif text-sm font-bold text-[#f5f5f7] uppercase tracking-wider mb-4">
                Jundiaí - SP
              </h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 mt-0.5 animate-icon-float" />
                  <span>{BARBEARIA_CONFIG.address.full}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0 animate-icon-pulse" />
                  <span>WhatsApp: {BARBEARIA_CONFIG.phoneFormatted}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-[#d4af37] shrink-0 animate-icon-float" />
                  <span>{BARBEARIA_CONFIG.email}</span>
                </li>
              </ul>
            </div>

            <div className="mt-6 pt-4 border-t border-[#1b1f2b]">
              <button
                type="button"
                onClick={onOpenCommercialModal}
                className="btn-3d btn-3d-dark inline-flex items-center gap-2 px-3 py-1.5 text-xs text-[#d4af37] bg-[#12151d] border border-[#d4af37]/30 rounded-md group"
              >
                <span>Checklist da Proposta Comercial</span>
                <ExternalLink className="w-3.5 h-3.5 animate-icon-float" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Minimalist Legal Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6b7280]">
          <p>
            © {currentYear} {BARBEARIA_CONFIG.name}. Todos os direitos reservados.
            <span className="block sm:inline sm:ml-2 text-[#9ca3af]">
              Controlador dos dados: {BARBEARIA_CONFIG.owner} (Barbearia Invictus).
            </span>
          </p>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onOpenPrivacyModal}
              className="text-[#9ca3af] hover:text-[#d4af37] underline transition-colors"
            >
              Política de Privacidade (LGPD)
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
