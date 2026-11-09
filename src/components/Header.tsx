import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { BARBEARIA_CONFIG } from "../data/barbeariaData";
import {
  Menu,
  X,
  ArrowUpRight,
  Calendar,
  Home,
  Scissors,
  Camera,
  Compass,
  Star,
  MapPin,
  HelpCircle,
} from "lucide-react";

interface HeaderProps {
  onOpenCommercialModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenCommercialModal }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("inicio");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Track window scroll and active section for anchor optimization
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sectionIds = ["inicio", "servicos", "trabalho", "experiencia", "avaliacoes", "localizacao", "faq"];
      const scrollPosition = window.scrollY + 140;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock page scroll when mobile menu is open, allow menu scroll freely (especially in horizontal/landscape view)
  // IMPORTANT: Only set body overflow to avoid breaking document scroll offsets or smooth-scroll behavior
  useEffect(() => {
    if (mobileMenuOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileMenuOpen]);

  // Navigation Links with custom Lucide Icons & smooth hover micro-animations (spin, pulse, float, wobble)
  const navLinks = [
    {
      label: "Início",
      href: "#inicio",
      id: "inicio",
      Icon: Home,
      hoverClass: "group-hover:scale-125 group-hover:-translate-y-0.5 group-hover:rotate-[-6deg]",
    },
    {
      label: "Serviços",
      href: "#servicos",
      id: "servicos",
      Icon: Scissors,
      hoverClass: "group-hover:rotate-[-22deg] group-hover:scale-125",
    },
    {
      label: "Nosso Trabalho",
      href: "#trabalho",
      id: "trabalho",
      Icon: Camera,
      hoverClass: "group-hover:rotate-14 group-hover:scale-125",
    },
    {
      label: "A Barbearia",
      href: "#experiencia",
      id: "experiencia",
      Icon: Compass,
      hoverClass: "group-hover:rotate-45 group-hover:scale-125",
    },
    {
      label: "Avaliações",
      href: "#avaliacoes",
      id: "avaliacoes",
      Icon: Star,
      hoverClass: "group-hover:rotate-[36deg] group-hover:scale-130 group-hover:fill-[#d4af37]",
    },
    {
      label: "Localização",
      href: "#localizacao",
      id: "localizacao",
      Icon: MapPin,
      hoverClass: "group-hover:-translate-y-1 group-hover:scale-125",
    },
    {
      label: "FAQ",
      href: "#faq",
      id: "faq",
      Icon: HelpCircle,
      hoverClass: "group-hover:rotate-[-18deg] group-hover:scale-125",
    },
  ];

  const handleNavClick = () => {
    setMobileMenuOpen(false);
  };

  const toggleMobileMenu = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMobileMenuOpen((prev) => !prev);
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        {/* Background layer with blur and border - separate from header container to prevent trapping fixed children */}
        <div
          className={`absolute inset-0 pointer-events-none transition-all duration-300 ${
            isScrolled
              ? "bg-[#0b0c10]/95 backdrop-blur-md border-b border-[#d4af37]/25 shadow-2xl py-3"
              : "bg-gradient-to-b from-[#0b0c10]/95 via-[#0b0c10]/80 to-transparent py-4 sm:py-5"
          }`}
        />

        <div className={`relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-300 ${isScrolled ? "py-2.5 sm:py-3" : "py-3.5 sm:py-4"}`}>
          <div className="flex items-center justify-between gap-4 sm:gap-8">
            
            {/* Zone 1: Brand Zone */}
            <a
              href="#inicio"
              onClick={handleNavClick}
              className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] rounded-lg shrink-0"
              aria-label="Barbearia Invictus - Início"
            >
              <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border border-[#d4af37]/40 shadow-md group-hover:border-[#d4af37] group-hover:scale-105 transition-all bg-[#15171e] p-0.5 flex items-center justify-center">
                <picture>
                  <source srcSet={BARBEARIA_CONFIG.logoPath} type="image/webp" />
                  <source srcSet={BARBEARIA_CONFIG.logoFallbackPath} type="image/png" />
                  <img
                    src={BARBEARIA_CONFIG.logoFallbackPath}
                    alt="Logotipo Barbearia Invictus"
                    width={44}
                    height={44}
                    loading="eager"
                    decoding="sync"
                    className="w-full h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </picture>
              </div>
              <div className="flex flex-col">
                <span className="font-serif text-lg sm:text-xl font-bold tracking-wider text-[#f5f5f7] group-hover:text-[#d4af37] transition-colors whitespace-nowrap">
                  {BARBEARIA_CONFIG.signature}
                </span>
                <span className="text-[10px] sm:text-[11px] font-sans tracking-widest text-[#d4af37] uppercase -mt-1 whitespace-nowrap">
                  {BARBEARIA_CONFIG.signatureSub}
                </span>
              </div>
            </a>

            {/* Zone 2: Navigation Links with Animated Hover Icons (Desktop Anchor Navigation) */}
            <nav className="hidden xl:flex items-center gap-5 lg:gap-6 text-sm font-medium text-[#c5c8d1]">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                const IconComponent = link.Icon;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={`group relative flex items-center gap-1.5 py-1 transition-all duration-200 whitespace-nowrap ${
                      isActive ? "text-[#f3e5ab] font-semibold" : "text-[#9ca3af] hover:text-[#f5f5f7]"
                    }`}
                  >
                    {/* Icon with smooth hover animation (rotation, pulse, float, and gold glow) */}
                    <IconComponent
                      className={`w-3.5 h-3.5 transition-all duration-300 ease-out will-change-transform ${
                        isActive
                          ? "text-[#d4af37] scale-110 drop-shadow-[0_0_6px_rgba(212,175,55,0.7)]"
                          : "text-[#7d8594] group-hover:text-[#fef08a]"
                      } ${link.hoverClass} group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.75)]`}
                    />
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#d4af37] rounded-full shadow-[0_0_8px_#d4af37]" />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Zone 3: Primary Action & Controls (with 3D button depth & animated hover icons) */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              <button
                type="button"
                onClick={onOpenCommercialModal}
                className="btn-3d btn-3d-dark hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#c5c8d1] bg-[#1a1d24] border border-[#d4af37]/30 rounded-md hover:text-[#d4af37] group"
                title="Ver proposta comercial e checklist do projeto"
              >
                <span>Proposta</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#d4af37] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:scale-120 transition-transform duration-200" />
              </button>

              <a
                href={`${BARBEARIA_CONFIG.whatsappUrl}?text=${encodeURIComponent(
                  BARBEARIA_CONFIG.defaultWhatsappMessage
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-3d btn-3d-gold inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-bold text-[#0d0f12] bg-[#d4af37] hover:bg-[#ecc94b] rounded-md whitespace-nowrap group"
              >
                <Calendar className="w-4 h-4 shrink-0 text-[#0d0f12] animate-calendar-beat group-hover:scale-125 transition-transform duration-200" />
                <span className="hidden sm:inline">AGENDAR HORÁRIO</span>
                <span className="sm:hidden">AGENDAR</span>
              </a>

              {/* Mobile Menu Toggle Button (with 3D depth, animated icon, and independent pointer-events) */}
              <button
                type="button"
                onClick={toggleMobileMenu}
                aria-expanded={mobileMenuOpen}
                aria-controls="mobile-navigation-drawer"
                aria-label={mobileMenuOpen ? "Fechar menu de navegação" : "Abrir menu de navegação"}
                className="btn-3d btn-3d-dark xl:hidden p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center text-[#e2e4e9] hover:text-[#d4af37] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#d4af37] rounded-md shrink-0 bg-[#161922] border border-[#2b303d] relative z-50 pointer-events-auto cursor-pointer group"
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-[#f3e5ab] animate-icon-wiggle group-hover:rotate-90 group-hover:scale-115 transition-transform duration-200" />
                ) : (
                  <Menu className="w-5 h-5 text-[#e2e4e9] animate-icon-float group-hover:scale-115 group-hover:text-[#f3e5ab] transition-all duration-200" />
                )}
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* =========================================================================
          MOBILE DRAWER VIA PORTAL:
          Rendered directly into document.body to NEVER be constrained by parent header!
          Scroll da página TRAVADO e Scroll do Menu TOTALMENTE LIVRE (mesmo em tela horizontal)
          ========================================================================= */}
      {mounted &&
        mobileMenuOpen &&
        createPortal(
          <div
            id="mobile-navigation-drawer"
            className="xl:hidden fixed inset-x-0 top-[56px] sm:top-[64px] bottom-0 z-[80] overflow-y-auto overscroll-contain bg-[#0c0e14]/98 border-b border-[#d4af37]/35 backdrop-blur-2xl px-6 py-6 shadow-2xl flex flex-col justify-between"
            style={{
              WebkitOverflowScrolling: "touch",
              touchAction: "pan-y",
            }}
          >
            <nav className="flex flex-col gap-3 text-base font-medium text-[#d1d5db]">
              <div className="flex items-center justify-between pb-2 border-b border-[#222630]">
                <span className="text-[11px] font-semibold text-[#d4af37] tracking-wider uppercase font-serif">
                  Navegação Rápida
                </span>
                <span className="text-[10px] text-[#9ca3af]">Toque para ir à seção</span>
              </div>

              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                const IconComponent = link.Icon;
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={handleNavClick}
                    className={`group py-2.5 px-3.5 rounded-lg flex items-center justify-between border-b border-[#1f232d] transition-all duration-200 ${
                      isActive
                        ? "text-[#f3e5ab] bg-[#1a1e27] border-l-2 border-l-[#d4af37] font-semibold shadow-inner"
                        : "text-[#d1d5db] hover:text-[#d4af37] hover:bg-[#141720]"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <IconComponent
                        className={`w-4 h-4 transition-all duration-300 ease-out will-change-transform ${
                          isActive ? "text-[#d4af37] scale-110 drop-shadow-[0_0_6px_rgba(212,175,55,0.7)]" : "text-[#8e95a5] group-hover:text-[#fef08a]"
                        } ${link.hoverClass} group-hover:drop-shadow-[0_0_8px_rgba(212,175,55,0.75)]`}
                      />
                      <span>{link.label}</span>
                    </div>
                    {isActive ? (
                      <span className="w-2 h-2 rounded-full bg-[#d4af37] shadow-[0_0_6px_#d4af37]" />
                    ) : (
                      <span className="text-xs text-[#4b5563] group-hover:text-[#d4af37] group-hover:translate-x-1 transition-transform">→</span>
                    )}
                  </a>
                );
              })}

              {/* Actions inside mobile drawer */}
              <div className="pt-4 flex flex-col gap-3">
                <a
                  href={`${BARBEARIA_CONFIG.whatsappUrl}?text=${encodeURIComponent(
                    BARBEARIA_CONFIG.defaultWhatsappMessage
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleNavClick}
                  className="btn-3d btn-3d-gold flex items-center justify-center gap-2 w-full py-3.5 text-sm font-bold text-[#0d0f12] bg-[#d4af37] hover:bg-[#ecc94b] rounded-md group shadow-lg"
                >
                  <Calendar className="w-4 h-4 shrink-0 text-[#0d0f12] animate-calendar-beat group-hover:scale-125 transition-transform" />
                  <span>AGENDAR HORÁRIO NO WHATSAPP</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCommercialModal();
                  }}
                  className="btn-3d btn-3d-dark py-2.5 text-xs text-center text-[#9ca3af] hover:text-[#d4af37] bg-[#141720] border border-[#333742] rounded-md"
                >
                  Ver Checklist da Proposta para Kauan
                </button>
              </div>
            </nav>

            {/* Drawer footer info */}
            <div className="pt-6 mt-6 border-t border-[#1f232d] text-xs text-[#6b7280] text-center">
              <p className="font-serif text-[#d4af37] font-bold">Barbearia Invictus</p>
              <p className="mt-0.5 text-[#9ca3af]">Rua Rio de Janeiro, 266 · Jardim Tarumã · Jundiaí - SP</p>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
