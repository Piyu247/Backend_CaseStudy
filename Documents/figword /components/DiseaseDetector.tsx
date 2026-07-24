import React, { useState } from "react";
import { UploadCloud, ShieldAlert, Sparkles, RefreshCw, AlertCircle, Droplet } from "lucide-react";
import { translations, Language } from "../utils/translations";

interface DiseaseDetectorProps {
  lang: Language;
}

interface Diagnosis {
  disease: string;
  confidence: number;
  severity: string;
  organic: string;
  chemical: string;
  prevention: string;
}

const mockEn: Diagnosis[] = [
  {
    disease: "Paddy Blast Fungus (Magnaporthe oryzae)",
    confidence: 94,
    severity: "Moderate",
    organic: "Apply Pseudomonas fluorescens bio-pesticide, reduce excessive nitrogen input, and spray neem seed extract.",
    chemical: "Spray Tricyclazole 75 WP at 0.6 grams per liter of water immediately.",
    prevention: "Adopt split application of nitrogenous fertilizers and burn/bury infected crop residues post-harvest."
  },
  {
    disease: "Tomato Early Blight (Alternaria solani)",
    confidence: 89,
    severity: "Critical",
    organic: "Prune lower leaves to enhance airflow. Apply copper octanoate soap solution every 7 days.",
    chemical: "Apply Chlorothalonil or Mancozeb fungicide spray to control systemic spreading.",
    prevention: "Practice crop rotation with grains or legumes, and use drip irrigation to prevent wet foliage."
  },
  {
    disease: "Nitrogen Deficiency (Chlorosis)",
    confidence: 97,
    severity: "Mild",
    organic: "Side-dress crop rows with well-aged compost manure, blood meal, or fish emulsion spray.",
    chemical: "Apply foliar spray of Urea (1-2% solution) or NPK 20:20:20 fertilizer.",
    prevention: "Sow cover crops (hairy vetch, clover) in off-seasons to fix atmospheric nitrogen."
  }
];

const mockMr: Diagnosis[] = [
  {
    disease: "भात पिकावरील करपा रोग (मॅग्नापोर्थे ओरायझे)",
    confidence: 94,
    severity: "मध्यम",
    organic: "सुडोमोनास फ्लोरेसेन्स जैविक कीटकनाशक वापरा, नायट्रोजन खतांचा वापर कमी करा आणि निंबोळी अर्काची फवारणी करा.",
    chemical: "लगेच ट्रायसायक्लाझोल ७५ डब्ल्यूपी प्रति लिटर पाण्यात ०.६ ग्रॅम या प्रमाणात फवारणी करावी.",
    prevention: "नायट्रोजन खतांचे विभागून हप्ते द्यावेत आणि कापणीनंतर बाधित पिकाचे अवशेष जाळून किंवा जमिनीत गाडून टाकावेत."
  },
  {
    disease: "टोमॅटोवरील अगेती करपा रोग (अल्टरनेरिया सोलाणी)",
    confidence: 89,
    severity: "गंभीर",
    organic: "हवेचा खेळती राहण्यासाठी खालची पाने छाटून टाका. दर ७ दिवसांनी कॉपर ऑक्टानोएट साबण द्रावण फवारणी करा.",
    chemical: "रोग पसरू नये म्हणून क्लोरोथॅलोनिल किंवा मानकोझेब बुरशीनाशकाची फवारणी करावी.",
    prevention: "तृणधान्ये किंवा कडधान्यांसोबत फेरपालट करावी आणि पाने ओले राहू नये म्हणून ठिबक सिंचनाचा वापर करावा."
  },
  {
    disease: "नायट्रोजनची कमतरता (पाने पिवळी पडणे)",
    confidence: 97,
    severity: "सौम्य",
    organic: "शेतातील ओळींमध्ये चांगले कुजलेले शेणखत, फिश इमल्शन किंवा सेंद्रिय खतांचा वापर करा.",
    chemical: "युरिया (१-२% द्रावण) किंवा NPK २०:२०:२० खताची पानांवर फवारणी करावी.",
    prevention: "हंगाम संपल्यावर हवेतील नायट्रोजन जमिनीत स्थिरावण्यासाठी कडधान्य पिके (हिरवळीची खते) लावावीत."
  }
];

