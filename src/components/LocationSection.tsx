import React from "react";
import { BARBEARIA_CONFIG, OPENING_HOURS } from "../data/barbeariaData";
import {
  MapPin,
  Clock,
  Mail,
  Instagram,
  Facebook,
  ExternalLink,
  AlertCircle,
} from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";

export const LocationSection: React.FC = () => {
  return (
    <section id="localizacao" className="py-24 bg-transparent relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#d4af37] uppercase mb-3">
            <MapPin className="w-3.5 h-3.5 animate-icon-float" />
            <span>ONDE ESTAMOS & HORÁRIOS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f5f5f7] tracking-tight mb-4">
            ESTAMOS ESPERANDO POR VOCÊ.
          </h2>
          <p className="text-base text-[#9ca3af] leading-relaxed">
            Localização de fácil acesso no Jardim Tarumã em Jundiaí, com estacionamento tranquilo nas proximidades e atendimento com hora marcada.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Column 1: Informações e Horários com Vidro Fumê */}
          <div className="lg:col-span-5 flex flex-col justify-between p-7 sm:p-8 rounded-2xl card-smoke-glass shadow-2xl">
            <div>
              {/* Address */}
              <div className="mb-8">
                <span className="text-xs font-semibold text-[#d4af37] uppercase tracking-wider block mb-2 font-serif">
                  Endereço
                </span>
                <p className="font-serif text-lg font-bold text-[#f5f5f7] mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  {BARBEARIA_CONFIG.name}
                </p>
                <p className="text-sm text-[#b5bbc7] leading-relaxed">
                  {BARBEARIA_CONFIG.address.street}, {BARBEARIA_CONFIG.address.neighborhood}
                  <br />
                  {BARBEARIA_CONFIG.address.city} - {BARBEARIA_CONFIG.address.state}, CEP {BARBEARIA_CONFIG.address.cep}
                </p>

                <div className="flex flex-wrap gap-3 mt-4">
                  <a
                    href={BARBEARIA_CONFIG.socials.googleMaps}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-3d btn-3d-dark inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#f3e5ab] bg-[#1d212b]/90 border border-[#d4af37]/35 hover:border-[#d4af37] rounded-md transition-all shadow-md group"
                  >
                    <ExternalLink className="w-3.5 h-3.5 animate-icon-float" />
                    <span>Ver no Google Maps</span>
                  </a>
                  <a
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                      BARBEARIA_CONFIG.address.full
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-3d btn-3d-dark inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-[#e5e7eb] bg-[#1d212b]/90 border border-[#333946] hover:border-[#9ca3af] rounded-md transition-all shadow-md group"
                  >
                    <MapPin className="w-3.5 h-3.5 text-[#d4af37] animate-icon-pulse" />
                    <span>Como Chegar (Rotas)</span>
                  </a>
                </div>
              </div>

              {/* Horários de Funcionamento */}
              <div className="mb-8 pt-6 border-t border-[#232734]/70">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-semibold text-[#d4af37] uppercase tracking-wider flex items-center gap-1.5 font-serif">
                    <Clock className="w-4 h-4 animate-icon-pulse" />
                    Horários de Funcionamento
                  </span>
                  <span className="text-[10px] font-medium text-[#9ca3af] bg-[#171a24]/90 px-2 py-0.5 rounded border border-[#2d3340]">
                    Ref. Google
                  </span>
                </div>

                <div className="space-y-2 text-xs sm:text-sm">
                  {OPENING_HOURS.map((item) => (
                    <div
                      key={item.day}
                      className="flex items-center justify-between py-1.5 border-b border-[#1c202a]/60"
                    >
                      <span className="text-[#a0a6b5]">{item.day}</span>
                      <span
                        className={`font-semibold ${
                          item.isOpenDay ? "text-[#f5f5f7] tabular-nums" : "text-[#f87171]"
                        }`}
                      >
                        {item.hours}
                      </span>
                    </div>
                  ))}
                </div>

                <p className="text-[11px] text-[#787f90] mt-3 flex items-start gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0 text-[#d4af37] mt-0.5 animate-icon-pulse" />
                  <span>
                    Horários de referência Google — recomendamos confirmar antecipadamente pelo WhatsApp.
                  </span>
                </p>
              </div>

              {/* Contacts with Animated Icons */}
              <div className="pt-6 border-t border-[#232734]/70 space-y-3">
                <a
                  href={`${BARBEARIA_CONFIG.whatsappUrl}?text=${encodeURIComponent(
                    BARBEARIA_CONFIG.defaultWhatsappMessage
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-sm text-[#e5e7eb] hover:text-[#d4af37] transition-colors group"
                >
                  <WhatsAppIcon className="w-4 h-4 text-[#25D366] shrink-0 animate-icon-pulse" />
                  <span className="font-medium">WhatsApp: {BARBEARIA_CONFIG.phoneFormatted}</span>
                </a>

                <a
                  href={`mailto:${BARBEARIA_CONFIG.email}`}
                  className="flex items-center gap-3 text-sm text-[#e5e7eb] hover:text-[#d4af37] transition-colors group"
                >
                  <Mail className="w-4 h-4 text-[#d4af37] shrink-0 animate-icon-float" />
                  <span className="font-medium">{BARBEARIA_CONFIG.email}</span>
                </a>
              </div>
            </div>

            {/* Social Links with Animated Icons */}
            <div className="mt-8 pt-6 border-t border-[#232734]/70 flex items-center justify-between">
              <span className="text-xs text-[#a0a6b5]">Siga a barbearia:</span>
              <div className="flex items-center gap-3">
                <a
                  href={BARBEARIA_CONFIG.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-3d btn-3d-instagram p-2 rounded-xl bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white shadow-md transition-all group"
                  aria-label="Instagram Barbearia Invictus"
                >
                  <Instagram className="w-4 h-4 animate-icon-wiggle" />
                </a>
                <a
                  href={BARBEARIA_CONFIG.socials.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-3d btn-3d-facebook p-2 rounded-xl bg-[#1877F2] text-white shadow-md transition-all group"
                  aria-label="Facebook Barbearia Invictus"
                >
                  <Facebook className="w-4 h-4 animate-icon-float" />
                </a>
              </div>
            </div>

          </div>

          {/* Column 2: Map & Visual Guide with Smoked Glass Border */}
          <div className="lg:col-span-7 flex flex-col rounded-2xl overflow-hidden card-smoke-glass shadow-2xl min-h-[480px]">
            {/* Map Frame */}
            <div className="relative w-full h-[400px] lg:h-full min-h-[350px] bg-[#101218]">
              <iframe
                title="Localização da Barbearia Invictus no Google Maps"
                src={BARBEARIA_CONFIG.socials.mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[20%] contrast-[110%]"
              />
            </div>

            {/* Bottom Map Bar with Smoked Glass */}
            <div className="p-4 sm:p-5 bg-[#0e1016]/95 border-t border-[#232734]/70 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md">
              <div className="flex items-center gap-2 text-xs text-[#c5cbd6] text-center sm:text-left font-medium">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 animate-icon-pulse" />
                <span>Rua Rio de Janeiro, 266 · Jardim Tarumã · Jundiaí - SP</span>
              </div>

              <a
                href={BARBEARIA_CONFIG.socials.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-3d btn-3d-gold inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#0d0f12] bg-[#d4af37] hover:bg-[#ecc94b] rounded-md transition-all whitespace-nowrap shadow-md group"
              >
                <span>ABRIR NO GOOGLE MAPS</span>
                <ExternalLink className="w-3.5 h-3.5 animate-icon-float" />
              </a>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
