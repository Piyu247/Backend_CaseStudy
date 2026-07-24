import React, { useState } from "react";
import { TrendingUp, UserCheck, MapPin, Building, Globe, ChevronRight } from "lucide-react";
import { translations, Language } from "../utils/translations";

interface MarketIntelProps {
  lang: Language;
}

interface MandiPrice {
  crop: string;
  price: string;
  unit: string;
  change: string;
  direction: "up" | "down";
  trend: number[];
}

const mockEn: MandiPrice[] = [
  { crop: "Premium Basmati Rice", price: "₹6,850", unit: "per quintal", change: "+1.2%", direction: "up", trend: [6600, 6720, 6800, 6750, 6850] },
  { crop: "Premium Durum Wheat", price: "₹4,250", unit: "per quintal", change: "+0.8%", direction: "up", trend: [4050, 4100, 4220, 4200, 4250] },
  { crop: "Bt Cotton Long Staple", price: "₹9,850", unit: "per quintal", change: "-0.5%", direction: "down", trend: [10000, 9920, 9880, 9900, 9850] },
  { crop: "Organic Yellow Soybean", price: "₹5,600", unit: "per quintal", change: "+2.4%", direction: "up", trend: [5200, 5350, 5400, 5485, 5600] },
  { crop: "Mustard Seeds Bold", price: "₹6,890", unit: "per quintal", change: "+0.3%", direction: "up", trend: [6750, 6800, 6820, 6850, 6890] }
];

const mockMr: MandiPrice[] = [
  { crop: "प्रीमियम बासमती तांदूळ", price: "₹६,८५०", unit: "प्रति क्विंटल", change: "+१.२%", direction: "up", trend: [6600, 6720, 6800, 6750, 6850] },
  { crop: "प्रीमियम ड्युरम गहू", price: "₹४,२५०", unit: "प्रति क्विंटल", change: "+०.८%", direction: "up", trend: [4050, 4100, 4220, 4200, 4250] },
  { crop: "बीटी कापूस (लांब धागा)", price: "₹९,८५०", unit: "प्रति क्विंटल", change: "-०.५%", direction: "down", trend: [10000, 9920, 9880, 9900, 9850] },
  { crop: "सेंद्रिय पिवळी सोयाबीन", price: "₹५,६००", unit: "प्रति क्विंटल", change: "+२.४%", direction: "up", trend: [5200, 5350, 5400, 5485, 5600] },
  { crop: "मोहरी बियाणे", price: "₹६,८९०", unit: "प्रति क्विंटल", change: "+०.३%", direction: "up", trend: [6750, 6800, 6820, 6850, 6890] }
];

const mockHi: MandiPrice[] = [
  { crop: "प्रीमियम बासमती चावल", price: "₹6,850", unit: "प्रति क्विंटल", change: "+1.2%", direction: "up", trend: [6600, 6720, 6800, 6750, 6850] },
  { crop: "प्रीमियम ड्यूरम गेहूं", price: "₹4,250", unit: "प्रति क्विंटल", change: "+0.8%", direction: "up", trend: [4050, 4100, 4220, 4200, 4250] },
  { crop: "बीटी कपास (लंबा स्टेपल)", price: "₹9,850", unit: "प्रति क्विंटल", change: "-0.5%", direction: "down", trend: [10000, 9920, 9880, 9900, 9850] },
  { crop: "जैविक पीला सोयाबीन", price: "₹5,600", unit: "प्रति क्विंटल", change: "+2.4%", direction: "up", trend: [5200, 5350, 5400, 5485, 5600] },
  { crop: "सरसों के बीज", price: "₹6,890", unit: "प्रति क्विंटल", change: "+0.3%", direction: "up", trend: [6750, 6800, 6820, 6850, 6890] }
];