const mockHi: Diagnosis[] = [
  {
    disease: "धान का झोंका/झुलसा रोग (मैग्नापोर्थे ओरेजी)",
    confidence: 94,
    severity: "मध्यम",
    organic: "स्यूडोमोनास फ्लोरेसेंस जैव-कीटनाशक का प्रयोग करें, यूरिया का अधिक उपयोग कम करें और नीम के तेल का छिड़काव करें।",
    chemical: "तुरंत ट्राइसाइक्लाजोल 75 WP का 0.6 ग्राम प्रति लीटर पानी की दर से छिड़काव करें।",
    prevention: "नाइट्रोजन युक्त उर्वरकों का उपयोग तीन से चार बार में विभाजित कर करें और कटाई के बाद ग्रसित अवशेषों को नष्ट करें।"
  },
  {
    disease: "टमाटर का अगेती झुलसा (अल्टरनेरिया सोलानी)",
    confidence: 89,
    severity: "गंभीर",
    organic: "हवा के बहाव को बढ़ाने के लिए निचली पत्तियों की छंटाई करें। तांबा आधारित जैव कवकनाशी का छिड़काव करें।",
    chemical: "रोग प्रसार रोकने के लिए क्लोरोथैलोनिल या मैंकोजेब कवकनाशी का छिड़काव करें।",
    prevention: "फसल चक्र अपनाएं (अनाज या दलहन उगाएं) और पत्तियों को गीला होने से बचाने के लिए टपक सिंचाई विधि अपनाएं।"
  },
  {
    disease: "नाइट्रोजन की कमी (पत्तियों का पीला पड़ना)",
    confidence: 97,
    severity: "सौम्य",
    organic: "कम्पोस्ट खाद, केंचुआ खाद या मछली के तेल के अर्क का छिड़काव करें।",
    chemical: "यूरिया (1-2 प्रतिशत घोल) या NPK 20:20:20 का पत्तियों पर सीधे छिड़काव करें।",
    prevention: "गैर-फसली मौसम में दलहनी फसलें उगाएं ताकि मिट्टी में नाइट्रोजन की प्राकृतिक आपूर्ति बनी रहे।"
  }
];

