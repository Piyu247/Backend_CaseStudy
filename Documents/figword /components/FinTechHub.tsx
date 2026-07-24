import React, { useState } from "react";
import { 
  Building2, CreditCard, DollarSign, Calculator, FileText, ShieldCheck, 
  TrendingUp, ArrowRight, CheckCircle2, Download, Receipt
} from "lucide-react";
import { Language } from "../utils/translations";

interface FinTechHubProps {
  lang: Language;
}

export default function FinTechHub({ lang }: FinTechHubProps) {
  const [landAcres, setLandAcres] = useState(5);
  const [cropType, setCropType] = useState("Sugarcane");

  // KCC scale of finance calculations
  const scaleOfFinancePerAcre = cropType === "Sugarcane" ? 48000 : cropType === "Cotton" ? 35000 : 28000;
  const kccLoanLimit = landAcres * scaleOfFinancePerAcre;

  return (
    <div className="space-y-6 pb-12">
      
      {/* Header */}
      <div className="glass-panel p-6 rounded-3xl border border-emerald-900/10 dark:border-white/10 bg-gradient-to-r from-emerald-900/15 via-amber-600/10 to-teal-900/15 dark:from-amber-950/60 dark:to-nature-950 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-amber-600 text-white text-[10px] uppercase tracking-widest font-black px-2.5 py-0.5 rounded-full flex items-center gap-1">
              🏦 AgriFinTech Financial Center
            </span>
            <span className="bg-amber-500/20 text-amber-900 dark:text-amber-300 text-[10px] font-bold px-2 py-0.5 rounded-full border border-amber-500/20">
              NABARD / KCC Compliant
            </span>
          </div>
          <h2 className="text-2xl font-black text-emerald-950 dark:text-white mt-2 font-outfit flex items-center gap-2">
            🏦 FinTech Banking, Loans & Expense Ledger
          </h2>
          <p className="text-xs text-emerald-900/70 dark:text-white/60 mt-1 max-w-xl font-medium">
            Manage your farm accounting ledger, calculate 4% KCC loan eligibility, estimate PMFBY crop insurance, and generate GST invoices.
          </p>
        </div>
      </div>

      {/* KPI Financial Overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-panel p-5 rounded-3xl border border-emerald-500/20 bg-white/70 dark:bg-white/5 space-y-1">
          <span className="text-[10px] font-black uppercase text-emerald-800 dark:text-emerald-400">Total Seasonal Income</span>
          <h3 className="text-2xl font-black text-emerald-950 dark:text-white font-outfit">₹4,25,000</h3>
          <p className="text-[10px] text-emerald-600 font-bold">+18% vs previous season</p>
        </div>
        <div className="glass-panel p-5 rounded-3xl border border-red-500/20 bg-white/70 dark:bg-white/5 space-y-1">
          <span className="text-[10px] font-black uppercase text-red-700 dark:text-red-400">Total Input Expenses</span>
          <h3 className="text-2xl font-black text-emerald-950 dark:text-white font-outfit">₹1,12,000</h3>
          <p className="text-[10px] text-emerald-900/60 dark:text-white/50">Fertilizers, Seeds, Drip maintenance</p>
        </div>
        <div className="glass-panel p-5 rounded-3xl border border-amber-500/20 bg-white/70 dark:bg-white/5 space-y-1">
          <span className="text-[10px] font-black uppercase text-[#8F5C38] dark:text-amber-400">Net Farm Profit</span>
          <h3 className="text-2xl font-black text-amber-600 dark:text-amber-400 font-outfit">₹3,13,000</h3>
          <p className="text-[10px] text-amber-800 dark:text-amber-300 font-bold">Margin: 73.6%</p>
        </div>
      </div>

      {/* KCC LOAN & INSURANCE CALCULATOR */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* KCC Loan Limit Calculator */}
        <div className="glass-panel p-6 rounded-3xl border border-emerald-900/10 dark:border-white/10 bg-white/70 dark:bg-white/5 space-y-4">
          <div className="flex items-center gap-2 border-b border-emerald-500/10 pb-3">
            <Calculator className="w-5 h-5 text-amber-500" />
            <h3 className="font-extrabold text-sm text-emerald-950 dark:text-white font-outfit">Kisan Credit Card (KCC) Loan Estimator</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <label className="font-bold text-emerald-900/70 dark:text-white/70 block mb-1">Select Crop</label>
              <select
                value={cropType}
                onChange={(e) => setCropType(e.target.value)}
                className="w-full font-bold p-2.5 rounded-xl bg-white dark:bg-nature-900 border border-emerald-500/20 text-emerald-950 dark:text-white"
              >
                <option value="Sugarcane">Sugarcane (Scale of Finance: ₹48,000/ac)</option>
                <option value="Cotton">Cotton (Scale of Finance: ₹35,000/ac)</option>
                <option value="Paddy">Paddy / Wheat (Scale of Finance: ₹28,000/ac)</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-emerald-900/70 dark:text-white/70 block mb-1">Cultivated Land Area (Acres): {landAcres} ac</label>
              <input
                type="range"
                min="1"
                max="25"
                value={landAcres}
                onChange={(e) => setLandAcres(Number(e.target.value))}
                className="w-full accent-amber-500"
              />
            </div>

            <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl space-y-1">
              <span className="text-[10px] font-black uppercase text-[#8F5C38] dark:text-amber-400">Estimated KCC Loan Limit</span>
              <p className="text-2xl font-black text-emerald-950 dark:text-white font-outfit">₹{kccLoanLimit.toLocaleString("en-IN")}</p>
              <p className="text-[10px] text-emerald-900/70 dark:text-white/70">Effective Interest: <strong>4% net</strong> (7% standard - 3% prompt repayment subvention).</p>
            </div>
          </div>
        </div>

        {/* Digital GST Invoice Generator */}
        <div className="glass-panel p-6 rounded-3xl border border-emerald-900/10 dark:border-white/10 bg-white/70 dark:bg-white/5 space-y-4">
          <div className="flex items-center gap-2 border-b border-emerald-500/10 pb-3">
            <Receipt className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <h3 className="font-extrabold text-sm text-emerald-950 dark:text-white font-outfit">Digital Invoice & Receipt Generator</h3>
          </div>

          <div className="space-y-3 text-xs">
            <div className="bg-emerald-500/5 dark:bg-white/5 p-3 rounded-2xl border border-emerald-500/10 space-y-1">
              <p className="font-bold">Latest Trade Invoice #INV-2026-089</p>
              <p className="text-[11px] text-emerald-900/60 dark:text-white/60">Buyer: BigBasket / Supermarket Retail Network</p>
              <p className="text-xs font-black text-emerald-700 dark:text-emerald-400">Amount: ₹36,000 (1,200 kg Tomatoes @ ₹30/kg)</p>
            </div>

            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold p-3 rounded-2xl text-xs flex items-center justify-center gap-1.5 shadow-md">
              <Download className="w-4 h-4" /> Download Official GST / FSSAI Invoice (PDF)
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