export default function MarketIntel({ lang }: MarketIntelProps) {
  const pricesData = lang === "mr" ? mockMr : lang === "hi" ? mockHi : mockEn;
  const [selectedCrop, setSelectedCrop] = useState<MandiPrice>(pricesData[0]);

  const t = translations[lang] || translations.en;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Mandi Price Index */}
      <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-emerald-900/10 dark:border-white/10 flex flex-col justify-between bg-white/60 dark:bg-white/5">
        <div>
          <div className="flex items-center justify-between border-b border-emerald-900/10 dark:border-white/10 pb-4 mb-4">
            <h3 className="font-bold text-lg text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" /> {t.mandiTitle}
            </h3>
            <span className="text-xs text-emerald-900/60 dark:text-white/50 bg-emerald-500/5 dark:bg-white/5 px-2.5 py-1 rounded-full uppercase tracking-wider font-semibold">
              APMC LIVE FEED
            </span>
          </div>

          <div className="space-y-2">
            {pricesData.map((item, idx) => (
              <div
                key={idx}
                onClick={() => setSelectedCrop(item)}
                className={`flex items-center justify-between p-3.5 rounded-2xl cursor-pointer border transition-all ${
                  selectedCrop.crop === item.crop
                    ? "bg-emerald-500/10 border-emerald-500/40"
                    : "bg-white/50 dark:bg-white/5 border-transparent hover:border-emerald-500/10 hover:bg-emerald-500/5 dark:hover:bg-white/10"
                }`}
              >
                <div>
                  <h4 className="font-bold text-sm text-emerald-950 dark:text-white">{item.crop}</h4>
                  <p className="text-[10px] text-emerald-900/50 dark:text-white/55 mt-0.5">{item.unit}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-black text-base text-emerald-950 dark:text-white">{item.price}</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                    item.direction === "up" ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-450" : "bg-red-500/15 text-red-600 dark:text-red-400"
                  }`}>
                    {item.change}
                  </span>
                  <ChevronRight className="w-4 h-4 text-emerald-900/45 dark:text-white/40" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Price Trend Chart */}
        <div className="mt-6 pt-4 border-t border-emerald-900/10 dark:border-white/10">
          <p className="text-xs text-emerald-900/60 dark:text-white/55 font-bold uppercase tracking-wider mb-3">
            {t.trendTitle}: {selectedCrop.crop}
          </p>
          <div className="h-20 flex items-end gap-3 px-2">
            {selectedCrop.trend.map((val, idx) => {
              const max = Math.max(...selectedCrop.trend);
              const min = Math.min(...selectedCrop.trend);
              const heightPercent = max === min ? 50 : ((val - min) / (max - min)) * 70 + 30;
              return (
                <div key={idx} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full rounded-t bg-gradient-to-t from-emerald-600 to-green-500 dark:from-emerald-700 dark:to-emerald-400 group relative transition-all cursor-pointer"
                    style={{ height: `${heightPercent}%` }}
                  >
                    <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-nature-950 border border-white/10 text-[9px] font-bold px-1.5 py-0.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-20 text-emerald-300">
                      ₹{val}
                    </span>
                  </div>
                  <span className="text-[9px] text-emerald-900/50 dark:text-white/40 mt-1.5 font-bold">
                    {lang === "mr" ? `दिवस ${idx + 1}` : lang === "hi" ? `दिन ${idx + 1}` : `Day ${idx + 1}`}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Nearby Bulk Buyers */}
      <div className="glass-panel p-6 rounded-3xl border border-emerald-900/10 dark:border-white/10 flex flex-col justify-between bg-white/60 dark:bg-white/5">
        <div>
          <div className="flex items-center justify-between border-b border-emerald-900/10 dark:border-white/10 pb-4 mb-4">
            <h3 className="font-bold text-lg text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
              <UserCheck className="w-5 h-5" /> {t.nearbyBuyers}
            </h3>
          </div>

          <div className="space-y-4">
            {[
              { name: lang === "mr" ? "टाटा कंझ्युमर कृषी विभाग" : lang === "hi" ? "टाटा कंज्यूमर एग्री" : "Tata Consumer Agri Ltd", loc: lang === "mr" ? "पुणे एपीएमसी (१२.४ किमी)" : "Pune APMC (12.4 km)", demand: lang === "mr" ? "तांदूळ / कापूस" : lang === "hi" ? "चावल / कपास" : "Rice / Cotton", rate: "Premium +2%", icon: Globe },
              { name: lang === "mr" ? "आयटीसी कृषी सहकारी संस्था" : lang === "hi" ? "आईटीसी कृषि सहकारी" : "ITC Agri Cooperatives", loc: lang === "mr" ? "शिक्रापूर (४.८ किमी)" : "Shikrapur (4.8 km)", demand: lang === "mr" ? "सोयाबीन / मोहरी" : lang === "hi" ? "सोयाबीन / सरसों" : "Soybean / Mustard", rate: "Premium +5%", icon: Building },
              { name: lang === "mr" ? "सह्याद्री फार्म्स प्रोड्युसर" : lang === "hi" ? "सह्याद्रि फार्म्स" : "Sahyadri Farms Producer", loc: lang === "mr" ? "हडपसर कोल्ड स्टोरेज (८.१ किमी)" : "Hadapsar Cold Storage (8.1 km)", demand: lang === "mr" ? "गहू / तृणधान्ये" : lang === "hi" ? "गेहूं / अनाज" : "Wheat / Grain", rate: "Mandi Standard", icon: MapPin }
            ].map((buyer, idx) => (
              <div key={idx} className="bg-white dark:bg-white/5 rounded-2xl p-4 border border-emerald-500/10 dark:border-white/5 space-y-3">
                <div className="flex items-center gap-3">
                  <buyer.icon className="w-8 h-8 text-emerald-600 bg-emerald-500/10 p-1.5 rounded-xl border border-emerald-500/20" />
                  <div>
                    <h4 className="font-bold text-xs text-emerald-950 dark:text-white">{buyer.name}</h4>
                    <p className="text-[9px] text-emerald-900/60 dark:text-white/50 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3" /> {buyer.loc}
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-between text-xs pt-2 border-t border-emerald-500/10 dark:border-white/5">
                  <span className="text-emerald-900/70 dark:text-white/60 text-[10px] font-bold">
                    {lang === "mr" ? "मागणी" : lang === "hi" ? "आवश्यकता" : "Buying"}: {buyer.demand}
                  </span>
                  <span className="font-extrabold text-emerald-700 dark:text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded text-[10px]">
                    {buyer.rate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="w-full bg-emerald-600 hover:bg-emerald-750 text-white font-bold py-2.5 rounded-xl transition-all text-xs tracking-wider uppercase mt-4 shadow-sm">
          {t.openTradingDesk}
        </button>
      </div>
    </div>
  );
}
