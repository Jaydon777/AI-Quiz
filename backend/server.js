import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config(); // ✅ load environment variables

const app = express();
app.use(cors());
app.use(bodyParser.json());


// ✅ Use Gemini API instead of OpenAI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

app.post("/api/generate-quiz", async (req, res) => {
  const { topic, difficulty } = req.body;

  try {
    const prompt = `
    Generate 5 multiple-choice quiz questions about "${topic}".
    Difficulty: ${difficulty}.
    Return the response strictly in JSON with this format:
    {
      "topic": "${topic}",
      "difficulty": "${difficulty}",
      "questions": [
        {
          "question": "string",
          "options": ["A", "B", "C", "D"],
          "answerIndex": number,
          "explanation": "string"
        }
      ]
    }`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();

    console.log("🔍 Raw Gemini response:", text);

    let quiz;
    try {
      quiz = JSON.parse(text);
    } catch {
      return res.status(500).json({
        error: "invalid_format",
        details: "Gemini did not return valid JSON",
        raw: text
      });
    }

    res.json(quiz);
  } catch (error) {
    console.error("❌ Gemini API Error:", error.message);
    res.status(500).json({ error: "generation_failed", details: error.message });
  }
});

const PORT = 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
