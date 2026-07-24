import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const farmerContext = await req.json();
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({
        recommendations: [],
        message: "We're finding the best farming tutorials for your crop."
      });
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const prompt = `
You are an AI Agricultural Video Curator for Indian farmers.
Given the farmer's profile:
- Crop: ${farmerContext.crop || "Sugarcane"}
- Soil: ${farmerContext.soilType || "Clay Loam"}
- State/District: ${farmerContext.state || "Maharashtra"}, ${farmerContext.district || "Ahmednagar"}
- Season: ${farmerContext.season || "Kharif"}
- Water Availability: ${farmerContext.water || "Borewell / Drip"}
- Language: ${farmerContext.lang || "en"}

Generate 4 highly relevant, 100% agricultural educational video tutorial recommendations.
CRITICAL CONSTRAINT: ONLY RECOMMEND AGRICULTURAL TUTORIALS from verified sources (ICAR, KVK, Ministry of Agriculture, State Agricultural Universities).
NEVER recommend any non-agricultural content, songs, entertainment, memes, or unrelated videos.

Format the output strictly as a JSON array of objects with keys:
[
  {
    "id": "ai-1",
    "title": "Clear concise agricultural title",
    "source": "ICAR or KVK or University name",
    "sourceType": "ICAR",
    "duration": "12:30",
    "level": "Intermediate",
    "language": "Hindi / English",
    "category": "drip-irrigation",
    "cropTags": ["${farmerContext.crop}"],
    "summary": "Detailed 2-sentence AI summary of agricultural technique.",
    "whyRecommended": "Specific rationale tailored to ${farmerContext.crop} grown in ${farmerContext.soilType} soil in ${farmerContext.state}.",
    "youtubeId": "Wc76vLpC8Yw",
    "link": "https://www.youtube.com/watch?v=Wc76vLpC8Yw",
    "thumbnailUrl": "https://images.unsplash.com/photo-1595113316349-9fa4eb24f884?auto=format&fit=crop&w=600&q=80"
  }
]
Respond ONLY with raw valid JSON without markdown code blocks.
`;

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    });

    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || "[]";
    const cleanedText = rawText.replace(/```json/g, "").replace(/```/g, "").trim();
    const recommendations = JSON.parse(cleanedText);

    return NextResponse.json({ recommendations });
  } catch (error) {
    console.error("Failed to fetch AI learning recommendations:", error);
    return NextResponse.json({
      recommendations: [],
      message: "We're finding the best farming tutorials for your crop."
    });
  }
}
