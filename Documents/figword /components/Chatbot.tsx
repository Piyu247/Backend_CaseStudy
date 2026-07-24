import React, { useState, useRef, useEffect } from "react";
import {
  MessageSquare, Send, Sparkles, User, Brain, Volume2, Mic, MicOff, Settings, Shield,
  Radio, AlertCircle, CheckCircle, RefreshCw, VolumeX, Loader2
} from "lucide-react";
import { translations, Language } from "../utils/translations";

interface ChatbotProps {
  lang: Language;
}

interface Message {
  sender: "user" | "bot";
  text: string;
  isError?: boolean;
}

interface FarmProfile {
  soil: string;
  crop: string;
  water: string;
  size: string;
  budget: string;
}

// Explicit state machine definition matching prompt requirements
type VoiceState = "idle" | "listening" | "processing" | "speaking" | "completed";

export default function Chatbot({ lang }: ChatbotProps) {
  const t = translations[lang] || translations.en;

  // Farm Profile State
  const [profile, setProfile] = useState<FarmProfile>({
    soil: lang === "mr" ? "काळी कसदार माती" : lang === "hi" ? "काली मिट्टी" : "Black Clay Soil",
    crop: lang === "mr" ? "कापूस" : lang === "hi" ? "कपास" : "Bt Cotton",
    water: lang === "mr" ? "कूपनलिका / विहीर" : lang === "hi" ? "नलकूप / कुआं" : "Borewell / Well",
    size: "3 Acres",
    budget: "Medium"
  });

  // State Machine State
  const [voiceState, setVoiceState] = useState<VoiceState>("idle");
  const [recognizedText, setRecognizedText] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Suggestion chips for first time user guidance
  const suggestionChips = [
    { text: "Which crop should I plant this season?", label: "Crop Selection" },
    { text: "Will it rain this week?", label: "Rain Forecast" },
    { text: "Why are my leaves turning yellow?", label: "Leaf Diagnosis" },
    { text: "Which crop will earn more profit?", label: "Profit Calculator" },
    { text: "How do I start fish farming?", label: "Fish Farming" },
    { text: "Is my soil suitable for turmeric?", label: "Soil Suitability" }
  ];

  // Chat stream messages
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text:
        lang === "mr"
          ? "नमस्ते पीयूष! मी तुमचा कृषिमित्र एआय व्हॉइस सहाय्यक आहे. शेतीबद्दल काहीही विचारा!"
          : lang === "hi"
            ? "नमस्ते पीयूष! मैं आपका कृषिमित्र एआई वॉइस सहायक हूँ। खेती के बारे में कुछ भी पूछें।"
            : "Namaste, Piyush! I am your KechuaMitra AI Voice Companion. Ask me anything about farming."
    }
  ]);
  const [input, setInput] = useState("");

  const recognitionRef = useRef<any>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const silenceTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, voiceState, recognizedText]);

  // Localized friendly error messages
  const getSpeechFailureMessage = () => {
    if (lang === "mr") return "मला ते समजले नाही. कृपया पुन्हा प्रयत्न करा.";
    if (lang === "hi") return "मैं वह समझ नहीं पाया। कृपया पुनः प्रयास करें।";
    return "I couldn't understand that. Please try again.";
  };

  const getNetworkErrorMessage = () => {
    if (lang === "mr")
      return "सध्या एआय सेवेशी संपर्क होऊ शकत नाही. कृपया तुमचे इंटरनेट कनेक्शन तपासा किंवा काही वेळाने पुन्हा प्रयत्न करा.";
    if (lang === "hi")
      return "इस समय एआई सेवा से संपर्क नहीं हो पा रहा है। कृपया अपना इंटरनेट कनेक्शन जांचें या कुछ समय बाद पुनः प्रयास करें।";
    return "Unable to reach the AI service right now. Please check your internet connection or try again in a moment.";
  };

  // Text To Speech Synthesis with human-like voice parameters
  const speakResponse = (text: string) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setVoiceState("idle");
      return;
    }

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*#_`]/g, "").trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);

    // Set voice language matching user language selection
    if (lang === "hi") {
      utterance.lang = "hi-IN";
    } else if (lang === "mr") {
      utterance.lang = "mr-IN";
    } else {
      utterance.lang = "en-IN";
    }

    utterance.rate = 0.95; // Calm, human-like speed
    utterance.pitch = 1.0;

    utterance.onstart = () => {
      setVoiceState("speaking");
    };

    utterance.onend = () => {
      setVoiceState("completed");
      setTimeout(() => setVoiceState("idle"), 1000);
    };

    utterance.onerror = (e) => {
      console.error("Speech synthesis technical error:", e);
      setVoiceState("idle");
    };

    window.speechSynthesis.speak(utterance);
  };

  // Stop current speaking
  const handleStopSpeaking = () => {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    setVoiceState("idle");
  };

  // Clear silence detection timeout helper
  const clearSilenceTimer = () => {
    if (silenceTimeoutRef.current) {
      clearTimeout(silenceTimeoutRef.current);
      silenceTimeoutRef.current = null;
    }
  };

  // Web Speech Recognition Initialization & Setup
  useEffect(() => {
    if (typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      const rec = new SpeechRecognition();

      rec.continuous = true;
      rec.interimResults = true;

      rec.onstart = () => {
        setVoiceState("listening");
        setRecognizedText("");
        setErrorMessage(null);
      };

      rec.onresult = (event: any) => {
        let interimTranscript = "";
        let finalTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }

        const currentText = finalTranscript || interimTranscript;
        setRecognizedText(currentText);

        // Reset 2.5 second silence timer whenever speech is detected
        clearSilenceTimer();
        if (currentText.trim().length > 0) {
          silenceTimeoutRef.current = setTimeout(() => {
            // User finished speaking (silence detected for 2-3s)
            if (rec) {
              rec.stop();
            }
          }, 2500);
        }
      };

      rec.onerror = (event: any) => {
        // Log technical error only in developer console
        console.error("WebSpeech API technical error event:", event.error);
        clearSilenceTimer();

        if (event.error !== "no-speech") {
          setErrorMessage(getSpeechFailureMessage());
        } else {
          setErrorMessage(getSpeechFailureMessage());
        }
        setVoiceState("idle");
      };

      rec.onend = () => {
        clearSilenceTimer();
      };

      recognitionRef.current = rec;
    }
  }, [lang]);

  // Handle Manual Mic Button Press (Microphone NEVER activates by itself)
  const handleMicClick = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    // Stop speaking if currently in speaking state
    if (voiceState === "speaking") {
      handleStopSpeaking();
      return;
    }

    // If currently listening, manual stop
    if (voiceState === "listening") {
      clearSilenceTimer();
      recognitionRef.current.stop();
      if (recognizedText.trim()) {
        processTranscriptAndQuery(recognizedText);
      } else {
        setErrorMessage(getSpeechFailureMessage());
        setVoiceState("idle");
      }
      return;
    }

    // Start listening from Idle / Completed state
    if (voiceState === "idle" || voiceState === "completed") {
      setErrorMessage(null);
      setRecognizedText("");
      window.speechSynthesis?.cancel();

      // Automatically match selected language
      recognitionRef.current.lang = lang === "mr" ? "mr-IN" : lang === "hi" ? "hi-IN" : "en-IN";

      try {
        recognitionRef.current.start();
      } catch (err) {
        console.error("Speech recognition start technical error:", err);
      }
    }
  };

  // Process final transcript after speech recognition completes
  const processTranscriptAndQuery = async (textQuery: string) => {
    const query = textQuery.trim();
    if (!query) {
      setErrorMessage(getSpeechFailureMessage());
      setVoiceState("idle");
      return;
    }

    // State 5 & 6: Display recognized text for confirmation & transition to Processing
    setVoiceState("processing");
    setMessages((prev) => [...prev, { sender: "user", text: query }]);
    setRecognizedText(query);
    setInput("");

    // Send only final transcript to AI with context
    const fullQueryWithContext = `[Farmer Profile: Soil=${profile.soil}, Crop=${profile.crop}, Water=${profile.water}, Farm Size=${profile.size}]. User Question: ${query}`;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query, lang, farmerProfile: profile })
      });

      const data = await response.json();

      if (!response.ok || data.error) {
        throw new Error(data.error || "Network error");
      }

      const botReply = data.text || "Thank you. How else can I assist your crop today?";

      // Append bot response and start Text-to-Speech
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
      speakResponse(botReply);

    } catch (err: any) {
      // Log technical trace strictly in developer console
      console.error("API call technical error:", err);

      const friendlyNetError = getNetworkErrorMessage();
      setErrorMessage(friendlyNetError);
      setMessages((prev) => [...prev, { sender: "bot", text: friendlyNetError, isError: true }]);
      setVoiceState("idle");
    }
  };

  // Effect to process transcript when recognition stops automatically due to silence timeout
  useEffect(() => {
    if (voiceState === "listening" && recognitionRef.current) {
      recognitionRef.current.onend = () => {
        clearSilenceTimer();
        if (recognizedText.trim()) {
          processTranscriptAndQuery(recognizedText);
        } else {
          setErrorMessage(getSpeechFailureMessage());
          setVoiceState("idle");
        }
      };
    }
  }, [voiceState, recognizedText]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

      {/* Main Google Assistant / Gemini Live Style Assistant Box */}
      <div className="lg:col-span-2 glass-panel rounded-3xl border border-emerald-900/10 dark:border-white/10 flex flex-col h-[540px] bg-white/70 dark:bg-nature-950/80 justify-between overflow-hidden shadow-md">

        {/* Top Header & Mode Bar */}
        <div className="flex items-center justify-between p-5 border-b border-emerald-900/10 dark:border-white/10 bg-white/40 dark:bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600/15 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
              <Brain className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm text-emerald-950 dark:text-white flex items-center gap-2 font-outfit">
                {t.chatHeader}
                <span className="text-[10px] font-black uppercase text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  {lang === "mr" ? "मराठी" : lang === "hi" ? "हिन्दी" : "English"}
                </span>
              </h3>
              <p className="text-[10px] text-emerald-700/80 dark:text-white/60 flex items-center gap-1.5 font-bold mt-0.5">
                <span className={`w-2 h-2 rounded-full ${voiceState === "listening" ? "bg-red-500 animate-ping" :
                    voiceState === "processing" ? "bg-amber-500 animate-spin" :
                      voiceState === "speaking" ? "bg-emerald-500 animate-bounce" : "bg-emerald-600/40"
                  }`} />
                State: <strong className="uppercase text-emerald-950 dark:text-white font-mono">{voiceState}</strong>
              </p>
            </div>
          </div>

          <span className="hidden sm:inline-flex text-[9px] text-emerald-900/60 dark:text-white/40 uppercase tracking-widest font-mono font-bold bg-emerald-500/5 px-2.5 py-1 rounded-xl border border-emerald-500/10">
            Gemini Live Protocol
          </span>
        </div>

        {/* Message Stream Display */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex gap-3 max-w-[85%] ${msg.sender === "user" ? "ml-auto flex-row-reverse" : ""}`}>
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center border text-xs shrink-0 ${msg.sender === "user"
                  ? "bg-emerald-600 border-emerald-600/20 text-white shadow-sm"
                  : msg.isError
                    ? "bg-red-500/10 border-red-500/30 text-red-600 dark:text-red-400"
                    : "bg-white dark:bg-white/5 border-emerald-500/15 dark:border-white/10 text-emerald-600 dark:text-white/80"
                }`}>
                {msg.sender === "user" ? <User className="w-4 h-4" /> : msg.isError ? <AlertCircle className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
              </div>

              <div className={`p-4 rounded-2xl text-xs leading-relaxed ${msg.sender === "user"
                  ? "bg-emerald-600 text-white rounded-tr-none shadow-sm font-semibold"
                  : msg.isError
                    ? "bg-red-500/10 border border-red-500/20 text-red-900 dark:text-red-200 rounded-tl-none font-medium"
                    : "bg-white dark:bg-nature-900 border border-emerald-500/15 dark:border-white/10 text-emerald-950 dark:text-white/90 rounded-tl-none font-medium shadow-sm"
                }`}>
                <div className="flex justify-between items-start gap-3">
                  <span>{msg.text}</span>
                  {msg.sender === "bot" && !msg.isError && (
                    <button
                      onClick={() => speakResponse(msg.text)}
                      className="p-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 transition-colors shrink-0"
                      title="Read aloud"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {/* Suggestion Chips for First-Time Users */}
          {messages.length <= 2 && (
            <div className="pt-2 border-t border-emerald-500/10 dark:border-white/5 space-y-2">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 dark:text-emerald-400 block">
                🎤 Tap a suggested question to ask AI:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {suggestionChips.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => processTranscriptAndQuery(chip.text)}
                    className="bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-950 dark:text-white text-[11px] font-bold px-3 py-1.5 rounded-xl border border-emerald-500/15 dark:border-white/10 transition-all text-left"
                  >
                    {chip.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Live Audio Visualizer State Bar */}
        <div className="px-5 py-3 bg-emerald-500/5 dark:bg-white/5 border-t border-emerald-500/10 flex flex-wrap items-center justify-between gap-2">

          {/* Recognized Text Confirmation Display */}
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <Radio className={`w-4 h-4 shrink-0 ${voiceState === "listening" ? "text-red-500 animate-pulse" :
                voiceState === "speaking" ? "text-emerald-500 animate-bounce" : "text-emerald-800/40 dark:text-white/40"
              }`} />

            <p className="text-xs font-bold text-emerald-950 dark:text-white truncate">
              {voiceState === "listening" ? (
                recognizedText ? <span className="text-emerald-700 dark:text-emerald-300">"{recognizedText}"</span> : <span className="text-emerald-800/60 dark:text-white/50 animate-pulse">Listening... (Speak now)</span>
              ) : voiceState === "processing" ? (
                <span className="text-amber-700 dark:text-amber-300">Confirmed: "{recognizedText}"</span>
              ) : voiceState === "speaking" ? (
                <span className="text-emerald-600 dark:text-emerald-400">AI Speaking response...</span>
              ) : errorMessage ? (
                <span className="text-red-600 dark:text-red-400 font-semibold">{errorMessage}</span>
              ) : (
                <span className="text-emerald-900/60 dark:text-white/50">Microphone idle. Press button to talk.</span>
              )}
            </p>
          </div>

          {/* Equalizer animation when listening or speaking */}
          {(voiceState === "listening" || voiceState === "speaking") && (
            <div className="flex items-center gap-1 h-5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
              {[1, 2, 3, 4, 5].map((bar) => (
                <span
                  key={bar}
                  className={`w-1 rounded-full ${voiceState === "listening" ? "bg-red-500 animate-pulse" : "bg-emerald-500 animate-bounce"}`}
                  style={{
                    height: `${40 + (bar % 3) * 30}%`,
                    animationDuration: `${300 + bar * 120}ms`
                  }}
                />
              ))}
            </div>
          )}

          {voiceState === "speaking" && (
            <button
              onClick={handleStopSpeaking}
              className="text-[10px] font-bold text-red-600 dark:text-red-400 border border-red-500/30 bg-red-500/10 px-2.5 py-1 rounded-xl hover:bg-red-500/20 flex items-center gap-1"
            >
              <VolumeX className="w-3 h-3" /> Stop Voice
            </button>
          )}
        </div>

        {/* State Animated Microphone Button Control Bar */}
        <div className="p-4 border-t border-emerald-900/10 dark:border-white/10 flex items-center gap-3 bg-white/60 dark:bg-white/5">

          {/* Animated Big State Microphone Button */}
          <button
            onClick={handleMicClick}
            disabled={voiceState === "processing"}
            className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-300 border shadow-lg shrink-0 relative group ${voiceState === "listening"
                ? "bg-red-500 border-red-400 text-white animate-pulse scale-105 shadow-red-500/30"
                : voiceState === "processing"
                  ? "bg-amber-500 border-amber-400 text-white opacity-80 cursor-not-allowed"
                  : voiceState === "speaking"
                    ? "bg-emerald-500 border-emerald-400 text-white animate-bounce"
                    : "bg-emerald-600 border-emerald-500 text-white hover:bg-emerald-700 hover:scale-105"
              }`}
            title={`Current State: ${voiceState}. Click to toggle mic.`}
          >
            {voiceState === "listening" ? (
              <MicOff className="w-6 h-6 animate-bounce" />
            ) : voiceState === "processing" ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : voiceState === "speaking" ? (
              <Volume2 className="w-6 h-6" />
            ) : (
              <Mic className="w-6 h-6" />
            )}

            {/* Ripple ring animation during active listening */}
            {voiceState === "listening" && (
              <span className="absolute inset-0 rounded-2xl border-2 border-red-500 animate-ping opacity-75" />
            )}
          </button>

          {/* Text Input Fallback Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (input.trim()) {
                processTranscriptAndQuery(input);
              }
            }}
            className="flex-1 flex gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                lang === "mr"
                  ? "येथे प्रश्न लिहा किंवा वरील माइक बटणावर टॅप करा..."
                  : lang === "hi"
                    ? "यहां प्रश्न लिखें या ऊपर माइक बटन दबाएं..."
                    : "Type query or press the microphone button to talk..."
              }
              className="flex-1 bg-white dark:bg-nature-900 border border-emerald-500/20 dark:border-white/10 rounded-2xl px-4 py-3 text-xs text-emerald-950 dark:text-white focus:outline-none focus:border-emerald-600 font-bold shadow-sm"
            />
            <button
              type="submit"
              disabled={voiceState === "processing" || !input.trim()}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-3 rounded-2xl border border-emerald-500/20 transition-all flex items-center justify-center shadow-sm disabled:opacity-40"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Right Context & Settings Panel */}
      <div className="glass-panel p-6 rounded-3xl border border-emerald-900/10 dark:border-white/10 flex flex-col justify-between bg-white/70 dark:bg-white/5 shadow-sm space-y-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2.5 border-b border-emerald-900/10 dark:border-white/10 pb-3">
            <Settings className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <div>
              <h3 className="font-extrabold text-sm text-emerald-950 dark:text-white font-outfit">{t.voiceContextTitle}</h3>
              <p className="text-[10px] text-emerald-900/60 dark:text-white/50">{t.voiceContextDesc}</p>
            </div>
          </div>

          <div className="space-y-3">
            {/* Soil Type Select */}
            <div>
              <label className="block text-[9px] text-emerald-800/70 dark:text-white/60 uppercase font-black mb-1">
                {t.soilTypeLabel}
              </label>
              <select
                value={profile.soil}
                onChange={(e) => setProfile({ ...profile, soil: e.target.value })}
                className="w-full bg-white dark:bg-nature-900 border border-emerald-500/20 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-emerald-950 dark:text-white font-bold"
              >
                <option value="Black Clay">{lang === "mr" ? "काळी कसदार माती" : lang === "hi" ? "काली मिट्टी" : "Black Clay Soil"}</option>
                <option value="Alluvial Loam">{lang === "mr" ? "गाळाची माती" : lang === "hi" ? "दोमट मिट्टी" : "Alluvial Loam"}</option>
                <option value="Red Sandy">{lang === "mr" ? "तांबडी रेताड माती" : lang === "hi" ? "लाल बलुई मिट्टी" : "Red Sandy Soil"}</option>
              </select>
            </div>

            {/* Active Crop Select */}
            <div>
              <label className="block text-[9px] text-emerald-800/70 dark:text-white/60 uppercase font-black mb-1">
                {lang === "mr" ? "सक्रिय पीक" : lang === "hi" ? "सक्रिय फसल" : "Active Crop"}
              </label>
              <select
                value={profile.crop}
                onChange={(e) => setProfile({ ...profile, crop: e.target.value })}
                className="w-full bg-white dark:bg-nature-900 border border-emerald-500/20 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-emerald-950 dark:text-white font-bold"
              >
                <option value="Bt Cotton">{lang === "mr" ? "कापूस" : lang === "hi" ? "कपास" : "Bt Cotton"}</option>
                <option value="Sugarcane">{lang === "mr" ? "ऊस" : lang === "hi" ? "गन्ना" : "Sugarcane"}</option>
                <option value="Basmati Rice">{lang === "mr" ? "तांदूळ" : lang === "hi" ? "धान" : "Basmati Rice"}</option>
                <option value="Mustard">{lang === "mr" ? "मोहरी" : lang === "hi" ? "सरसों" : "Mustard Seeds"}</option>
              </select>
            </div>

            {/* Water Source Select */}
            <div>
              <label className="block text-[9px] text-emerald-800/70 dark:text-white/60 uppercase font-black mb-1">
                {t.waterSourceLabel}
              </label>
              <select
                value={profile.water}
                onChange={(e) => setProfile({ ...profile, water: e.target.value })}
                className="w-full bg-white dark:bg-nature-900 border border-emerald-500/20 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-emerald-950 dark:text-white font-bold"
              >
                <option value="Borewell">{lang === "mr" ? "कूपनलिका / विहीर" : lang === "hi" ? "नलकूप / कुआं" : "Borewell / Well"}</option>
                <option value="River Canal">{lang === "mr" ? "नदी कालवा" : lang === "hi" ? "नहर / सिंचाई नाली" : "River Canal"}</option>
                <option value="Rainfed">{lang === "mr" ? "पावसाचे पाणी" : lang === "hi" ? "वर्षा आधारित" : "Rainfed Only"}</option>
              </select>
            </div>

            {/* Farm Size & Budget */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[9px] text-emerald-800/70 dark:text-white/60 uppercase font-black mb-1">{t.farmSizeLabel}</label>
                <input
                  type="text"
                  value={profile.size}
                  onChange={(e) => setProfile({ ...profile, size: e.target.value })}
                  className="w-full bg-white dark:bg-nature-900 border border-emerald-500/20 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-emerald-950 dark:text-white font-bold"
                />
              </div>
              <div>
                <label className="block text-[9px] text-emerald-800/70 dark:text-white/60 uppercase font-black mb-1">{t.budgetLabel}</label>
                <select
                  value={profile.budget}
                  onChange={(e) => setProfile({ ...profile, budget: e.target.value })}
                  className="w-full bg-white dark:bg-nature-900 border border-emerald-500/20 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-emerald-950 dark:text-white font-bold"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="bg-emerald-500/5 dark:bg-white/5 p-3.5 rounded-2xl border border-emerald-500/10 dark:border-white/5 flex gap-2.5 items-start">
          <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
          <p className="text-[10px] text-emerald-900/80 dark:text-white/70 leading-relaxed font-semibold">
            {lang === "mr"
              ? "सर्व संभाषण खाजगी ठेवले जाते. मायक्रोफोन स्वायत्तपणे कधीही सुरू होत नाही."
              : lang === "hi"
                ? "आपकी बातचीत पूरी तरह गोपनीय रखी जाती है। माइक कभी भी अपने आप चालू नहीं होता।"
                : "Voice data is processed locally. Microphone never activates autonomously."}
          </p>
        </div>
      </div>
    </div>
  );
}
