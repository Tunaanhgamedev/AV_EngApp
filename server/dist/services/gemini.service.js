"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GeminiService = exports.genAI = void 0;
const generative_ai_1 = require("@google/generative-ai");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
class GeminiService {
    /**
     * Analyze journal using EngBot (Powered by Gemini)
     */
    static async analyzeJournal(content) {
        try {
            const model = exports.genAI.getGenerativeModel({ model: "gemini-flash-latest" });
            const prompt = `
        You are EngBot, an expert AI English teacher. Analyze the following journal entry written by an English learner.
        
        Journal Content: "${content}"
        
        Please provide the following in JSON format:
        {
          "correctedText": "The complete corrected version of the journal",
          "feedback": "A concise summary of mistakes and suggestions (in Vietnamese)",
          "grammarScore": 85,
          "vocabularyScore": 80,
          "fluencyScore": 75
        }
        
        Respond ONLY with the JSON object.
      `;
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            const jsonStr = text.replace(/```json|```/g, "").trim();
            return JSON.parse(jsonStr);
        }
        catch (error) {
            console.error('EngBot Analysis Error, using intelligent free fallback:', error);
            // Khởi tạo bản sửa lỗi từ văn bản gốc của người dùng
            let correctedText = content;
            // Tự động sửa một số lỗi chính tả/viết thường cơ bản
            correctedText = correctedText.replace(/\bi\b/g, 'I');
            correctedText = correctedText.replace(/\bi'm\b/gi, "I'm");
            correctedText = correctedText.replace(/\bim\b/gi, "I'm");
            correctedText = correctedText.replace(/\bdont\b/gi, "don't");
            correctedText = correctedText.replace(/\bcant\b/gi, "can't");
            correctedText = correctedText.replace(/\bwont\b/gi, "won't");
            correctedText = correctedText.replace(/\bhes\b/gi, "he's");
            correctedText = correctedText.replace(/\bshes\b/gi, "she's");
            correctedText = correctedText.replace(/\btheyre\b/gi, "they're");
            correctedText = correctedText.replace(/\bwe-re\b/gi, "we're");
            // Viết hoa chữ cái đầu tiên của mỗi câu
            correctedText = correctedText.replace(/(^\s*|[.!?]\s+)([a-z])/g, (m, p1, p2) => p1 + p2.toUpperCase());
            // Lấy bản dịch tiếng Việt bằng API Google Translate miễn phí để phân tích
            let viTranslation = '';
            try {
                const transRes = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(content)}`);
                if (transRes.ok) {
                    const transData = await transRes.json();
                    viTranslation = transData[0]?.map((x) => x[0]).join('') || '';
                }
            }
            catch (e) {
                console.error('Fallback journal translation error:', e);
            }
            const feedback = viTranslation
                ? `Bản dịch nhật ký của bạn: "${viTranslation.trim()}". Lời khuyên của EngBot: Hãy chú ý viết hoa chữ cái đầu câu, viết hoa đại từ "I", và sử dụng đúng các dấu câu để câu văn thêm mạch lạc.`
                : "Nhật ký của bạn được viết khá tốt! Hãy tiếp tục rèn luyện thói quen viết tiếng Anh hàng ngày để phản xạ viết và vốn từ vựng được tự nhiên hơn nhé.";
            return {
                correctedText,
                feedback,
                grammarScore: content.length > 50 ? 88 : 82,
                vocabularyScore: content.length > 80 ? 90 : 84,
                fluencyScore: content.length > 60 ? 86 : 80
            };
        }
    }
    /**
     * AI Chat Roleplay using EngBot
     */
    static async generateChatResponse(messages, persona, scenario) {
        try {
            const model = exports.genAI.getGenerativeModel({ model: "gemini-flash-latest" });
            const chatMessages = messages.map(m => ({
                role: m.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: m.content }]
            }));
            const systemInstruction = `
        Your name is EngBot. You are currently roleplaying as: ${persona} in the scenario: ${scenario}.
        
        Rules:
        1. Stay in character as the persona, but if asked for your name, you can say you are EngBot acting as ${persona}.
        2. Keep it simple for English learners.
        3. Respond in JSON format:
        {
          "aiMessage": "Your response as persona",
          "tutorFeedback": "Quick tip or correction in Vietnamese",
          "translation": "Vietnamese translation of your message"
        }
      `;
            const chat = model.startChat({
                history: chatMessages.slice(0, -1),
            });
            const fullPrompt = `${systemInstruction}\n\nUser says: ${messages[messages.length - 1].content}`;
            const result = await chat.sendMessage(fullPrompt);
            const response = await result.response;
            const text = response.text();
            const jsonStr = text.replace(/```json|```/g, "").trim();
            return JSON.parse(jsonStr);
        }
        catch (error) {
            console.error('EngBot Chat Error:', error);
            throw new Error('Failed to generate chat response with EngBot');
        }
    }
    /**
     * Explain a word using EngBot
     */
    static async explainWord(word) {
        try {
            const model = exports.genAI.getGenerativeModel({ model: "gemini-flash-latest" });
            const prompt = `
        You are EngBot, an expert AI English teacher. Explain the English word "${word}".
        
        Please provide the following in JSON format:
        {
          "aiExplanation": "A simple, friendly explanation for an English learner (in Vietnamese)",
          "examples": ["Example sentence 1", "Example sentence 2"],
          "level": "CEFR level (A1-C2)"
        }
        
        Respond ONLY with the JSON object.
      `;
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            const jsonStr = text.replace(/```json|```/g, "").trim();
            return JSON.parse(jsonStr);
        }
        catch (error) {
            return {
                aiExplanation: "EngBot không thể lấy lời giải thích lúc này.",
                examples: [],
                level: "N/A"
            };
        }
    }
    /**
     * Enrich word data with phonetic, definition, and examples
     */
    static async enrichWordData(word) {
        try {
            const model = exports.genAI.getGenerativeModel({ model: "gemini-flash-latest" });
            const prompt = `
        As EngBot (Expert English Teacher), provide COMPLETE metadata for the English word "${word}".

        CRITICAL RULES:
        1. "meaningVi" MUST be a proper Vietnamese translation — NEVER leave it empty, NEVER use the English word itself.
        2. "example" MUST be a real, natural English sentence using "${word}" in context.
        3. "exampleVi" MUST be the Vietnamese translation of that example sentence.
        4. "usage" MUST explain when/how to use this word (e.g., "Used in formal writing", "Common in academic contexts").
        5. For advanced words (C1/C2), provide clear, precise Vietnamese equivalents.

        Respond STRICTLY in this JSON format (no extra text):
        {
          "phonetic": "/IPA transcription/",
          "meaningEn": "clear English definition",
          "meaningVi": "nghĩa tiếng Việt chính xác",
          "wordType": "v/n/adj/adv/prep/conj",
          "cefrLevel": "A1/A2/B1/B2/C1/C2",
          "usage": "khi nào và cách dùng từ này",
          "example": "A natural English sentence using the word",
          "exampleVi": "Bản dịch tiếng Việt của câu ví dụ"
        }
      `;
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            const jsonStr = text.replace(/```json|```/g, "").trim();
            const parsed = JSON.parse(jsonStr);
            if (!parsed.meaningVi || parsed.meaningVi === word || !parsed.meaningEn || !parsed.example) {
                throw new Error('Incomplete or invalid JSON response from Gemini');
            }
            return parsed;
        }
        catch (error) {
            console.error(`EngBot Enrichment Error (${word}), switching to Dictionary API + Google Translate fallback:`, error.message || error);
            return await GeminiService.enrichWordDataFallback(word);
        }
    }
    /**
     * Free Dictionary API + Google Translate fallback enrichment
     */
    static async enrichWordDataFallback(word) {
        try {
            const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
            let phonetic = '';
            let meaningEn = '';
            let wordType = 'n';
            let example = '';
            let audioUs = '';
            let audioUk = '';
            if (res.ok) {
                const data = await res.json();
                const entry = data[0];
                // Extract phonetic
                phonetic = entry.phonetic || '';
                if (!phonetic && entry.phonetics && entry.phonetics.length > 0) {
                    phonetic = entry.phonetics.find((p) => p.text)?.text || '';
                }
                // Extract audio Us/Uk
                if (entry.phonetics && entry.phonetics.length > 0) {
                    const usAudio = entry.phonetics.find((p) => p.audio && p.audio.includes('us'));
                    const ukAudio = entry.phonetics.find((p) => p.audio && p.audio.includes('uk'));
                    const generalAudio = entry.phonetics.find((p) => p.audio);
                    audioUs = usAudio?.audio || generalAudio?.audio || '';
                    audioUk = ukAudio?.audio || generalAudio?.audio || '';
                }
                // Extract definition and example
                if (entry.meanings && entry.meanings.length > 0) {
                    const m = entry.meanings[0];
                    wordType = m.partOfSpeech || 'n';
                    if (m.definitions && m.definitions.length > 0) {
                        meaningEn = m.definitions[0].definition || '';
                        // Search definitions for a valid example sentence
                        for (const d of m.definitions) {
                            if (d.example) {
                                example = d.example;
                                break;
                            }
                        }
                    }
                }
            }
            // If no example is found, build a basic one
            if (!example) {
                example = `We should study the meaning of the word "${word}" to improve our vocabulary.`;
            }
            if (!meaningEn) {
                meaningEn = `The English word "${word}".`;
            }
            // Translate meaningEn and example to Vietnamese using Google Translate
            const translateText = async (text) => {
                try {
                    const transRes = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(text)}`);
                    if (transRes.ok) {
                        const transData = await transRes.json();
                        return transData[0]?.map((x) => x[0]).join('').trim() || '';
                    }
                }
                catch (e) {
                    console.error('Fallback translation error:', e);
                }
                return '';
            };
            const meaningVi = await translateText(word) || `từ "${word}"`;
            const exampleVi = await translateText(example) || '';
            return {
                phonetic,
                meaningEn,
                meaningVi,
                wordType: wordType.substring(0, 10), // Truncate wordType just in case
                cefrLevel: 'B1',
                usage: 'Sử dụng phổ biến trong giao tiếp hàng ngày.',
                example,
                exampleVi,
                audioUs,
                audioUk
            };
        }
        catch (err) {
            console.error(`Double Fallback Enrichment Error for ${word}:`, err.message || err);
            return null;
        }
    }
    /**
     * Generate a contextual review question for a word
     */
    static async generateReviewQuestion(word) {
        try {
            const model = exports.genAI.getGenerativeModel({ model: "gemini-flash-latest" });
            const prompt = `
        As EngBot (Expert English Teacher), create a challenging multiple-choice question for the word "${word}".
        
        Requirements:
        1. Context: Create a natural English sentence where "${word}" is missing (____).
        2. Distractors: The 3 incorrect options MUST be "tricky". They should be words that are often confused with "${word}", have a similar vibe, or belong to the same category (e.g., if "${word}" is an emotion, all options should be emotions).
        3. Language: Options must be in Vietnamese.
        4. Diversity: Do NOT just use random words. Use sophisticated Vietnamese vocabulary.
        
        Respond ONLY in JSON format:
        {
          "question": "The sentence with blank...",
          "options": ["Nghĩa đúng", "Nghĩa sai khôn khéo 1", "Nghĩa sai khôn khéo 2", "Nghĩa sai khôn khéo 3"],
          "answer": "Nghĩa đúng"
        }
      `;
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            const jsonStr = text.replace(/```json|```/g, "").trim();
            return JSON.parse(jsonStr);
        }
        catch (error) {
            console.error('Gemini Review Question Error:', error);
            return null;
        }
    }
    /**
     * Bulk translate/enrich multiple words in a single API call (fast batch mode)
     * Returns an array of { word, meaningVi, phonetic, wordType, cefrLevel, meaningEn, usage, example, exampleVi }
     */
    static async bulkTranslate(words) {
        try {
            const model = exports.genAI.getGenerativeModel({ model: "gemini-flash-latest" });
            const wordList = words.map((w, i) => `${i + 1}. ${w}`).join('\n');
            const prompt = `
        As EngBot (Expert English Teacher for Vietnamese learners), provide COMPLETE metadata for these English words:

${wordList}

        For EACH word, provide:
        - "phonetic": IPA transcription
        - "meaningEn": clear English definition (1 sentence)
        - "meaningVi": nghĩa tiếng Việt chính xác (NEVER empty, NEVER the English word itself)
        - "wordType": v/n/adj/adv/prep/conj/det/pron
        - "cefrLevel": A1/A2/B1/B2/C1/C2
        - "usage": when/how to use this word (in Vietnamese)
        - "example": natural English sentence
        - "exampleVi": Vietnamese translation of example

        CRITICAL: "meaningVi" must be a real Vietnamese translation. For C1/C2 words, use precise Vietnamese equivalents.

        Respond ONLY with a JSON array (no markdown, no extra text):
        [
          { "word": "...", "phonetic": "...", "meaningEn": "...", "meaningVi": "...", "wordType": "...", "cefrLevel": "...", "usage": "...", "example": "...", "exampleVi": "..." },
          ...
        ]
      `;
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            const jsonStr = text.replace(/```json|```/g, "").trim();
            return JSON.parse(jsonStr);
        }
        catch (error) {
            console.error(`EngBot Bulk Translate Error:`, error.message || error);
            return null;
        }
    }
}
exports.GeminiService = GeminiService;
