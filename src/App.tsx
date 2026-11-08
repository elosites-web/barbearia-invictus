import React, { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { ScrollProgressBar } from "./components/ScrollProgressBar";
import { BarberBackgroundPattern } from "./components/BarberBackgroundPattern";
import { Hero } from "./components/Hero";
import { FadeInSection } from "./components/FadeInSection";
import { ServicesSection } from "./components/ServicesSection";
import { GallerySection } from "./components/GallerySection";
import { ExperienceSection } from "./components/ExperienceSection";
import { ReviewsSection } from "./components/ReviewsSection";
import { LocationSection } from "./components/LocationSection";
import { FaqSection } from "./components/FaqSection";
import { Footer } from "./components/Footer";
import { FloatingWhatsApp } from "./components/FloatingWhatsApp";
import { CommercialChecklistModal } from "./components/CommercialChecklistModal";
import { PrivacyPolicyModal } from "./components/PrivacyPolicyModal";

export default function App() {
  const [commercialModalOpen, setCommercialModalOpen] = useState(false);
  const [privacyModalOpen, setPrivacyModalOpen] = useState(false);

  // Global handler: Adiciona profundidade em todos os botões para dar sensação de clique.
  // Deixa botões saltados e ao clicar o botão fica pressionado; ao clicar outro, volta ao normal.
  useEffect(() => {
    const handleGlobalButtonClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const buttonEl = target.closest(
        "button, a.btn-3d, [role='button']"
      ) as HTMLElement | null;

      if (buttonEl) {
        // Remove estado pressionado de qualquer outro botão anterior
        const currentlyPressed = document.querySelectorAll('[data-pressed="true"]');
        currentlyPressed.forEach((el) => {
          if (el !== buttonEl) {
            el.removeAttribute("data-pressed");
          }
        });

        // Aplica o estado pressionado no botão clicado
        buttonEl.setAttribute("data-pressed", "true");
      }
    };

    document.addEventListener("click", handleGlobalButtonClick, { capture: true });
    return () => document.removeEventListener("click", handleGlobalButtonClick, { capture: true });
  }, []);

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#e2e4e9] font-sans antialiased selection:bg-[#d4af37]/20 selection:text-[#f3e5ab] relative overflow-x-hidden">
      {/* Background sutil com itens de barbearia (navalhas, tesouras, pentes, maquininhas) */}
      <BarberBackgroundPattern />

      {/* Viewport Scroll Progress Bar (Navalha desenhando o risquinho / Tesoura cortando) */}
      <ScrollProgressBar />

      {/* Top Navigation com scrollspy e menu mobile otimizado */}
      <Header onOpenCommercialModal={() => setCommercialModalOpen(true)} />

      {/* Main Content Sections */}
      <main className="relative z-10">
        {/* Section 2: Hero (Immediate display) */}
        <Hero />

        {/* Section 3: Serviços e Valores (Fade in) */}
        <FadeInSection>
          <ServicesSection />
        </FadeInSection>

        {/* Section 4: Nosso Trabalho / Galeria (Fade in) */}
        <FadeInSection>
          <GallerySection />
        </FadeInSection>

        {/* Section 5: A Experiência Invictus (Fade in) */}
        <FadeInSection>
          <ExperienceSection />
        </FadeInSection>

        {/* Section 6: Avaliações dos Clientes (Carrossel 3D e Ziguezague) */}
        <FadeInSection>
          <ReviewsSection />
        </FadeInSection>

        {/* Section 7: Localização, Horários e Contato (Fade in) */}
        <FadeInSection>
          <LocationSection />
        </FadeInSection>

        {/* Section FAQ (Fade in) */}
        <FadeInSection>
          <FaqSection />
        </FadeInSection>
      </main>

      {/* Section 8: Footer Minimalista com Maquininha e Navalha no Fundo */}
      <Footer
        onOpenPrivacyModal={() => setPrivacyModalOpen(true)}
        onOpenCommercialModal={() => setCommercialModalOpen(true)}
      />

      {/* Floating WhatsApp Action Button com Spring Bounce */}
      <FloatingWhatsApp />

      {/* Commercial Proposal Checklist Modal for Kauan */}
      <CommercialChecklistModal
        isOpen={commercialModalOpen}
        onClose={() => setCommercialModalOpen(false)}
      />

      {/* LGPD Privacy Policy Modal */}
      <PrivacyPolicyModal
        isOpen={privacyModalOpen}
        onClose={() => setPrivacyModalOpen(false)}
      />
    </div>
  );
}
