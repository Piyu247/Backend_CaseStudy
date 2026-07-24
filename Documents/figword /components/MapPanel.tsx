import React, { useState } from "react";
import { MapPin, Sparkles, Navigation } from "lucide-react";
import { Language } from "../utils/translations";

interface MapPanelProps {
  coords: { lat: string; lng: string };
  setCoords: React.Dispatch<React.SetStateAction<{ lat: string; lng: string }>>;
  weather: {
    temp: number;
    feelsLike: number;
    humidity: number;
    windSpeed: number;
    precipitation: number;
    summary: string;
    loading: boolean;
  };
  cityName: string;
  lang: Language;
}

export default function MapPanel({ coords, setCoords, weather, cityName, lang }: MapPanelProps) {
  const [activeLayer, setActiveLayer] = useState<"ndvi" | "moisture" | "thermal">("ndvi");

  return (
    <div className="space-y-6 pb-12">
      
      {/* 1. TODAY'S AI ADVICE CARD (PROMINENT AT TOP) */}
      <div className="glass-panel p-6 rounded-3xl border border-emerald-500/20 bg-gradient-to-r from-emerald-900/10 via-teal-600/5 to-emerald-900/10 dark:from-emerald-950/80 dark:to-nature-950 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
        <div className="space-y-1">
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-400 bg-emerald-500/15 px-3 py-1 rounded-full flex items-center gap-1.5 w-fit">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" /> Today's AI Advice
          </span>
          <p className="text-base font-extrabold text-emerald-950 dark:text-white font-outfit mt-2">
            "Rain is expected tomorrow. Delay pesticide spraying until the weather clears."
          </p>
        </div>
        <button
          onClick={() => {
            if (navigator.geolocation) {
              navigator.geolocation.getCurrentPosition((pos) => {
                setCoords({ lat: pos.coords.latitude.toFixed(4), lng: pos.coords.longitude.toFixed(4) });
              });
            }
          }}
          className="bg-emerald-600 text-white font-bold text-xs px-4 py-2.5 rounded-xl shrink-0 flex items-center gap-1.5 hover:bg-emerald-700 transition-all"
        >
          <Navigation className="w-3.5 h-3.5" /> Refresh Live GPS
        </button>
      </div>

      {/* 2. CURRENT WEATHER METRICS ROW */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div className="glass-panel p-4 rounded-2xl border border-emerald-900/10 dark:border-white/10 bg-white/70 dark:bg-white/5 space-y-1">
          <span className="text-[10px] font-bold uppercase text-emerald-900/60 dark:text-white/50 block">Temperature</span>
          <p className="text-2xl font-black text-emerald-950 dark:text-white font-outfit">{weather.temp}°C</p>
          <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold">Feels like {weather.feelsLike}°C</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-emerald-900/10 dark:border-white/10 bg-white/70 dark:bg-white/5 space-y-1">
          <span className="text-[10px] font-bold uppercase text-emerald-900/60 dark:text-white/50 block">Rainfall Forecast</span>
          <p className="text-2xl font-black text-sky-600 dark:text-sky-400 font-outfit">{weather.precipitation > 0 ? `${weather.precipitation} mm` : "0.0 mm"}</p>
          <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold">Light Rain Expected</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-emerald-900/10 dark:border-white/10 bg-white/70 dark:bg-white/5 space-y-1">
          <span className="text-[10px] font-bold uppercase text-emerald-900/60 dark:text-white/50 block">Humidity</span>
          <p className="text-2xl font-black text-emerald-950 dark:text-white font-outfit">{weather.humidity}%</p>
          <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold">Optimal Photosynthesis</span>
        </div>

        <div className="glass-panel p-4 rounded-2xl border border-emerald-900/10 dark:border-white/10 bg-white/70 dark:bg-white/5 space-y-1">
          <span className="text-[10px] font-bold uppercase text-emerald-900/60 dark:text-white/50 block">Wind Speed</span>
          <p className="text-2xl font-black text-emerald-950 dark:text-white font-outfit">{weather.windSpeed} km/h</p>
          <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold">Gentle Breeze</span>
        </div>
      </div>

      {/* 3. SATELLITE VIEW & NDVI CROP HEALTH LAYER */}
      <div className="glass-panel p-6 rounded-3xl border border-emerald-900/10 dark:border-white/10 bg-white/70 dark:bg-white/5 space-y-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h4 className="text-base font-extrabold text-emerald-950 dark:text-white font-outfit flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" /> Satellite View & Crop Health (NDVI)
            </h4>
            <p className="text-xs text-emerald-900/60 dark:text-white/50">Location: <strong>{cityName}</strong> ({coords.lat}°N, {coords.lng}°E)</p>
          </div>

          <div className="flex items-center bg-emerald-500/10 dark:bg-white/5 p-1 rounded-xl text-xs font-bold">
            {[
              { id: "ndvi", label: "NDVI Vegetation" },
              { id: "moisture", label: "Soil Moisture" },
              { id: "thermal", label: "Land Surface Temp" }
            ].map((l) => (
              <button
                key={l.id}
                onClick={() => setActiveLayer(l.id as any)}
                className={`px-3 py-1 rounded-lg transition-all ${activeLayer === l.id ? "bg-emerald-600 text-white shadow-sm" : "text-emerald-900/70 dark:text-white/70"}`}
              >
                {l.label}
              </button>
            ))}
          </div>
        </div>

        {/* Embedded Satellite Map */}
        <div className="h-[360px] rounded-2xl overflow-hidden relative border border-emerald-500/10">
          <iframe
            key={`${coords.lat}-${coords.lng}`}
            title="Google Maps Satellite"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            loading="lazy"
            allowFullScreen
            src={`https://maps.google.com/maps?q=${coords.lat},${coords.lng}&t=k&z=16&ie=UTF8&iwloc=&output=embed`}
            className="w-full h-full opacity-85"
          />
          {activeLayer === "ndvi" && (
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 via-green-600/25 to-transparent pointer-events-none mix-blend-color-burn" />
          )}
        </div>
      </div>

    </div>
  );
}
