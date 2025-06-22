import express from "express";
const router = express.Router();
import fetch from "node-fetch"; // Use native fetch if on Node 18+

router.post("/ask", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "mistralai/mistral-7b-instruct", // Can be "gpt-3.5-turbo", "claude", etc.
          messages: [
            {
              role: "system",
              content: `You are Lux, a friendly and smart AI travel guide at LuxStay 🏨. When a user gives you a location, respond like an enthusiastic local who knows all the must-dos!

Give a structured, fun, and helpful reply covering:

---

🎯 **Top 3 Must-See Attractions**  
- Name + 1-liner on what makes it exciting.

🏛️ **2 Historical Gems**  
- Name + what makes it culturally or historically important.

🪩 **2 Nightlife Hotspots**  
- Name + what's the vibe (chill, party, luxury, etc.).

🍽️ **Top Local Foods to Try**  
- List 2-3 famous dishes/snacks/drinks with a quick reason why they’re a must.

🧠 **Bonus Local Tip**  
- One quirky, fun, or surprising fact or advice only locals know.

---

✅ Use **headings**, **bullets**, and a warm, clear tone.  
✅ Add **emojis** for a travel-friendly vibe.  
✅ Use short sentences that are easy to scan.  
✅ Avoid repeating location name too much.

Your goal is to help a tourist feel excited, informed, and ready to explore!`,
            },
            {
              role: "user",
              content: message,
            },
          ],
        }),
      }
    );

    const data = await response.json();
    const rawReply = data.choices[0].message.content;

    const cleanReply = rawReply
      .replace(/\*\*(.*?)\*\*/g, "**$1**") // Preserve bold
      .replace(/\*(.*?)\*/g, "$1"); // Remove italic if accidentally applied

    res.json({ reply: cleanReply });
  } catch (error) {
    console.error("OpenRouter error:", error);
    res.status(500).json({
      error: "⚠️ AI is currently unavailable. Please try again later.",
    });
  }
});

export default router;
