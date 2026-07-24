import React, { useState } from "react";
import { Sprout, Activity, DollarSign, AlertCircle, Droplets, Leaf, TrendingUp } from "lucide-react";
import { translations, Language } from "../utils/translations";

interface CropRecommenderProps {
  lang: Language;
}

interface Crop {
  name: string;
  score: number;
  investment: string;
  profit: string;
  risk: "Low" | "Medium" | "High";
  period: string;
  water: string;
  fertilizer: string;
  demand: "High" | "Moderate" | "Export High";
}

// English crop lists
const mockCropsEn: Record<string, Crop[]> = {
  Monsoon: [
    { name: "Basmati Rice (Pusa 1121)", score: 98, investment: "₹38,000 / acre", profit: "₹1,45,000 / acre", risk: "Low", period: "120 days", water: "Very High", fertilizer: "Nitrogen rich, NPK 120:60:40", demand: "Export High" },
    { name: "Bt Cotton (Long Staple)", score: 94, investment: "₹42,000 / acre", profit: "₹1,80,000 / acre", risk: "Medium", period: "160 days", water: "High", fertilizer: "NPK 150:75:75 + Boron", demand: "Export High" },
    { name: "Organic Yellow Soybean", score: 92, investment: "₹24,000 / acre", profit: "₹1,15,000 / acre", risk: "Low", period: "110 days", water: "Moderate", fertilizer: "Low Nitrogen, high Phosphorus", demand: "High" },
  ],
  Winter: [
    { name: "Premium Durum Wheat", score: 96, investment: "₹32,000 / acre", profit: "₹1,35,000 / acre", risk: "Low", period: "135 days", water: "Moderate", fertilizer: "NPK 100:50:25", demand: "Export High" },
    { name: "Mustard Seeds (Bold)", score: 88, investment: "₹18,000 / acre", profit: "₹78,000 / acre", risk: "Medium", period: "115 days", water: "Low", fertilizer: "Sulfur enriched NPK", demand: "High" },
    { name: "Chickpeas (Desi Chana)", score: 90, investment: "₹20,000 / acre", profit: "₹95,000 / acre", risk: "Low", period: "110 days", water: "Low", fertilizer: "Minimal, fixes Nitrogen", demand: "Moderate" },
  ],
  Summer: [
    { name: "Summer Green Gram (Mung)", score: 82, investment: "₹12,000 / acre", profit: "₹58,000 / acre", risk: "Low", period: "70 days", water: "Very Low", fertilizer: "Minimal Phosphates", demand: "Moderate" },
    { name: "Groundnut (G-20)", score: 87, investment: "₹26,000 / acre", profit: "₹1,10,000 / acre", risk: "Medium", period: "125 days", water: "Moderate", fertilizer: "Gypsum + NPK", demand: "High" },
    { name: "Organic Bajra (Pearl Millet)", score: 91, investment: "₹15,000 / acre", profit: "₹65,000 / acre", risk: "Low", period: "85 days", water: "Low", fertilizer: "Minimal Organic compost", demand: "High" },
  ],
};

