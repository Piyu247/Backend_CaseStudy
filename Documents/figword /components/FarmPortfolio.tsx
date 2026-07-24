import React from "react";
import { 
  Building2, MapPin, Star, ShieldCheck, Sprout, Award, ExternalLink, CheckCircle2, Phone, Share2
} from "lucide-react";
import { Language } from "../utils/translations";

interface FarmPortfolioProps {
  lang: Language;
}

export default function FarmPortfolio({ lang }: FarmPortfolioProps) {
  return (
    <div className="space-y-6 pb-12">
      
      {/* Farm Public Profile Card */}
      <div className="glass-panel p-6 rounded-3xl border border-emerald-900/10 dark:border-white/10 bg-white/80 dark:bg-white/5 space-y-6 shadow-md">
        
        {/* Cover / Header */}
        <div className="relative h-44 rounded-2xl bg-gradient-to-r from-emerald-800 via-teal-700 to-emerald-900 overflow-hidden flex items-end p-6 text-white shadow-lg">
          <div className="absolute top-4 right-4 bg-emerald-600/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider flex items-center gap-1 border border-emerald-400/30">
            <ShieldCheck className="w-4 h-4 text-emerald-300" /> Verified Farm Identity
          </div>
          <div>
            <span className="text-[10px] font-black uppercase text-amber-300 tracking-widest bg-black/40 px-2 py-0.5 rounded">
              Organic Certified • Reg #MH-2026-4401
            </span>
            <h2 className="text-3xl font-black font-outfit mt-1">Patil Organic Agro Farms</h2>
            <p className="text-xs text-white/80 flex items-center gap-1 mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" /> Rahuri, Ahmednagar, Maharashtra • 5 Acres Black Soil
            </p>
          </div>
        </div>

        {/* Owner Details & Rating */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-emerald-500/10 dark:border-white/10 pb-4">
          <div>
            <h4 className="text-base font-extrabold text-emerald-950 dark:text-white">Owner: Piyush Patil</h4>
            <p className="text-xs text-emerald-900/60 dark:text-white/60">14 Years Agricultural Experience • 3rd Generation Farmer</p>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-sm font-black text-amber-600 dark:text-amber-400 bg-amber-500/10 px-3 py-1 rounded-xl border border-amber-500/20">
              ⭐⭐⭐⭐⭐ 4.9 / 5.0 (124 Trade Reviews)
            </span>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1 shadow-sm">
              <Share2 className="w-3.5 h-3.5" /> Share Digital Identity
            </button>
          </div>
        </div>

        {/* Plot Specifications & Harvest Calendar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          <div className="bg-emerald-500/5 dark:bg-white/5 p-4 rounded-2xl border border-emerald-500/10 space-y-1">
            <span className="text-[10px] font-black uppercase text-emerald-700 dark:text-emerald-400">Land Area & Soil</span>
            <p className="font-extrabold text-emerald-950 dark:text-white">5 Acres • Deep Black Cotton Soil (Regur)</p>
          </div>
          <div className="bg-emerald-500/5 dark:bg-white/5 p-4 rounded-2xl border border-emerald-500/10 space-y-1">
            <span className="text-[10px] font-black uppercase text-emerald-700 dark:text-emerald-400">Main Crops</span>
            <p className="font-extrabold text-emerald-950 dark:text-white">Sugarcane, Bt Cotton, Organic Turmeric</p>
          </div>
          <div className="bg-emerald-500/5 dark:bg-white/5 p-4 rounded-2xl border border-emerald-500/10 space-y-1">
            <span className="text-[10px] font-black uppercase text-emerald-700 dark:text-emerald-400">Irrigation Setup</span>
            <p className="font-extrabold text-emerald-950 dark:text-white">Sub-surface Inline Drip + Borewell</p>
          </div>
        </div>

        {/* Current Available Stock for Exporters / Wholesale Buyers */}
        <div className="space-y-3">
          <h4 className="text-xs font-black text-emerald-950 dark:text-white uppercase tracking-wider">
            Current Harvest Available for Bulk Buyers & Exporters:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl flex justify-between items-center">
              <div>
                <span className="text-[9px] font-bold text-emerald-700 dark:text-emerald-400 uppercase">Organic Crop</span>
                <h5 className="font-black text-sm text-emerald-950 dark:text-white">Curcumin Rich Turmeric</h5>
                <p className="text-[11px] text-emerald-900/70 dark:text-white/70">800 kg Available • Harvested July 2026</p>
              </div>
              <button className="bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-xl text-xs">
                Contact Farmer
              </button>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 p-4 rounded-2xl flex justify-between items-center">
              <div>
                <span className="text-[9px] font-bold text-emerald-700 dark:text-emerald-400 uppercase">Perennial Crop</span>
                <h5 className="font-black text-sm text-emerald-950 dark:text-white">Co-86032 High Brix Sugarcane</h5>
                <p className="text-[11px] text-emerald-900/70 dark:text-white/70">45 Tons Available • Ready for Sugar Mill</p>
              </div>
              <button className="bg-emerald-600 text-white font-bold px-3 py-1.5 rounded-xl text-xs">
                Contact Farmer
              </button>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
