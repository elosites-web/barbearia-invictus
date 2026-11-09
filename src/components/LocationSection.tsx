import React, { useState } from "react";
import { BARBEARIA_CONFIG, OPENING_HOURS } from "../data/barbeariaData";
import {
  MapPin,
  Clock,
  Mail,
  Instagram,
  Facebook,
  ExternalLink,
  AlertCircle,
  RotateCcw,
} from "lucide-react";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { GoogleMapsIcon } from "./GoogleMapsIcon";
import { WazeIcon } from "./WazeIcon";

export const LocationSection: React.FC = () => {
  const [isMapRevealed, setIsMapRevealed] = useState(false);

  return (
    <section id="localizacao" className="py-20 sm:py-24 bg-transparent relative scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-widest text-[#d4af37] uppercase mb-3">
            <MapPin className="w-3.5 h-3.5 animate-icon-float" />
            <span>ONDE ESTAMOS & HORÁRIOS</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#f5f5f7] tracking-tight mb-4">
            ESTAMOS ESPERANDO POR VOCÊ.
          </h2>
          <p className="text-sm sm:text-base text-[#9ca3af] leading-relaxed">
            Localização de fácil acesso no Jardim Tarumã em Jundiaí, com estacionamento tranquilo nas proximidades e atendimento com hora marcada.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Column 1: Informações e Horários com Vidro Fumê */}
          <div className="lg:col-span-5 flex flex-col justify-between p-6 sm:p-8 rounded-2xl card-smoke-glass shadow-2xl">
            <div>
              {/* Address */}
              <div className="mb-7">
                <span className="text-xs font-semibold text-[#d4af37] uppercase tracking-wider block mb-2 font-serif">
                  Endereço
                </span>
                <p className="font-serif text-lg font-bold text-[#f5f5f7] mb-1 drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                  {BARBEARIA_CONFIG.name}
                </p>
                <p className="text-xs sm:text-sm text-[#b5bbc7] leading-relaxed">
                  {BARBEARIA_CONFIG.address.street}, {BARBEARIA_CONFIG.address.neighborhood}
                  <br />
                  {BARBEARIA_CONFIG.address.city} - {BARBEARIA_CONFIG.address.state}, CEP {BARBEARIA_CONFIG.address.cep}
                </p>
              </div>

              {/* Horários de Funcionamento */}
              <div className="mb-7 pt-6 border-t border-[#232734]/70">
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
            <div className="mt-7 pt-6 border-t border-[#232734]/70 flex items-center justify-between">
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

          {/* Column 2: Mapa Interativo Personalizado & Navegação GPS */}
          <div className="lg:col-span-7 flex flex-col rounded-2xl overflow-hidden card-smoke-glass shadow-2xl min-h-[500px]">
            
            {/* Map Frame Container com Camada Visual Personalizada */}
            <div className="relative w-full h-[380px] sm:h-[420px] lg:h-full min-h-[360px] bg-[#0c0e14] overflow-hidden">
              
              {/* Mapa Real no Google Maps Embed */}
              <iframe
                title="Localização da Barbearia Invictus no Google Maps"
                src={BARBEARIA_CONFIG.socials.mapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className={`w-full h-full transition-all duration-700 ${
                  isMapRevealed
                    ? "grayscale-0 contrast-100"
                    : "grayscale-[25%] contrast-[105%]"
                }`}
              />

              {/* Camada Sobreposta Personalizada Inicial */}
              <div
                role="button"
                tabIndex={isMapRevealed ? -1 : 0}
                aria-label="Toque para visualizar e interagir com o mapa real"
                aria-hidden={isMapRevealed}
                onClick={() => setIsMapRevealed(true)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setIsMapRevealed(true);
                  }
                }}
                className={`absolute inset-0 z-20 flex flex-col items-center justify-center p-6 text-center select-none transition-all duration-700 ease-out cursor-pointer ${
                  isMapRevealed
                    ? "opacity-0 pointer-events-none scale-105"
                    : "opacity-100 pointer-events-auto bg-[#0a0d14]/82 backdrop-blur-[5px] hover:bg-[#0a0d14]/75"
                }`}
              >
                {/* Brilho dourado ambiental de fundo */}
                <div className="w-48 h-48 bg-[#d4af37]/15 rounded-full blur-3xl absolute pointer-events-none" />

                {/* Logotipo Oficial da Barbearia Invictus preservado */}
                <div className="relative mb-4 group">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-[2px] bg-gradient-to-br from-[#d4af37] via-[#f3e5ab] to-[#8c671a] shadow-[0_12px_32px_rgba(212,175,55,0.25)] flex items-center justify-center transition-transform duration-300 group-hover:scale-105">
                    <div className="w-full h-full rounded-full bg-[#0d0f14] p-1 flex items-center justify-center overflow-hidden">
                      <picture>
                        <source srcSet={BARBEARIA_CONFIG.logoPath} type="image/webp" />
                        <img
                          src={BARBEARIA_CONFIG.logoFallbackPath}
                          alt={`Logotipo oficial ${BARBEARIA_CONFIG.name}`}
                          width={112}
                          height={112}
                          className="w-full h-full object-contain rounded-full"
                        />
                      </picture>
                    </div>
                  </div>
                </div>

                {/* Título e Endereço Sintético */}
                <h3 className="font-serif text-lg sm:text-xl font-bold text-[#f5f5f7] tracking-wider mb-1 drop-shadow-md">
                  BARBEARIA INVICTUS
                </h3>
                <p className="text-xs text-[#d4af37] font-semibold tracking-widest uppercase mb-4">
                  Rua Rio de Janeiro, 266 · Jardim Tarumã
                </p>

                {/* Indicação Minimalista com Ícone de Localização */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#131620]/95 border border-[#d4af37]/60 text-[#f3e5ab] text-xs sm:text-sm font-semibold shadow-xl hover:border-[#d4af37] hover:bg-[#1a1f2e] transition-all">
                  <MapPin className="w-4 h-4 text-[#d4af37] animate-icon-pulse" />
                  <span>Toque para visualizar o mapa</span>
                </div>
              </div>

              {/* Botão sutil para restaurar a capa quando o mapa estiver ativo */}
              {isMapRevealed && (
                <button
                  type="button"
                  onClick={() => setIsMapRevealed(false)}
                  className="btn-3d btn-3d-dark absolute top-3 right-3 z-20 inline-flex items-center gap-1.5 px-3 py-1.5 text-[11px] font-semibold text-[#f3e5ab] bg-[#0c0e15]/90 hover:bg-[#161a24] border border-[#d4af37]/40 rounded-full shadow-lg backdrop-blur-md transition-all focus:outline-none"
                  title="Ocultar mapa e restaurar capa personalizada"
                >
                  <RotateCcw className="w-3 h-3 text-[#d4af37]" />
                  <span>Restaurar capa</span>
                </button>
              )}
            </div>

            {/* Bottom Bar: Endereço & Opções Independentes de Navegação GPS (Google Maps & Waze) */}
            <div className="p-4 sm:p-5 bg-[#0e1016]/95 border-t border-[#232734]/70 flex flex-col gap-3.5 backdrop-blur-md">
              
              {/* Linha de Endereço */}
              <div className="flex items-center gap-2 text-xs text-[#cbd5e1] font-medium justify-center sm:justify-start">
                <MapPin className="w-4 h-4 text-[#d4af37] shrink-0 animate-icon-pulse" />
                <span className="truncate">Rua Rio de Janeiro, 266 · Jardim Tarumã · Jundiaí - SP</span>
              </div>

              {/* Opções de Navegação GPS com Marcas Oficiais */}
              <div className="flex flex-col sm:flex-row items-center gap-2.5 sm:gap-3 w-full">
                
                {/* Opção 1: Google Maps */}
                <a
                  href={BARBEARIA_CONFIG.socials.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-3d btn-3d-dark flex-1 w-full inline-flex items-center justify-center gap-2.5 px-4 py-2.5 text-xs sm:text-sm font-bold text-[#f5f5f7] bg-[#141720]/95 hover:bg-[#1b202c] border border-[#374151] hover:border-[#4285F4]/70 rounded-lg transition-all shadow-md group"
                  title="Navegar até a Barbearia Invictus com Google Maps (abre em nova aba)"
                >
                  <GoogleMapsIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
                  <span className="tracking-wide">Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#9ca3af] group-hover:text-[#4285F4] transition-colors ml-auto sm:ml-0" />
                </a>

                {/* Opção 2: Waze */}
                <a
                  href={BARBEARIA_CONFIG.socials.waze}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-3d btn-3d-dark flex-1 w-full inline-flex items-center justify-center gap-2.5 px-4 py-2.5 text-xs sm:text-sm font-bold text-[#f5f5f7] bg-[#141720]/95 hover:bg-[#1b202c] border border-[#374151] hover:border-[#33CCFF]/70 rounded-lg transition-all shadow-md group"
                  title="Navegar até a Barbearia Invictus com Waze (abre aplicativo ou versão web)"
                >
                  <WazeIcon className="w-4 h-4 sm:w-4.5 sm:h-4.5 shrink-0" />
                  <span className="tracking-wide">Waze</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#9ca3af] group-hover:text-[#33CCFF] transition-colors ml-auto sm:ml-0" />
                </a>

              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
