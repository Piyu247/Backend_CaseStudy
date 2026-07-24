import React, { useState } from "react";
import {
  Heart, Gift, MapPin, Calendar, Building2, CheckCircle2, Award, ArrowRight, Shield
} from "lucide-react";
import { Language } from "../utils/translations";

interface ProduceDonationProps {
  lang: Language;
}

export default function ProduceDonation({ lang }: ProduceDonationProps) {
  const [showForm, setShowForm] = useState(false);
  const [donationSuccess, setDonationSuccess] = useState(false);
  const [donationForm, setDonationForm] = useState({
    crop: "Fresh Tomatoes",
    qty: "120 kg",
    location: "Rahuri Khurd, Ahmednagar",
    bestBefore: "2026-07-30",
    notes: "Fresh surplus harvest available for immediate pickup."
  });

  const activeDonations = [
    {
      id: "don-1",
      farmerName: "Piyush Patil",
      crop: "Fresh Tomatoes",
      qty: "120 kg Available",
      location: "Rahuri, Ahmednagar",
      bestBefore: "July 30, 2026",
      reservedBy: "ISKCON Annadaata Community Kitchen",
      status: "Reserved for Pickup"
    },
    {
      id: "don-2",
      farmerName: "Balasaheb Kadam",
      crop: "Green Spinach & Methi",
      qty: "40 kg Available",
      location: "Nashik, Maharashtra",
      bestBefore: "July 27, 2026",
      reservedBy: "Sai Baba Orphanage & Old Age Home",
      status: "Pickup Completed"
    }
  ];

  return (
    <div className="space-y-6 pb-12">

      {/* Top Header */}
      <div className="glass-panel p-6 rounded-3xl border border-emerald-900/10 dark:border-white/10 bg-gradient-to-r from-red-900/15 via-rose-600/10 to-amber-900/15 dark:from-rose-950/60 dark:to-nature-950 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-rose-600 text-white text-[10px] uppercase tracking-widest font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
              ❤️ Kechua Daan Social Impact
            </span>
            <span className="bg-rose-500/20 text-rose-800 dark:text-rose-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-rose-500/20">
              Tax Certificate Issued
            </span>
          </div>
          <h2 className="text-2xl font-black text-emerald-950 dark:text-white mt-2 font-outfit flex items-center gap-2">
            Fruit & Vegetable Surplus Produce Donation
          </h2>
          <p className="text-xs text-emerald-900/70 dark:text-white/60 mt-1 max-w-xl font-medium">
            Donate your surplus harvest to local NGOs, Gurudwaras, Old Age Homes & Community Kitchens. Zero food waste, maximum social impact.
          </p>
        </div>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-5 py-2.5 rounded-2xl shadow-md transition-all text-xs flex items-center gap-1.5 border border-rose-500/30"
        >
          <Gift className="w-4 h-4" /> {showForm ? "View Active Donations" : "Donate Surplus Produce"}
        </button>
      </div>

      {/* DONATION FORM */}
      {showForm ? (
        <div className="glass-panel p-6 rounded-3xl border border-rose-500/30 bg-white/90 dark:bg-nature-950/90 max-w-xl mx-auto space-y-4 shadow-xl">
          <h3 className="text-base font-extrabold text-emerald-950 dark:text-white font-outfit">Post Produce for Donation</h3>

          {donationSuccess ? (
            <div className="p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center space-y-3">
              <Award className="w-12 h-12 text-rose-600 dark:text-rose-400 mx-auto animate-bounce" />
              <h4 className="text-base font-extrabold text-emerald-950 dark:text-white">Thank You for Your Generosity!</h4>
              <p className="text-xs text-emerald-900/80 dark:text-white/80 max-w-sm mx-auto">
                Your donation of <strong>{donationForm.qty} {donationForm.crop}</strong> has been listed. Nearby NGOs & Community Kitchens have been notified.
              </p>
              <button onClick={() => setShowForm(false)} className="bg-rose-600 text-white font-bold text-xs px-4 py-2 rounded-xl">View Active Listings</button>
            </div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setDonationSuccess(true); }} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-emerald-900/70 dark:text-white/70 block mb-1">Crop Name</label>
                  <input type="text" value={donationForm.crop} onChange={(e) => setDonationForm({ ...donationForm, crop: e.target.value })} className="w-full font-bold p-2.5 rounded-xl bg-white dark:bg-nature-900 border border-emerald-500/20 text-emerald-950 dark:text-white" />
                </div>
                <div>
                  <label className="font-bold text-emerald-900/70 dark:text-white/70 block mb-1">Quantity Available</label>
                  <input type="text" value={donationForm.qty} onChange={(e) => setDonationForm({ ...donationForm, qty: e.target.value })} className="w-full font-bold p-2.5 rounded-xl bg-white dark:bg-nature-900 border border-emerald-500/20 text-emerald-950 dark:text-white" />
                </div>
              </div>
              <div>
                <label className="font-bold text-emerald-900/70 dark:text-white/70 block mb-1">Pickup Farm Location</label>
                <input type="text" value={donationForm.location} onChange={(e) => setDonationForm({ ...donationForm, location: e.target.value })} className="w-full font-bold p-2.5 rounded-xl bg-white dark:bg-nature-900 border border-emerald-500/20 text-emerald-950 dark:text-white" />
              </div>
              <button type="submit" className="w-full bg-rose-600 hover:bg-rose-700 text-white font-bold p-3 rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow-md">
                <Gift className="w-4 h-4" /> Publish Donation Listing & Get Certificate
              </button>
            </form>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {activeDonations.map((don) => (
            <div key={don.id} className="glass-panel p-5 rounded-3xl border border-rose-500/20 bg-white/70 dark:bg-white/5 space-y-3">
              <div className="flex justify-between items-start">
                <span className="text-[10px] font-black uppercase text-rose-700 dark:text-rose-400 bg-rose-500/15 px-2.5 py-0.5 rounded-full">{don.status}</span>
                <span className="text-[10px] font-bold text-emerald-900/60 dark:text-white/50">{don.bestBefore}</span>
              </div>
              <h4 className="text-base font-black text-emerald-950 dark:text-white font-outfit">{don.qty} - {don.crop}</h4>
              <p className="text-xs text-emerald-900/70 dark:text-white/60">Donor: <strong>{don.farmerName}</strong> ({don.location})</p>
              <div className="bg-emerald-500/5 dark:bg-white/5 p-3 rounded-2xl border border-emerald-500/10 text-xs">
                <span className="text-[10px] text-emerald-900/60 dark:text-white/50 block font-bold">Recipient NGO / Kitchen:</span>
                <p className="font-extrabold text-emerald-950 dark:text-white mt-0.5">{don.reservedBy}</p>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
