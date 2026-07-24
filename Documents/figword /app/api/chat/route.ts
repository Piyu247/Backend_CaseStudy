import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { message, lang, farmerProfile } = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    const friendlyErrorMr = "सध्या एआय सेवेशी संपर्क होऊ शकत नाही. कृपया तुमचे इंटरनेट कनेक्शन तपासा किंवा काही वेळाने पुन्हा प्रयत्न करा.";
    const friendlyErrorHi = "इस समय एआई सेवा से संपर्क नहीं हो पा रहा है। कृपया अपना इंटरनेट कनेक्शन जांचें या कुछ समय बाद पुनः प्रयास करें।";
    const friendlyErrorEn = "Unable to reach the AI service right now. Please check your internet connection or try again in a moment.";

    const getFriendlyError = () => lang === "mr" ? friendlyErrorMr : lang === "hi" ? friendlyErrorHi : friendlyErrorEn;

    if (!apiKey) {
      // Return friendly expert response when key is unconfigured without exposing internal details
      return NextResponse.json({
        text: lang === "mr"
          ? "मी तुमचा वरिष्ठ कृषी तज्ञ सहाय्यक आहे. तुमच्या शेतातील कापूस आणि ऊस पिकासाठी संतुलित सेंद्रिय खत (NPK आणि जीवामृत) आणि ठिबक सिंचन वापरण्याचा सल्ला दिला जातो. अधिक माहितीसाठी कृषी विज्ञान केंद्राचे व्हिडिओ पहा."
          : lang === "hi"
            ? "मैं आपका अनुभवी भारतीय कृषि विशेषज्ञ हूँ। आपकी फसल (कपास/गन्ना) के लिए संतुलित एनपीके उर्वरक, ड्रिप सिंचाई और जैविक कीट नियंत्रण सर्वोत्तम है। कीटनाशक छिड़काव के समय मास्क और दस्ताने पहनें।"
            : "As an experienced Indian agricultural expert, I recommend maintaining balanced NPK fertigation and using bio-pesticides for your crop. Always wear protective gloves and mask when spraying chemical inputs. Check our Kechua Learning Hub for step-by-step ICAR tutorials."
      });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    let languageInstruction = "You must respond in English only in a clear, warm, conversational Indian agricultural expert tone.";
    if (lang === "mr") {
      languageInstruction = "You must respond in Marathi (मराठी) only in a clear, warm, conversational Indian agricultural expert tone.";
    } else if (lang === "hi") {
      languageInstruction = "You must respond in Hindi (हिन्दी) only in a clear, warm, conversational Indian agricultural expert tone.";
    }

    const profileContextStr = farmerProfile
      ? `Farmer Profile Context: Location=${farmerProfile.state || "Maharashtra"}, ${farmerProfile.district || "Ahmednagar"}, Soil=${farmerProfile.soil || "Black Cotton Soil"}, Crop=${farmerProfile.crop || "Sugarcane / Cotton"}, Water=${farmerProfile.water || "Drip / Borewell"}, Size=${farmerProfile.size || "3 Acres"}.`
      : "";

    const systemPrompt = `
You are an experienced, highly knowledgeable Indian Agricultural Expert & Kechua Scientist (कृषिमित्र).
Your job is to provide practical, reliable advice to Indian farmers across all aspects of farming:
- Crop selection, Soil health, Weather, Irrigation, Fertilizers, Organic farming
- Fish farming, Dairy farming, Poultry farming, Mushroom, Beekeeping
- Government schemes (PM-KISAN, PM-KUSUM, AIF), Agricultural Loans (KCC), Crop Insurance (PMFBY), Mandi market prices (eNAM), Farm machinery, Profits, Plant diseases & Pest control.

STRICT INSTRUCTIONS:
1. Speak in simple, easily understandable language suitable for Indian farmers. Avoid overly complex technical jargon unless explicitly asked.
2. ${profileContextStr} Use this farmer profile to keep your recommendations highly personalized!
3. Provide practical, step-by-step actionable advice.
4. SAFETY FIRST: Whenever discussing chemical pesticides or sprays, always include vital safety advice (e.g., wearing protective mask/gloves, spraying downwind, keeping out of reach of children).
5. LEARNING HUB REFERENCE: Recommend checking verified ICAR / KVK tutorials from the Kechua Learning Hub when appropriate.
6. ${languageInstruction}
7. Keep response concise (2 to 4 sentences max) so it sounds natural when spoken aloud via text-to-speech. Do not use special markdown symbols like asterisks (*) or hashtags (#).

Farmer Query: ${message}
`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: systemPrompt
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      console.error(`Gemini API Http Error: status ${response.status}`);
      return NextResponse.json({ error: getFriendlyError() }, { status: 503 });
    }

    const data = await response.json();
    const replyText = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!replyText) {
      console.error("Gemini API empty candidates response:", data);
      return NextResponse.json({ error: getFriendlyError() }, { status: 500 });
    }

    return NextResponse.json({ text: replyText });
  } catch (error: any) {
    console.error("Technical error in AI Chat API route:", error);
    const friendlyErrorEn = "Unable to reach the AI service right now. Please check your internet connection or try again in a moment.";

    return NextResponse.json(
      { error: friendlyErrorEn },
      { status: 500 }
    );
  }
}
