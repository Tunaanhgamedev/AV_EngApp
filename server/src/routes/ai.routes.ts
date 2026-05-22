import { Router } from 'express';
import { GeminiService, genAI } from '../services/gemini.service';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Helper for retry logic (Debugging Strategy)
const generateWithRetry = async (model: any, prompt: string, retries = 1) => {
  try {
    const result = await model.generateContent(prompt);
    return await result.response;
  } catch (error: any) {
    if (retries > 0 && (error.status === 429 || error.message?.includes('429'))) {
      console.log('Rate limit hit, retrying in 2 seconds...');
      await new Promise(resolve => setTimeout(resolve, 2000));
      return generateWithRetry(model, prompt, retries - 1);
    }
    throw error;
  }
};

// Safe JSON parser to robustly extract objects/arrays from conversational LLM responses
const safeParseJSON = (text: string): any => {
  const firstBrace = text.indexOf('{');
  const lastBrace = text.lastIndexOf('}');
  if (firstBrace === -1 || lastBrace === -1 || lastBrace < firstBrace) {
    const firstBracket = text.indexOf('[');
    const lastBracket = text.lastIndexOf(']');
    if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
      const cleanJson = text.substring(firstBracket, lastBracket + 1);
      return JSON.parse(cleanJson);
    }
    const cleanStr = text.replace(/```json|```/g, "").trim();
    return JSON.parse(cleanStr);
  }
  const cleanJson = text.substring(firstBrace, lastBrace + 1);
  return JSON.parse(cleanJson);
};

// AI Translate
router.post('/translate', async (req, res) => {
  const { text, targetLang = 'Vietnamese' } = req.body;
  
  if (!text) return res.status(400).json({ error: 'Text is required' });

  // Diagnostic: Check API Key
  if (!process.env.GEMINI_API_KEY) {
    console.error('[AI] CRITICAL: GEMINI_API_KEY is missing in .env');
    return res.status(500).json({ error: 'Server configuration error: Missing API Key' });
  }

  try {
    // 1. Primary: Gemini AI (Try 2.0 Flash)
    console.log(`[AI] Attempting Gemini 2.0: "${text}"`);
    const prompt = `Translate exactly to ${targetLang}: "${text}". Provide ONLY the translation.`;
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const response = await generateWithRetry(model, prompt);
    const translation = response.text().trim();
    
    return res.json({ translation, provider: 'AI (Gemini)' });
  } catch (error: any) {
    console.error('[AI] Gemini Failed:', error.status || 'Error', error.message);
    
    // 2. Secondary: Google Translate (Unofficial Fallback - Accurate for short phrases)
    try {
      const tLang = targetLang === 'Vietnamese' ? 'vi' : 'en';
      const sLang = targetLang === 'Vietnamese' ? 'en' : 'vi';
      const googleUrl = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sLang}&tl=${tLang}&dt=t&q=${encodeURIComponent(text)}`;
      
      const gRes = await fetch(googleUrl);
      const gData = await gRes.json();
      if (gData && gData[0] && gData[0][0] && gData[0][0][0]) {
        console.log('[AI] Fallback Success: Google Translate');
        return res.json({ 
          translation: gData[0][0][0],
          provider: 'AI (Backup)' 
        });
      }
    } catch (gError) {
      console.error('[AI] Google Fallback Failed:', gError);
    }

    // 3. Final Resort: MyMemory
    try {
      const targetCode = targetLang === 'Vietnamese' ? 'vi' : 'en';
      const sourceCode = targetLang === 'Vietnamese' ? 'en' : 'vi';
      const fallbackUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceCode}|${targetCode}`;
      const fallbackRes = await fetch(fallbackUrl);
      const fallbackData = await fallbackRes.json();
      if (fallbackData.responseData?.translatedText) {
        return res.json({ 
          translation: fallbackData.responseData.translatedText,
          provider: 'Community (Fallback)'
        });
      }
    } catch (mError) {
      console.error('[AI] MyMemory Failed:', mError);
    }

    res.status(500).json({ error: 'All translation services failed' });
  }
});

