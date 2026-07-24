import React, { useState } from "react";
import {
  Grid, Sprout, Fish, Bird, Milk, Apple, Carrot, Flower2, Leaf,
  Tractor, ShieldCheck, DollarSign, TestTube, TrendingUp, BookOpen,
  ArrowRight, CheckCircle2, ChevronLeft, Sparkles, AlertCircle
} from "lucide-react";
import { translations, Language } from "../utils/translations";

interface ModulesGridProps {
  lang: Language;
  onNavigateTab?: (tab: string) => void;
}

export default function ModulesGrid({ lang, onNavigateTab }: ModulesGridProps) {
  const [activeWizard, setActiveWizard] = useState<string | null>(null);
  const [wizardStep, setWizardStep] = useState(1);
  const [formData, setFormData] = useState({
    season: "Kharif (Monsoon)",
    state: "Maharashtra",
    soil: "Black Cotton Soil",
    farmSize: "3 Acres",
    budget: "₹30,000",
    waterType: "Freshwater",
    pondAvailable: "Yes",
    type: "Egg Production (Layer)",
    scale: "Small Scale (500 Birds)"
  });

  const t = translations[lang] || translations.en;

  const actionCards = [
    {
      id: "crop-farming",
      title: lang === "mr" ? "पीक लागवड (Grow Crops)" : lang === "hi" ? "फसल उगाएं (Grow Crops)" : "Grow Crops",
      subtitle: '"I want to grow crops."',
      desc: "Get personalized crop recommendations based on your season, soil, state, and capital budget.",
      badge: "AI Advisor Wizard",
      icon: Sprout,
      color: "emerald"
    },
    {
      id: "fish-farming",
      title: lang === "mr" ? "मत्स्य व्यवसाय (Start Fish Farming)" : lang === "hi" ? "मत्स्य पालन (Start Fish Farming)" : "Start Fish Farming",
      subtitle: '"I want to start a fish pond."',
      desc: "Recommends Rohu, Katla, Tilapia, or Shrimp with pond setup costs and nearest buyers.",
      badge: "Fisheries Planner",
      icon: Fish,
      color: "cyan"
    },
    {
      id: "poultry-farming",
      title: lang === "mr" ? "कुक्कुटपालन (Poultry Farming)" : lang === "hi" ? "मुर्गी पालन (Poultry Farming)" : "Poultry Farming",
      subtitle: '"Egg production or broiler meat."',
      desc: "Breed selection, feed schedule, vaccination timeline, and profit estimation calculator.",
      badge: "Livestock Wizard",
      icon: Bird,
      color: "amber"
    },
    {
      id: "dairy-farming",
      title: lang === "mr" ? "दुग्ध व्यवसाय (Dairy Farming)" : lang === "hi" ? "डेयरी फार्मिंग (Dairy Farming)" : "Dairy Farming",
      subtitle: '"Cow & Buffalo breeds & milk planner."',
      desc: "Gir, Sahiwal, Murrah breeds, silage green fodder planner, and nearby dairy cooperatives.",
      badge: "Co-op Dairy Hub",
      icon: Milk,
      color: "orange"
    },
    {
      id: "fruit-farming",
      title: lang === "mr" ? "फळबाग शेती (Fruit Farming)" : lang === "hi" ? "फल खेती (Fruit Farming)" : "Fruit Farming",
      subtitle: '"Mango, Banana, Pomegranate, Grapes."',
      desc: "Check land suitability for perennial fruit orchards with 3-year profit projection.",
      badge: "Horticulture",
      icon: Apple,
      color: "red"
    },
    {
      id: "organic-farming",
      title: lang === "mr" ? "सेंद्रिय शेती (Organic Farming)" : lang === "hi" ? "जैविक खेती (Organic Farming)" : "Organic Farming",
      subtitle: '"Jeevamrut, Vermicompost & Certification."',
      desc: "Natural bio-fertilizer formulations, neem pesticides, and Jaivik Bharat organic certification.",
      badge: "Bio-Inputs",
      icon: Leaf,
      color: "green"
    },
    {
      id: "farm-machinery",
      title: lang === "mr" ? "कृषी यंत्रे (Farm Machinery)" : lang === "hi" ? "कृषि उपकरण (Farm Machinery)" : "Farm Machinery",
      subtitle: '"Tractor, Rotavator & Harvester Rentals."',
      desc: "Find nearby custom hiring centers (CHC) with hourly rental rates for land preparation.",
      badge: "Custom Rentals",
      icon: Tractor,
      color: "blue"
    },
    {
      id: "government-schemes",
      title: lang === "mr" ? "शासकीय योजना (Government Schemes)" : lang === "hi" ? "सरकारी योजनाएं (Government Schemes)" : "Government Schemes",
      subtitle: '"PM-Kisan, PMFBY, KCC & Solar Subsidy."',
      desc: "Check eligibility for 60% Solar Pump subsidy, PMFBY crop insurance, and KCC 4% loans.",
      badge: "Subsidy Hub",
      icon: ShieldCheck,
      color: "indigo"
    },
    {
      id: "sell-crop",
      title: lang === "mr" ? "तुमचे पीक विका (Sell Your Harvest)" : lang === "hi" ? "अपनी फसल बेचें (Sell Your Harvest)" : "Sell Your Harvest",
      subtitle: '"Direct Market & Escrow Buyer Bidding."',
      desc: "Connect directly with verified wholesale buyers and check nationwide APMC mandi rates.",
      badge: "Direct Trade",
      icon: DollarSign,
      color: "yellow"
    },
    {
      id: "soil-testing",
      title: lang === "mr" ? "माती चाचणी (Soil Testing)" : lang === "hi" ? "मिट्टी जांच (Soil Testing)" : "Soil Testing",
      subtitle: '"Soil Health Card & Lab Near You."',
      desc: "Locate government accredited soil testing labs and decode NPK deficiency cards.",
      badge: "Lab Locator",
      icon: TestTube,
      color: "purple"
    },
    {
      id: "market-prices",
      title: lang === "mr" ? "बाजारभाव (Market Prices)" : lang === "hi" ? "मंडी भाव (Market Prices)" : "Market Prices",
      subtitle: '"Live District Mandi Rate Comparison."',
      desc: "Compare arrival quantities and daily wholesale prices across nearby Mandis.",
      badge: "Live Mandi",
      icon: TrendingUp,
      color: "teal"
    },
    {
      id: "learn-farming",
      title: lang === "mr" ? "शेती शिका (Learn Farming)" : lang === "hi" ? "खेती सीखें (Learn Farming)" : "Learn Farming",
      subtitle: '"Verified ICAR & KVK Video Tutorials."',
      desc: "Jump straight to hundreds of categorized agricultural video lessons.",
      badge: "Learning Hub",
      icon: BookOpen,
      color: "emerald"
    }
  ];

  const handleCardClick = (id: string) => {
    if (id === "learn-farming" && onNavigateTab) {
      onNavigateTab("learning");
      return;
    }
    if (id === "sell-crop" || id === "market-prices") {
      if (onNavigateTab) onNavigateTab("market");
      return;
    }
    setActiveWizard(id);
    setWizardStep(1);
  };

  return (
    <div className="space-y-6 pb-12">

      {/* PROMINENT VOICE INPUT ASSISTANT BOX */}
      <div className="glass-panel p-6 rounded-3xl border border-emerald-500/20 bg-gradient-to-r from-emerald-900/10 via-emerald-600/5 to-teal-900/10 dark:from-emerald-950/80 dark:to-nature-950 flex flex-col md:flex-row justify-between items-center gap-6 shadow-sm">
        <div className="space-y-1 text-center md:text-left">
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-500/15 px-3 py-1 rounded-full">
            🎙️ AI Voice Command Box
          </span>
          <h3 className="text-2xl font-black text-emerald-950 dark:text-white font-outfit mt-1">
            {lang === "mr" ? "मी तुम्हाला आज कशी मदत करू शकेन?" : lang === "hi" ? "आज मैं आपकी क्या मदद कर सकता हूँ?" : "What can I help you with today?"}
          </h3>
          <p className="text-xs text-emerald-900/70 dark:text-white/60 font-medium">
            Tap microphone to ask questions in English, हिंदी, or मराठी
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateTab && onNavigateTab("chat")}
            className="w-16 h-16 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-lg hover:scale-105 transition-transform border border-emerald-400/30 group"
            title="Tap to speak with Kechua AI"
          >
            <span className="text-2xl group-hover:animate-pulse">🎙️</span>
          </button>
          <div className="text-[11px] font-bold text-emerald-900/70 dark:text-white/70 space-y-0.5 hidden sm:block">
            <span className="block text-emerald-600 dark:text-emerald-400">Languages Available:</span>
            <span>English • हिंदी • मराठी</span>
          </div>
        </div>
      </div>

      {/* Action Center Header */}
      <div className="glass-panel p-6 rounded-3xl border border-emerald-900/10 dark:border-white/10 bg-white/60 dark:bg-white/5 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h3 className="text-xl font-bold text-emerald-950 dark:text-white flex items-center gap-2 font-outfit">
            <Grid className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            {lang === "mr" ? "आज तुम्हाला काय करायचे आहे?" : lang === "hi" ? "आज आप क्या करना चाहते हैं?" : "What do you want to do today?"}
          </h3>
          <p className="text-xs text-emerald-900/60 dark:text-white/50 mt-1 font-medium">
            {lang === "mr"
              ? "क्लिक करा आणि एआय मार्गदर्शनासह तात्काळ कृती करा."
              : lang === "hi"
                ? "क्लिक करें और एआई मार्गदर्शन के साथ तुरंत कार्रवाई शुरू करें।"
                : "Select any goal below to launch step-by-step AI decision tools & local execution guides."}
          </p>
        </div>
      </div>

      {/* Interactive Action Wizard Modal / Drawer */}
      {activeWizard && (
        <div className="glass-panel p-6 rounded-3xl border border-emerald-500/30 bg-white/90 dark:bg-nature-950/90 space-y-4 shadow-xl relative animate-fade-in">
          <button
            onClick={() => setActiveWizard(null)}
            className="absolute top-4 right-4 text-xs font-extrabold text-emerald-900/50 hover:text-emerald-950 dark:text-white/50 dark:hover:text-white bg-emerald-500/10 px-3 py-1.5 rounded-xl"
          >
            ✕ Close
          </button>

          {/* WIZARD: GROW CROPS */}
          {activeWizard === "crop-farming" && (
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase text-emerald-700 dark:text-emerald-400 bg-emerald-500/15 px-3 py-1 rounded-full">
                🌾 Crop Recommendation Wizard (Step {wizardStep} of 2)
              </span>

              {wizardStep === 1 ? (
                <div className="space-y-4 pt-2">
                  <h4 className="text-base font-extrabold text-emerald-950 dark:text-white">Tell us about your field setup:</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                    <div>
                      <label className="font-bold text-emerald-900/70 dark:text-white/70 block mb-1">Which Season?</label>
                      <select
                        value={formData.season}
                        onChange={(e) => setFormData({ ...formData, season: e.target.value })}
                        className="w-full font-bold p-2.5 rounded-xl bg-white dark:bg-nature-900 border border-emerald-500/20 text-emerald-950 dark:text-white"
                      >
                        <option value="Kharif (Monsoon)">Kharif (Monsoon / June-Oct)</option>
                        <option value="Rabi (Winter)">Rabi (Winter / Nov-April)</option>
                        <option value="Zaid (Summer)">Zaid (Summer / March-June)</option>
                      </select>
                    </div>
                    <div>
                      <label className="font-bold text-emerald-900/70 dark:text-white/70 block mb-1">State / Region</label>
                      <input
                        type="text"
                        value={formData.state}
                        onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                        className="w-full font-bold p-2.5 rounded-xl bg-white dark:bg-nature-900 border border-emerald-500/20 text-emerald-950 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-emerald-900/70 dark:text-white/70 block mb-1">Soil Type</label>
                      <select
                        value={formData.soil}
                        onChange={(e) => setFormData({ ...formData, soil: e.target.value })}
                        className="w-full font-bold p-2.5 rounded-xl bg-white dark:bg-nature-900 border border-emerald-500/20 text-emerald-950 dark:text-white"
                      >
                        <option value="Black Cotton Soil">Black Cotton Soil (Regur)</option>
                        <option value="Clay Loam Soil">Clay Loam Soil</option>
                        <option value="Red Laterite Soil">Red Laterite Soil</option>
                        <option value="Alluvial Sandy Soil">Alluvial Sandy Soil</option>
                      </select>
                    </div>
                  </div>

                  <button
                    onClick={() => setWizardStep(2)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-6 py-2.5 rounded-xl text-xs flex items-center gap-1.5 shadow-sm"
                  >
                    Analyze & Recommend Crops <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="space-y-3 pt-2">
                  <h4 className="text-base font-extrabold text-emerald-950 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-amber-500" /> AI Recommendations for {formData.season} in {formData.state}:
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl space-y-1">
                      <span className="text-[10px] font-black uppercase text-emerald-700 dark:text-emerald-400">Match 96% • Top Option</span>
                      <h5 className="font-black text-sm text-emerald-950 dark:text-white">Bt Cotton (Spotted Bollworm Resistant)</h5>
                      <p className="text-[11px] text-emerald-900/80 dark:text-white/80">Est. Profit: <strong>₹1,45,000 / ac</strong> • Investment: ₹28,000/ac</p>
                    </div>
                    <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl space-y-1">
                      <span className="text-[10px] font-black uppercase text-emerald-700 dark:text-emerald-400">Match 92% • Alternative</span>
                      <h5 className="font-black text-sm text-emerald-950 dark:text-white">Sugarcane (Co-86032 High Brix Variety)</h5>
                      <p className="text-[11px] text-emerald-900/80 dark:text-white/80">Est. Profit: <strong>₹1,60,000 / ac</strong> • Investment: ₹35,000/ac</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* WIZARD: FISH FARMING */}
          {activeWizard === "fish-farming" && (
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase text-cyan-700 dark:text-cyan-400 bg-cyan-500/15 px-3 py-1 rounded-full">
                🐟 Fish Farming Planner
              </span>
              <div className="space-y-3">
                <h4 className="text-base font-extrabold text-emerald-950 dark:text-white">Recommended Species for Your Water Depth:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div className="bg-cyan-500/10 border border-cyan-500/20 p-3.5 rounded-2xl">
                    <h5 className="font-black text-emerald-950 dark:text-white">Rohu & Katla</h5>
                    <p className="text-[10px] text-emerald-900/70 dark:text-white/70 mt-1">Freshwater Surface Feeder</p>
                    <p className="text-xs font-bold text-cyan-700 dark:text-cyan-400 mt-2">Est Income: ₹2,20,000/yr</p>
                  </div>
                  <div className="bg-cyan-500/10 border border-cyan-500/20 p-3.5 rounded-2xl">
                    <h5 className="font-black text-emerald-950 dark:text-white">Tilapia (Biofloc)</h5>
                    <p className="text-[10px] text-emerald-900/70 dark:text-white/70 mt-1">High Density Tarpaulin Tank</p>
                    <p className="text-xs font-bold text-cyan-700 dark:text-cyan-400 mt-2">Est Income: ₹1,80,000/yr</p>
                  </div>
                  <div className="bg-cyan-500/10 border border-cyan-500/20 p-3.5 rounded-2xl">
                    <h5 className="font-black text-emerald-950 dark:text-white">Vannamei Shrimp</h5>
                    <p className="text-[10px] text-emerald-900/70 dark:text-white/70 mt-1">Saline / Coastal Pond</p>
                    <p className="text-xs font-bold text-cyan-700 dark:text-cyan-400 mt-2">Est Income: ₹3,50,000/yr</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* WIZARD: GOVERNMENT SCHEMES */}
          {activeWizard === "government-schemes" && (
            <div className="space-y-4">
              <span className="text-[10px] font-black uppercase text-indigo-700 dark:text-indigo-400 bg-indigo-500/15 px-3 py-1 rounded-full">
                💰 Active Government Schemes Directory
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div className="bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-2xl space-y-1">
                  <h5 className="font-black text-emerald-950 dark:text-white">PM-KUSUM Solar Water Pump Scheme</h5>
                  <p className="text-[11px] text-emerald-900/80 dark:text-white/80">60% Central + State Government subsidy on standalone solar pumps (3HP to 7.5HP).</p>
                  <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-300 block pt-1">Eligibility: All farmers with verified land revenue record (7/12).</span>
                </div>
                <div className="bg-indigo-500/10 border border-indigo-500/20 p-4 rounded-2xl space-y-1">
                  <h5 className="font-black text-emerald-950 dark:text-white">Kisan Credit Card (KCC) 4% Interest Loan</h5>
                  <p className="text-[11px] text-emerald-900/80 dark:text-white/80">Up to ₹3,00,000 collateral-free crop loan at effective 4% interest rate with prompt repayment.</p>
                  <span className="text-[10px] font-bold text-indigo-700 dark:text-indigo-300 block pt-1">Eligibility: Valid Aadhaar + KCC application at nearest SBI / Cooperative Bank.</span>
                </div>
              </div>
            </div>
          )}

          {/* GENERIC WIZARD FOR OTHER ACTIONS */}
          {!["crop-farming", "fish-farming", "government-schemes"].includes(activeWizard) && (
            <div className="space-y-3">
              <h4 className="text-base font-extrabold text-emerald-950 dark:text-white">Interactive Guide Launched:</h4>
              <p className="text-xs text-emerald-900/80 dark:text-white/80 leading-relaxed font-semibold">
                Our AI Agronomist has logged your query for <strong>{actionCards.find(c => c.id === activeWizard)?.title}</strong>.
                Use our AI Voice Companion or visit Kechua Learning Hub for step-by-step videos!
              </p>
              <div className="pt-2">
                <button
                  onClick={() => onNavigateTab && onNavigateTab("chat")}
                  className="bg-emerald-600 text-white font-bold px-4 py-2 rounded-xl text-xs"
                >
                  Talk to AI Voice Assistant
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Action Center Grid Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {actionCards.map((card) => {
          const Icon = card.icon;
          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(card.id)}
              className="glass-panel p-6 rounded-3xl border border-emerald-900/10 dark:border-white/10 bg-white/70 dark:bg-white/5 hover:border-emerald-500/40 hover:scale-[1.02] transition-all cursor-pointer flex flex-col justify-between group shadow-sm"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-start">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-600/15 border border-emerald-500/20 flex items-center justify-center text-emerald-700 dark:text-emerald-400 group-hover:scale-110 transition-all">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[9px] font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-300 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                    {card.badge}
                  </span>
                </div>

                <div>
                  <h4 className="text-base font-black text-emerald-950 dark:text-white font-outfit leading-tight group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {card.title}
                  </h4>
                  <p className="text-[11px] font-extrabold text-amber-700 dark:text-amber-400 mt-0.5">
                    {card.subtitle}
                  </p>
                  <p className="text-xs text-emerald-900/70 dark:text-white/60 mt-2 leading-relaxed font-medium">
                    {card.desc}
                  </p>
                </div>
              </div>

              <div className="pt-5 mt-4 border-t border-emerald-500/10 dark:border-white/5 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span>Start Action</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
