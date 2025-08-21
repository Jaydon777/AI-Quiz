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
    const { topic, difficulty, numQuestions, secondsPerQuestion } = req.body;

    if (!topic || !numQuestions || !secondsPerQuestion) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `
      Generate a quiz in strict JSON format.
      Example output:
      {
        "topic": "${topic}",
        "difficulty": "${difficulty}",
        "questions": [
          {
            "question": "Sample question?",
            "options": ["A", "B", "C", "D"],
            "answerIndex": 1,
            "explanation": "Explanation here."
          }
        ]
      }
      Now generate ${numQuestions} questions.
      Topic: ${topic}
      Difficulty: ${difficulty}
      IMPORTANT: Do not add \`\`\`json fences or any text before/after JSON.
    `;

    const result = await model.generateContent(prompt);
    const rawText = result.response.text().trim();

    let quiz;
    try {
      quiz = JSON.parse(rawText);
      // Add secondsPerQuestion to each question
      quiz.questions = quiz.questions.map((q) => ({
        ...q,
        secondsPerQuestion,
      }));
    } catch (err) {
      console.error("❌ JSON Parse Error:", rawText);
      return res.status(500).json({ error: "Invalid JSON from AI" });
    }

    res.json(quiz);
  } catch (error) {
    console.error("❌ Error generating quiz:", error);
    res.status(500).json({ error: "Failed to generate quiz" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