// Marathi crop lists
const mockCropsMr: Record<string, Crop[]> = {
  Monsoon: [
    { name: "बासमती तांदूळ (पुसा ११२१)", score: 98, investment: "₹३८,००० / एकर", profit: "₹१,४५,००० / एकर", risk: "Low", period: "१२० दिवस", water: "खूप जास्त", fertilizer: "नायट्रोजनयुक्त, NPK १२२:६०:४०", demand: "Export High" },
    { name: "बीटी कापूस (लांब धागा)", score: 94, investment: "₹४२,००० / एकर", profit: "₹१,८०,००० / एकर", risk: "Medium", period: "१६० दिवस", water: "जास्त", fertilizer: "NPK १५०:७५:७५ + बोरॉन", demand: "Export High" },
    { name: "सेंद्रिय पिवळी सोयाबीन", score: 92, investment: "₹२४,००० / एकर", profit: "₹१,१५,००० / एकर", risk: "Low", period: "११० दिवस", water: "मध्यम", fertilizer: "कमी नायट्रोजन, जास्त फॉस्फरस", demand: "High" },
  ],
  Winter: [
    { name: "प्रीमियम ड्युरम गहू", score: 96, investment: "₹३२,००० / एकर", profit: "₹१,३५,००० / एकर", risk: "Low", period: "१३५ दिवस", water: "मध्यम", fertilizer: "NPK १००:५०:२५", demand: "Export High" },
    { name: "मोहरी बियाणे (बोल्ड)", score: 88, investment: "₹१८,००० / एकर", profit: "₹७८,००० / एकर", risk: "Medium", period: "११५ दिवस", water: "कमी", fertilizer: "सल्फरयुक्त NPK", demand: "High" },
    { name: "हरभरा (देशी चणा)", score: 90, investment: "₹२०,००० / एकर", profit: "₹९५,००० / एकर", risk: "Low", period: "११० दिवस", water: "कमी", fertilizer: "किमान, स्वतः नायट्रोजन स्थिरीकरण करतो", demand: "Moderate" },
  ],
  Summer: [
    { name: "उन्हाळी मूग", score: 82, investment: "₹१२,००० / एकर", profit: "₹५८,००० / एकर", risk: "Low", period: "७० दिवस", water: "खूप कमी", fertilizer: "किमान फॉस्फेट्स", demand: "Moderate" },
    { name: "भुईमूग (जी-२०)", score: 87, investment: "₹२६,००० / एकर", profit: "₹१,१०,००० / एकर", risk: "Medium", period: "१२५ दिवस", water: "मध्यम", fertilizer: "जिप्सम + NPK", demand: "High" },
    { name: "सेंद्रिय बाजरी", score: 91, investment: "₹१५,००० / एकर", profit: "₹६५,००० / एकर", risk: "Low", period: "८५ दिवस", water: "कमी", fertilizer: "सेंद्रिय खत कंपोस्ट", demand: "High" },
  ],
};

// Hindi crop lists
const mockCropsHi: Record<string, Crop[]> = {
  Monsoon: [
    { name: "बासमती चावल (पूसा 1121)", score: 98, investment: "₹38,000 / एकड़", profit: "₹1,45,000 / एकड़", risk: "Low", period: "120 दिन", water: "बहुत अधिक", fertilizer: "नाइट्रोजन युक्त, NPK 120:60:40", demand: "Export High" },
    { name: "बीटी कपास (लंबा स्टेपल)", score: 94, investment: "₹42,000 / एकड़", profit: "₹1,80,000 / एकड़", risk: "Medium", period: "160 दिन", water: "अधिक", fertilizer: "NPK 150:75:75 + बोरॉन", demand: "Export High" },
    { name: "जैविक पीला सोयाबीन", score: 92, investment: "₹24,000 / एकड़", profit: "₹1,15,000 / एकड़", risk: "Low", period: "110 दिन", water: "मध्यम", fertilizer: "कम नाइट्रोजन, अधिक फास्फोरस", demand: "High" },
  ],
  Winter: [
    { name: "प्रीमियम ड्यूरम गेहूं", score: 96, investment: "₹32,000 / एकड़", profit: "₹1,35,000 / एकड़", risk: "Low", period: "135 दिन", water: "मध्यम", fertilizer: "NPK 100:50:25", demand: "Export High" },
    { name: "सरसों के बीज (बोल्ड)", score: 88, investment: "₹18,000 / एकड़", profit: "₹78,000 / एकड़", risk: "Medium", period: "115 दिन", water: "कम", fertilizer: "सल्फर समृद्ध NPK", demand: "High" },
    { name: "चना (देशी)", score: 90, investment: "₹20,000 / एकड़", profit: "₹95,000 / एकड़", risk: "Low", period: "110 दिन", water: "कम", fertilizer: "न्यूनतम, नाइट्रोजन स्थिरीकरण", demand: "Moderate" },
  ],
  Summer: [
    { name: "ग्रीष्मकालीन मूंग", score: 82, investment: "₹12,000 / एकड़", profit: "₹58,000 / एकड़", risk: "Low", period: "70 दिन", water: "बहुत कम", fertilizer: "न्यूनतम फॉस्फेट", demand: "Moderate" },
    { name: "मूंगफली (जी-20)", score: 87, investment: "₹26,000 / एकड़", profit: "₹1,10,000 / एकड़", risk: "Medium", period: "125 दिन", water: "मध्यम", fertilizer: "जिप्सम + NPK", demand: "High" },
    { name: "जैविक बाजरा", score: 91, investment: "₹15,000 / एकड़", profit: "₹65,000 / एकड़", risk: "Low", period: "85 दिन", water: "कम", fertilizer: "जैविक खाद कंपोस्ट", demand: "High" },
  ],
};

