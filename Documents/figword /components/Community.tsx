import React, { useState } from "react";
import { MessageSquare, Users, Award, ShieldCheck, Heart, ThumbsUp, Send } from "lucide-react";
import { translations, Language } from "../utils/translations";

interface CommunityProps {
  lang: Language;
}

interface Post {
  author: string;
  role: string;
  time: string;
  title: string;
  content: string;
  likes: number;
  comments: number;
}

const mockPostsEn: Post[] = [
  {
    author: "Robert Vance",
    role: "Hydroponics Farm Director",
    time: "2 hours ago",
    title: "Increasing nutrient uptake efficiency in closed-loop systems",
    content: "We've been experimenting with nano-bubblers to increase dissolved oxygen levels in our strawberry channels. Seeing a 14% yield increase over the last harvest run. Make sure your EC is around 1.8 for best absorption.",
    likes: 24,
    comments: 6
  },
  {
    author: "Aditi Sharma",
    role: "Soil Microbiologist",
    time: "5 hours ago",
    title: "Rebuilding organic carbon levels in dryland soils",
    content: "If you are suffering from compacted clay soils, avoid heavy tilling this season. Try sowing cowpea cover crops and applying mycorrhizal fungi blends. It builds soil aggregate structure and traps soil water much better.",
    likes: 38,
    comments: 11
  }
];

const mockPostsMr: Post[] = [
  {
    author: "रॉबर्ट व्हॅन्स",
    role: "हायड्रोपोनिक्स फार्म संचालक",
    time: "२ तासांपूर्वी",
    title: "बंद-लूप प्रणालींमध्ये पोषक तत्वांची कार्यक्षमता वाढवणे",
    content: "आम्ही आमच्या स्ट्रॉबेरी हायड्रोपोनिक्स वाहिन्यांमध्ये विरघळलेला ऑक्सिजन वाढवण्यासाठी नॅनो-बबलरचा प्रयोग करत आहोत. गेल्या कापणीत १४% वाढ झाली आहे. चांगल्या शोषणासाठी ईसी (EC) १.८ ठेवावा.",
    likes: 24,
    comments: 6
  },
  {
    author: "अदिती शर्मा",
    role: "माती सूक्ष्मजीवशास्त्रज्ञ",
    time: "५ तासांपूर्वी",
    title: "कोरड्या शेतजमिनीत सेंद्रिय कर्बाचे प्रमाण वाढवणे",
    content: "तुमची जमीन कडक चिकणमातीची असेल, तर या हंगामात खोल नांगरणी टाळा. चवळीसारखी हिरवळीची पिके लावा आणि मायकोरायझल बुरशी खत वापरा. यामुळे मातीची रचना सुधारते आणि पाणी टिकून राहते.",
    likes: 38,
    comments: 11
  }
];

const mockPostsHi: Post[] = [
  {
    author: "रॉबर्ट वेंस",
    role: "हाइड्रोपोनिक्स फार्म निदेशक",
    time: "2 घंटे पहले",
    title: "हाइड्रोपोनिक्स प्रणाली में पोषक तत्वों के अवशोषण की दक्षता बढ़ाना",
    content: "हम स्ट्रॉबेरी चैनलों में घुली हुई ऑक्सीजन का स्तर बढ़ाने के लिए नैनो-बबलर्स का परीक्षण कर रहे हैं। इस बार उपज में 14% की वृद्धि दर्ज की गई है। सर्वोत्तम अवशोषण के लिए EC 1.8 के आसपास रखें।",
    likes: 24,
    comments: 6
  },
  {
    author: "अदिति शर्मा",
    role: "मृदा सूक्ष्मजीवविज्ञानी",
    time: "5 घंटे पहले",
    title: "शुष्क मिट्टी में जैविक कार्बन के स्तर को फिर से बनाना",
    content: "यदि आप कठोर मिट्टी से परेशान हैं, तो इस मौसम में गहरी जुताई से बचें। लोबिया की फसल लगाएं और माइकोराइजा कवक का छिड़काव करें। यह मिट्टी की जल धारण क्षमता को बहुत बढ़ाता है।",
    likes: 38,
    comments: 11
  }
];

