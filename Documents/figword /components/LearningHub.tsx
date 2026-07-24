import React, { useState, useMemo } from "react";
import {
  Play, Search, Mic, GraduationCap, Video, BookOpen, Clock, Sparkles, Filter,
  CheckCircle2, ShieldCheck, MapPin, Droplets, Sun, Sprout, Building2, ExternalLink,
  ChevronRight, RefreshCw, AlertCircle, Award, Layers
} from "lucide-react";
import { translations, Language } from "../utils/translations";
import { CATEGORIES, AGRICULTURAL_TUTORIALS, TRUSTED_SOURCES, VideoTutorial, CategoryInfo } from "../utils/learningData";

interface LearningHubProps {
  lang: Language;
}

export default function LearningHub({ lang }: LearningHubProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCrop, setSelectedCrop] = useState<string>("All");
  const [activeVideo, setActiveVideo] = useState<VideoTutorial | null>(null);
  const [voiceSearchActive, setVoiceSearchActive] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);
  const [customAiTutorials, setCustomAiTutorials] = useState<VideoTutorial[]>([]);

  // Farmer Personalization Context State
  const [farmerProfile, setFarmerProfile] = useState({
    state: "Maharashtra",
    district: "Ahmednagar",
    village: "Rahuri",
    soilType: "Black Cotton Soil",
    crop: "Sugarcane",
    season: "Kharif / Annual",
    weather: "Sunny (28°C)",
    water: "Sub-surface Drip / Borewell",
    languagePref: lang === "mr" ? "Marathi" : lang === "hi" ? "Hindi" : "English"
  });

  const [showProfileEdit, setShowProfileEdit] = useState(false);

  const t = translations[lang] || translations.en;

  // Voice Search Handler
  const triggerVoiceSearch = () => {
    if (typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.lang = lang === "mr" ? "mr-IN" : lang === "hi" ? "hi-IN" : "en-IN";

      recognition.onstart = () => setVoiceSearchActive(true);
      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        setSearchQuery(text);
        setVoiceSearchActive(false);
      };
      recognition.onerror = () => setVoiceSearchActive(false);
      recognition.onend = () => setVoiceSearchActive(false);
      recognition.start();
    } else {
      alert(lang === "mr" ? "तुमच्या ब्राऊजरमध्ये व्हॉईस सर्च सपोर्ट उपलब्ध नाही." : lang === "hi" ? "आपके ब्राउज़र में वॉयस सर्च उपलब्ध नहीं है।" : "Voice search is not supported in this browser.");
    }
  };

  // Quick Crop Selection Handler
  const handleCropSelect = (cropName: string) => {
    setSelectedCrop(cropName);
    setFarmerProfile(prev => ({ ...prev, crop: cropName }));
  };

  // Fetch AI Personalized Recommendations from Gemini API
  const fetchAiRecommendations = async () => {
    setAiLoading(true);
    try {
      const res = await fetch("/api/learning-recommendations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...farmerProfile, lang })
      });
      const data = await res.json();
      if (data.recommendations && data.recommendations.length > 0) {
        setCustomAiTutorials(data.recommendations);
      }
    } catch (err) {
      console.error("AI recommendation error:", err);
    } finally {
      setAiLoading(false);
    }
  };

  // Combine static curated library with dynamic AI recommendations
  const allTutorials = useMemo(() => {
    return [...customAiTutorials, ...AGRICULTURAL_TUTORIALS];
  }, [customAiTutorials]);

  // Filtering Logic
  const filteredTutorials = useMemo(() => {
    return allTutorials.filter((item) => {
      // 1. Search Query
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q) ||
        item.source.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.cropTags.some(t => t.toLowerCase().includes(q));

      // 2. Category Filter
      const matchesCategory =
        selectedCategory === "all" || item.category === selectedCategory;

      // 3. Crop Preset Filter
      const matchesCrop =
        selectedCrop === "All" ||
        item.cropTags.includes(selectedCrop) ||
        item.cropTags.includes("All Crops") ||
        item.cropTags.includes("All Farmers");

      return matchesSearch && matchesCategory && matchesCrop;
    });
  }, [allTutorials, searchQuery, selectedCategory, selectedCrop]);

  return (
    <div className="space-y-6 pb-12">

      {/* Top Banner Header */}
      <div className="glass-panel p-6 rounded-3xl border border-emerald-900/10 dark:border-white/10 bg-gradient-to-r from-emerald-900/10 via-emerald-600/5 to-teal-900/10 dark:from-emerald-950/40 dark:to-nature-950 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-emerald-600 text-white text-[10px] uppercase tracking-widest font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
              <ShieldCheck className="w-3 h-3" /> Verified Agricultural Knowledge
            </span>
            <span className="bg-amber-500/20 text-amber-800 dark:text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/20">
              100% Non-Ag Content Free
            </span>
          </div>
          <h3 className="text-2xl font-black text-emerald-950 dark:text-white mt-2 flex items-center gap-2.5 font-outfit">
            <GraduationCap className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
            {lang === "mr" ? "कृषी ज्ञान आणि व्हिडिओ केंद्र" : lang === "hi" ? "कृषि शिक्षा एवं ज्ञान केंद्र" : "Kechua Learning & Tutorial Hub"}
          </h3>
          <p className="text-xs text-emerald-900/70 dark:text-white/60 mt-1 max-w-2xl font-medium leading-relaxed">
            {lang === "mr"
              ? "ICAR, कृषी विज्ञान केंद्र (KVK), आणि राज्य कृषी विद्यापीठांचे प्रमाणित व्हिडिओ ट्युटोरियल्स. शून्य अवांछित सामग्री."
              : lang === "hi"
                ? "ICAR, कृषि विज्ञान केंद्र (KVK) एवं राज्य कृषि विश्वविद्यालयों के सत्यापित ट्यूटोरियल्स। केवल वैज्ञानिक कृषि मार्गदर्शन।"
                : "Dynamically curated agricultural tutorials from ICAR, KVKs, and trusted ag-scientists. Strictly zero entertainment or non-agricultural content."}
          </p>
        </div>

        <button
          onClick={fetchAiRecommendations}
          disabled={aiLoading}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2.5 rounded-2xl shadow-md transition-all text-xs flex items-center gap-2 border border-emerald-500/30 whitespace-nowrap active:scale-95 disabled:opacity-50"
        >
          <Sparkles className={`w-4 h-4 ${aiLoading ? "animate-spin" : ""}`} />
          {aiLoading
            ? (lang === "mr" ? "शोधात आहे..." : lang === "hi" ? "खोज जारी है..." : "AI Curating...")
            : (lang === "mr" ? "माझ्या पिकासाठी एआय ट्युटोरिअल" : lang === "hi" ? "मेरी फसल हेतु AI सुझाव" : "AI Personalize For My Farm")}
        </button>
      </div>

      {/* Trusted Sources Bar */}
      <div className="bg-emerald-500/5 dark:bg-white/5 p-3 rounded-2xl border border-emerald-500/10 dark:border-white/5 flex flex-wrap items-center justify-between gap-2">
        <span className="text-[10px] font-black uppercase text-emerald-800 dark:text-emerald-400 tracking-wider flex items-center gap-1">
          <Building2 className="w-3.5 h-3.5" /> Trusted Sources:
        </span>
        <div className="flex flex-wrap gap-1.5">
          {TRUSTED_SOURCES.slice(0, 5).map((src, idx) => (
            <span key={idx} className="bg-emerald-600/10 dark:bg-white/10 text-emerald-900 dark:text-white/80 text-[10px] font-semibold px-2 py-0.5 rounded-lg border border-emerald-500/10">
              ✓ {src.split("(")[0]}
            </span>
          ))}
        </div>
      </div>

      {/* Farmer Location & Profile Personalization Widget */}
      <div className="glass-panel p-6 rounded-3xl border border-emerald-500/20 dark:border-white/10 bg-white/80 dark:bg-nature-900/70 space-y-4 shadow-sm overflow-hidden">
        <div className="flex flex-wrap justify-between items-center gap-3 border-b border-emerald-500/10 dark:border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600/15 flex items-center justify-center text-emerald-700 dark:text-emerald-400 shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-black text-emerald-950 dark:text-white uppercase tracking-wider">
                {lang === "mr" ? "तुमचे शेतकरी प्रोफाइल (एआय शिफारसींसाठी)" : lang === "hi" ? "आपका किसान प्रोफाइल (AI सिफारिश हेतु)" : "Farmer Context & Field Profile"}
              </h4>
              <p className="text-[10px] text-emerald-900/60 dark:text-white/50 mt-0.5 font-medium">
                {farmerProfile.district}, {farmerProfile.state} • {farmerProfile.soilType} • {farmerProfile.crop}
              </p>
            </div>
          </div>

          <button
            onClick={() => setShowProfileEdit(!showProfileEdit)}
            className="text-[11px] font-extrabold text-emerald-700 dark:text-emerald-400 hover:bg-emerald-500/20 bg-emerald-500/10 px-3.5 py-1.5 rounded-xl border border-emerald-500/20 transition-all shrink-0"
          >
            {showProfileEdit ? "Close Edit" : "Edit Profile Data"}
          </button>
        </div>

        {/* Profile Edit Drawer */}
        {showProfileEdit && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
            <div>
              <label className="text-[10px] font-bold text-emerald-900/70 dark:text-white/70 block mb-1">State & District</label>
              <input
                type="text"
                value={`${farmerProfile.state}, ${farmerProfile.district}`}
                onChange={(e) => {
                  const parts = e.target.value.split(",");
                  setFarmerProfile(p => ({ ...p, state: parts[0] || "", district: parts[1] || "" }));
                }}
                className="w-full text-xs font-bold p-2 rounded-xl bg-white dark:bg-nature-950 border border-emerald-500/20 text-emerald-950 dark:text-white"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-emerald-900/70 dark:text-white/70 block mb-1">Soil Type</label>
              <select
                value={farmerProfile.soilType}
                onChange={(e) => setFarmerProfile(p => ({ ...p, soilType: e.target.value }))}
                className="w-full text-xs font-bold p-2 rounded-xl bg-white dark:bg-nature-950 border border-emerald-500/20 text-emerald-950 dark:text-white"
              >
                <option value="Black Cotton Soil">Black Cotton Soil (Regur)</option>
                <option value="Clay Loam Soil">Clay Loam Soil</option>
                <option value="Red Laterite Soil">Red Laterite Soil</option>
                <option value="Alluvial Sandy Soil">Alluvial Sandy Soil</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-emerald-900/70 dark:text-white/70 block mb-1">Current Crop</label>
              <select
                value={farmerProfile.crop}
                onChange={(e) => {
                  setFarmerProfile(p => ({ ...p, crop: e.target.value }));
                  setSelectedCrop(e.target.value);
                }}
                className="w-full text-xs font-bold p-2 rounded-xl bg-white dark:bg-nature-950 border border-emerald-500/20 text-emerald-950 dark:text-white"
              >
                <option value="Sugarcane">Sugarcane (ऊस)</option>
                <option value="Cotton">Cotton (कापूस)</option>
                <option value="Paddy">Paddy / Rice (भात / धान)</option>
                <option value="Wheat">Wheat (गहू)</option>
                <option value="Tomato">Tomato (टोमॅटो)</option>
                <option value="Soybean">Soybean (सोयाबीन)</option>
                <option value="Maize">Maize (मका)</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-emerald-900/70 dark:text-white/70 block mb-1">Water Source</label>
              <select
                value={farmerProfile.water}
                onChange={(e) => setFarmerProfile(p => ({ ...p, water: e.target.value }))}
                className="w-full text-xs font-bold p-2 rounded-xl bg-white dark:bg-nature-950 border border-emerald-500/20 text-emerald-950 dark:text-white"
              >
                <option value="Sub-surface Drip / Borewell">Drip Irrigation & Borewell</option>
                <option value="Canal Water Flow">Canal Water Flow</option>
                <option value="Rainfed Monsoon">Rainfed Monsoon</option>
              </select>
            </div>
          </div>
        )}

        {/* Quick Crop Presets Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          <span className="text-[10px] font-black uppercase text-emerald-800 dark:text-emerald-400 whitespace-nowrap flex items-center gap-1">
            <Sprout className="w-3.5 h-3.5" /> Crop Presets:
          </span>
          {["All", "Sugarcane", "Cotton", "Paddy", "Wheat", "Tomato", "Soybean", "Maize", "Fish", "Cattle"].map((crop) => (
            <button
              key={crop}
              onClick={() => handleCropSelect(crop)}
              className={`px-3 py-1 rounded-xl text-xs font-extrabold whitespace-nowrap transition-all border ${selectedCrop === crop
                  ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                  : "bg-emerald-500/5 dark:bg-white/5 text-emerald-950 dark:text-white hover:bg-emerald-500/10 border-emerald-500/10 dark:border-white/5"
                }`}
            >
              {crop === "Sugarcane" ? "🌾 Sugarcane" : crop === "Cotton" ? "☁️ Cotton" : crop === "Paddy" ? "🌾 Paddy" : crop}
            </button>
          ))}
        </div>
      </div>

      {/* 24 Categorized Scrollable Ribbon */}
      <div className="space-y-2">
        <div className="flex justify-between items-center px-1">
          <h4 className="text-xs font-black text-emerald-950 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            {lang === "mr" ? "२४ विषयनिहाय श्रेणी" : lang === "hi" ? "24 वर्गीकृत श्रेणियां" : "24 Categorized Learning Modules"}
          </h4>
          <span className="text-[10px] font-bold text-emerald-800/60 dark:text-white/50">
            {filteredTutorials.length} Tutorials Available
          </span>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto py-1 scrollbar-thin scrollbar-thumb-emerald-600">
          <button
            onClick={() => setSelectedCategory("all")}
            className={`px-3.5 py-2 rounded-2xl text-xs font-black whitespace-nowrap transition-all border flex items-center gap-1.5 ${selectedCategory === "all"
                ? "bg-emerald-700 text-white border-emerald-700 shadow-md"
                : "bg-white dark:bg-white/5 text-emerald-950 dark:text-white hover:bg-emerald-500/10 border-emerald-500/15 dark:border-white/10"
              }`}
          >
            🌟 {lang === "mr" ? "सर्व श्रेणी" : lang === "hi" ? "सभी श्रेणियां" : "All Categories"}
          </button>

          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const categoryName = cat.name[lang] || cat.name.en;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-2xl text-xs font-black whitespace-nowrap transition-all border flex items-center gap-1.5 ${isSelected
                    ? "bg-emerald-600 text-white border-emerald-600 shadow-md"
                    : "bg-white dark:bg-white/5 text-emerald-950 dark:text-white hover:bg-emerald-500/10 border-emerald-500/15 dark:border-white/10"
                  }`}
              >
                <span>{cat.icon}</span>
                <span>{categoryName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Voice & Text Search Bar */}
      <div className="relative">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={
            lang === "mr"
              ? "उदा. ठिबक सिंचन, गुलाबी बोंड अळी, खत व्यवस्थापन, पीएम किसान..."
              : lang === "hi"
                ? "उदा. टपक सिंचाई, गुलाबी सूंडी, ड्रिप Fertigation, पीएम किसान..."
                : "Search tutorials by topic, crop, pest, fertilizer, scheme (e.g. Pink bollworm, Sugarcane drip)..."
          }
          className="w-full bg-white dark:bg-nature-900 border border-emerald-500/20 dark:border-white/10 rounded-2xl pl-11 pr-24 py-3.5 text-xs text-emerald-950 dark:text-white focus:outline-none focus:border-emerald-600 font-bold shadow-sm"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-900/40 dark:text-white/40" />

        <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1.5">
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-[10px] font-bold text-emerald-900/50 hover:text-emerald-950 dark:text-white/50 dark:hover:text-white px-1.5 py-1"
            >
              Clear
            </button>
          )}
          <button
            onClick={triggerVoiceSearch}
            className={`w-9 h-9 rounded-xl flex items-center justify-center border transition-all ${voiceSearchActive
                ? "bg-red-500 border-red-500 text-white animate-pulse"
                : "bg-emerald-500/10 border-emerald-500/15 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20"
              }`}
            title="Voice Search"
          >
            <Mic className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Video Modal Player (if active) */}
      {activeVideo && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-nature-900 border border-emerald-500/30 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl space-y-4 p-4 text-white">
            <div className="flex justify-between items-center border-b border-white/10 pb-3">
              <div>
                <span className="text-[10px] font-extrabold text-emerald-400 uppercase bg-emerald-500/20 px-2 py-0.5 rounded">
                  {activeVideo.source}
                </span>
                <h4 className="text-sm font-bold text-white mt-1">{activeVideo.title}</h4>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-black"
              >
                ✕
              </button>
            </div>

            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden border border-white/10">
              <iframe
                src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1`}
                title={activeVideo.title}
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <div className="flex justify-between items-center pt-2 text-xs">
              <span className="text-white/70">Source: <strong className="text-emerald-300">{activeVideo.source}</strong></span>
              <a
                href={activeVideo.link}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl flex items-center gap-1.5"
              >
                <BookOpen className="w-3.5 h-3.5" /> Open on YouTube
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Tutorial Cards Grid or Friendly Empty State */}
      {filteredTutorials.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTutorials.map((video) => (
            <div
              key={video.id}
              className="glass-panel rounded-3xl border border-emerald-900/10 dark:border-white/10 overflow-hidden flex flex-col justify-between bg-white/80 dark:bg-white/5 hover:border-emerald-500/30 transition-all shadow-sm group"
            >
              {/* Thumbnail Container */}
              <div className="relative h-48 bg-emerald-950 overflow-hidden border-b border-emerald-500/10 dark:border-white/5">
                <img
                  src={video.thumbnailUrl}
                  alt={video.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500 opacity-90"
                  onError={(e) => {
                    // Fallback to high quality agriculture unsplash if missing
                    (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?auto=format&fit=crop&w=600&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Verified Source Tag */}
                <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md text-emerald-300 border border-emerald-500/30 text-[9px] font-black uppercase px-2.5 py-1 rounded-xl flex items-center gap-1 shadow-sm">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" />
                  {video.source}
                </div>

                {/* Play Trigger Circle */}
                <button
                  onClick={() => setActiveVideo(video)}
                  className="absolute inset-0 flex items-center justify-center z-10 group"
                >
                  <div className="w-13 h-13 rounded-full bg-emerald-600/90 border border-emerald-400/40 flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-all">
                    <Play className="w-6 h-6 fill-white ml-0.5" />
                  </div>
                </button>

                {/* Bottom Duration & Language overlay */}
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center text-white text-[10px] font-bold">
                  <span className="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-lg border border-white/10 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-amber-400" /> {video.duration}
                  </span>
                  <span className="bg-emerald-600/80 backdrop-blur-md px-2 py-0.5 rounded-lg border border-emerald-400/20">
                    {video.language}
                  </span>
                </div>
              </div>

              {/* Card Body Information */}
              <div className="p-5 space-y-3.5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-black uppercase text-[#8F5C38] dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      Level: {video.level}
                    </span>
                    {video.cropTags.map(tag => (
                      <span key={tag} className="text-[9px] font-black uppercase text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h4 className="text-sm font-extrabold text-emerald-950 dark:text-white mt-2 leading-snug font-outfit">
                    {video.title}
                  </h4>
                </div>

                {/* AI Summary Box */}
                <div className="bg-emerald-500/5 dark:bg-white/5 p-3 rounded-2xl border border-emerald-500/10 dark:border-white/5 space-y-1">
                  <h5 className="text-[9px] text-emerald-700 dark:text-emerald-400 uppercase font-black tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-500" /> AI Scientific Summary
                  </h5>
                  <p className="text-[11px] text-emerald-900/80 dark:text-white/80 leading-relaxed font-medium">
                    {video.summary}
                  </p>
                </div>

                {/* Why Recommended Box */}
                <div className="bg-amber-500/5 dark:bg-amber-500/10 p-3 rounded-2xl border border-amber-500/20 space-y-1">
                  <h5 className="text-[9px] text-[#8F5C38] dark:text-[#ffb57d] uppercase font-black tracking-wider flex items-center gap-1">
                    ✦ Why recommended for your farm
                  </h5>
                  <p className="text-[10px] text-emerald-900/90 dark:text-white/80 leading-relaxed font-semibold">
                    {video.whyRecommended}
                  </p>
                </div>
              </div>

              {/* Card Footer Link Button */}
              <div className="px-5 pb-5 pt-1">
                <a
                  href={video.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-white dark:bg-white/5 hover:bg-emerald-600 hover:text-white text-emerald-950 dark:text-white font-bold py-2.5 rounded-xl border border-emerald-500/20 dark:border-white/10 transition-all text-[11px] tracking-wider uppercase flex items-center justify-center gap-1.5 group-hover:border-emerald-600"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  {lang === "mr" ? "मूळ व्हिडिओ पहा (Original Source)" : lang === "hi" ? "मूल स्रोत वीडियो देखें" : "View Original Source"}
                </a>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Friendly Empty State Specified by Prompt */
        <div className="glass-panel p-12 rounded-3xl border border-emerald-500/20 dark:border-white/10 text-center space-y-4 bg-white/60 dark:bg-nature-950/60 max-w-xl mx-auto my-8">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 dark:bg-white/10 flex items-center justify-center mx-auto text-emerald-600 dark:text-emerald-400 animate-pulse">
            <Sprout className="w-8 h-8" />
          </div>
          <div className="space-y-1">
            <h4 className="text-base font-extrabold text-emerald-950 dark:text-white">
              We're finding the best farming tutorials for your crop.
            </h4>
            <p className="text-xs text-emerald-900/70 dark:text-white/60">
              {lang === "mr"
                ? "आम्ही तुमच्या पिकासाठी सर्वोत्कृष्ट कृषी ट्युटोरियल्स शोधत आहोत."
                : lang === "hi"
                  ? "हम आपकी फसल के लिए सर्वोत्तम कृषि ट्यूटोरियल खोज रहे हैं।"
                  : "Our AI engine is currently scanning trusted agricultural sources (ICAR, KVK) for tutorials matching your filter query."}
            </p>
          </div>

          <div className="pt-2 flex justify-center gap-3">
            <button
              onClick={() => {
                setSelectedCategory("all");
                setSelectedCrop("All");
                setSearchQuery("");
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-xl text-xs transition-all shadow-sm"
            >
              Reset Filters
            </button>
            <button
              onClick={fetchAiRecommendations}
              className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-bold px-4 py-2 rounded-xl text-xs transition-all border border-emerald-500/20"
            >
              Run AI Search
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
