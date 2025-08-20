import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

app.post("/generate-quiz", async (req, res) => {
  try {
    const { topic, difficulty } = req.body;

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
    Generate a quiz on the topic "${topic}" with difficulty "${difficulty}".
    Return exactly 5 multiple-choice questions in JSON format like this:
    {
      "topic": "${topic}",
      "difficulty": "${difficulty}",
      "questions": [
        {
          "question": "text",
          "options": ["A", "B", "C", "D"],
          "answerIndex": 0,
          "explanation": "short explanation"
        }
      ]
    }
    `;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    console.log("🔍 Raw Gemini response:", text);

    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return res.status(500).json({ error: "Failed to parse AI response" });
    }

    const quiz = JSON.parse(jsonMatch[0]);
    res.json(quiz);

  } catch (error) {
    console.error("❌ Gemini API Error:", error);
    res.status(500).json({ error: "Failed to generate quiz" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