export default function Community({ lang }: CommunityProps) {
  const postsData = lang === "mr" ? mockPostsMr : lang === "hi" ? mockPostsHi : mockPostsEn;
  const [posts, setPosts] = useState<Post[]>(postsData);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [showForm, setShowForm] = useState(false);

  const t = translations[lang] || translations.en;

  const handlePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    const newPost: Post = {
      author: lang === "mr" ? "जयेश पाटील (तुम्ही)" : lang === "hi" ? "जयेश पाटिल (आप)" : "Jayesh Patil (You)",
      role: lang === "mr" ? "सेंद्रिय शेतकरी" : lang === "hi" ? "जैविक किसान" : "Organic Farmer",
      time: lang === "mr" ? "आत्ताच" : lang === "hi" ? "अभी" : "Just now",
      title,
      content,
      likes: 0,
      comments: 0
    };

    setPosts([newPost, ...posts]);
    setTitle("");
    setContent("");
    setShowForm(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Forum Discussion */}
      <div className="lg:col-span-2 space-y-4">
        <div className="glass-panel p-6 rounded-3xl border border-emerald-900/10 dark:border-white/10 flex items-center justify-between bg-white/60 dark:bg-white/5">
          <div>
            <h3 className="font-bold text-lg text-emerald-700 dark:text-emerald-400">{t.forumHeader}</h3>
            <p className="text-xs text-emerald-900/60 dark:text-white/50">{t.forumDesc}</p>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-emerald-600 hover:bg-emerald-750 text-white text-xs font-bold px-4 py-2.5 rounded-xl border border-white/10 transition-all uppercase tracking-wider shadow-sm"
          >
            {showForm ? t.cancel : t.postQuestion}
          </button>
        </div>

        {showForm && (
          <form onSubmit={handlePost} className="glass-panel p-6 rounded-3xl border border-emerald-900/10 dark:border-white/10 space-y-4 bg-white/60 dark:bg-white/5">
            <h4 className="font-bold text-sm text-emerald-700 dark:text-emerald-300">{t.submitNewTitle}</h4>
            <div className="space-y-3">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder={t.titlePlaceholder}
                className="w-full bg-white dark:bg-nature-900 border border-emerald-500/15 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs text-emerald-950 dark:text-white focus:outline-none focus:border-emerald-600 font-bold"
                required
              />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={t.contentPlaceholder}
                className="w-full h-24 bg-white dark:bg-nature-900 border border-emerald-500/15 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs text-emerald-950 dark:text-white focus:outline-none focus:border-emerald-600 resize-none font-bold"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-750 text-white font-bold text-xs px-5 py-2.5 rounded-xl border border-white/10 transition-all flex items-center gap-1.5 shadow-sm"
            >
              <Send className="w-3.5 h-3.5" /> {t.publishBtn}
            </button>
          </form>
        )}

        <div className="space-y-4">
          {posts.map((post, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-3xl border border-emerald-900/10 dark:border-white/10 space-y-4 bg-white/60 dark:bg-white/5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-emerald-500/10 border border-emerald-500/25 flex items-center justify-center font-black text-xs text-emerald-700 dark:text-emerald-400">
                    {post.author[0]}
                  </div>
                  <div>
                    <h5 className="font-bold text-xs text-emerald-950 dark:text-white">{post.author}</h5>
                    <p className="text-[10px] text-emerald-900/60 dark:text-white/50">{post.role}</p>
                  </div>
                </div>
                <span className="text-[10px] text-emerald-900/40 dark:text-white/40 font-bold">{post.time}</span>
              </div>

              <div>
                <h4 className="font-extrabold text-sm text-emerald-950 dark:text-white hover:text-emerald-700 dark:hover:text-emerald-300 transition-colors cursor-pointer">{post.title}</h4>
                <p className="text-xs text-emerald-900/80 dark:text-white/80 mt-2 leading-relaxed font-medium">{post.content}</p>
              </div>

              <div className="flex items-center gap-4 pt-3 border-t border-emerald-500/10 dark:border-white/5 text-[10px] text-emerald-900/60 dark:text-white/60 font-bold">
                <button className="flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  <ThumbsUp className="w-3.5 h-3.5" /> {post.likes} {t.likes}
                </button>
                <button className="flex items-center gap-1 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
                  <MessageSquare className="w-3.5 h-3.5" /> {post.comments} {t.comments}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Expert Panel */}
      <div className="space-y-6">
        <div className="glass-panel p-6 rounded-3xl border border-emerald-900/10 dark:border-white/10 bg-white/60 dark:bg-white/5">
          <h3 className="font-bold text-base text-emerald-700 dark:text-emerald-400 flex items-center gap-2 mb-4">
            <ShieldCheck className="w-5 h-5" /> {t.verifiedAgronomists}
          </h3>

          <div className="space-y-4">
            {[
              { name: lang === "mr" ? "डॉ. विकास पाटील" : lang === "hi" ? "डॉ. विकास पाटिल" : "Dr. Vikas Patil", field: "Plant Pathology, WSU", status: "Online" },
              { name: lang === "mr" ? "सरिता भोसले" : lang === "hi" ? "सरिता भोसले" : "Sarita Bhosale", field: "Drip Irrigation Specialist", status: "Away" },
              { name: lang === "mr" ? "प्रा. के. सी. शर्मा" : lang === "hi" ? "प्रो. के. सी. शर्मा" : "Prof. K. C. Sharma", field: "Soil Chemistry, AgriLab", status: "Busy" }
            ].map((exp, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-white dark:bg-white/5 rounded-2xl border border-emerald-500/10 dark:border-white/5">
                <div>
                  <h5 className="font-bold text-xs text-emerald-950 dark:text-white">{exp.name}</h5>
                  <p className="text-[9px] text-emerald-900/60 dark:text-white/55 mt-0.5 font-bold">{exp.field}</p>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full ${exp.status === "Online" ? "bg-emerald-500" :
                    exp.status === "Away" ? "bg-amber-500" : "bg-red-505"
                    }`} />
                  <span className="text-[9px] text-emerald-900/60 dark:text-white/60 font-bold">
                    {exp.status === "Online" ? (lang === "mr" ? "ऑनलाईन" : lang === "hi" ? "ऑनलाइन" : "Online") :
                      exp.status === "Away" ? (lang === "mr" ? "दूर" : lang === "hi" ? "दूर" : "Away") : (lang === "mr" ? "व्यस्त" : lang === "hi" ? "व्यस्त" : "Busy")}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <button className="w-full bg-emerald-500/10 hover:bg-emerald-600 text-emerald-950 hover:text-white dark:text-white dark:hover:text-emerald-300 dark:bg-white/5 dark:hover:bg-emerald-500/20 font-bold py-2 rounded-xl border border-emerald-500/10 dark:border-white/10 transition-all text-xs tracking-wider uppercase mt-4">
            {t.consultExpert}
          </button>
        </div>

        {/* Success Stories */}
        <div className="glass-panel p-6 rounded-3xl border border-emerald-900/10 dark:border-white/10 bg-white/60 dark:bg-white/5">
          <h3 className="font-bold text-base text-emerald-700 dark:text-emerald-400 flex items-center gap-2 mb-4">
            <Award className="w-5 h-5 text-amber-500" /> {t.successStories}
          </h3>

          <div className="space-y-4">
            <div className="p-3 bg-white dark:bg-white/5 rounded-2xl border border-emerald-500/10 dark:border-white/5">
              <h5 className="font-extrabold text-xs text-emerald-950 dark:text-white">
                {lang === "mr" ? "कृषिमित्र एआयने माझ्या कापूस पिकाचे नुकसान टाळले" : lang === "hi" ? "कृषिमित्र एआई ने मेरी कपास की फसल बचाई" : "How Kechua AI saved my cotton crop"}
              </h5>
              <p className="text-[10px] text-emerald-900/80 dark:text-white/70 mt-1 leading-relaxed font-semibold">
                {lang === "mr" ? `"हवामानाच्या अंदाजाशी मातीचे तापमान जुळवून, एआयने आम्हाला उष्णतेच्या लाटेपूर्वी दुप्पट पाणी देण्यास सांगितले. सर्वोत्तम कापूस उत्पादन मिळाले!"` :
                  lang === "hi" ? `"मौसम के पूर्वानुमान से मिट्टी की नमी का तालमेल मिलाकर, एआई ने हमें लू चलने से पहले सिंचाई करने की चेतावनी दी। बेहतरीन उत्पादन मिला!"` :
                    `"By matching weather charts with soil thermal sensors, the AI engine alerted us to irrigate before the heat wave. Best harvest ever!"`}
              </p>
              <p className="text-[9px] text-emerald-600 dark:text-emerald-455 font-black mt-2">— {lang === "mr" ? "रामचंद्र बी., यवतमाळ" : lang === "hi" ? "रामचंद्र बी., यवतमाल" : "Ramchandra B., Cotton Farmer"}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
