import React, { useState } from "react";
import { 
  Building2, ShieldCheck, Calculator, FileText, ExternalLink, Sparkles, 
  HelpCircle, CheckCircle2, DollarSign, Award, BookOpen, Volume2, PhoneCall, 
  Download, ArrowLeft, Play, ArrowRight, MapPin
} from "lucide-react";
import { Language } from "../utils/translations";

interface FinanceGovernmentSupportProps {
  lang: Language;
}

interface ExpandedScheme {
  id: string;
  name: string;
  objective: string;
  benefits: string;
  maxBenefit: string;
  eligibility: string;
  requiredDocs: string[];
  deadline: string;
  website: string;
  steps: { step: number; title: string; desc: string }[];
  videos: { title: string; source: string; duration: string; summary: string; link: string }[];
  contact: { phone: string; helpline: string; office: string };
  downloads: { name: string; size: string; link: string }[];
}

export default function FinanceGovernmentSupport({ lang }: FinanceGovernmentSupportProps) {
  const [activeCategory, setActiveCategory] = useState<
    "schemes" | "banking" | "insurance" | "subsidies" | "checker" | "calculator" | "learning"
  >("schemes");

  const [selectedScheme, setSelectedScheme] = useState<ExpandedScheme | null>(null);
  const [explainModal, setExplainModal] = useState<string | null>(null);
  const [aiAssistantOpen, setAiAssistantOpen] = useState(false);
  const [speechActive, setSpeechActive] = useState(false);

  // Application Tracker State
  const [savedApplications, setSavedApplications] = useState<string[]>([]);

  // AI Checker State
  const [checkerData, setCheckerData] = useState({
    state: "Maharashtra",
    district: "Ahmednagar",
    farmSize: "3 Acres",
    crop: "Sugarcane & Cotton",
    income: "₹1,50,000 / yr"
  });
  const [checkerResults, setCheckerResults] = useState<boolean>(false);

  // EMI Calculator State
  const [loanAmount, setLoanAmount] = useState(150000);
  const [interestRate, setInterestRate] = useState(7);
  const [tenureYears, setTenureYears] = useState(3);

  const monthlyRate = interestRate / 12 / 100;
  const months = tenureYears * 12;
  const emi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
      (Math.pow(1 + monthlyRate, months) - 1)
  );

  const expandedSchemesData: ExpandedScheme[] = [
    {
      id: "pm-kisan",
      name: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
      objective: "Direct income support to small and marginal farmer families to supplement their financial needs for purchasing farm inputs.",
      benefits: "₹6,000 per year directly transferred in 3 equal installments of ₹2,000 every 4 months via Direct Benefit Transfer (DBT).",
      maxBenefit: "₹6,000 / year (Guaranteed Direct Bank Account Credit)",
      eligibility: "All landholding farmer families holding cultivable land in their names across India.",
      requiredDocs: [
        "Aadhaar Card (Mandatory)",
        "Land Ownership Papers (7/12 Extract / Khasra Khatauni)",
        "Bank Passbook (Linked with Aadhaar & NPCI Direct Benefit Transfer)",
        "Active Mobile Number"
      ],
      deadline: "Ongoing Government Scheme (Year-Round Enrollment)",
      website: "https://pmkisan.gov.in",
      steps: [
        { step: 1, title: "Check Eligibility & Land Seeding Status", desc: "Ensure your land ownership record (7/12) is updated in state land registry databases." },
        { step: 2, title: "Complete Aadhaar e-KYC", desc: "Visit pmkisan.gov.in or nearest CSC center to complete face/OTP e-KYC." },
        { step: 3, title: "Submit Bank NPCI Seeding Request", desc: "Link your Aadhaar with your bank account to enable DBT credit." },
        { step: 4, title: "Track Installment Status", desc: "Enter your Aadhaar/Mobile number in the PM-KISAN portal Beneficiary Status tab." }
      ],
      videos: [
        { title: "Official PM-KISAN Portal Registration Walkthrough", source: "Ministry of Agriculture & Farmers Welfare", duration: "6 mins", summary: "Complete step-by-step guide to complete e-KYC and land seeding online.", link: "https://pmkisan.gov.in" },
        { title: "How to Resolve PM-KISAN Installment Pending Errors", source: "Krishi Vigyan Kendra (KVK)", duration: "8 mins", summary: "Resolving NPCI bank mismatch, Aadhaar spelling errors & land record updates.", link: "https://pmkisan.gov.in" }
      ],
      contact: {
        phone: "155261 / 011-24300606",
        helpline: "PM-KISAN Toll-Free Helpline: 1800-115-526",
        office: "Nearest District Agriculture Office / Common Service Centre (CSC)"
      },
      downloads: [
        { name: "PM-KISAN New Farmer Self Registration Form (PDF)", size: "450 KB", link: "https://pmkisan.gov.in" },
        { name: "Aadhaar e-KYC Verification Process Checklist", size: "220 KB", link: "https://pmkisan.gov.in" }
      ]
    },
    {
      id: "pmfby",
      name: "PMFBY (Pradhan Mantri Fasal Bima Yojana)",
      objective: "Provide financial support to farmers suffering crop loss/damage arising out of unexpected natural calamities, pests & diseases.",
      benefits: "Maximum premium paid by farmer is capped at 2% for Kharif, 1.5% for Rabi, and 5% for Annual Commercial Crops. Govt subsidizes balance premium.",
      maxBenefit: "Full Sum Insured Value of Crop Output Per Acre",
      eligibility: "All farmers growing notified crops in notified areas including sharecroppers and tenant farmers.",
      requiredDocs: [
        "Aadhaar Card",
        "Sowing Certificate issued by Gram Sevak / Talathi",
        "Land Record (7/12 extract / RTC)",
        "Bank Passbook Details"
      ],
      deadline: "Aug 15, 2026 (Kharif Cutoff)",
      website: "https://pmfby.gov.in",
      steps: [
        { step: 1, title: "Check Notified Crop & Village", desc: "Verify if your crop and village are notified under current season PMFBY coverage." },
        { step: 2, title: "Pay Subsidized Premium", desc: "Pay the 1.5% to 2% premium online or via your Bank / CSC center before the cutoff date." },
        { step: 3, title: "Report Crop Loss Within 72 Hours", desc: "In case of flood/hailstorm, notify PMFBY app or toll-free number within 72 hours." },
        { step: 4, title: "Claim Settlement via DBT", desc: "After joint field survey, insurance payout is directly credited to your bank account." }
      ],
      videos: [
        { title: "How to Intimate Crop Loss in PMFBY App Within 72 Hours", source: "PMFBY Official", duration: "5 mins", summary: "Step-by-step video on uploading crop damage photo and geotagged plot location.", link: "https://pmfby.gov.in" }
      ],
      contact: {
        phone: "1800-200-5142",
        helpline: "PMFBY Crop Insurance Toll-Free: 1800-180-1551",
        office: "Nearest Agriculture Insurance Company Office / CSC Portal"
      },
      downloads: [
        { name: "PMFBY Crop Loss Claim Intimation Form (PDF)", size: "380 KB", link: "https://pmfby.gov.in" }
      ]
    }
  ];

  // Speech Synth Reader
  const readAloud = (text: string) => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === "mr" ? "mr-IN" : lang === "hi" ? "hi-IN" : "en-IN";
      setSpeechActive(true);
      utterance.onend = () => setSpeechActive(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleSaveApplication = (schemeName: string) => {
    if (savedApplications.includes(schemeName)) {
      setSavedApplications(savedApplications.filter(s => s !== schemeName));
    } else {
      setSavedApplications([...savedApplications, schemeName]);
    }
  };

  return (
    <div className="space-y-6 pb-12">
      
      {/* EXPANDED SCHEME DETAIL PAGE VIEW */}
      {selectedScheme ? (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSelectedScheme(null)}
              className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-950 dark:text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 transition-all border border-emerald-500/20"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Assistance Centre
            </button>

            <button
              onClick={() => readAloud(`${selectedScheme.name}. ${selectedScheme.objective}`)}
              className={`text-xs font-bold px-3 py-1.5 rounded-xl flex items-center gap-1.5 border transition-all ${
                speechActive ? "bg-amber-500 text-white border-amber-500" : "bg-emerald-600 text-white border-emerald-600"
              }`}
            >
              <Volume2 className="w-4 h-4" /> {speechActive ? "Reading Aloud..." : "Listen Instructions"}
            </button>
          </div>

          {/* 1. SCHEME OVERVIEW */}
          <div className="glass-panel p-6 rounded-3xl border border-emerald-500/20 bg-white/80 dark:bg-nature-950/90 space-y-4 shadow-xl">
            <div className="flex flex-wrap justify-between items-start gap-2">
              <span className="text-[10px] font-black uppercase text-amber-700 dark:text-amber-400 bg-amber-500/15 px-3 py-1 rounded-full">{selectedScheme.deadline}</span>
              <button
                onClick={() => toggleSaveApplication(selectedScheme.name)}
                className={`text-xs font-extrabold px-3.5 py-1.5 rounded-xl border transition-all ${
                  savedApplications.includes(selectedScheme.name)
                    ? "bg-emerald-600 text-white border-emerald-600"
                    : "bg-emerald-500/10 text-emerald-900 dark:text-emerald-300 border-emerald-500/20"
                }`}
              >
                {savedApplications.includes(selectedScheme.name) ? "✓ Saved to My Applications" : "+ Track & Save Scheme"}
              </button>
            </div>

            <h2 className="text-2xl font-black text-emerald-950 dark:text-white font-outfit">{selectedScheme.name}</h2>
            <p className="text-xs text-emerald-900/80 dark:text-white/80 leading-relaxed font-medium">{selectedScheme.objective}</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs">
              <div className="bg-emerald-500/5 dark:bg-white/5 p-4 rounded-2xl border border-emerald-500/10 space-y-1">
                <span className="text-[10px] font-bold text-emerald-900/60 dark:text-white/50 uppercase">Key Benefits</span>
                <p className="font-extrabold text-emerald-950 dark:text-white">{selectedScheme.benefits}</p>
              </div>

              <div className="bg-emerald-500/5 dark:bg-white/5 p-4 rounded-2xl border border-emerald-500/10 space-y-1">
                <span className="text-[10px] font-bold text-emerald-900/60 dark:text-white/50 uppercase">Max Financial Benefit</span>
                <p className="font-extrabold text-emerald-700 dark:text-emerald-400 font-outfit">{selectedScheme.maxBenefit}</p>
              </div>
            </div>

            {/* REQUIRED DOCUMENTS */}
            <div className="space-y-2 pt-2 text-xs">
              <h4 className="font-bold text-emerald-950 dark:text-white uppercase tracking-wider text-[11px]">Required Documents Checklist:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {selectedScheme.requiredDocs.map((doc, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-emerald-500/5 dark:bg-white/5 p-2.5 rounded-xl border border-emerald-500/10 text-emerald-900/80 dark:text-white/80 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{doc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3">
              <a
                href={selectedScheme.website}
                target="_blank"
                rel="noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 rounded-2xl text-xs flex items-center justify-center gap-2 shadow-md"
              >
                Official Apply Now <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* 2. STEP-BY-STEP APPLICATION GUIDE */}
          <div className="glass-panel p-6 rounded-3xl border border-emerald-900/10 dark:border-white/10 bg-white/70 dark:bg-white/5 space-y-4">
            <h3 className="text-base font-black text-emerald-950 dark:text-white font-outfit">Step-by-Step Application Guide</h3>
            <div className="space-y-3">
              {selectedScheme.steps.map((st) => (
                <div key={st.step} className="flex items-start gap-3 bg-emerald-500/5 dark:bg-white/5 p-4 rounded-2xl border border-emerald-500/10 text-xs">
                  <div className="w-7 h-7 rounded-xl bg-emerald-600 text-white font-black flex items-center justify-center shrink-0">
                    {st.step}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-emerald-950 dark:text-white">{st.title}</h4>
                    <p className="text-emerald-900/70 dark:text-white/60 mt-0.5 font-medium">{st.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. VIDEO TUTORIAL SECTION */}
          <div className="glass-panel p-6 rounded-3xl border border-emerald-900/10 dark:border-white/10 bg-white/70 dark:bg-white/5 space-y-4">
            <h3 className="text-base font-black text-emerald-950 dark:text-white font-outfit flex items-center gap-2">
              <Play className="w-4 h-4 text-emerald-600 fill-emerald-600" /> Watch How to Apply (Official Tutorials)
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              {selectedScheme.videos.map((vid, idx) => (
                <div key={idx} className="bg-emerald-500/5 dark:bg-white/5 p-4 rounded-2xl border border-emerald-500/10 space-y-2 flex flex-col justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase text-emerald-700 dark:text-emerald-400 bg-emerald-500/15 px-2 py-0.5 rounded">{vid.source}</span>
                    <h4 className="font-bold text-emerald-950 dark:text-white mt-1">{vid.title}</h4>
                    <p className="text-emerald-900/70 dark:text-white/60 text-[11px] font-medium">{vid.summary}</p>
                  </div>
                  <a href={vid.link} target="_blank" rel="noreferrer" className="bg-emerald-600 text-white font-bold py-2 rounded-xl text-center block text-xs">
                    Watch Official Video Tutorial ({vid.duration})
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* 4. NEED HELP? CONTACT & DOWNLOAD CENTRE */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* OFFICIAL CONTACT & HELPLINE */}
            <div className="glass-panel p-6 rounded-3xl border border-emerald-900/10 dark:border-white/10 bg-white/70 dark:bg-white/5 space-y-3 text-xs">
              <h3 className="font-extrabold text-sm text-emerald-950 dark:text-white font-outfit flex items-center gap-2">
                <PhoneCall className="w-4 h-4 text-emerald-600" /> Official Helpline & Office Locator
              </h3>
              <p className="font-medium text-emerald-900/80 dark:text-white/80">{selectedScheme.contact.helpline}</p>
              <p className="font-medium text-emerald-900/80 dark:text-white/80">Location: {selectedScheme.contact.office}</p>

              <div className="flex gap-2 pt-2">
                <a href={`tel:${selectedScheme.contact.phone}`} className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-center">
                  Call Official Helpline
                </a>
              </div>
            </div>

            {/* DOWNLOAD CENTRE */}
            <div className="glass-panel p-6 rounded-3xl border border-emerald-900/10 dark:border-white/10 bg-white/70 dark:bg-white/5 space-y-3 text-xs">
              <h3 className="font-extrabold text-sm text-emerald-950 dark:text-white font-outfit flex items-center gap-2">
                <Download className="w-4 h-4 text-emerald-600" /> Official Download Centre (PDF Forms)
              </h3>
              <div className="space-y-2">
                {selectedScheme.downloads.map((dl, idx) => (
                  <div key={idx} className="flex justify-between items-center bg-emerald-500/5 p-2.5 rounded-xl border border-emerald-500/10">
                    <span className="font-bold text-emerald-950 dark:text-white">{dl.name}</span>
                    <a href={dl.link} target="_blank" rel="noreferrer" className="text-emerald-600 font-extrabold hover:underline">
                      Download ({dl.size})
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      ) : (
        /* MAIN GOVERNMENT ASSISTANCE CENTRE VIEW */
        <div className="space-y-6">
          
          {/* SECTION HEADER */}
          <div className="glass-panel p-6 rounded-3xl border border-emerald-900/10 dark:border-white/10 bg-gradient-to-r from-emerald-900/15 via-amber-600/10 to-teal-900/15 dark:from-amber-950/60 dark:to-nature-950 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <span className="text-[10px] font-black uppercase tracking-widest text-amber-700 dark:text-amber-400 bg-amber-500/15 px-3 py-1 rounded-full border border-amber-500/20">
                Official Government of India & NABARD Portal
              </span>
              <h2 className="text-2xl font-black text-emerald-950 dark:text-white mt-2 font-outfit">
                Finance & Government Assistance Centre
              </h2>
              <p className="text-xs text-emerald-900/70 dark:text-white/60 mt-1 max-w-xl font-medium">
                Comprehensive portal for PM-KISAN, PMFBY, Kisan Credit Card loans, solar subsidies, and financial education.
              </p>
            </div>
          </div>

          {/* CATEGORY RIBBON NAVIGATION */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs font-bold">
            {[
              { id: "schemes", label: "Government Schemes", icon: ShieldCheck },
              { id: "banking", label: "Banking Services & KCC", icon: Building2 },
              { id: "insurance", label: "Crop Insurance (PMFBY)", icon: ShieldCheck },
              { id: "subsidies", label: "Subsidies (Solar & Drip)", icon: Award },
              { id: "checker", label: "AI Eligibility Checker", icon: Sparkles },
              { id: "calculator", label: "Finance Calculator", icon: Calculator },
              { id: "learning", label: "Financial Education", icon: BookOpen }
            ].map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as any)}
                  className={`px-4 py-2.5 rounded-2xl transition-all whitespace-nowrap flex items-center gap-2 border ${
                    activeCategory === cat.id
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-md"
                      : "bg-white/60 dark:bg-white/5 text-emerald-900/70 dark:text-white/70 hover:bg-emerald-500/10 dark:hover:bg-white/10 border-emerald-900/10 dark:border-white/10"
                  }`}
                >
                  <Icon className="w-4 h-4" /> {cat.label}
                </button>
              );
            })}
          </div>

          {/* CATEGORY 1: GOVERNMENT SCHEMES */}
          {activeCategory === "schemes" && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {expandedSchemesData.map((sch) => (
                  <div key={sch.id} className="glass-panel p-6 rounded-3xl border border-emerald-900/10 dark:border-white/10 bg-white/70 dark:bg-white/5 space-y-4 flex flex-col justify-between">
                    <div className="space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-black uppercase text-amber-700 dark:text-amber-400 bg-amber-500/15 px-2.5 py-0.5 rounded-full">{sch.deadline}</span>
                        <button
                          onClick={() => setSelectedScheme(sch)}
                          className="text-[10px] font-extrabold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1 bg-emerald-500/10 px-2.5 py-1 rounded-xl"
                        >
                          View Full Step-by-Step Details <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                      <h4 className="text-base font-black text-emerald-950 dark:text-white font-outfit">{sch.name}</h4>
                      <p className="text-xs text-emerald-900/80 dark:text-white/80 leading-relaxed font-medium">{sch.objective}</p>

                      <div className="bg-emerald-500/5 dark:bg-white/5 p-3 rounded-2xl border border-emerald-500/10 space-y-1 text-xs">
                        <p className="font-bold text-emerald-950 dark:text-white">Benefits: <span className="font-medium text-emerald-900/70 dark:text-white/70">{sch.benefits}</span></p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <button
                        onClick={() => setSelectedScheme(sch)}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 rounded-xl text-xs text-center"
                      >
                        Expand Details
                      </button>
                      <a
                        href={sch.website}
                        target="_blank"
                        rel="noreferrer"
                        className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-950 dark:text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-1 border border-emerald-500/20"
                      >
                        Portal <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FLOATING AI ASSISTANT "NEED HELP?" BUTTON */}
          <div className="fixed bottom-6 right-6 z-40">
            <button
              onClick={() => setAiAssistantOpen(!aiAssistantOpen)}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-4 py-3 rounded-full shadow-2xl flex items-center gap-2 text-xs uppercase tracking-wider transition-all border border-emerald-400/30 animate-pulse"
            >
              <Sparkles className="w-4 h-4 text-amber-300" /> Need Govt Help?
            </button>
          </div>

          {/* FLOATING AI ASSISTANT MODAL */}
          {aiAssistantOpen && (
            <div className="fixed bottom-20 right-6 z-50 w-80 glass-panel p-5 rounded-3xl border border-emerald-500/30 bg-nature-950 text-white space-y-3 shadow-2xl">
              <div className="flex justify-between items-center border-b border-white/10 pb-2">
                <span className="text-xs font-black uppercase text-emerald-400 flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-400" /> Scheme AI Companion
                </span>
                <button onClick={() => setAiAssistantOpen(false)} className="text-white/60 text-xs">✕</button>
              </div>
              <p className="text-xs text-white/80 font-medium leading-relaxed">
                Ask me anything about PM-KISAN, Kisan Credit Card loans, PMFBY crop insurance, or solar pump subsidies in English, Hindi, or Marathi!
              </p>
              <input
                type="text"
                placeholder="Ask: What documents are required for KCC?"
                className="w-full bg-white/10 border border-white/20 p-2.5 rounded-xl text-xs text-white placeholder-white/50 focus:outline-none"
              />
            </div>
          )}

        </div>
      )}

    </div>
  );
}
