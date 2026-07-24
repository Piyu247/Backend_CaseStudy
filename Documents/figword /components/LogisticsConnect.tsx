import React, { useState } from "react";
import {
  Truck, Navigation, MapPin, Calendar, Clock, Phone, CheckCircle2, ShieldCheck, ArrowRight
} from "lucide-react";
import { Language } from "../utils/translations";

interface LogisticsConnectProps {
  lang: Language;
}

export default function LogisticsConnect({ lang }: LogisticsConnectProps) {
  const [bookedTransport, setBookedTransport] = useState<string | null>(null);

  const vehicles = [
    {
      id: "v-1",
      driverName: "Suresh Shinde",
      vehicleType: "Tata Ace / Mini Tempo (1.5 Ton Capacity)",
      rate: "₹25 / km",
      rating: "4.9 ⭐ (84 trips)",
      status: "Available Nearby (2 km)",
      phone: "+91 98220 55432"
    },
    {
      id: "v-2",
      driverName: "Mahesh Deshmukh",
      vehicleType: "Eicher 14ft Open Truck (4 Ton Capacity)",
      rate: "₹45 / km",
      rating: "4.8 ⭐ (112 trips)",
      status: "Available Nearby (5 km)",
      phone: "+91 94221 88765"
    },
    {
      id: "v-3",
      driverName: "ColdChain Express",
      vehicleType: "Refrigerated Van (-5°C to 10°C)",
      rate: "₹65 / km",
      rating: "5.0 ⭐ (45 trips)",
      status: "Available on Booking",
      phone: "+91 90110 33211"
    }
  ];

  return (
    <div className="space-y-6 pb-12">

      <div className="glass-panel p-6 rounded-3xl border border-emerald-900/10 dark:border-white/10 bg-gradient-to-r from-blue-900/15 via-sky-600/10 to-emerald-900/15 dark:from-sky-950/60 dark:to-nature-950 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-sky-600 text-white text-[10px] uppercase tracking-widest font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
              🚚 Kechua Transport & Freight Logistics
            </span>
            <span className="bg-sky-500/20 text-sky-800 dark:text-sky-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-sky-500/20">
              Live GPS Tracking
            </span>
          </div>
          <h2 className="text-2xl font-black text-emerald-950 dark:text-white mt-2 font-outfit flex items-center gap-2">
            🚚 Produce Logistics & Cold Storage Transport
          </h2>
          <p className="text-xs text-emerald-900/70 dark:text-white/60 mt-1 max-w-xl font-medium">
            Book nearby mini tempos, open trucks, and temperature-controlled refrigerated vans for direct crop freight.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {vehicles.map((vh) => (
          <div key={vh.id} className="glass-panel p-6 rounded-3xl border border-emerald-900/10 dark:border-white/10 bg-white/70 dark:bg-white/5 space-y-4 shadow-sm hover:border-sky-500/30 transition-all flex flex-col justify-between">
            <div className="space-y-2">
              <span className="text-[10px] font-black uppercase text-sky-700 dark:text-sky-400 bg-sky-500/15 px-2.5 py-0.5 rounded-full">{vh.status}</span>
              <h4 className="text-base font-extrabold text-emerald-950 dark:text-white font-outfit">{vh.vehicleType}</h4>
              <p className="text-xs text-emerald-900/70 dark:text-white/70">Driver: <strong>{vh.driverName}</strong> • {vh.rating}</p>
              <div className="bg-emerald-500/5 dark:bg-white/5 p-3 rounded-2xl border border-emerald-500/10 text-xs font-bold flex justify-between">
                <span>Estimated Freight Rate:</span>
                <span className="text-sky-700 dark:text-sky-400">{vh.rate}</span>
              </div>
            </div>

            {bookedTransport === vh.id ? (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center text-xs font-extrabold text-emerald-700 dark:text-emerald-300">
                ✓ Driver Dispatched & En Route!
              </div>
            ) : (
              <button
                onClick={() => setBookedTransport(vh.id)}
                className="w-full bg-sky-600 hover:bg-sky-700 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1 shadow-sm"
              >
                <Truck className="w-3.5 h-3.5" /> Book Pickup Now
              </button>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}
