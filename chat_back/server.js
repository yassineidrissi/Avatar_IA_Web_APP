import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

// Load environment variables from .env
dotenv.config();

// Initialize OpenAI client with API key
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const app = express();
app.use(cors());
app.use(express.json());

// Helper function to send a chat completion request to OpenAI
async function getChatCompletion(prompt) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [{ role: 'user', content: prompt }]
  });
  return completion.choices[0].message.content.trim();
}

// Simple scoring function based on vocabulary diversity
// score = (unique words / total words) * 100
function scoreResponse(text) {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length === 0) return 0;
  const unique = new Set(words.map(w => w.toLowerCase()));
  return Number(((unique.size / words.length) * 100).toFixed(2));
}

// Function to optimize a prompt using OpenAI
async function optimizePrompt(prompt) {
  const completion = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      { role: 'system', content: 'You are a prompt optimizer. Rewrite the user\'s prompt to be clearer and more specific.' },
      { role: 'user', content: prompt }
    ]
  });
  return completion.choices[0].message.content.trim();
}

// POST /api/chat - returns the assistant's reply to the prompt
app.post('/api/chat', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: 'Prompt is required.' });

    const reply = await getChatCompletion(prompt);
    const score = scoreResponse(reply);
    res.json({ prompt, reply, score });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to process chat request.' });
  }
});

// POST /api/best_prompt - returns optimized prompt and comparison of responses
app.post('/api/best_prompt', async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: 'Prompt is required.' });

    const optimizedPrompt = await optimizePrompt(prompt);
    const [originalResponse, optimizedResponse] = await Promise.all([
      getChatCompletion(prompt),
      getChatCompletion(optimizedPrompt)
    ]);

    const originalScore = scoreResponse(originalResponse);
    const optimizedScore = scoreResponse(optimizedResponse);

    res.json({
      originalPrompt: prompt,
      optimizedPrompt,
      originalResponse,
      optimizedResponse,
      originalScore,
      optimizedScore
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to process best_prompt request.' });
  }
});

// Start the Express server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
