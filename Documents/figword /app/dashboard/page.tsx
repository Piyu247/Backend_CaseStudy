"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Sprout, Compass, ShieldAlert, TrendingUp, Brain, Users, Grid, 
  Map, LayoutDashboard, CloudSun, Bell, Shield, ArrowLeft, ExternalLink, Sun, Moon 
} from "lucide-react";
import MapPanel from "../../components/MapPanel";
import CropRecommender from "../../components/CropRecommender";
import DiseaseDetector from "../../components/DiseaseDetector";
import MarketIntel from "../../components/MarketIntel";
import Chatbot from "../../components/Chatbot";
import Community from "../../components/Community";
import ModulesGrid from "../../components/ModulesGrid";
import LearningHub from "../../components/LearningHub";
import MyFarmDashboard from "../../components/MyFarmDashboard";
import SoilTestingConnect from "../../components/SoilTestingConnect";
import DirectMarketplace from "../../components/DirectMarketplace";
import ProduceDonation from "../../components/ProduceDonation";
import LogisticsConnect from "../../components/LogisticsConnect";
import FinTechHub from "../../components/FinTechHub";
import FarmPortfolio from "../../components/FarmPortfolio";
import FinanceGovernmentSupport from "../../components/FinanceGovernmentSupport";
import { translations, Language } from "../../utils/translations";

