

require("dotenv").config();

const express = require("express");
const cors = require("cors");
const OpenAI = require("openai");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());


const client = new OpenAI({
  apiKey: process.env.OPENROUTER_KEY,
  baseURL: "https://openrouter.ai/api/v1",
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:5173",
    "X-Title": "reactform",
  },
});


const emojiMap = {
  positive: "😊",
  negative: "😞",
  neutral: "😐",
};


async function getSentiment(message) {
  try {
    return await client.chat.completions.create({
      model: "meta-llama/llama-3-8b-instruct", // ✅ primary working model
      messages: [
        {
          role: "system",
          content:
            "Reply ONLY one word from: positive, negative, neutral. No explanation.",
        },
        { role: "user", content: message },
      ],
    });
  } catch (err) {
    console.log("Primary model failed, trying fallback...");

    
    return await client.chat.completions.create({
      model: "openai/gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "Reply ONLY one word from: positive, negative, neutral. No explanation.",
        },
        { role: "user", content: message },
      ],
    });
  }
}

app.post("/analyze", async (req, res) => {
  const message = req.body.mesg;

  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }

  try {
    const response = await getSentiment(message);

    let emotion = response.choices[0].message.content
      .trim()
      .toLowerCase();

    if (!emojiMap[emotion]) {
      emotion = "neutral";
    }

    res.json({
      emotion,
      emoji: emojiMap[emotion],
    });

  } catch (err) {
    console.error("Final Error:", err.message);

    res.status(500).json({
      error: err.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});