import React, { useState, useEffect } from "react";
import { BARBEARIA_CONFIG } from "../data/barbeariaData";
import { Menu, X } from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";

interface HeaderProps {
  onOpenCommercialModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCommercialModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Início", href: "#inicio" },
    { label: "Serviços", href: "#servicos" },
    { label: "Nosso Trabalho", href: "#trabalho" },
    { label: "A Barbearia", href: "#experiencia" },
    { label: "Avaliações", href: "#avaliacoes" },
    { label: "Localização", href: "#localizacao" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0b0c10]/95 backdrop-blur-md border-b border-[#d4af37]/20 shadow-xl py-3"
          : "bg-gradient-to-b from-[#0b0c10]/90 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          {/* Zone 1: Brand Zone */}
          <a
            href="#inicio"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] rounded-lg"
            aria-label="Barbearia Invictus - Página Inicial"
          >
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-[#d4af37]/40 shadow-md group-hover:border-[#d4af37] transition-all bg-[#15171e]">
              <picture>
                <source srcSet={BARBEARIA_CONFIG.logoPath} type="image/webp" />
                <source srcSet={BARBEARIA_CONFIG.logoFallbackPath} type="image/png" />
                <img
                  src={BARBEARIA_CONFIG.logoPath}
                  alt="Logotipo Barbearia Invictus"
                  width={44}
                  height={44}
                  loading="eager"
                  decoding="sync"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </picture>
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-lg sm:text-xl font-bold tracking-wider text-[#f5f5f7] group-hover:text-[#d4af37] transition-colors whitespace-nowrap">
                {BARBEARIA_CONFIG.signature}
              </span>
              <span className="text-[10px] sm:text-[11px] font-sans tracking-widest text-[#9ca3af] uppercase -mt-1 whitespace-nowrap">
                {BARBEARIA_CONFIG.signatureSub}
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#c5c8d1]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative py-1 hover:text-[#f3e5ab] transition-colors whitespace-nowrap after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-[#d4af37] hover:after:w-full after:transition-all after:duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Primary Action & Controls */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={onOpenCommercialModal}
              className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#c5c8d1] bg-[#1a1d24] border border-[#d4af37]/25 rounded-md hover:border-[#d4af37]/60 hover:text-[#d4af37] transition-all"
              title="Ver proposta comercial e checklist do projeto"
            >
              <span>Proposta</span>
            </button>

            <a
              href={`${BARBEARIA_CONFIG.whatsappUrl}?text=${encodeURIComponent(
                BARBEARIA_CONFIG.defaultWhatsappMessage
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 text-xs sm:text-sm font-semibold text-[#0d0f12] bg-[#d4af37] hover:bg-[#ecc94b] active:scale-95 transition-all rounded-md shadow-sm whitespace-nowrap"
            >
              <WhatsAppIcon className="w-4 h-4 shrink-0" />
              <span className="hidden sm:inline">AGENDAR HORÁRIO</span>
              <span className="sm:hidden">AGENDAR</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-[#e2e4e9] hover:text-[#d4af37] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] rounded-md shrink-0 bg-[#161922] border border-[#2b303d]"
              aria-label={mobileMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[65px] bg-[#0d0f14]/98 border-b border-[#d4af37]/20 backdrop-blur-xl px-6 py-6 shadow-2xl transition-all">
          <nav className="flex flex-col gap-4 text-base font-medium text-[#d1d5db]">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2 border-b border-[#222630] hover:text-[#d4af37] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 flex flex-col gap-3">
              <a
                href={`${BARBEARIA_CONFIG.whatsappUrl}?text=${encodeURIComponent(
                  BARBEARIA_CONFIG.defaultWhatsappMessage
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 w-full py-3 text-sm font-semibold text-[#0d0f12] bg-[#d4af37] rounded-md shadow-md"
              >
                <WhatsAppIcon className="w-4 h-4 shrink-0" />
                <span>Agendar pelo WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCommercialModal();
                }}
                className="py-2.5 text-xs text-center text-[#9ca3af] hover:text-[#d4af37] border border-[#333742] rounded-md"
              >
                Ver Checklist da Proposta para Kauan
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
