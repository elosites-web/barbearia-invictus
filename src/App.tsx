import React, { useState } from "react";
import { Header } from "./components/Header";
import { ScrollProgressBar } from "./components/ScrollProgressBar";
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

  return (
    <div className="min-h-screen bg-[#0b0c10] text-[#e2e4e9] font-sans antialiased selection:bg-[#d4af37]/20 selection:text-[#f3e5ab]">
      {/* Viewport Scroll Progress Bar */}
      <ScrollProgressBar />

      {/* Top Navigation */}
      <Header onOpenCommercialModal={() => setCommercialModalOpen(true)} />

      {/* Main Content Sections */}
      <main>
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

        {/* Section 6: Avaliações dos Clientes (Fade in) */}
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

      {/* Section 8: Footer */}
      <Footer
        onOpenPrivacyModal={() => setPrivacyModalOpen(true)}
        onOpenCommercialModal={() => setCommercialModalOpen(true)}
      />

      {/* Floating WhatsApp Action Button */}
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