type Tab = "myfarm" | "map" | "recommend" | "disease" | "market" | "chat" | "learning" | "community" | "modules" | "soil" | "marketplace" | "donation" | "logistics" | "fintech" | "portfolio" | "finance";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("map");
  const [alertOpen, setAlertOpen] = useState(true);
  const [lang, setLang] = useState<Language>("en");
  const [darkMode, setDarkMode] = useState(false);
  const [authModalTarget, setAuthModalTarget] = useState<string | null>(null);

  const registeredTabs = ["myfarm", "soil", "marketplace", "donation", "portfolio"];

  const handleTabClick = (tab: Tab, label: string) => {
    const role = localStorage.getItem("userRole");
    if (registeredTabs.includes(tab) && role !== "registered") {
      setAuthModalTarget(label);
    } else {
      setActiveTab(tab);
    }
  };

  // Lifted GPS and weather states
  const [coords, setCoords] = useState({ lat: "28.6139", lng: "77.2090" }); // Delhi defaults
  const [cityName, setCityName] = useState("Delhi");
  const [weather, setWeather] = useState({
    temp: 28.4,
    feelsLike: 30,
    humidity: 64,
    windSpeed: 12.5,
    precipitation: 0,
    summary: "Optimal temperature for crop photosynthesis.",
    loading: true
  });

  // Get translations
  const t = translations[lang] || translations.en;

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

  // Check theme on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  useEffect(() => {
    const fetchWeatherAndCity = async () => {
      try {
        const weatherResponse = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${coords.lat}&longitude=${coords.lng}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,precipitation,apparent_temperature`
        );
        const weatherData = await weatherResponse.json();
        if (weatherData && weatherData.current) {
          const c = weatherData.current;
          setWeather({
            temp: c.temperature_2m,
            feelsLike: c.apparent_temperature,
            humidity: c.relative_humidity_2m,
            windSpeed: c.wind_speed_10m,
            precipitation: c.precipitation,
            summary: c.precipitation > 0 
              ? t.rainAlert 
              : t.clearAlert,
            loading: false
          });
        }

        // Fetch location city name via OpenStreetMap API
        const geoResponse = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${coords.lat}&lon=${coords.lng}&zoom=10`
        );
        const geoData = await geoResponse.json();
        if (geoData && geoData.address) {
          const city = geoData.address.city || geoData.address.town || geoData.address.village || geoData.address.state || "Detected Plot";
          setCityName(city);
        }
      } catch (err) {
        console.error("Failed to query live telemetry:", err);
      }
    };
    fetchWeatherAndCity();
  }, [coords, lang]); // Reload summary translation when language changes

  return (
    <div className="min-h-screen bg-nature-50 dark:bg-nature-950 text-emerald-950 dark:text-white flex flex-col font-sans transition-colors duration-300">
      
      {/* Dashboard Top Header */}
      <header className="glass-panel sticky top-0 z-40 px-6 py-4 flex items-center justify-between border-b border-emerald-900/10 dark:border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <Link 
            href="/"
            className="flex items-center gap-1.5 text-xs font-semibold text-emerald-900/60 dark:text-white/60 hover:text-emerald-950 dark:hover:text-white bg-emerald-500/5 hover:bg-emerald-500/10 dark:bg-white/5 dark:hover:bg-white/10 px-3 py-1.5 rounded-xl border border-emerald-500/10 dark:border-white/5 transition-all"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> {t.backHome}
          </Link>
          <div className="flex items-center gap-2 border-l border-emerald-900/15 dark:border-white/15 pl-4">
            <Sprout className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <h2 className="text-xl font-bold tracking-tight font-outfit text-emerald-900 dark:text-white">{t.workspaceTitle}</h2>
          </div>
        </div>

        {/* UNIVERSAL AI SEARCH BAR AT TOP OF EVERY PAGE */}
        <div className="hidden lg:flex flex-1 max-w-xl mx-6 relative">
          <input
            type="text"
            placeholder="How can I help with your farm today?"
            className="w-full bg-emerald-500/5 dark:bg-white/5 border border-emerald-500/20 dark:border-white/10 rounded-2xl pl-4 pr-12 py-2 text-xs font-bold text-emerald-950 dark:text-white placeholder-emerald-900/50 dark:placeholder-white/40 focus:outline-none focus:border-emerald-500"
            onKeyDown={(e) => {
              if (e.key === "Enter") setActiveTab("chat");
            }}
          />
          <button
            onClick={() => setActiveTab("chat")}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center text-xs shadow-sm transition-all"
            title="Ask Kechua AI Voice Assistant"
          >
            🎙️
          </button>
        </div>

        <div className="flex items-center gap-3">
          
          {/* Quick weather summary */}
          <div className="hidden md:flex items-center gap-2 bg-emerald-500/5 dark:bg-white/5 border border-emerald-500/10 dark:border-white/5 px-3.5 py-1.5 rounded-2xl">
            <CloudSun className="w-4 h-4 text-amber-500 animate-pulse" />
            <span className="text-xs font-semibold text-emerald-900 dark:text-white/80">
              {weather.loading ? t.acquiringGps : `${cityName}: ${weather.temp}°C (${weather.precipitation > 0 ? "Rain" : "Clear"})`}
            </span>
          </div>

          {/* Language Selector Selector */}
          <div className="flex items-center bg-emerald-500/10 dark:bg-white/5 border border-emerald-500/10 dark:border-white/5 rounded-xl overflow-hidden p-0.5">
            {[
              { code: "en", label: "EN" },
              { code: "hi", label: "हिन्दी" },
              { code: "mr", label: "मराठी" }
            ].map((l) => (
              <button
                key={l.code}
                onClick={() => setLang(l.code as Language)}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                  lang === l.code
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-emerald-900/60 dark:text-white/60 hover:text-emerald-900 dark:hover:text-white"
                }`}
              >
                {l.label}
              </button>
            ))}
          </div>

          {/* Light/Dark Mode Switcher */}
          <button 
            onClick={toggleDarkMode}
            className="w-10 h-10 rounded-xl bg-emerald-500/10 dark:bg-white/5 border border-emerald-500/10 dark:border-white/5 flex items-center justify-center text-emerald-800 dark:text-white/85 hover:bg-emerald-500/20 dark:hover:bg-white/10 transition-all"
            title="Toggle Light/Dark Theme"
          >
            {darkMode ? <Sun className="w-4.5 h-4.5 text-amber-400" /> : <Moon className="w-4.5 h-4.5 text-emerald-800" />}
          </button>
        </div>
      </header>

      {/* Main Layout Workspace */}
      <div className="flex-1 flex flex-col lg:flex-row">
        
        {/* Sidebar Nav */}
        <aside className="w-full lg:w-72 bg-emerald-50/50 dark:bg-nature-950/60 lg:border-r border-emerald-900/10 dark:border-white/10 p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-6">
            {/* KECHUA AI (Public Access) */}
            <div>
              <p className="text-[10px] font-black text-emerald-800/80 dark:text-emerald-400 uppercase tracking-widest font-mono">KECHUA AI</p>
              <nav className="mt-3 space-y-1.5">
                {[
                  { id: "map", label: "1. Weather & Satellite", icon: Map },
                  { id: "recommend", label: "2. Crop Advisor", icon: Sprout },
                  { id: "learning", label: "3. Learning Hub", icon: LayoutDashboard },
                  { id: "chat", label: "4. AI Voice Assistant", icon: Brain },
                  { id: "disease", label: "5. Disease Scanner", icon: ShieldAlert },
                  { id: "market", label: "6. Market Prices", icon: TrendingUp },
                  { id: "finance", label: "7. Finance & Govt Support", icon: Shield }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleTabClick(item.id as Tab, item.label)}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-bold tracking-wide transition-all border ${
                        activeTab === item.id
                          ? "bg-emerald-600 text-white border-emerald-600/10 shadow-md"
                          : "text-emerald-900/70 dark:text-white/70 hover:text-emerald-950 dark:hover:text-white hover:bg-emerald-500/5 dark:hover:bg-white/5 border-transparent"
                      }`}
                    >
                      <Icon className="w-4.5 h-4.5" />
                      {item.label}
                    </button>
                  );
                })}
              </nav>
            </div>

            {/* FARMER HUB (Login Required) */}
            <div className="pt-2">
              <div className="flex justify-between items-center mb-1">
                <p className="text-[10px] font-black text-amber-700 dark:text-amber-400 uppercase tracking-widest font-mono">FARMER HUB</p>
                <span className="text-[9px] font-bold text-amber-700 dark:text-amber-300 bg-amber-500/15 px-2 py-0.5 rounded flex items-center gap-1 border border-amber-500/20">
                  🔒 Login Required
                </span>
              </div>
              <nav className="mt-2 space-y-1.5">
                {[
                  { id: "myfarm", label: "My Farm", icon: Compass },
                  { id: "marketplace", label: "Sell My Harvest", icon: TrendingUp },
                  { id: "soil", label: "Soil Testing & Labs", icon: Sprout },
                  { id: "donation", label: "Produce Donation", icon: Bell },
                  { id: "fintech", label: "My Reports & FinTech", icon: Shield },
                  { id: "portfolio", label: "Farm Profile & Settings", icon: LayoutDashboard }
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      onClick={() => handleTabClick(item.id as Tab, item.label)}
                      className={`w-full flex items-center justify-between px-4 py-2.5 rounded-2xl text-xs font-bold tracking-wide transition-all border ${
                        activeTab === item.id
                          ? "bg-emerald-600 text-white border-emerald-600/10 shadow-md"
                          : "text-emerald-900/70 dark:text-white/70 hover:text-emerald-950 dark:hover:text-white hover:bg-emerald-500/5 dark:hover:bg-white/5 border-transparent"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4.5 h-4.5 text-amber-500" />
                        {item.label}
                      </div>
                      <span className="text-[10px] text-amber-600 dark:text-amber-400">🔒</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Government Support Schemes Widget */}
          <div className="glass-panel p-5 rounded-3xl border border-emerald-500/15 dark:border-white/10 space-y-3 bg-white/60 dark:bg-white/5">
            <h4 className="font-extrabold text-xs text-emerald-700 dark:text-emerald-400 flex items-center gap-2 pt-1">
              <Shield className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" /> {t.schemesHeader}
            </h4>
            <div className="space-y-3 text-[10px] leading-relaxed">
              <div className="border-b border-emerald-500/10 dark:border-white/5 pb-2">
                <p className="font-extrabold text-emerald-950 dark:text-white/90">{t.pmKisanTitle}</p>
                <p className="text-emerald-900/70 dark:text-white/60">{t.pmKisanDesc}</p>
                <a href="#" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-0.5 mt-1">
                  {t.applyOnline} <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
              <div>
                <p className="font-extrabold text-emerald-950 dark:text-white/90">{t.solarPumpTitle}</p>
                <p className="text-emerald-900/70 dark:text-white/60">{t.solarPumpDesc}</p>
                <a href="#" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline flex items-center gap-0.5 mt-1">
                  {t.viewEligibility} <ExternalLink className="w-2.5 h-2.5" />
                </a>
              </div>
            </div>
          </div>
        </aside>

        {/* Content Panel Area */}
        <main className="flex-1 p-6 md:p-8 space-y-6 overflow-y-auto max-h-[calc(100vh-80px)]">
          {/* Realtime Alert Banner */}
          {alertOpen && (
            <div className="bg-amber-500/5 dark:bg-amber-500/10 border border-amber-500/35 p-4 rounded-2xl flex items-start justify-between relative backdrop-blur">
              <div className="flex gap-3">
                <ShieldAlert className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-sm text-emerald-950 dark:text-white">{t.alertTitle}</h4>
                  <p className="text-xs text-emerald-900/85 dark:text-white/80 mt-1 leading-relaxed">
                    {t.alertText}
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setAlertOpen(false)} 
                className="text-emerald-900/60 dark:text-white/40 hover:text-emerald-900 dark:hover:text-white text-xs font-mono border border-emerald-500/15 dark:border-white/5 bg-emerald-500/5 dark:bg-white/5 hover:bg-emerald-500/10 dark:hover:bg-white/10 px-2 py-0.5 rounded"
              >
                {t.dismiss}
              </button>
            </div>
          )}

          {/* Render Active Dashboard Tab */}
          <div className="transition-all duration-350 ease-in-out">
            {activeTab === "myfarm" && <MyFarmDashboard lang={lang} onNavigateTab={(tab) => setActiveTab(tab as Tab)} />}
            {activeTab === "map" && (
              <MapPanel 
                coords={coords} 
                setCoords={setCoords} 
                weather={weather} 
                cityName={cityName}
                lang={lang}
              />
            )}
            {activeTab === "recommend" && <CropRecommender lang={lang} />}
            {activeTab === "disease" && <DiseaseDetector lang={lang} />}
            {activeTab === "market" && <MarketIntel lang={lang} />}
            {activeTab === "chat" && <Chatbot lang={lang} />}
            {activeTab === "learning" && <LearningHub lang={lang} />}
            {activeTab === "community" && <Community lang={lang} />}
            {activeTab === "modules" && <ModulesGrid lang={lang} onNavigateTab={(tab) => setActiveTab(tab as Tab)} />}
            {/* active tab renders */}
            {activeTab === "finance" && <FinanceGovernmentSupport lang={lang} />}
            {activeTab === "soil" && <SoilTestingConnect lang={lang} />}
            {activeTab === "marketplace" && <DirectMarketplace lang={lang} />}
            {activeTab === "donation" && <ProduceDonation lang={lang} />}
            {activeTab === "logistics" && <LogisticsConnect lang={lang} />}
            {activeTab === "fintech" && <FinTechHub lang={lang} />}
            {activeTab === "portfolio" && <FarmPortfolio lang={lang} />}
          </div>
        </main>

      </div>

      {/* REGISTERED FARMER AUTHENTICATION MODAL POPUP */}
      {authModalTarget && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
          <div className="glass-panel p-6 rounded-3xl border border-emerald-500/30 bg-nature-950/95 max-w-md w-full text-white space-y-4 shadow-2xl relative animate-fade-in">
            <button 
              onClick={() => setAuthModalTarget(null)}
              className="absolute top-4 right-4 text-xs text-white/50 hover:text-white bg-white/10 px-2.5 py-1 rounded-xl"
            >
              ✕ Close
            </button>

            <div className="text-center space-y-1 pt-2">
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-400 bg-amber-500/20 px-3 py-1 rounded-full border border-amber-500/30">
                🔒 Registered Farmer Feature
              </span>
              <h3 className="text-lg font-extrabold text-white font-outfit mt-2">Sign in to access {authModalTarget}</h3>
              <p className="text-xs text-white/70">Connect your account to view personal farm data, soil reports, and sell crops.</p>
            </div>

            <div className="space-y-3 pt-2 text-xs">
              <button
                onClick={() => {
                  localStorage.setItem("userRole", "registered");
                  setAuthModalTarget(null);
                }}
                className="w-full bg-white text-emerald-950 font-black py-3 rounded-2xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-4 h-4" alt="Google" /> Continue with Google
              </button>

              <div className="space-y-2">
                <input 
                  type="tel" 
                  placeholder="+91 98765 43210 (Mobile Number)" 
                  className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-2.5 text-xs text-white placeholder-white/40 font-bold"
                />
                <button
                  onClick={() => {
                    localStorage.setItem("userRole", "registered");
                    setAuthModalTarget(null);
                  }}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3 rounded-2xl transition-all shadow-md text-xs uppercase tracking-wider"
                >
                  Send OTP & Sign In
                </button>
              </div>

              <p className="text-[10px] text-center text-white/50 pt-1">
                By continuing, you agree to Kechua's Farmer Terms & Data Protection Policy.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
