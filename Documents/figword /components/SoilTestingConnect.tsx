import React, { useState } from "react";
import {
  TestTube, MapPin, Calendar, Clock, Phone, Star, Navigation,
  CheckCircle2, Sparkles, Truck, Award, ShieldCheck, ArrowRight
} from "lucide-react";
import { Language } from "../utils/translations";

interface SoilTestingConnectProps {
  lang: Language;
}

export default function SoilTestingConnect({ lang }: SoilTestingConnectProps) {
  const [activeMode, setActiveMode] = useState<"directory" | "booking">("directory");
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: "Piyush Patil",
    phone: "+91 98220 12345",
    date: "2026-07-28",
    timeSlot: "10:00 AM - 12:00 PM",
    acres: "3 Acres",
    location: "Plot #MH-AHM-402, Rahuri, Ahmednagar"
  });

  const labs = [
    {
      name: "Kechua Vigyan Kendra (KVK) Soil Testing Lab",
      type: "Government / ICAR Accredited",
      distance: "4.2 km away",
      rating: "4.9 ⭐ (128 reviews)",
      hours: "09:00 AM - 05:30 PM",
      phone: "+91 2426 233455",
      price: "₹150 / sample",
      tests: ["NPK Balance", "pH Index", "Organic Carbon", "Micronutrients (Zinc/Iron)"],
      address: "MPKV Campus, Rahuri, Ahmednagar, Maharashtra"
    },
    {
      name: "Mahatma Phule Soil & Water Testing Center",
      type: "University State Lab",
      distance: "7.8 km away",
      rating: "4.8 ⭐ (94 reviews)",
      hours: "09:30 AM - 06:00 PM",
      phone: "+91 2426 238900",
      price: "₹200 / sample",
      tests: ["Full 12-Parameter Soil Health Card", "Electrical Conductivity", "Heavy Metals"],
      address: "Station Road, Rahuri Khurd"
    },
    {
      name: "GreenEarth BioTech Private Soil Lab",
      type: "Private Certified Lab",
      distance: "12.1 km away",
      rating: "4.7 ⭐ (62 reviews)",
      hours: "08:30 AM - 07:00 PM",
      phone: "+91 98900 44321",
      price: "₹350 / sample (Express 24h report)",
      tests: ["Soil Microbiome DNA", "Water Retention", "NPK + Micronutrients"],
      address: "MIDC Industrial Estate, Ahmednagar"
    }
  ];

  return (
    <div className="space-y-6 pb-12">

      {/* Top Banner */}
      <div className="glass-panel p-6 rounded-3xl border border-emerald-900/10 dark:border-white/10 bg-gradient-to-r from-emerald-900/15 via-teal-600/10 to-emerald-900/15 dark:from-emerald-950/60 dark:to-nature-950 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-emerald-600 text-white text-[10px] uppercase tracking-widest font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
              🧪 Kechua Lab Connect Network
            </span>
            <span className="bg-emerald-500/20 text-emerald-900 dark:text-emerald-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/20">
              ICAR Accredited
            </span>
          </div>
          <h2 className="text-2xl font-black text-emerald-950 dark:text-white mt-2 font-outfit flex items-center gap-2">
            🧪 Soil Testing Network & Home Collection
          </h2>
          <p className="text-xs text-emerald-900/70 dark:text-white/60 mt-1 max-w-xl font-medium">
            Find nearby government & private soil testing labs or book a certified technician for on-farm home sample collection.
          </p>
        </div>

        {/* Mode Switch Buttons */}
        <div className="flex bg-emerald-500/10 dark:bg-white/5 p-1 rounded-2xl border border-emerald-500/15">
          <button
            onClick={() => setActiveMode("directory")}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${activeMode === "directory" ? "bg-emerald-600 text-white shadow-sm" : "text-emerald-950 dark:text-white hover:bg-emerald-500/10"
              }`}
          >
            Nearby Labs Directory
          </button>
          <button
            onClick={() => setActiveMode("booking")}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${activeMode === "booking" ? "bg-emerald-600 text-white shadow-sm" : "text-emerald-950 dark:text-white hover:bg-emerald-500/10"
              }`}
          >
            <Truck className="w-3.5 h-3.5" /> Book Home Collection
          </button>
        </div>
      </div>

      {/* OPTION A: NEARBY LABS DIRECTORY */}
      {activeMode === "directory" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-xs font-black text-emerald-950 dark:text-white uppercase tracking-wider">
              Accredited Labs Near Your Location (Rahuri, Ahmednagar)
            </h3>
            <span className="text-[10px] text-emerald-700 dark:text-emerald-400 font-bold">3 Labs Found</span>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {labs.map((lab, idx) => (
              <div key={idx} className="glass-panel p-6 rounded-3xl border border-emerald-900/10 dark:border-white/10 bg-white/70 dark:bg-white/5 space-y-4 shadow-sm hover:border-emerald-500/30 transition-all">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-emerald-500/10 dark:border-white/5 pb-3">
                  <div>
                    <span className="text-[9px] font-black uppercase text-emerald-700 dark:text-emerald-400 bg-emerald-500/15 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                      {lab.type}
                    </span>
                    <h4 className="text-base font-extrabold text-emerald-950 dark:text-white mt-1 font-outfit">{lab.name}</h4>
                    <p className="text-xs text-emerald-900/60 dark:text-white/50 flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3.5 h-3.5 text-emerald-600" /> {lab.address} • <strong className="text-emerald-700 dark:text-emerald-400">{lab.distance}</strong>
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-black text-emerald-700 dark:text-emerald-400 block">{lab.price}</span>
                    <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400">{lab.rating}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-bold text-emerald-900/70 dark:text-white/60 mr-1">Available Test Parameters:</span>
                  {lab.tests.map((test, i) => (
                    <span key={i} className="text-[10px] font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-500/10 px-2 py-0.5 rounded-md">
                      ✓ {test}
                    </span>
                  ))}
                </div>

                <div className="pt-2 flex flex-wrap gap-2 justify-between items-center border-t border-emerald-500/10 dark:border-white/5 text-xs">
                  <span className="text-[11px] text-emerald-900/60 dark:text-white/50 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> Hours: {lab.hours}
                  </span>
                  <div className="flex gap-2">
                    <a
                      href={`tel:${lab.phone}`}
                      className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 font-bold px-3 py-1.5 rounded-xl border border-emerald-500/20 flex items-center gap-1"
                    >
                      <Phone className="w-3.5 h-3.5" /> Call Lab
                    </a>
                    <button
                      onClick={() => setActiveMode("booking")}
                      className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-1.5 rounded-xl shadow-sm flex items-center gap-1"
                    >
                      Book Home Collection <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* OPTION B: HOME SAMPLE COLLECTION BOOKING */}
      {activeMode === "booking" && (
        <div className="glass-panel p-6 rounded-3xl border border-emerald-500/30 bg-white/80 dark:bg-nature-950/80 max-w-2xl mx-auto space-y-4 shadow-lg">
          <div className="border-b border-emerald-500/10 pb-3">
            <span className="text-[10px] font-black uppercase text-emerald-700 dark:text-emerald-400 bg-emerald-500/15 px-3 py-1 rounded-full">
              🚚 Certified Technician Farm Visit
            </span>
            <h3 className="text-lg font-black text-emerald-950 dark:text-white mt-2 font-outfit">Book Home Soil Sample Collection</h3>
            <p className="text-xs text-emerald-900/70 dark:text-white/60 mt-0.5">
              An ICAR-certified soil technician will visit your field plot, collect core samples, and deliver AI soil diagnostics to your phone within 48 hours.
            </p>
          </div>

          {bookingSuccess ? (
            <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
              <h4 className="text-base font-extrabold text-emerald-950 dark:text-white">Soil Collection Appointment Confirmed!</h4>
              <p className="text-xs text-emerald-900/80 dark:text-white/80 max-w-md mx-auto">
                Technician assigned: <strong>Ramesh Shinde (Certified KVK Ag-Scientist)</strong>. Arrival scheduled for <strong>{bookingForm.date} ({bookingForm.timeSlot})</strong> at <strong>{bookingForm.location}</strong>.
              </p>
              <button
                onClick={() => setBookingSuccess(false)}
                className="bg-emerald-600 text-white font-bold text-xs px-4 py-2 rounded-xl"
              >
                Book Another Appointment
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setBookingSuccess(true);
              }}
              className="space-y-3 text-xs"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-emerald-900/70 dark:text-white/70 block mb-1">Farmer Name</label>
                  <input
                    type="text"
                    value={bookingForm.name}
                    onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                    className="w-full font-bold p-2.5 rounded-xl bg-white dark:bg-nature-900 border border-emerald-500/20 text-emerald-950 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-emerald-900/70 dark:text-white/70 block mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={bookingForm.phone}
                    onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                    className="w-full font-bold p-2.5 rounded-xl bg-white dark:bg-nature-900 border border-emerald-500/20 text-emerald-950 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-emerald-900/70 dark:text-white/70 block mb-1">Preferred Date</label>
                  <input
                    type="date"
                    value={bookingForm.date}
                    onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                    className="w-full font-bold p-2.5 rounded-xl bg-white dark:bg-nature-900 border border-emerald-500/20 text-emerald-950 dark:text-white"
                  />
                </div>
                <div>
                  <label className="font-bold text-emerald-900/70 dark:text-white/70 block mb-1">Time Window</label>
                  <select
                    value={bookingForm.timeSlot}
                    onChange={(e) => setBookingForm({ ...bookingForm, timeSlot: e.target.value })}
                    className="w-full font-bold p-2.5 rounded-xl bg-white dark:bg-nature-900 border border-emerald-500/20 text-emerald-950 dark:text-white"
                  >
                    <option>08:00 AM - 10:00 AM</option>
                    <option>10:00 AM - 12:00 PM</option>
                    <option>02:00 PM - 04:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold text-emerald-900/70 dark:text-white/70 block mb-1">Farm Address / Location</label>
                <input
                  type="text"
                  value={bookingForm.location}
                  onChange={(e) => setBookingForm({ ...bookingForm, location: e.target.value })}
                  className="w-full font-bold p-2.5 rounded-xl bg-white dark:bg-nature-900 border border-emerald-500/20 text-emerald-950 dark:text-white"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold p-3 rounded-2xl shadow-md transition-all text-xs flex items-center justify-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" /> Confirm Home Soil Collection (₹250 Fee)
                </button>
              </div>
            </form>
          )}
        </div>
      )}

    </div>
  );
}
