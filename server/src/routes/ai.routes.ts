import { Router } from 'express';
import { GeminiService } from '../services/gemini.service';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// AI Translate
router.post('/translate', async (req, res) => {
  const { text, targetLang = 'Vietnamese' } = req.body;
  
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  try {
    const prompt = `Translate the following text to ${targetLang}. Provide ONLY the translation.\n\nText: "${text}"`;
    const model = (GeminiService as any).genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const translation = result.response.text().trim();
    
    res.json({ translation });
  } catch (error: any) {
    console.error('Translation Error:', error);
    res.status(500).json({ error: 'Failed to translate' });
  }
});

// AI Speaking Analysis
router.post('/analyze-speaking', async (req, res) => {
  const { transcript, targetText } = req.body;

  if (!transcript || !targetText) {
    return res.status(400).json({ error: 'Transcript and target text are required' });
  }

  try {
    const prompt = `
      As EngBot (AI English Coach), analyze the user's spoken transcript compared to the target phrase.
      Target Phrase: "${targetText}"
      User Transcript: "${transcript}"

      Provide analysis in JSON format:
      {
        "score": 0-100,
        "fluency": 0-100,
        "pronunciation": 0-100,
        "accuracy": 0-100,
        "feedback": "Concise feedback in Vietnamese",
        "mispronounced": ["list", "of", "words"]
      }
    `;

    const model = (GeminiService as any).genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const jsonStr = text.replace(/```json|```/g, "").trim();
    const analysis = JSON.parse(jsonStr);

    res.json(analysis);
  } catch (error: any) {
    console.error('Speaking Analysis Error:', error);
    res.status(500).json({ error: 'Failed to analyze speaking' });
  }
});

export default router;
