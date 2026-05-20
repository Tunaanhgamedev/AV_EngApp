"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const gemini_service_1 = require("../services/gemini.service");
const router = (0, express_1.Router)();
// Helper for retry logic (Debugging Strategy)
const generateWithRetry = async (model, prompt, retries = 1) => {
    try {
        const result = await model.generateContent(prompt);
        return await result.response;
    }
    catch (error) {
        if (retries > 0 && (error.status === 429 || error.message?.includes('429'))) {
            console.log('Rate limit hit, retrying in 2 seconds...');
            await new Promise(resolve => setTimeout(resolve, 2000));
            return generateWithRetry(model, prompt, retries - 1);
        }
        throw error;
    }
};
// AI Translate
router.post('/translate', async (req, res) => {
    const { text, targetLang = 'Vietnamese' } = req.body;
    if (!text)
        return res.status(400).json({ error: 'Text is required' });
    // Diagnostic: Check API Key
    if (!process.env.GEMINI_API_KEY) {
        console.error('[AI] CRITICAL: GEMINI_API_KEY is missing in .env');
        return res.status(500).json({ error: 'Server configuration error: Missing API Key' });
    }
    try {
        // 1. Primary: Gemini AI (Try 2.0 Flash)
        console.log(`[AI] Attempting Gemini 2.0: "${text}"`);
        const prompt = `Translate exactly to ${targetLang}: "${text}". Provide ONLY the translation.`;
        const model = gemini_service_1.genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const response = await generateWithRetry(model, prompt);
        const translation = response.text().trim();
        return res.json({ translation, provider: 'AI (Gemini)' });
    }
    catch (error) {
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
        }
        catch (gError) {
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
        }
        catch (mError) {
            console.error('[AI] MyMemory Failed:', mError);
        }
        res.status(500).json({ error: 'All translation services failed' });
    }
});
// AI Word Insight — for Notebook feature
router.post('/word-insight', async (req, res) => {
    const { word } = req.body;
    if (!word)
        return res.status(400).json({ error: 'Word is required' });
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
        const model = gemini_service_1.genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });
        const result = await generateWithRetry(model, prompt);
        const raw = result.text().replace(/```json|```/g, '').trim();
        const data = JSON.parse(raw);
        return res.json(data);
    }
    catch (err) {
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
        const model = gemini_service_1.genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const jsonStr = text.replace(/```json|```/g, "").trim();
        const analysis = JSON.parse(jsonStr);
        res.json(analysis);
    }
    catch (error) {
        console.error('Speaking Analysis Error:', error);
        res.status(500).json({ error: 'Failed to analyze speaking' });
    }
});
exports.default = router;