const getLocalizedCrops = (lang: Language): Record<string, Crop[]> => {
  if (lang === "mr") return mockCropsMr;
  if (lang === "hi") return mockCropsHi;
  return mockCropsEn;
};

export default function CropRecommender({ lang }: CropRecommenderProps) {
  const [season, setSeason] = useState("Monsoon");
  const [soilType, setSoilType] = useState("Loam");
  const [pH, setPh] = useState("6.5");
  const [budget, setBudget] = useState("medium");
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<Crop[]>([]);

  const t = translations[lang] || translations.en;

  const handleRecommend = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setRecommendations([]);

    const cropsData = getLocalizedCrops(lang);

    setTimeout(() => {
      setRecommendations(cropsData[season] || []);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <div className="glass-panel p-6 rounded-3xl border border-emerald-900/10 dark:border-white/10 bg-white/60 dark:bg-white/5">
        <h3 className="text-xl font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2 mb-6">
          <Sprout className="w-6 h-6" />
          {t.cropAdvisorTitle}
        </h3>

        <form onSubmit={handleRecommend} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs text-emerald-900/60 dark:text-white/50 uppercase font-bold mb-2">{t.seasonLabel}</label>
            <select
              value={season}
              onChange={(e) => setSeason(e.target.value)}
              className="w-full bg-white dark:bg-nature-900 border border-emerald-500/10 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 text-emerald-950 dark:text-white font-bold"
            >
              <option value="Monsoon">{lang === "mr" ? "खरीप हंगाम" : lang === "hi" ? "खरीफ मौसम" : "Monsoon (Kharif)"}</option>
              <option value="Winter">{lang === "mr" ? "रब्बी हंगाम" : lang === "hi" ? "रबी मौसम" : "Winter (Rabi)"}</option>
              <option value="Summer">{lang === "mr" ? "उन्हाळी हंगाम" : lang === "hi" ? "जायद मौसम" : "Summer (Zaid)"}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-emerald-900/60 dark:text-white/50 uppercase font-bold mb-2">{t.soilTypeLabel}</label>
            <select
              value={soilType}
              onChange={(e) => setSoilType(e.target.value)}
              className="w-full bg-white dark:bg-nature-900 border border-emerald-500/10 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 text-emerald-950 dark:text-white font-bold"
            >
              <option value="Loam">{lang === "mr" ? "गाळाची/दुमट माती" : lang === "hi" ? "दोमट मिट्टी" : "Loam / Alluvial Soil"}</option>
              <option value="Black">{lang === "mr" ? "काळी कसदार माती (रेगूर)" : lang === "hi" ? "काली कपास मिट्टी" : "Black Clay Soil"}</option>
              <option value="Red">{lang === "mr" ? "तांबडी माती" : lang === "hi" ? "लाल बलुई मिट्टी" : "Red Sandy Soil"}</option>
              <option value="Laterite">{lang === "mr" ? "जांभी माती" : lang === "hi" ? "लैटेराइट मिट्टी" : "Laterite Soil"}</option>
            </select>
          </div>

          <div>
            <label className="block text-xs text-emerald-900/60 dark:text-white/50 uppercase font-bold mb-2">{t.pHLabel} ({pH})</label>
            <input
              type="range"
              min="4.5"
              max="8.5"
              step="0.1"
              value={pH}
              onChange={(e) => setPh(e.target.value)}
              className="w-full accent-emerald-600 mt-2"
            />
            <div className="flex justify-between text-[10px] text-emerald-800/40 dark:text-white/40 mt-1 font-bold">
              <span>{lang === "mr" ? "अम्लीय" : lang === "hi" ? "अम्लीय" : "Acidic"} (4.5)</span>
              <span>{lang === "mr" ? "उदासीन" : lang === "hi" ? "उदासीन" : "Neutral"} (7.0)</span>
              <span>{lang === "mr" ? "क्षारीय" : lang === "hi" ? "क्षारीय" : "Alkaline"} (8.5)</span>
            </div>
          </div>

          <div>
            <label className="block text-xs text-emerald-900/60 dark:text-white/50 uppercase font-bold mb-2">{t.budgetLabel}</label>
            <select
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              className="w-full bg-white dark:bg-nature-900 border border-emerald-500/10 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-emerald-600 text-emerald-950 dark:text-white font-bold"
            >
              <option value="low">{t.lowCapital}</option>
              <option value="medium">{t.mediumCapital}</option>
              <option value="high">{t.highCapital}</option>
            </select>
          </div>

          <div className="md:col-span-2 lg:col-span-4 mt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-emerald-600 to-green-700 hover:from-emerald-700 hover:to-green-800 text-white font-bold py-3 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 uppercase tracking-wide text-xs"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  {t.runningAnalysis}
                </>
              ) : (
                <>{t.analyzeBtn}</>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Output Results */}
      {recommendations.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendations.map((crop, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-3xl border border-emerald-900/10 dark:border-white/10 flex flex-col justify-between relative overflow-hidden group hover:border-emerald-600/30 transition-all bg-white/70 dark:bg-white/5">
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all" />

              <div>
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-500/15 px-2.5 py-1 rounded-full uppercase tracking-wider">
                      {crop.score}% {t.matchScore}
                    </span>
                    <h4 className="text-lg font-extrabold mt-3 text-emerald-950 dark:text-white tracking-wide">{crop.name}</h4>
                  </div>
                  <Sprout className="w-7 h-7 text-emerald-600 bg-emerald-500/5 p-1.5 rounded-xl border border-emerald-500/10 dark:border-white/5" />
                </div>

                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="space-y-1">
                    <p className="text-[9px] text-[#8F5C38] uppercase font-bold flex items-center gap-1">
                      <DollarSign className="w-3 h-3 text-[#FF9933]" />
                      {t.profit}
                    </p>
                    <p className="text-sm font-extrabold text-emerald-700 dark:text-emerald-400">{crop.profit}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] text-[#8F5C38] uppercase font-bold flex items-center gap-1">
                      <Activity className="w-3 h-3 text-[#FF9933]" />
                      {t.investment}
                    </p>
                    <p className="text-sm font-bold text-emerald-950 dark:text-white/90">{crop.investment}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] text-[#8F5C38] uppercase font-bold flex items-center gap-1">
                      <AlertCircle className="w-3 h-3 text-[#FF9933]" />
                      {t.risk}
                    </p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full inline-block ${
                      crop.risk === "Low" ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400" : "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                    }`}>
                      {crop.risk === "Low" ? (lang === "mr" ? "कमी" : lang === "hi" ? "कम" : "Low") : (lang === "mr" ? "मध्यम" : lang === "hi" ? "मध्यम" : "Medium")}
                    </span>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] text-[#8F5C38] uppercase font-bold flex items-center gap-1">
                      <TrendingUp className="w-3 h-3 text-[#FF9933]" />
                      {t.demandIndex}
                    </p>
                    <p className="text-xs font-bold text-emerald-950 dark:text-white/90">
                      {crop.demand === "Export High" ? (lang === "mr" ? "निर्यात जास्त" : lang === "hi" ? "निर्यात अधिक" : "Export High") : (lang === "mr" ? "जास्त" : lang === "hi" ? "अधिक" : "High")}
                    </p>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-emerald-500/10 dark:border-white/5 space-y-2 text-xs text-emerald-900/80 dark:text-white/70">
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1 font-bold">{t.waterNeeds}:</span>
                    <span className="font-extrabold text-emerald-950 dark:text-white/95">{crop.water}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="flex items-center gap-1 font-bold">{t.nutrition}:</span>
                    <span className="font-extrabold text-emerald-950 dark:text-white/95 truncate max-w-[150px]">{crop.fertilizer}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <button className="w-full bg-emerald-500/10 hover:bg-emerald-600 text-emerald-950 hover:text-white dark:text-white dark:hover:text-emerald-300 dark:bg-white/5 dark:hover:bg-emerald-500/20 font-bold py-2 rounded-xl border border-emerald-500/10 dark:border-white/10 transition-all text-xs tracking-wider uppercase">
                  {t.viewGuide}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
