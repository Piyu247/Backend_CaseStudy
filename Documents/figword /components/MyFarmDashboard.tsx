import React, { useState } from "react";
import { 
  MapPin, Sprout, CloudSun, Droplets, ShieldAlert, TrendingUp, Sparkles, 
  CheckCircle2, Calendar, DollarSign, Award, AlertTriangle, ArrowRight, Activity, Thermometer
} from "lucide-react";
import { Language } from "../utils/translations";

interface MyFarmDashboardProps {
  lang: Language;
  onNavigateTab?: (tab: string) => void;
}

export default function MyFarmDashboard({ lang, onNavigateTab }: MyFarmDashboardProps) {
  const [tasks, setTasks] = useState([
    { id: 1, text: lang === "mr" ? "संध्याकाळी ४ वाजता १% मॅग्नेशियम सल्फेट (MgSO4) फवारणी करा" : lang === "hi" ? "शाम 4 बजे 1% मैग्नीशियम सल्फेट (MgSO4) का छिड़काव करें" : "Apply 1% Magnesium Sulphate (MgSO4) spray at 4 PM", completed: false, priority: "High" },
    { id: 2, text: lang === "mr" ? "मुख्य ड्रिप सिंचन सब-मेन फिल्टर स्वच्छ करा" : lang === "hi" ? "मुख्य ड्रिप सिंचाई सब-मेन फिल्टर साफ करें" : "Flush sub-main drip irrigation line filter", completed: true, priority: "Medium" },
    { id: 3, text: lang === "mr" ? "गुलाबी बोंड अळीसाठी ५ कामगंध सापळे तपासा" : lang === "hi" ? "गुलाबी सूंडी के लिए 5 फेरोमोन ट्रैप की जांच करें" : "Inspect 5 pheromone traps for Pink Bollworm", completed: false, priority: "High" },
    { id: 4, text: lang === "mr" ? "ई-नाम (eNAM) पोर्टलबद्दल कृषी बाजाराचे दर तपासा" : lang === "hi" ? "ई-नाम (eNAM) पोर्टल पर मंडी दर जांचें" : "Check live APMC mandi rates on eNAM portal", completed: false, priority: "Low" }
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* Welcome Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-emerald-900/10 dark:border-white/10 bg-gradient-to-r from-emerald-900/15 via-emerald-600/10 to-teal-900/15 dark:from-emerald-950/60 dark:to-nature-950 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-emerald-600 text-white text-[10px] uppercase tracking-widest font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
              📍 Connected Land Plot #MH-AHM-402
            </span>
            <span className="bg-emerald-500/20 text-emerald-900 dark:text-emerald-300 text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-emerald-500/20">
              Active Monitoring
            </span>
          </div>
          <h2 className="text-2xl font-black text-emerald-950 dark:text-white mt-2 font-outfit flex items-center gap-2">
            {lang === "mr" ? "माझे शेत (माझे डॅशबोर्ड)" : lang === "hi" ? "मेरा खेत (मेरा डैशबोर्ड)" : "My Farm Dashboard"}
          </h2>
          <p className="text-xs text-emerald-900/70 dark:text-white/60 mt-1 max-w-xl font-medium">
            {lang === "mr" 
              ? "तुमच्या शेतीचे हवामान, मातीचे आरोग्य, पिकाची स्थिती, दैनंदिन कामे आणि एआय शिफारसी एकाच ठिकाणी."
              : lang === "hi"
              ? "आपके खेत का मौसम, मिट्टी का स्वास्थ्य, फसल की प्रगति, दैनिक कार्य और AI सिफारिशें एक ही स्थान पर।"
              : "Your complete farm control center: real-time crop metrics, soil diagnostics, microclimate feed, daily tasks, and daily AI guidance."}
          </p>
        </div>

        {/* Quick Action Navigation */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => onNavigateTab && onNavigateTab("chat")}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-2xl shadow-md transition-all text-xs flex items-center gap-1.5 border border-emerald-500/30"
          >
            <Sparkles className="w-4 h-4" /> Ask AI Voice
          </button>
          <button
            onClick={() => onNavigateTab && onNavigateTab("modules")}
            className="bg-white dark:bg-white/10 text-emerald-950 dark:text-white font-bold px-4 py-2.5 rounded-2xl shadow-sm hover:bg-emerald-500/10 transition-all text-xs border border-emerald-500/20 dark:border-white/10"
          >
            Action Center
          </button>
        </div>
      </div>

      {/* Top 4 KPI Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Farm Health Score (0-100) */}
        <div className="glass-panel p-5 rounded-3xl border border-emerald-500/20 dark:border-white/10 bg-white/70 dark:bg-white/5 space-y-2 relative overflow-hidden">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black uppercase text-emerald-800/70 dark:text-white/60 tracking-wider">Farm Health Index</span>
            <Activity className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-700 dark:text-emerald-400 font-outfit">88</span>
            <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400">/ 100</span>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-500/15 px-2 py-0.5 rounded-full ml-auto">EXCELLENT</span>
          </div>
          <div className="w-full bg-emerald-900/10 dark:bg-white/10 h-2 rounded-full overflow-hidden">
            <div className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full" style={{ width: "88%" }} />
          </div>
          <p className="text-[10px] text-emerald-900/60 dark:text-white/50 pt-1 font-medium">Optimal photosynthesis & balanced moisture.</p>
        </div>

        {/* Estimated Seasonal Profit */}
        <div className="glass-panel p-5 rounded-3xl border border-amber-500/20 dark:border-white/10 bg-white/70 dark:bg-white/5 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black uppercase text-[#8F5C38] dark:text-amber-400 tracking-wider">Est. Seasonal Profit</span>
            <DollarSign className="w-5 h-5 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-black text-emerald-950 dark:text-white font-outfit">₹1,45,000</span>
            <span className="text-xs font-bold text-emerald-800/70 dark:text-white/60">/ acre</span>
          </div>
          <p className="text-[10px] text-emerald-900/60 dark:text-white/50 pt-1 font-medium">Based on current APMC Mandi price of ₹7,200/qtl.</p>
        </div>

        {/* Microclimate Weather */}
        <div className="glass-panel p-5 rounded-3xl border border-emerald-500/20 dark:border-white/10 bg-white/70 dark:bg-white/5 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black uppercase text-emerald-800/70 dark:text-white/60 tracking-wider">Live Microclimate</span>
            <CloudSun className="w-5 h-5 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-emerald-950 dark:text-white font-outfit">28.4°C</span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">64% Humidity</span>
          </div>
          <p className="text-[10px] text-emerald-900/60 dark:text-white/50 pt-1 font-medium">Clear skies. Ambient soil transpiration balanced.</p>
        </div>

        {/* Active Crop & Growth Stage */}
        <div className="glass-panel p-5 rounded-3xl border border-emerald-500/20 dark:border-white/10 bg-white/70 dark:bg-white/5 space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-[10px] font-black uppercase text-emerald-800/70 dark:text-white/60 tracking-wider">Active Crop Stage</span>
            <Sprout className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-black text-emerald-950 dark:text-white font-outfit">Bt Cotton</span>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400"> (Day 62)</span>
          </div>
          <p className="text-[10px] text-emerald-900/60 dark:text-white/50 pt-1 font-medium">Square & Flowering stage. 58 days to harvest.</p>
        </div>

      </div>

      {/* AI Daily Top Priority Recommendation Banner */}
      <div className="glass-panel p-5 rounded-3xl border border-amber-500/30 bg-amber-500/5 dark:bg-amber-500/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex gap-3.5 items-start">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-600 dark:text-amber-300 shrink-0 mt-0.5">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-black uppercase text-[#8F5C38] dark:text-amber-400 tracking-wider">🤖 AI's Top Recommendation for Today</span>
            <h4 className="text-sm font-extrabold text-emerald-950 dark:text-white mt-0.5">
              {lang === "mr" 
                ? "पावसाळ्यातील आर्द्रतेमुळे खोडकिडा आणि बुरशी रोखण्यासाठी ट्रायकोकार्ड लावा."
                : lang === "hi"
                ? "मानसूनी नमी से तना छेदक और फफूंद रोकने के लिए खेत में ट्राइकोकार्ड लगाएं।"
                : "Deploy 5 Trichogramma cards per acre today to block Pink Bollworm & stem borers before rain."}
            </h4>
            <p className="text-xs text-emerald-900/75 dark:text-white/70 mt-1 font-medium leading-relaxed">
              Based on your Black Clay soil moisture index (48%) and forecast rain on Friday evening.
            </p>
          </div>
        </div>

        <button
          onClick={() => onNavigateTab && onNavigateTab("disease")}
          className="bg-amber-600 hover:bg-amber-700 text-white font-bold px-4 py-2 rounded-xl text-xs whitespace-nowrap shadow-sm transition-all flex items-center gap-1 shrink-0"
        >
          Scan Crop Leaf <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Soil Health Card & Realtime Risks Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Soil Diagnostics Card */}
        <div className="glass-panel p-6 rounded-3xl border border-emerald-900/10 dark:border-white/10 bg-white/70 dark:bg-white/5 space-y-4">
          <div className="flex items-center justify-between border-b border-emerald-900/10 dark:border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Sprout className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="font-extrabold text-sm text-emerald-950 dark:text-white font-outfit">Soil Diagnostics Card</h3>
            </div>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-500/15 px-2.5 py-0.5 rounded-full">Updated 3d ago</span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="bg-emerald-500/5 dark:bg-white/5 p-3 rounded-2xl border border-emerald-500/10">
              <span className="text-[10px] font-bold text-emerald-900/60 dark:text-white/50 block uppercase">Soil Type</span>
              <p className="font-extrabold text-emerald-950 dark:text-white mt-1">Black Clay (Regur)</p>
            </div>
            <div className="bg-emerald-500/5 dark:bg-white/5 p-3 rounded-2xl border border-emerald-500/10">
              <span className="text-[10px] font-bold text-emerald-900/60 dark:text-white/50 block uppercase">Soil pH Index</span>
              <p className="font-extrabold text-emerald-700 dark:text-emerald-400 mt-1">6.8 (Optimal)</p>
            </div>
            <div className="bg-emerald-500/5 dark:bg-white/5 p-3 rounded-2xl border border-emerald-500/10">
              <span className="text-[10px] font-bold text-emerald-900/60 dark:text-white/50 block uppercase">Organic Carbon</span>
              <p className="font-extrabold text-emerald-950 dark:text-white mt-1">0.65% (Good)</p>
            </div>
            <div className="bg-emerald-500/5 dark:bg-white/5 p-3 rounded-2xl border border-emerald-500/10">
              <span className="text-[10px] font-bold text-emerald-900/60 dark:text-white/50 block uppercase">NPK Ratio</span>
              <p className="font-extrabold text-emerald-950 dark:text-white mt-1">120 : 60 : 40</p>
            </div>
          </div>

          <div className="bg-emerald-500/10 dark:bg-white/5 p-3 rounded-2xl border border-emerald-500/15">
            <p className="text-[11px] text-emerald-900 dark:text-white/90 font-semibold leading-relaxed">
              💡 <strong>Agronomist Note:</strong> Nitrogen absorption is high. Supplement 1% Magnesium Sulphate spray to prevent leaf yellowing.
            </p>
          </div>
        </div>

        {/* Current Field Risks & Alerts */}
        <div className="glass-panel p-6 rounded-3xl border border-emerald-900/10 dark:border-white/10 bg-white/70 dark:bg-white/5 space-y-4">
          <div className="flex items-center justify-between border-b border-emerald-900/10 dark:border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-500" />
              <h3 className="font-extrabold text-sm text-emerald-950 dark:text-white font-outfit">Active Field Risks</h3>
            </div>
            <span className="text-[10px] font-black uppercase text-amber-600 bg-amber-500/15 px-2 py-0.5 rounded-full">2 Warnings</span>
          </div>

          <div className="space-y-3 text-xs">
            <div className="bg-amber-500/10 border border-amber-500/20 p-3 rounded-2xl flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-emerald-950 dark:text-white">Friday Thunderstorm Waterlogging</h4>
                <p className="text-[11px] text-emerald-900/70 dark:text-white/70 mt-0.5 leading-relaxed">
                  Clear drainage furrows in Cotton Bed #2 to avoid root suffocation.
                </p>
              </div>
            </div>

            <div className="bg-emerald-500/5 dark:bg-white/5 border border-emerald-500/10 p-3 rounded-2xl flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-emerald-950 dark:text-white">Pest Threat Level: LOW</h4>
                <p className="text-[11px] text-emerald-900/70 dark:text-white/70 mt-0.5 leading-relaxed">
                  Pheromone trap count below ETL threshold (2 moths/trap).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Today's Farming Tasks Checklist */}
        <div className="glass-panel p-6 rounded-3xl border border-emerald-900/10 dark:border-white/10 bg-white/70 dark:bg-white/5 space-y-4">
          <div className="flex items-center justify-between border-b border-emerald-900/10 dark:border-white/10 pb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="font-extrabold text-sm text-emerald-950 dark:text-white font-outfit">Today's Tasks</h3>
            </div>
            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-500/15 px-2.5 py-0.5 rounded-full">
              {tasks.filter(t => t.completed).length} / {tasks.length} Done
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            {tasks.map((task) => (
              <div
                key={task.id}
                onClick={() => toggleTask(task.id)}
                className={`p-3 rounded-2xl border cursor-pointer transition-all flex items-start gap-2.5 ${
                  task.completed
                    ? "bg-emerald-500/10 border-emerald-500/20 line-through opacity-75"
                    : "bg-white dark:bg-white/5 border-emerald-500/15 dark:border-white/10 hover:border-emerald-500/30"
                }`}
              >
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleTask(task.id)}
                  className="mt-0.5 accent-emerald-600 rounded"
                />
                <div className="flex-1">
                  <p className="font-bold text-emerald-950 dark:text-white leading-snug">{task.text}</p>
                  <span className={`text-[9px] font-black uppercase tracking-wider mt-1 inline-block px-1.5 py-0.2 rounded ${
                    task.priority === "High" ? "bg-red-500/15 text-red-700 dark:text-red-300" : "bg-emerald-500/15 text-emerald-800 dark:text-emerald-300"
                  }`}>
                    {task.priority} Priority
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