export default function DiseaseDetector({ lang }: DiseaseDetectorProps) {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState<Diagnosis | null>(null);

  const t = translations[lang] || translations.en;

  const simulateUpload = (idx: number) => {
    setScanning(true);
    setResult(null);

    const diagnosesData = lang === "mr" ? mockMr : lang === "hi" ? mockHi : mockEn;

    setTimeout(() => {
      setResult(diagnosesData[idx]);
      setScanning(false);
    }, 2500);
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setResult(null);
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-emerald-900/10 dark:border-white/10 bg-white/60 dark:bg-white/5">
      <div className="flex items-center justify-between border-b border-emerald-900/10 dark:border-white/10 pb-4 mb-6">
        <div>
          <h3 className="text-xl font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
            <ShieldAlert className="w-6 h-6" />
            {t.diseaseTitle}
          </h3>
          <p className="text-xs text-emerald-900/60 dark:text-white/50 mt-1">{t.diseaseDesc}</p>
        </div>
        {selectedFile && (
          <button onClick={clearSelection} className="text-xs font-bold text-red-600 dark:text-red-400 hover:opacity-80 transition-all flex items-center gap-1">
            <RefreshCw className="w-3 h-3" /> {t.resetScanner}
          </button>
        )}
      </div>

      {!selectedFile ? (
        <div className="border-2 border-dashed border-emerald-500/20 hover:border-emerald-500 rounded-2xl p-10 flex flex-col items-center justify-center cursor-pointer transition-all bg-emerald-500/5 group">
          <UploadCloud className="w-12 h-12 text-emerald-600/40 group-hover:text-emerald-600 transition-all mb-4" />
          <p className="font-extrabold text-sm text-emerald-950 dark:text-white/95">{t.dragDrop}</p>
          <p className="text-xs text-emerald-900/50 dark:text-white/40 mt-1">{t.supportFormats}</p>
          
          <div className="mt-6 flex gap-3">
            <button 
              onClick={() => {
                setSelectedFile("leaf1");
                simulateUpload(0);
              }}
              className="bg-white dark:bg-nature-900 hover:bg-emerald-600 hover:text-white text-xs font-bold px-4 py-2 rounded-xl transition-all border border-emerald-500/20 text-emerald-950 dark:text-white"
            >
              {t.demoPaddy}
            </button>
            <button 
              onClick={() => {
                setSelectedFile("leaf2");
                simulateUpload(1);
              }}
              className="bg-white dark:bg-nature-900 hover:bg-emerald-600 hover:text-white text-xs font-bold px-4 py-2 rounded-xl transition-all border border-emerald-500/20 text-emerald-950 dark:text-white"
            >
              {t.demoTomato}
            </button>
            <button 
              onClick={() => {
                setSelectedFile("leaf3");
                simulateUpload(2);
              }}
              className="bg-white dark:bg-nature-900 hover:bg-emerald-600 hover:text-white text-xs font-bold px-4 py-2 rounded-xl transition-all border border-emerald-500/20 text-emerald-950 dark:text-white"
            >
              {t.demoYellow}
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Scanner Preview */}
          <div className="relative rounded-2xl overflow-hidden border border-emerald-500/20 h-72 bg-emerald-900/10 dark:bg-nature-950 flex items-center justify-center">
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center select-none text-emerald-900/20 dark:text-white/10 font-black uppercase tracking-widest text-lg">
              {selectedFile === "leaf1" && <div className="text-emerald-700 dark:text-emerald-600">{t.demoPaddy}</div>}
              {selectedFile === "leaf2" && <div className="text-[#8F5C38] dark:text-[#ffba82]">{t.demoTomato}</div>}
              {selectedFile === "leaf3" && <div className="text-yellow-600">{t.demoYellow}</div>}
              <div className="text-[10px] mt-2 text-emerald-900/40 dark:text-white/30 lowercase font-mono">Simulated Camera Feed</div>
            </div>

            {/* Glowing Laser Scan Bar */}
            {scanning && (
              <div className="absolute left-0 right-0 h-[3px] bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)] z-10 animate-scan" />
            )}

            {scanning && (
              <div className="absolute inset-0 bg-emerald-500/5 backdrop-blur-[1px] flex items-center justify-center">
                <div className="glass-panel px-4 py-2.5 rounded-full text-xs font-mono text-emerald-800 dark:text-emerald-400 flex items-center gap-2 border border-emerald-500/20 bg-white/90">
                  <Sparkles className="w-4 h-4 animate-spin" />
                  {t.analyzingPaths}
                </div>
              </div>
            )}
          </div>

          {/* Diagnosis Reports */}
          <div className="flex flex-col justify-between">
            {scanning ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-8 h-8 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin" />
                <p className="text-sm font-bold text-emerald-900/80 dark:text-white/80">{t.parsingCells}</p>
              </div>
            ) : result ? (
              <div className="space-y-4">
                <div>
                  <span className="text-[10px] uppercase font-black tracking-wider text-emerald-700 bg-emerald-500/10 px-2 py-0.5 rounded">
                    {result.confidence}% {t.matchConfidence}
                  </span>
                  <h4 className="text-lg font-black text-emerald-950 dark:text-white mt-1.5">{result.disease}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-emerald-900/60 dark:text-white/50">{t.urgency}</span>
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      result.severity === "Mild" || result.severity === "सौम्य" ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400" :
                      result.severity === "Moderate" || result.severity === "मध्यम" ? "bg-amber-500/15 text-amber-600 dark:text-amber-400" :
                      "bg-red-500/15 text-red-600 dark:text-red-400"
                    }`}>
                      {result.severity}
                    </span>
                  </div>
                </div>

                <div className="space-y-3 text-xs bg-white/50 dark:bg-white/5 rounded-2xl p-4 border border-emerald-500/10 dark:border-white/5">
                  <div>
                    <h5 className="font-extrabold text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> {t.organicTreatment}
                    </h5>
                    <p className="text-emerald-950/80 dark:text-white/80 mt-1 leading-relaxed">{result.organic}</p>
                  </div>
                  <div className="pt-2 border-t border-emerald-500/10 dark:border-white/5">
                    <h5 className="font-extrabold text-[#8F5C38] dark:text-amber-400 flex items-center gap-1">
                      <Droplet className="w-3.5 h-3.5" /> {t.chemicalApplication}
                    </h5>
                    <p className="text-emerald-950/80 dark:text-white/80 mt-1 leading-relaxed">{result.chemical}</p>
                  </div>
                  <div className="pt-2 border-t border-emerald-500/10 dark:border-white/5">
                    <h5 className="font-extrabold text-emerald-900/70 dark:text-white/70 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {t.preventionMeasures}
                    </h5>
                    <p className="text-emerald-900/75 dark:text-white/70 mt-1 leading-relaxed">{result.prevention}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-center text-emerald-900/40 dark:text-white/40 text-xs font-semibold p-6 border border-dashed border-emerald-500/10 rounded-2xl">
                {lang === "mr" ? "कृपया पीक रोगाचे विश्लेषण सुरू करण्यासाठी एक डेमो पर्याय निवडा." : lang === "hi" ? "कृपया पीक रोग विश्लेषण शुरू करने के लिए कोई डेमो विकल्प चुनें।" : "Select one of the demo crop presets to run diagnostic scans."}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
