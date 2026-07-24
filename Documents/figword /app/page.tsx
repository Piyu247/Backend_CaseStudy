"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Sprout, Gamepad2, BrainCircuit, Sun, Moon, ArrowRight, Compass
} from "lucide-react";
import HeroAnimation from "../components/HeroAnimation";
import { translations, Language } from "../utils/translations";

export default function Home() {
  const [lang, setLang] = useState<Language>("en");
  const [darkMode, setDarkMode] = useState(false);
  const [roomModal, setRoomModal] = useState<string | null>(null);

  // Toggle Dark Mode
  const toggleDarkMode = () => {
    const nextMode = !darkMode;
    setDarkMode(nextMode);
    if (nextMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  return (
    <main className="min-h-screen relative overflow-hidden flex flex-col justify-between p-6 md:p-12 text-white font-sans selection:bg-emerald-600 selection:text-white">
      
      {/* FULLSCREEN BACKGROUND VIDEO & SUBTLE DARK OVERLAY */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover scale-105 filter brightness-90 saturate-110"
          poster="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=1920&q=80"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-farmer-walking-through-a-green-wheat-field-42776-large.mp4" type="video/mp4" />
        </video>
        <HeroAnimation />
        <div className="absolute inset-0 bg-black/45 backdrop-blur-[2px]" />
      </div>

      {/* TOP BAR CONTROLS */}
      <header className="relative z-20 flex justify-between items-center w-full max-w-7xl mx-auto">
        <div className="flex items-center gap-2.5 bg-black/40 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border border-white/15">
          <Sprout className="w-5 h-5 text-emerald-400" />
          <span className="text-xs font-black uppercase tracking-wider font-outfit text-white">KECHUA</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-black/40 backdrop-blur-md border border-white/15 rounded-2xl p-1">
            {[
              { code: "en", label: "EN" },
              { code: "hi", label: "हिन्दी" },
              { code: "mr", label: "मराठी" }
            ].map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code as Language)}
                className={`px-3 py-1 rounded-xl text-xs font-black transition-all ${
                  lang === l.code
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          <button
            onClick={toggleDarkMode}
            className="w-10 h-10 rounded-2xl bg-black/40 backdrop-blur-md border border-white/15 flex items-center justify-center text-amber-400 hover:bg-black/60 transition-all"
            title="Toggle Light / Dark Mode"
          >
            {darkMode ? <Sun className="w-4.5 h-4.5" /> : <Moon className="w-4.5 h-4.5 text-white/80" />}
          </button>
        </div>
      </header>

      {/* CENTERED BRAND CONTENT */}
      <div className="relative z-10 text-center max-w-3xl mx-auto my-auto py-8 space-y-3">
        <h1 className="text-6xl md:text-8xl font-black tracking-tighter font-outfit text-white drop-shadow-md">
          KECHUA
        </h1>

        <p className="text-xl md:text-2xl font-black tracking-wide text-white drop-shadow-sm font-outfit">
          {lang === "mr" ? "शेतकऱ्यांचा खरा मित्र" : lang === "hi" ? "किसान का सच्चा दोस्त" : "The Farmer's True Friend"}
        </p>

        <p className="text-base md:text-lg font-bold tracking-widest text-amber-400 font-mono uppercase pt-1">
          {lang === "mr" ? "खेळाद्वारे शिका. एआयसह समृद्ध व्हा." : lang === "hi" ? "खेल के माध्यम से सीखें। AI के साथ आगे बढ़ें।" : "Learn Through Play. Grow With AI."}
        </p>
      </div>

      {/* CLEAN SINGLE CARD ABOUT KECHUA AI */}
      <div className="relative z-10 w-full max-w-md mx-auto my-4">
        <div className="glass-panel p-8 rounded-3xl border border-emerald-500/30 bg-black/40 backdrop-blur-xl flex flex-col justify-between space-y-6 hover:border-emerald-400/50 transition-all group shadow-2xl text-center">
          <div className="space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center text-emerald-400 mx-auto group-hover:scale-110 transition-transform">
              <BrainCircuit className="w-7 h-7" />
            </div>
            <h3 className="text-3xl font-black text-white font-outfit">KECHUA AI</h3>
            <p className="text-xs text-white/80 font-medium leading-relaxed">
              AI-powered farming assistance for Indian farmers: satellite plot maps, crop advisor, disease scanner, and market intelligence.
            </p>
          </div>

          <div className="pt-2">
            <Link
              href="/dashboard"
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black py-4 rounded-2xl transition-all shadow-xl text-xs uppercase tracking-wider flex items-center justify-center gap-2 border border-emerald-400/30"
            >
              <Compass className="w-4.5 h-4.5" /> Open Kechua AI Platform <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* ROOM MODAL NOTICE */}
      {roomModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-nature-950 border border-emerald-500/30 p-6 rounded-3xl max-w-sm w-full text-center space-y-3 text-white shadow-2xl">
            <Gamepad2 className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
            <h4 className="font-extrabold text-sm font-outfit">{roomModal}</h4>
            <button onClick={() => setRoomModal(null)} className="bg-emerald-600 text-white font-bold text-xs px-4 py-2 rounded-xl">
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* FOOTER QUOTE */}
      <footer className="relative z-10 text-center space-y-1 mt-6">
        <p className="text-sm font-black tracking-wide text-amber-400 font-outfit italic">
          "When farmers grow, India grows."
        </p>
        <p className="text-[10px] text-white/50 font-mono">
          © 2026 KECHUA Agritech & FinTech Ecosystem. All rights reserved.
        </p>
      </footer>

    </main>
  );
}

