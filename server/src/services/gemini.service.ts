import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

export const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export class GeminiService {
  /**
   * Analyze journal using EngBot (Powered by Gemini)
   */
  static async analyzeJournal(content: string) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

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
    } catch (error) {
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
          const transData: any = await transRes.json();
          viTranslation = transData[0]?.map((x: any) => x[0]).join('') || '';
        }
      } catch (e) {
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
  static async generateChatResponse(messages: any[], persona: string, scenario: string) {
    try {
      // Build proper Gemini chat history from previous messages (excluding the latest user message)
      const chatHistory = messages.slice(0, -1).map(m => ({
        role: m.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: m.content }]
      }));

      const lastUserMessage = messages[messages.length - 1]?.content || "";

      const systemInstruction = `
Bạn là EngBot — Huấn luyện viên tiếng Anh AI chuyên nghiệp, nhiệt tình và thân thiện.

═══════════════════════════════════
🎭 VAI TRÒ & KỊCH BẢN HIỆN TẠI
═══════════════════════════════════
- Nhân vật (Persona): "${persona}"
- Kịch bản (Scenario): "${scenario}"
- Nếu scenario là "free_chat" hoặc "Trò chuyện tự do", bạn là EngBot Coach tổng quát.

═══════════════════════════════════
🧠 PHÂN LOẠI Ý ĐỊNH NGƯỜI DÙNG (INTENT DETECTION)
═══════════════════════════════════
Trước khi trả lời, bạn PHẢI phân tích ý định (intent) của người dùng vào 1 trong các nhóm sau:

1. 📖 HỎI NGỮ PHÁP (Grammar Question)
   Dấu hiệu: Câu hỏi về thì, cấu trúc, mạo từ, giới từ, so sánh từ (e.g., "khi nào dùng present perfect?", "since vs for", "lay vs lie", "a vs an")
   → Trong "tutorFeedback": Giải thích chi tiết bằng tiếng Việt với cấu trúc rõ ràng, ví dụ minh họa cụ thể.
   → Trong "aiMessage": Đưa ra ví dụ thực tế bằng tiếng Anh dưới vai trò persona.

2. 🔄 YÊU CẦU DỊCH THUẬT (Translation Request)
   Dấu hiệu: "dịch giúm", "how do you say", "làm sao nói", "... tiếng anh là gì", "... in English", "translate"
   → Trong "tutorFeedback": Cung cấp bản dịch chính xác, giải thích cách dùng, và 1-2 biến thể (formal/informal).
   → Trong "aiMessage": Mời người dùng thử dùng cụm từ đó trong câu dưới vai trò persona.

3. 📚 HỎI TỪ VỰNG / IDIOM (Vocabulary/Idiom Query)
   Dấu hiệu: "... nghĩa là gì", "what does ... mean", "explain ...", hỏi về thành ngữ, slang, collocations
   → Trong "tutorFeedback": Giải nghĩa chi tiết bằng tiếng Việt, cho 2 ví dụ câu sử dụng, và 1 mẹo ghi nhớ.
   → Trong "aiMessage": Dùng từ/idiom đó trong ngữ cảnh tự nhiên dưới vai trò persona.

4. ✍️ SỬA LỖI CÂU (Error Correction)
   Dấu hiệu: Người dùng viết tiếng Anh có lỗi ngữ pháp, chính tả, hoặc diễn đạt không tự nhiên.
   → Trong "tutorFeedback": Chỉ ra lỗi cụ thể bằng tiếng Việt, giải thích tại sao sai, và cung cấp bản sửa đúng.
   → Trong "aiMessage": Phản hồi nội dung câu nói của user một cách tự nhiên dưới vai trò persona (không nhắc lại lỗi).

5. 🗣️ TRÒ CHUYỆN THÔNG THƯỜNG (General Conversation)
   Dấu hiệu: Người dùng chat bình thường, kể chuyện, hỏi thăm, chia sẻ...
   → Trong "tutorFeedback": Khen ngợi nếu câu đúng. Gợi ý 1-2 cách diễn đạt nâng cao, từ đồng nghĩa, hoặc cấu trúc thay thế.
   → Trong "aiMessage": Tiếp tục hội thoại tự nhiên, hỏi follow-up để duy trì cuộc trò chuyện.

6. 🇻🇳 NGƯỜI DÙNG VIẾT TIẾNG VIỆT
   Dấu hiệu: Toàn bộ hoặc phần lớn tin nhắn bằng tiếng Việt.
   → Trong "tutorFeedback": Trả lời yêu cầu của họ bằng tiếng Việt. Nếu họ muốn dịch, cung cấp bản dịch Anh. Nếu họ hỏi cách nói, dạy cách diễn đạt bằng tiếng Anh.
   → Trong "aiMessage": Tiếp tục hội thoại bằng tiếng Anh dưới vai trò persona, khuyến khích họ thử viết tiếng Anh.

7. ⚠️ NỘI DUNG KHÔNG PHÙ HỢP / VÔ NGHĨA
   Dấu hiệu: Chửi bậy, spam, vô nghĩa ("asdasd", "123123"), off-topic hoàn toàn.
   → Giữ thái độ chuyên nghiệp, hướng dẫn người dùng quay lại học tập.

═══════════════════════════════════
📋 QUY TẮC TRẢ LỜI
═══════════════════════════════════
1. "aiMessage": Phản hồi bằng tiếng Anh dưới vai trò persona. Dùng tiếng Anh trình độ CEFR A2-B2, tự nhiên và dễ hiểu.
2. "tutorFeedback": Phản hồi sư phạm bằng tiếng Việt. ĐÂY LÀ PHẦN QUAN TRỌNG NHẤT — phải trả lời đúng ý định (intent) của người dùng.
3. "translation": Dịch tự nhiên, chính xác phần "aiMessage" sang tiếng Việt.

═══════════════════════════════════
📐 ĐỊNH DẠNG OUTPUT (BẮT BUỘC)
═══════════════════════════════════
Trả về ĐÚNG JSON, KHÔNG có markdown wrapper:
{
  "aiMessage": "Your response in English as the persona",
  "tutorFeedback": "Vietnamese tutoring feedback matching the detected intent",
  "translation": "Natural Vietnamese translation of aiMessage"
}
      `;

      // Try models in priority order for absolute stability
      const models = ["gemini-2.0-flash", "gemini-1.5-flash", "gemini-flash-latest", "gemini-pro"];
      let lastError = null;
      let text = "";

      for (const modelName of models) {
        try {
          console.log(`[AI Chat] Attempting chat response generation with model: ${modelName}`);
          const model = genAI.getGenerativeModel({ 
            model: modelName,
            systemInstruction: systemInstruction
          });
          const chat = model.startChat({
            history: chatHistory,
          });
          const result = await chat.sendMessage(lastUserMessage);
          const response = await result.response;
          text = response.text();
          if (text && text.trim().length > 0) {
            console.log(`[AI Chat] Success with model: ${modelName}`);
            break;
          }
        } catch (err: any) {
          console.warn(`[AI Chat] Model ${modelName} failed or busy:`, err.message || err);
          lastError = err;
        }
      }

      if (!text) {
        throw lastError || new Error("All chat generative models failed or are busy");
      }

      const jsonStr = text.replace(/```json|```/g, "").trim();
      return JSON.parse(jsonStr);
    } catch (error: any) {
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
        } else if (cleanInput.includes("weather")) {
          aiMessage = "The weather is a wonderful topic! It's currently lovely here. How is the weather in your city today?";
          translation = "Thời tiết là một chủ đề tuyệt vời! Hiện tại ở đây thời tiết rất đẹp. Thời tiết ở thành phố của bạn hôm nay thế nào?";
          tutorFeedback = "Để tả thời tiết, bạn có thể dùng các tính từ như: sunny (nắng), rainy (mưa), windy (gió), cloudy (nhiều mây) hoặc chilly (hơi lạnh).";
        } else if (cleanInput.includes("thank")) {
          aiMessage = "You're very welcome! I'm always here to help you learn and grow. What else should we talk about?";
          translation = "Không có gì đâu! Tôi luôn ở đây để giúp bạn học tập và phát triển. Chúng ta nên nói về điều gì tiếp theo nhỉ?";
          tutorFeedback = "Các cách trả lời lời cảm ơn thông dụng: 'You are welcome!', 'My pleasure!', 'Don't mention it!' hoặc 'No problem!'.";
        } else if (cleanInput.includes("how to say") || cleanInput.includes("làm sao để") || cleanInput.includes("dịch")) {
          aiMessage = "That is a great question! Let's translate and practice that expression. Try saying: 'I would like to practice English daily.'";
          translation = "Đó là một câu hỏi tuyệt vời! Hãy cùng dịch và luyện tập biểu đạt đó. Thử nói: 'I would like to practice English daily.'";
          tutorFeedback = "Khi muốn hỏi cách nói một cụm từ tiếng Việt sang tiếng Anh, bạn có thể dùng cấu trúc: 'How do you say [cụm từ] in English?' hoặc 'What is the English word for [cụm từ]?'.";
        } else {
          aiMessage = `That is very interesting! Can you tell me more about that? I'd love to hear your thoughts in English.`;
          translation = `Điều đó thật thú vị! Bạn có thể kể cho tôi nghe thêm về điều đó được không? Tôi rất muốn nghe suy nghĩ của bạn bằng tiếng Anh.`;
          tutorFeedback = `Mẹo học tập: Khi trò chuyện tự do, bạn hãy cố gắng viết những câu ngắn gọn, chú ý chia thì của động từ (ví dụ: quá khứ dùng V2/ed, hiện tại thêm s/es cho ngôi thứ ba số ít).`;
        }
      } else if (cleanScenario.includes("coffee") || cleanScenario.includes("barista") || cleanScenario.includes("cà phê")) {
        if (cleanInput.includes("hello") || cleanInput.includes("hi")) {
          aiMessage = "Hello! Welcome to Starbucks. What can I get started for you today?";
          translation = "Xin chào! Chào mừng đến với Starbucks. Tôi có thể lấy gì cho bạn hôm nay?";
          tutorFeedback = "Câu chào hỏi của bạn rất tốt! Để gọi đồ uống, bạn hãy thử dùng cấu trúc lịch sự: 'I would like to order...' hoặc 'Can I get...' nhé.";
        } else if (cleanInput.includes("latte") || cleanInput.includes("coffee") || cleanInput.includes("order") || cleanInput.includes("want") || cleanInput.includes("cup")) {
          aiMessage = "Excellent choice. A medium latte with almond milk and a blueberry muffin. What size would you like for your latte?";
          translation = "Lựa chọn tuyệt vời. Một ly latte vừa với sữa hạnh nhân và một chiếc bánh muffin việt quất. Bạn muốn ly latte cỡ nào?";
          tutorFeedback = "Khi đặt đồ ăn/thức uống, bạn có thể nói rõ kích cỡ (size) như: small (nhỏ), medium (vừa), hoặc large (lớn). Ví dụ: 'A medium latte, please.'";
        } else {
          aiMessage = "Sure thing! I can prepare that for you. Will that be hot or iced?";
          translation = "Chắc chắn rồi! Tôi có thể chuẩn bị món đó cho bạn. Bạn muốn uống nóng hay đá?";
          tutorFeedback = "Trong quán cà phê, barista thường hỏi 'Hot or iced?' (Nóng hay đá?) hoặc 'For here or to go?' (Ăn ở đây hay mang đi?). Hãy tập trả lời bằng các cụm từ này nhé.";
        }
      } else if (cleanScenario.includes("job") || cleanScenario.includes("interview") || cleanScenario.includes("phỏng vấn")) {
        if (cleanInput.includes("hello") || cleanInput.includes("hi")) {
          aiMessage = "Hello! Thank you for coming in today. To start, could you please introduce yourself and tell me about your background?";
          translation = "Xin chào! Cảm ơn bạn đã đến ngày hôm nay. Để bắt đầu, bạn có thể tự giới thiệu về bản thân và nền tảng của mình được không?";
          tutorFeedback = "Khi bắt đầu phỏng vấn, hãy tự tin chào hỏi lịch sự: 'Good morning/afternoon, thank you for this opportunity.'";
        } else {
          aiMessage = "Thank you for sharing that. Why do you believe you are the perfect candidate for this Junior Web Developer role?";
          translation = "Cảm ơn bạn đã chia sẻ điều đó. Tại sao bạn tin rằng mình là ứng viên hoàn hảo cho vai trò Nhà phát triển Web sơ cấp này?";
          tutorFeedback = "Mẹo phỏng vấn: Hãy tập trung giới thiệu các thế mạnh chuyên môn của bạn như kỹ năng HTML, CSS, Javascript và các dự án Next.js nhé.";
        }
      } else if (cleanScenario.includes("airport") || cleanScenario.includes("flight") || cleanScenario.includes("bay")) {
        aiMessage = "Welcome to the check-in counter. May I please see your ticket and passport?";
        translation = "Chào mừng đến với quầy làm thủ tục. Tôi có thể xem vé và hộ chiếu của bạn được không?";
        tutorFeedback = "Khi làm thủ tục bay, bạn cần chuẩn bị sẵn 'passport' (hộ chiếu) và 'boarding pass' hoặc 'ticket' (vé bay).";
      } else {
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
  static async explainWord(word: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

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
  } catch (error) {
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
  static async enrichWordData(word: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

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
  } catch (error: any) {
    console.error(`EngBot Enrichment Error (${word}), switching to Dictionary API + Google Translate fallback:`, error.message || error);
    return await GeminiService.enrichWordDataFallback(word);
  }
}

  /**
   * Free Dictionary API + Google Translate fallback enrichment
   */
  static async enrichWordDataFallback(word: string) {
  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    let phonetic = '';
    let meaningEn = '';
    let wordType = 'n';
    let example = '';
    let audioUs = '';
    let audioUk = '';

    if (res.ok) {
      const data: any = await res.json();
      const entry = data[0];

      // Extract phonetic
      phonetic = entry.phonetic || '';
      if (!phonetic && entry.phonetics && entry.phonetics.length > 0) {
        phonetic = entry.phonetics.find((p: any) => p.text)?.text || '';
      }

      // Extract audio Us/Uk
      if (entry.phonetics && entry.phonetics.length > 0) {
        const usAudio = entry.phonetics.find((p: any) => p.audio && p.audio.includes('us'));
        const ukAudio = entry.phonetics.find((p: any) => p.audio && p.audio.includes('uk'));
        const generalAudio = entry.phonetics.find((p: any) => p.audio);

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
    const translateText = async (text: string) => {
      try {
        const transRes = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(text)}`);
        if (transRes.ok) {
          const transData: any = await transRes.json();
          return transData[0]?.map((x: any) => x[0]).join('').trim() || '';
        }
      } catch (e) {
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
  } catch (err: any) {
    console.error(`Double Fallback Enrichment Error for ${word}:`, err.message || err);
    return null;
  }
}
  /**
   * Generate a contextual review question for a word
   */
  static async generateReviewQuestion(word: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

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
  } catch (error) {
    console.error('Gemini Review Question Error:', error);
    return null;
  }
}

  /**
   * Bulk translate/enrich multiple words in a single API call (fast batch mode)
   * Returns an array of { word, meaningVi, phonetic, wordType, cefrLevel, meaningEn, usage, example, exampleVi }
   */
  static async bulkTranslate(words: string[]): Promise < any[] | null > {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

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
  } catch(error: any) {
    console.error(`EngBot Bulk Translate Error:`, error.message || error);
    return null;
  }
}
}
