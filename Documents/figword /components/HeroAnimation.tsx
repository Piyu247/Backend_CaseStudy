import React from "react";

export default function HeroAnimation() {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0 select-none">
      {/* Background radial glow - Sunrise */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vw] h-[70vw] rounded-full bg-gradient-radial from-amber-500/25 via-emerald-600/5 to-transparent blur-3xl animate-pulse-glow" />

      {/* Cloud Layers */}
      <div className="absolute top-[8%] left-0 right-0 h-24 overflow-hidden opacity-40">
        <div className="absolute w-[300px] h-[60px] top-4 animate-drift-slow left-[-300px]">
          <svg viewBox="0 0 100 40" fill="rgba(255,255,255,0.45)">
            <path d="M20,30 Q10,30 10,20 Q10,10 25,12 Q30,5 45,8 Q55,2 65,10 Q75,10 75,20 Q75,30 60,30 Z" />
          </svg>
        </div>
        <div className="absolute w-[200px] h-[50px] top-12 animate-drift-medium left-[-200px]" style={{ animationDelay: "15s" }}>
          <svg viewBox="0 0 100 40" fill="rgba(255,255,255,0.3)">
            <path d="M20,30 Q10,30 10,20 Q10,10 25,12 Q30,5 45,8 Q55,2 65,10 Q75,10 75,20 Q75,30 60,30 Z" />
          </svg>
        </div>
      </div>

      {/* Far Landscape (Mountains) */}
      <div className="absolute bottom-[20%] left-0 w-full h-[30%] opacity-30">
        <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none" fill="currentColor">
          <path
            className="text-nature-900"
            d="M0,192 L120,202.7 C240,213,480,235,720,218.7 C960,203,1200,149,1320,122.7 L1440,96 L1440,320 L1320,320 C1200,320,960,320,720,320 C480,320,240,320,120,320 L0,320 Z"
          />
        </svg>
      </div>

      {/* Mid Ground (Hills and Farmland Grid) */}
      <div className="absolute bottom-[10%] left-0 w-full h-[25%] opacity-50">
        <svg className="w-full h-full" viewBox="0 0 1440 320" preserveAspectRatio="none" fill="currentColor">
          <path
            className="text-nature-800"
            d="M0,224 L80,213.3 C160,203,320,181,480,192 C640,203,800,245,960,240 C1120,235,1280,181,1360,154.7 L1440,128 L1440,320 L1360,320 C1280,320,1120,320,960,320 C800,320,640,320,480,320 C320,320,160,320,80,320 L0,320 Z"
          />
        </svg>
      </div>

      {/* Wind Turbines */}
      <div className="absolute bottom-[23%] left-[15%] w-10 h-24 opacity-60 text-emerald-200">
        {/* Mast */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[2px] h-16 bg-current" />
        {/* Rotor blades */}
        <div className="absolute bottom-16 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 animate-spin-slow">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-7 bg-current origin-bottom" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-7 bg-current origin-bottom rotate-120" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-7 bg-current origin-bottom rotate-240" />
        </div>
      </div>

      <div className="absolute bottom-[26%] left-[75%] w-8 h-20 opacity-50 text-emerald-300">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[2px] h-12 bg-current" />
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 animate-spin-slower">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-5 bg-current origin-bottom" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-5 bg-current origin-bottom rotate-120" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[2px] h-5 bg-current origin-bottom rotate-240" />
        </div>
      </div>

      {/* Swaying Trees */}
      <div className="absolute bottom-[10%] left-[8%] w-12 h-20 opacity-75 animate-sway text-nature-700">
        <svg viewBox="0 0 40 80" className="w-full h-full" fill="currentColor">
          {/* Trunk */}
          <rect x="18" y="50" width="4" height="30" fill="#4a3728" />
          {/* Leaves */}
          <path d="M20,5 C30,20 35,40 32,55 C25,60 15,60 8,55 C5,40 10,20 20,5 Z" />
        </svg>
      </div>

      <div className="absolute bottom-[8%] left-[85%] w-10 h-16 opacity-65 animate-sway-opposite text-nature-600">
        <svg viewBox="0 0 40 80" className="w-full h-full" fill="currentColor">
          <rect x="18" y="50" width="4" height="30" fill="#4a3728" />
          <path d="M20,10 C28,25 32,45 29,55 C23,58 17,58 11,55 C8,45 12,25 20,10 Z" />
        </svg>
      </div>

      {/* Foreground Fields Overlay (Sunrise glow at the very front) */}
      <div className="absolute bottom-0 left-0 w-full h-[12%] bg-gradient-to-t from-nature-950 via-nature-900/60 to-transparent" />
    </div>
  );
}
