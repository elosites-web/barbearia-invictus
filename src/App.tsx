import React, { useState } from "react";
import { Header } from "./components/Header";
import { ScrollProgressBar } from "./components/ScrollProgressBar";
import { Hero } from "./components/Hero";
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
        {/* Section 2: Hero */}
        <Hero />

        {/* Section 3: Serviços e Valores */}
        <ServicesSection />

        {/* Section 4: Nosso Trabalho (Galeria com Fotos Reais) */}
        <GallerySection />

        {/* Section 5: A Experiência Invictus (Comodidades) */}
        <ExperienceSection />

        {/* Section 6: Avaliações dos Clientes */}
        <ReviewsSection />

        {/* Section 7: Localização, Horários e Contato */}
        <LocationSection />

        {/* Section FAQ */}
        <FaqSection />
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