// AI Word Insight — for Notebook feature
router.post('/word-insight', async (req, res) => {
  const { word } = req.body;
  if (!word) return res.status(400).json({ error: 'Word is required' });

  const prompt = `You are EngBot, an expert English teacher. Analyze the English word: "${word}"

Respond ONLY with this exact JSON (no markdown):
{
  "word": "${word}",
  "phonetic": "IPA pronunciation e.g. /həˈloʊ/",
  "wordTypes": [
    { "type": "verb/noun/adjective/adverb/etc", "meaningEn": "English definition", "meaningVi": "Vietnamese meaning" }
  ],
  "usageExamples": [
    { "context": "Daily Life", "sentence": "Natural English sentence", "sentenceVi": "Vietnamese translation" },
    { "context": "Work / Study", "sentence": "Natural English sentence", "sentenceVi": "Vietnamese translation" },
    { "context": "Social Media", "sentence": "Natural English sentence", "sentenceVi": "Vietnamese translation" }
  ],
  "tip": "One memorable tip in Vietnamese to remember this word",
  "cefrLevel": "A1/A2/B1/B2/C1/C2"
}`;

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
    const result = await generateWithRetry(model, prompt);
    const raw = result.text().replace(/```json|```/g, '').trim();
    const data = JSON.parse(raw);
    return res.json(data);
  } catch (err: any) {
    console.error('[AI] word-insight error:', err.message);
    // Fallback: basic structure so UI doesn't crash
    return res.json({
      word,
      phonetic: '',
      wordTypes: [{ type: 'unknown', meaningEn: 'Could not load definition', meaningVi: 'Không thể tải định nghĩa' }],
      usageExamples: [],
      tip: 'AI hiện đang bận, vui lòng thử lại sau.',
      cefrLevel: '—'
    });
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

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const analysis = safeParseJSON(text);

    res.json(analysis);
  } catch (error: any) {
    console.error('Speaking Analysis Error:', error);
    res.status(500).json({ error: 'Failed to analyze speaking' });
  }
});

// AI Mouth Shape & Pronunciation Articulation Analysis
router.post('/analyze-pronunciation', async (req, res) => {
  const { sound, word, transcript } = req.body;

  if (!sound || !word) {
    return res.status(400).json({ error: 'Sound and word are required' });
  }

  try {
    const prompt = `
      As EngBot (AI English Pronunciation Expert), analyze the articulation of the phonetic sound or word.
      Target Sound: "${sound}"
      Target Word: "${word}"
      User Attempted Transcript (if any): "${transcript || ''}"

      Analyze the mouth shape, tongue placement, lips, jaw, and airflow required for this sound.
      Provide highly detailed feedback on how a student can visual-align their mouth using a webcam/mirror.

      Provide analysis in JSON format (do not include markdown wrapper, return raw json):
      {
        "sound": "${sound}",
        "word": "${word}",
        "mouthShape": {
          "lips": "Miêu tả hình dáng môi bằng tiếng Việt (ví dụ: mở rộng sang hai bên, tròn môi và hướng ra trước,...)",
          "tongue": "Miêu tả vị trí lưỡi bằng tiếng Việt (ví dụ: cong lưỡi chạm chân răng trên, đầu lưỡi đặt nhẹ giữa hai hàm răng,...)",
          "airflow": "Miêu tả luồng hơi và dây thanh bằng tiếng Việt (ví dụ: hơi đẩy mạnh qua khe lưỡi, rung dây thanh quản,...)"
        },
        "vietnameseMistakes": "Các lỗi phát âm người Việt thường mắc phải với âm này (ví dụ: hay đọc nhầm thành âm /s/ hoặc /t/,...)",
        "correctionSteps": [
          "Bước 1 chi tiết...",
          "Bước 2 chi tiết...",
          "Bước 3 chi tiết..."
        ],
        "feedback": "Nhận xét tổng quát và động viên (bằng tiếng Việt) dựa trên transcript '${transcript || ''}'"
      }
    `;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    const analysis = safeParseJSON(text);

    res.json(analysis);
  } catch (error: any) {
    console.error('Pronunciation Lab Analysis Error:', error);
    res.status(500).json({ error: 'Failed to analyze pronunciation' });
  }
});

export default router;
