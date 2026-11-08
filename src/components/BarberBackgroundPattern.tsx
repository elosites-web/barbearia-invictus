import React from "react";
import realRazor from "../assets/images/real_barber_razor_1794094652534.jpg";
import realClipper from "../assets/images/real_barber_clipper_1794094664131.jpg";
import realShears from "../assets/images/real_barber_shears_1794094675387.jpg";
import realSpray from "../assets/images/real_barber_spray_1794094686239.jpg";
import realBrush from "../assets/images/real_shaving_brush_1794094698043.jpg";
import realComb from "../assets/images/real_barber_comb_1794094708890.jpg";
import realPole from "../assets/images/real_barber_pole_1794094719751.jpg";

export const BarberBackgroundPattern: React.FC = () => {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden select-none"
    >
      {/* =========================================================================
          REALISTIC PHOTOGRAPHIC BARBER ITEMS (BANCO DE IMAGENS / FOTOGRAFIA REAL)
          Imagens reais de equipamentos de barbearia profissional (fotografia de estúdio isolada),
          com leve transparência, mesclagem sutil e dimensões ampliadas sem repetições.
          ========================================================================= */}

      {/* 1. REAL STRAIGHT RAZOR (Navalha de Aço e Madeira Nobre Real) */}
      <div
        className="absolute top-[2%] -left-16 sm:-left-8 lg:left-2 w-[340px] sm:w-[440px] lg:w-[500px] pointer-events-none transition-all duration-700"
        style={{
          transform: "rotate(-18deg)",
          mixBlendMode: "screen",
          opacity: 0.22,
        }}
      >
        <img
          src={realRazor}
          alt=""
          loading="lazy"
          decoding="async"
          className="w-full h-auto object-contain filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.95)] contrast-125 brightness-110"
        />
      </div>

      {/* 2. REAL VINTAGE AMBER WATER SPRAY BOTTLE (Borrifador Real de Vidro Âmbar e Latão) */}
      <div
        className="absolute top-[13%] -right-16 sm:-right-8 lg:right-2 w-[320px] sm:w-[420px] lg:w-[480px] pointer-events-none transition-all duration-700"
        style={{
          transform: "rotate(14deg)",
          mixBlendMode: "screen",
          opacity: 0.20,
        }}
      >
        <img
          src={realSpray}
          alt=""
          loading="lazy"
          decoding="async"
          className="w-full h-auto object-contain filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.95)] contrast-120 brightness-110"
        />
      </div>

      {/* 3. REAL GOLD HAIR CLIPPER MACHINE (Máquina de Corte Fade Metálica Dourada Real) */}
      <div
        className="absolute top-[26%] -left-14 sm:-left-6 lg:left-0 w-[300px] sm:w-[400px] lg:w-[460px] pointer-events-none transition-all duration-700"
        style={{
          transform: "rotate(16deg)",
          mixBlendMode: "screen",
          opacity: 0.23,
        }}
      >
        <img
          src={realClipper}
          alt=""
          loading="lazy"
          decoding="async"
          className="w-full h-auto object-contain filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.95)] contrast-125 brightness-105"
        />
      </div>

      {/* 4. REAL CARBON FIBER FADE COMB (Pente de Disfarce e Régua Real) */}
      <div
        className="absolute top-[38%] -right-20 sm:-right-10 lg:right-4 w-[380px] sm:w-[480px] lg:w-[560px] pointer-events-none transition-all duration-700"
        style={{
          transform: "rotate(-28deg)",
          mixBlendMode: "screen",
          opacity: 0.20,
        }}
      >
        <img
          src={realComb}
          alt=""
          loading="lazy"
          decoding="async"
          className="w-full h-auto object-contain filter drop-shadow-[0_12px_30px_rgba(0,0,0,0.95)] contrast-125 brightness-115"
        />
      </div>

      {/* 5. REAL JAPANESE BARBER SHEARS (Tesoura de Corte Profissional Fio Laser Real) */}
      <div
        className="absolute top-[50%] -left-16 sm:-left-6 lg:left-2 w-[360px] sm:w-[460px] lg:w-[520px] pointer-events-none transition-all duration-700"
        style={{
          transform: "rotate(34deg)",
          mixBlendMode: "screen",
          opacity: 0.22,
        }}
      >
        <img
          src={realShears}
          alt=""
          loading="lazy"
          decoding="async"
          className="w-full h-auto object-contain filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.95)] contrast-125 brightness-110"
        />
      </div>

      {/* 6. REAL BADGER SHAVING BRUSH (Pincel Tradicional de Barba Real em Madeira e Cerdas) */}
      <div
        className="absolute top-[63%] -right-14 sm:-right-6 lg:right-2 w-[300px] sm:w-[390px] lg:w-[450px] pointer-events-none transition-all duration-700"
        style={{
          transform: "rotate(-18deg)",
          mixBlendMode: "screen",
          opacity: 0.21,
        }}
      >
        <img
          src={realBrush}
          alt=""
          loading="lazy"
          decoding="async"
          className="w-full h-auto object-contain filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.95)] contrast-120 brightness-110"
        />
      </div>

      {/* 7. REAL VINTAGE BARBER POLE (Poste Clássico Giratório Real com Espiral e Bronze) */}
      <div
        className="absolute top-[76%] -left-14 sm:-left-4 lg:left-2 w-[280px] sm:w-[360px] lg:w-[420px] pointer-events-none transition-all duration-700"
        style={{
          transform: "rotate(10deg)",
          mixBlendMode: "screen",
          opacity: 0.22,
        }}
      >
        <img
          src={realPole}
          alt=""
          loading="lazy"
          decoding="async"
          className="w-full h-auto object-contain filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.95)] contrast-120 brightness-105"
        />
      </div>

      {/* 8. REAL STRAIGHT RAZOR (FECHADA / DETALHE NO RODAPÉ) */}
      <div
        className="absolute top-[90%] -right-16 sm:-right-8 lg:right-6 w-[340px] sm:w-[440px] lg:w-[500px] pointer-events-none transition-all duration-700"
        style={{
          transform: "rotate(-32deg) scaleX(-1)",
          mixBlendMode: "screen",
          opacity: 0.20,
        }}
      >
        <img
          src={realRazor}
          alt=""
          loading="lazy"
          decoding="async"
          className="w-full h-auto object-contain filter drop-shadow-[0_15px_35px_rgba(0,0,0,0.95)] contrast-125 brightness-110"
        />
      </div>
    </div>
  );
};
