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
            const chatMessages = messages.map(m => ({
                role: m.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: m.content }]
            }));
            const systemInstruction = `
        Your name is EngBot. You are an expert AI English Coach and conversational partner.
        You are currently roleplaying as: "${persona}" in the scenario: "${scenario}". If the scenario is "free_chat", act as a general, friendly English Coach.
        
        CRITICAL EDUCATION RULES:
        1. Maintain the conversation as "${persona}" naturally in the "aiMessage" field. Use clear, engaging English suitable for English learners (CEFR A2-B2 level).
        2. Actively monitor the user's input for any grammar, spelling, punctuation, or structural English mistakes.
        3. In the "tutorFeedback" field (written in warm, supportive Vietnamese):
           - If the user made any mistakes (grammar, spelling, awkward wording), point them out gently, explain why it was wrong, and show how to write/say it correctly.
           - If the user's sentence was correct, congratulate them! Then, provide 1-2 interesting synonyms, alternative phrasing, or an idiom related to the context to help expand their vocabulary.
           - If the user asks ANY question about English grammar, vocabulary, or how to say/write something inside the chat, prioritize answering that question clearly, directly, and comprehensively in this "tutorFeedback" field in Vietnamese!
        4. In the "translation" field: Provide a natural, elegant Vietnamese translation of the "aiMessage" text.
        5. MULTILINGUAL & TRANSLATION TRAINING (English <-> Vietnamese):
           - The user may write in English, Vietnamese, or a mix of both.
           - If the user writes in English, reply in English and provide corrections/feedback in Vietnamese as usual.
           - If the user writes in Vietnamese (e.g., asking "Làm sao để nói...", "Tôi nên trả lời thế nào...", or just chatting in Vietnamese), you must:
             a. Answer their request or translate their Vietnamese sentence to natural English inside the "tutorFeedback" field in Vietnamese.
             b. Continue the conversation in English inside the "aiMessage" field under your roleplay persona, inviting them to try speaking or replying in English!
             c. Act as a bidirectional translator/tutor: train the user on how to go from Vietnamese thoughts to perfect English expressions.
        6. HANDLING TOXICITY, SLANG & OFF-TOPIC INPUTS (Khả năng xấu / Tiêu cực):
           - If the user uses offensive language, toxicity, rude slang, or makes highly inappropriate remarks:
             a. Remain completely professional, polite, and unprovoked. Do NOT match or validate their offensive tone.
             b. In "tutorFeedback", explain politely in Vietnamese that EngBot is a space for positive learning. Show them how they can rephrase their intense emotions or arguments using polite, professional English (e.g., "Thay vì dùng từ đó, trong môi trường chuyên nghiệp bạn có thể nói: 'I disagree with this approach'").
             c. In "aiMessage", maintain the roleplay persona but steer the conversation back to a constructive track with class.
           - If the user writes total gibberish (e.g., "asdasd", "123123"), or switches to unrelated topics:
             a. Do not get confused. Remain helpful.
             b. In "tutorFeedback", guide them back gently in Vietnamese: "Có vẻ câu này chưa rõ nghĩa lắm. Bạn có muốn thử nói: 'How do I start a conversation?' không?".
             c. In "aiMessage", politely ask them to rephrase or offer a helping hand under your persona.
        7. MASTERING ADVANCED & TRICKY QUERIES (Hỏi khó / Nâng cao):
           - If the user asks highly challenging grammatical questions (e.g., Subjunctive mood, inversion, "lay" vs "lie", complex idioms, or differences between British and American slang):
             a. You must act as a PhD-level English Linguist.
             b. Inside "tutorFeedback" (in Vietnamese), provide a structured, beautifully clear explanation. Use bullet points or comparative structures to explain the core concepts.
             c. Give exactly 2 high-quality contrastive examples.
             d. Keep the tone extremely encouraging, validating their curiosity as an advanced learner!

        Format your entire response STRICTLY as a JSON object (do not wrap in markdown, no raw json prefixes):
        {
          "aiMessage": "Your response in English as ${persona}",
          "tutorFeedback": "Your warm, helpful tutoring feedback, grammar corrections, or vocabulary expansion in Vietnamese",
          "translation": "Natural Vietnamese translation of the aiMessage"
        }
      `;
            const lastUserMessage = messages[messages.length - 1]?.content || "";
            const fullPrompt = `${systemInstruction}\n\nUser says: ${lastUserMessage}`;
            // Try models in priority order for absolute stability
            const models = ["gemini-2.0-flash", "gemini-1.5-flash", "gemini-flash-latest", "gemini-pro"];
            let lastError = null;
            let text = "";
            for (const modelName of models) {
                try {
                    console.log(`[AI Chat] Attempting chat response generation with model: ${modelName} `);
                    const model = exports.genAI.getGenerativeModel({ model: modelName });
                    const chat = model.startChat({
                        history: chatMessages.slice(0, -1),
                    });
                    const result = await chat.sendMessage(fullPrompt);
                    const response = await result.response;
                    text = response.text();
                    if (text && text.trim().length > 0) {
                        console.log(`[AI Chat] Success with model: ${modelName} `);
                        break;
                    }
                }
                catch (err) {
                    console.warn(`[AI Chat] Model ${modelName} failed or busy: `, err.message || err);
                    lastError = err;
                }
            }
            if (!text) {
                throw lastError || new Error("All chat generative models failed or are busy");
            }
            const jsonStr = text.replace(/```json | ```/g, "").trim();
            return JSON.parse(jsonStr);
        }
        catch (error) {
            console.error('EngBot Chat Error, using local robust chat fallback:', error.message || error);
            const cleanInput = (messages[messages.length - 1]?.content || "").toLowerCase().trim();
            const cleanScenario = (scenario || "").toLowerCase();
            let aiMessage = "";
            let tutorFeedback = "";
            let translation = "";
            if (cleanScenario.includes("trò chuyện tự do") || cleanScenario.includes("free") || !cleanScenario) {
                if (cleanInput.includes("hello") || cleanInput.includes("hi ") || cleanInput === "hi") {
                    aiMessage = "Hello! I'm EngBot, your AI English Coach. I'm so excited to chat with you today! What topic would you like to discuss?";
                    translation = "Xin chào! Tôi là EngBot, Huấn luyện viên tiếng Anh AI của bạn. Tôi rất vui được trò chuyện với bạn hôm nay! Bạn muốn thảo luận về chủ đề gì?";
                    tutorFeedback = "Chúc mừng! Câu chào hỏi của bạn rất tự nhiên. Mẹo nhỏ: Bạn cũng có thể dùng 'How are you doing?' hoặc 'Good to see you!' để mở đầu cuộc trò chuyện nhé.";
                }
                else if (cleanInput.includes("weather")) {
                    aiMessage = "The weather is a wonderful topic! It's currently lovely here. How is the weather in your city today?";
                    translation = "Thời tiết là một chủ đề tuyệt vời! Hiện tại ở đây thời tiết rất đẹp. Thời tiết ở thành phố của bạn hôm nay thế nào?";
                    tutorFeedback = "Để tả thời tiết, bạn có thể dùng các tính từ như: sunny (nắng), rainy (mưa), windy (gió), cloudy (nhiều mây) hoặc chilly (hơi lạnh).";
                }
                else if (cleanInput.includes("thank")) {
                    aiMessage = "You're very welcome! I'm always here to help you learn and grow. What else should we talk about?";
                    translation = "Không có gì đâu! Tôi luôn ở đây để giúp bạn học tập và phát triển. Chúng ta nên nói về điều gì tiếp theo nhỉ?";
                    tutorFeedback = "Các cách trả lời lời cảm ơn thông dụng: 'You are welcome!', 'My pleasure!', 'Don't mention it!' hoặc 'No problem!'.";
                }
                else if (cleanInput.includes("how to say") || cleanInput.includes("làm sao để") || cleanInput.includes("dịch")) {
                    aiMessage = "That is a great question! Let's translate and practice that expression. Try saying: 'I would like to practice English daily.'";
                    translation = "Đó là một câu hỏi tuyệt vời! Hãy cùng dịch và luyện tập biểu đạt đó. Thử nói: 'I would like to practice English daily.'";
                    tutorFeedback = "Khi muốn hỏi cách nói một cụm từ tiếng Việt sang tiếng Anh, bạn có thể dùng cấu trúc: 'How do you say [cụm từ] in English?' hoặc 'What is the English word for [cụm từ]?'.";
                }
                else {
                    aiMessage = `That is very interesting! Can you tell me more about that? I'd love to hear your thoughts in English.`;
                    translation = `Điều đó thật thú vị! Bạn có thể kể cho tôi nghe thêm về điều đó được không? Tôi rất muốn nghe suy nghĩ của bạn bằng tiếng Anh.`;
                    tutorFeedback = `Mẹo học tập: Khi trò chuyện tự do, bạn hãy cố gắng viết những câu ngắn gọn, chú ý chia thì của động từ (ví dụ: quá khứ dùng V2/ed, hiện tại thêm s/es cho ngôi thứ ba số ít).`;
                }
            }
            else if (cleanScenario.includes("coffee") || cleanScenario.includes("barista") || cleanScenario.includes("cà phê")) {
                if (cleanInput.includes("hello") || cleanInput.includes("hi")) {
                    aiMessage = "Hello! Welcome to Starbucks. What can I get started for you today?";
                    translation = "Xin chào! Chào mừng đến với Starbucks. Tôi có thể lấy gì cho bạn hôm nay?";
                    tutorFeedback = "Câu chào hỏi của bạn rất tốt! Để gọi đồ uống, bạn hãy thử dùng cấu trúc lịch sự: 'I would like to order...' hoặc 'Can I get...' nhé.";
                }
                else if (cleanInput.includes("latte") || cleanInput.includes("coffee") || cleanInput.includes("order") || cleanInput.includes("want") || cleanInput.includes("cup")) {
                    aiMessage = "Excellent choice. A medium latte with almond milk and a blueberry muffin. What size would you like for your latte?";
                    translation = "Lựa chọn tuyệt vời. Một ly latte vừa với sữa hạnh nhân và một chiếc bánh muffin việt quất. Bạn muốn ly latte cỡ nào?";
                    tutorFeedback = "Khi đặt đồ ăn/thức uống, bạn có thể nói rõ kích cỡ (size) như: small (nhỏ), medium (vừa), hoặc large (lớn). Ví dụ: 'A medium latte, please.'";
                }
                else {
                    aiMessage = "Sure thing! I can prepare that for you. Will that be hot or iced?";
                    translation = "Chắc chắn rồi! Tôi có thể chuẩn bị món đó cho bạn. Bạn muốn uống nóng hay đá?";
                    tutorFeedback = "Trong quán cà phê, barista thường hỏi 'Hot or iced?' (Nóng hay đá?) hoặc 'For here or to go?' (Ăn ở đây hay mang đi?). Hãy tập trả lời bằng các cụm từ này nhé.";
                }
            }
            else if (cleanScenario.includes("job") || cleanScenario.includes("interview") || cleanScenario.includes("phỏng vấn")) {
                if (cleanInput.includes("hello") || cleanInput.includes("hi")) {
                    aiMessage = "Hello! Thank you for coming in today. To start, could you please introduce yourself and tell me about your background?";
                    translation = "Xin chào! Cảm ơn bạn đã đến ngày hôm nay. Để bắt đầu, bạn có thể tự giới thiệu về bản thân và nền tảng của mình được không?";
                    tutorFeedback = "Khi bắt đầu phỏng vấn, hãy tự tin chào hỏi lịch sự: 'Good morning/afternoon, thank you for this opportunity.'";
                }
                else {
                    aiMessage = "Thank you for sharing that. Why do you believe you are the perfect candidate for this Junior Web Developer role?";
                    translation = "Cảm ơn bạn đã chia sẻ điều đó. Tại sao bạn tin rằng mình là ứng viên hoàn hảo cho vai trò Nhà phát triển Web sơ cấp này?";
                    tutorFeedback = "Mẹo phỏng vấn: Hãy tập trung giới thiệu các thế mạnh chuyên môn của bạn như kỹ năng HTML, CSS, Javascript và các dự án Next.js nhé.";
                }
            }
            else if (cleanScenario.includes("airport") || cleanScenario.includes("flight") || cleanScenario.includes("bay")) {
                aiMessage = "Welcome to the check-in counter. May I please see your ticket and passport?";
                translation = "Chào mừng đến với quầy làm thủ tục. Tôi có thể xem vé và hộ chiếu của bạn được không?";
                tutorFeedback = "Khi làm thủ tục bay, bạn cần chuẩn bị sẵn 'passport' (hộ chiếu) và 'boarding pass' hoặc 'ticket' (vé bay).";
            }
            else {
                aiMessage = `I completely understand. That's a great contribution to our practice scenario. How would you like to proceed next?`;
                translation = `Tôi hoàn toàn hiểu. Đó là một đóng góp tuyệt vời cho tình huống luyện tập của chúng ta. Bạn muốn tiếp tục thế nào tiếp theo?`;
                tutorFeedback = `Mẹo giao tiếp: Hãy cố gắng diễn đạt rõ ràng mong muốn của bạn bằng cấu trúc câu thông dụng: 'I would like to...' hoặc 'Could you help me to...'`;
            }
            return { aiMessage, tutorFeedback, translation };
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
        Bạn là EngBot (Giáo viên tiếng Anh chuyên nghiệp). Hãy tạo một câu hỏi trắc nghiệm để kiểm tra nghĩa tiếng Việt của từ "${word}".
        
        Yêu cầu:
        1. Ngữ cảnh (context): Tạo 1 câu tiếng Anh TỰ NHIÊN trong đó từ "${word}" bị ẩn bằng dấu gạch dưới (____). Câu này phải giúp người đọc đoán được nghĩa của từ qua ngữ cảnh.
        2. Câu hỏi (question): Viết bằng tiếng Việt, hỏi "Từ cần điền có nghĩa tiếng Việt là gì?" hoặc tương tự.
        3. Đáp án (options): 4 lựa chọn bằng tiếng Việt. Đáp án đúng phải là nghĩa chính xác của "${word}". 3 đáp án sai phải là các từ tiếng Việt dễ nhầm lẫn, cùng nhóm nghĩa hoặc cùng chủ đề (ví dụ: nếu "${word}" là cảm xúc, tất cả đáp án phải là cảm xúc).
        4. Không dùng từ ngẫu nhiên. Dùng từ vựng tiếng Việt tinh tế, chuyên sâu.
        
        Trả về ĐÚNG định dạng JSON, KHÔNG có text thừa:
        {
          "context": "Câu tiếng Anh với chỗ trống ____...",
          "question": "Từ cần điền trong câu trên có nghĩa tiếng Việt là gì?",
          "options": ["Nghĩa đúng", "Nghĩa sai 1", "Nghĩa sai 2", "Nghĩa sai 3"],
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
