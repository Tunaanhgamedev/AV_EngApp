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
            // Build proper Gemini chat history from previous messages (excluding the latest user message)
            let chatHistory = messages.slice(0, -1).map(m => ({
                role: m.role === 'assistant' ? 'model' : 'user',
                parts: [{ text: m.content }]
            }));
            // Gemini's startChat requires the first message to be from the 'user'.
            // If history starts with 'model' (e.g. initial coach greeting), remove it.
            while (chatHistory.length > 0 && chatHistory[0].role === 'model') {
                chatHistory.shift();
            }
            const lastUserMessage = messages[messages.length - 1]?.content || "";
            const systemInstruction = `
Bạn là EngBot — Huấn luyện viên tiếng Anh AI cao cấp, hỗ trợ đắc lực cho người học từ giao tiếp cơ bản đến tiếng Anh chuyên ngành công nghệ (Kỹ thuật phần mềm, Trí tuệ nhân tạo, Thiết kế UI/UX, và Copywriting).

═══════════════════════════════════
🎭 VAI TRÒ & KỊCH BẢN HIỆN TẠI
═══════════════════════════════════
- Nhân vật (Persona): "\${persona}"
- Kịch bản (Scenario): "\${scenario}"
- Nếu scenario là "free_chat" hoặc "Trò chuyện tự do", bạn là EngBot Coach tổng quát.

═══════════════════════════════════
🛠️ KHI VÀO CÁC TÌNH HUỐNG CHUYÊN NGÀNH (Dựa trên dự án và Skillsets)
═══════════════════════════════════
Hãy lồng ghép linh hoạt và giảng dạy từ vựng, mẫu câu chuẩn quốc tế phù hợp với các lĩnh vực sau nếu người dùng thảo luận hoặc thực hành tình huống liên quan:

1. 💡 Brainstorming & Planning (Lên ý tưởng & Lập kế hoạch)
   - Cách đề xuất ý tưởng: "I propose...", "What if we...", "Let's explore..."
   - Cách thảo luận, phản biện lịch sự: "I see your point, but...", "That makes sense, however, we should consider..."
   - Cách xác định mục tiêu và phạm vi: "The primary objective is...", "This is out of scope because..."
   - Khảo cứu thông tin sâu (Deep Research): "literature review", "empirical evidence", "market feasibility analysis".

2. 💻 Clean Code, Dev & Debugging (Lập trình, Sửa lỗi & Clean Code)
   - Giải thích cấu trúc code/logic: "This function handles...", "The purpose of this module is to..."
   - Mô tả lỗi/bug và đề xuất sửa lỗi: "We encountered a bug where...", "To resolve this issue, we should..."
   - Chiến lược sửa lỗi (Debugging Strategies): "reproduce the issue", "stack trace", "isolate the root cause", "performance bottlenecks".
   - Clean Code & refactoring: "We need to refactor this to avoid duplicate logic.", "Let's simplify this method for better readability.", "technical debt", "separation of concerns".
   - Phát triển game (Game Development): "game mechanics", "sprite rendering", "collision detection", "state machine".

3. 🎨 UI/UX & Frontend Design (Thiết kế Giao diện & Trải nghiệm Người dùng)
   - Đóng góp ý kiến thiết kế: "To improve user engagement, we could...", "The visual hierarchy can be enhanced by..."
   - Thiết kế đáp ứng (Responsive Design) trên mọi thiết bị (Web, Mobile, Laptop, iPad): "responsiveness", "viewports", "touch-friendly", "media queries", "adaptive layout", "breakpoints".
   - Thuật ngữ chuyên môn: "usability", "consistency", "accessibility (A11y)", "user flow", "design system tokens", "micro-animations", "glassmorphism", "wireframes".

4. ✍️ Copywriting, Content & Marketing (Viết nội dung quảng cáo & Tiếp thị)
   - Thu hút độc giả (hooks): "a compelling hook", "eye-catching headline", "audience pain points".
   - Kêu gọi hành động (CTA): "Call-to-Action", "conversions", "sales funnel", "conversion rate optimization (CRO)".
   - Tối ưu hóa SEO: "keyword optimization", "meta descriptions", "search intent", "domain authority".

5. 🤖 AI Engineering & Agents (Kỹ sư AI & Phát triển Agent)
   - Phát triển Agent: "autonomous agent", "agentic workflow", "prompt engineering", "chain of thought", "few-shot prompting".
   - AI/ML & Mô hình lớn: "fine-tuning", "weights and biases", "inference latency", "hyperparameter tuning".
   - Kiến trúc RAG & Vector Database: "embedding strategies", "vector search", "retrieval-augmented generation", "semantic search".

═══════════════════════════════════
🧠 PHÂN LOẠI Ý ĐỊNH NGƯỜI DÙNG & PHƯƠNG PHÁP SƯ PHẠM (INTENT DETECTION - CẤM THIẾU TRƯỜNG HỢP)
═══════════════════════════════════
Trước khi trả lời, bạn PHẢI phân tích tin nhắn mới nhất của người dùng để xác định mục đích chính của họ và áp dụng đúng phương pháp sư phạm tương ứng:

1. ✍️ SỬA LỖI CÂU & PHÁT ÂM (Error Correction - ƯU TIÊN HÀNG ĐẦU nếu tin nhắn của user có bất kỳ lỗi sai nào)
   - Nếu phát hiện bất kỳ lỗi sai nào về ngữ pháp, chính tả, giới từ, chia thì, hoặc cách dùng từ chưa tự nhiên của người Việt:
   - Trong "tutorFeedback": Chỉ rõ lỗi sai bằng tiếng Việt dưới dạng bảng trực quan:
     | Lỗi của bạn | Bản sửa đúng | Giải thích ngắn gọn |
     |---|---|---|
     | (Ghi lỗi) | (Ghi câu đúng) | (Giải thích bằng tiếng Việt ngắn gọn) |
   - Cung cấp thêm 1 câu ví dụ tương tự để người dùng tập phản xạ.
   - Trong "aiMessage": Tiếp tục trò chuyện tự nhiên dưới vai trò persona (KHÔNG nhắc lại lỗi sai của người dùng trong phần thoại chính).

2. 📖 HỎI NGỮ PHÁP (Grammar Question)
   - Dấu hiệu: Hỏi về thì, cấu trúc câu, mệnh đề quan hệ, giới từ, danh động từ, phân biệt cấu trúc...
   - Trong "tutorFeedback": Giải thích cặn kẽ bằng tiếng Việt kèm theo công thức và ví dụ rõ ràng bằng gạch đầu dòng.

3. 🔄 YÊU CẦU DỊCH THUẬT (Translation Request)
   - Dấu hiệu: Nhờ dịch Việt-Anh hoặc Anh-Việt, hỏi "nói thế nào trong tiếng Anh", "how to say...", "translate...".
   - Trong "tutorFeedback": Cung cấp bản dịch chính xác nhất. Phân biệt sắc thái trang trọng (formal) và thân mật (informal) nếu cần. Cung cấp 1-2 cách biểu đạt tương đương của người bản xứ.

4. 📚 HỎI TỪ VỰNG / IDIOM / SLANG (Vocabulary Query)
   - Dấu hiệu: Hỏi nghĩa của từ, hỏi cụm động từ (phrasal verbs), collocations, idioms, slang.
   - Trong "tutorFeedback": Giải nghĩa chi tiết bằng tiếng Việt, cung cấp Collocations (từ hay đi kèm) và ví dụ thực tế. Gợi ý từ đồng nghĩa nâng cấp (synonyms) để tăng vốn từ.

5. 🗣️ LUYỆN GIAO TIẾP THEO KỊCH BẢN (Roleplay Scenarios)
   - Dấu hiệu: Người dùng bắt đầu hoặc đang trong kịch bản nhập vai (Barista, phỏng vấn xin việc, check-in sân bay, mua sắm, trả đồ, hỏi đường...).
   - Trong "tutorFeedback": Cung cấp 2-3 gợi ý giao tiếp bằng tiếng Việt (các mẫu câu thường dùng trong ngữ cảnh đó) để người dùng tự tin đối đáp.
   - Trong "aiMessage": Nói tiếng Anh tự nhiên đúng vai trò nhân vật (persona), đưa ra câu hỏi mở hoặc tình huống để người dùng phản xạ.

6. 📝 LUYỆN THI IELTS / TOEIC (Exam Prep & Writing)
   - Dấu hiệu: Hỏi mẹo thi IELTS/TOEIC, nhờ sửa bài viết luận (essay), luyện speaking cue cards.
   - Trong "tutorFeedback": Nhận xét chi tiết theo tiêu chí chấm thi (Vocabulary, Grammar, Coherence). Cung cấp dàn ý gợi ý bằng tiếng Việt và nâng cấp từ vựng band điểm cao (ví dụ band 7.0+).

7. 🛣️ LỘ TRÌNH & PHƯƠNG PHÁP HỌC (Learning Tips & Roadmaps)
   - Dấu hiệu: Hỏi cách học nghe/nói/đọc/viết, phương pháp shadow, ghi nhớ từ vựng hiệu quả, lộ trình tự học.
   - Trong "tutorFeedback": Gợi ý lộ trình từng bước rõ ràng, khoa học bằng tiếng Việt. Đề xuất phương pháp hành động ngay.

8. 💻 TRAO ĐỔI KỸ THUẬT & BRAINSTORMING (Tech & Idea Discussion)
   - Dấu hiệu: Thảo luận về code, lỗi bug, thiết kế UI/UX, AI/ML, hoặc copywriting sản phẩm.
   - Trong "tutorFeedback": Cung cấp thuật ngữ chuyên ngành tiếng Anh tương ứng và mẹo diễn đạt chuyên nghiệp khi trình bày với đồng nghiệp nước ngoài.

9. 🇻🇳 NGƯỜI DÙNG VIẾT TIẾNG VIỆT
   - Trong "tutorFeedback": Giải đáp câu hỏi của họ bằng tiếng Việt. Nếu họ nói tiếng Việt để trò chuyện, dịch câu đó sang tiếng Anh tự nhiên và dạy họ cách nói.
   - Trong "aiMessage": Nói tiếng Anh tương ứng với vai trò persona, khuyến khích họ thử viết tiếng Anh.

10. ⚠️ NỘI DUNG KHÔNG PHÙ HỢP / VÔ NGHĨA
    - Dấu hiệu: Chửi bậy, spam, vô nghĩa ("asdasd", "123123"), off-topic hoàn toàn.
    - → Giữ thái độ chuyên nghiệp, hướng dẫn người dùng quay lại học tập.

═══════════════════════════════════
📋 QUY TẮC TRẢ LỜI
═══════════════════════════════════
1. "aiMessage": Phản hồi bằng tiếng Anh dưới vai trò persona. Dùng tiếng Anh trình độ CEFR A2-B2, tự nhiên và dễ hiểu.
2. "tutorFeedback": Phản hồi sư phạm bằng tiếng Việt. ĐÂY LÀ PHẦN QUAN TRỌNG NHẤT — phải trả lời đúng ý định (intent) của người dùng, trình bày bằng markdown (bảng, danh sách) để hiển thị hoàn hảo và responsive trên mọi thiết bị (Mobile, Web, Tablet).
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
            const models = ["gemini-flash-latest", "gemini-2.0-flash", "gemini-1.5-flash", "gemini-pro"];
            let lastError = null;
            let text = "";
            for (const modelName of models) {
                try {
                    console.log(`[AI Chat] Attempting chat response generation with model: ${modelName}`);
                    const model = exports.genAI.getGenerativeModel({
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
                }
                catch (err) {
                    console.warn(`[AI Chat] Model ${modelName} failed or busy:`, err.message || err);
                    lastError = err;
                }
            }
            if (!text) {
                throw lastError || new Error("All chat generative models failed or are busy");
            }
            const jsonStr = text.replace(/```json|```/g, "").trim();
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
            const parsed = JSON.parse(jsonStr);
            // Validate: ensure enough words got a real meaningVi
            if (Array.isArray(parsed)) {
                const validCount = parsed.filter((r) => r?.word && r?.meaningVi && r.meaningVi.trim().toLowerCase() !== r.word.trim().toLowerCase()).length;
                if (validCount >= words.length * 0.5) {
                    return parsed;
                }
            }
            console.warn(`[Bulk Translate] Gemini returned incomplete data. Using free fallback.`);
            return await GeminiService.bulkTranslateFallback(words);
        }
        catch (error) {
            console.error(`EngBot Bulk Translate Error, switching to free Google Translate fallback:`, error.message || error);
            return await GeminiService.bulkTranslateFallback(words);
        }
    }
    /**
     * Free Google Translate fallback for bulk translation (no API key required)
     */
    static async bulkTranslateFallback(words) {
        const results = [];
        const translateText = async (text) => {
            try {
                const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(text)}`);
                if (res.ok) {
                    const data = await res.json();
                    return data[0]?.map((x) => x[0]).join('').trim() || '';
                }
            }
            catch (e) { }
            return '';
        };
        for (const word of words) {
            try {
                let phonetic = '', meaningEn = '', wordType = 'n', example = '';
                try {
                    const dictRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
                    if (dictRes.ok) {
                        const dictData = await dictRes.json();
                        if (dictData?.[0]) {
                            const entry = dictData[0];
                            phonetic = entry.phonetic || entry.phonetics?.find((p) => p.text)?.text || '';
                            if (entry.meanings?.[0]) {
                                wordType = entry.meanings[0].partOfSpeech || 'n';
                                meaningEn = entry.meanings[0].definitions?.[0]?.definition || '';
                                for (const m of entry.meanings) {
                                    for (const d of m.definitions) {
                                        if (d.example) {
                                            example = d.example;
                                            break;
                                        }
                                    }
                                    if (example)
                                        break;
                                }
                            }
                        }
                    }
                }
                catch (e) { }
                if (!meaningEn)
                    meaningEn = `The English word "${word}".`;
                if (!example)
                    example = `We should study the meaning of the word "${word}".`;
                const meaningVi = await translateText(word) || `từ "${word}"`;
                const exampleVi = await translateText(example) || '';
                results.push({ word, phonetic, meaningEn, meaningVi, wordType, cefrLevel: 'B1', usage: 'Sử dụng phổ biến trong giao tiếp hàng ngày.', example, exampleVi });
            }
            catch (err) {
                console.error(`[Bulk Translate Fallback] Failed for "${word}":`, err.message);
                results.push({ word, phonetic: '', meaningEn: '', meaningVi: await translateText(word) || word, wordType: 'n', cefrLevel: 'B1', usage: '', example: '', exampleVi: '' });
            }
        }
        console.log(`[Bulk Translate Fallback] Completed: ${results.length}/${words.length} words translated via free API.`);
        return results;
    }
    /**
     * Generate TOEIC Practice Questions using Gemini
     */
    static async generateToeicPractice(part) {
        try {
            const model = exports.genAI.getGenerativeModel({ model: "gemini-flash-latest" });
            const prompt = `
        Bạn là chuyên gia ra đề thi TOEIC. Hãy tạo một đề luyện tập TOEIC Part ${part} gồm 5 câu hỏi chất lượng cao, bám sát cấu trúc đề thi thật mới nhất.
        
        Yêu cầu chi tiết cho Part ${part}:
        ${part === 1 ? '- Part 1 (Photographs): Mô tả một bức ảnh sinh động bằng văn bản tiếng Anh trong trường "audioDescription" (Ví dụ: "A man is sitting at a desk, typing on a laptop..."). Tạo 4 đáp án A, B, C, D mô tả bức ảnh.' : ''}
        ${part === 2 ? '- Part 2 (Question-Response): Tạo một câu hỏi/phát biểu tiếng Anh trong trường "audioDescription". Tạo 3 đáp án A, B, C (đáp án D để trống hoặc không tạo).' : ''}
        ${part === 3 ? '- Part 3 (Conversations): Tạo một đoạn hội thoại tự nhiên từ 2-3 người bằng tiếng Anh trong trường "context". Tạo 3 câu hỏi liên quan, mỗi câu hỏi có 4 đáp án A, B, C, D.' : ''}
        ${part === 4 ? '- Part 4 (Short Talks): Tạo một bài nói ngắn (thông báo, quảng cáo, tin nhắn thoại) bằng tiếng Anh trong trường "context". Tạo 3 câu hỏi liên quan, mỗi câu hỏi có 4 đáp án A, B, C, D.' : ''}
        ${part === 5 ? '- Part 5 (Incomplete Sentences): Tạo một câu có chỗ trống (marked as "_______") bằng tiếng Anh trong trường "questionText". Tạo 4 lựa chọn A, B, C, D.' : ''}
        ${part === 6 ? '- Part 6 (Text Completion): Tạo một đoạn văn ngắn bằng tiếng Anh trong trường "context" có các chỗ trống đánh số (1), (2), (3). Tạo 3 câu hỏi tương ứng với 3 chỗ trống, mỗi câu hỏi có 4 đáp án A, B, C, D.' : ''}
        ${part === 7 ? '- Part 7 (Reading Comprehension): Tạo một hoặc hai văn bản (email, thư báo, quảng cáo) bằng tiếng Anh trong trường "context". Tạo 3 câu hỏi liên quan, mỗi câu có 4 đáp án A, B, C, D.' : ''}

        Trả về ĐÚNG định dạng JSON sau (không chứa bất kỳ giải thích nào khác ngoài JSON):
        {
          "part": ${part},
          "questions": [
            {
              "id": "q1",
              "audioDescription": "Nội dung nghe mô phỏng (dành cho Part 1, 2) hoặc trống",
              "context": "Đoạn hội thoại/bài nói/đoạn văn (dành cho Part 3, 4, 6, 7) hoặc trống",
              "questionText": "Câu hỏi cụ thể bằng tiếng Anh (ví dụ: 'What is the purpose of the email?') hoặc câu chứa chỗ trống cho Part 5",
              "choices": ["A. choice A", "B. choice B", "C. choice C", "D. choice D"],
              "correctAnswer": "A",
              "explanation": "Lời giải thích chi tiết, dịch nghĩa của câu hỏi và đáp án bằng tiếng Việt."
            }
          ]
        }
      `;
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            const jsonStr = text.replace(/```json|```/g, "").trim();
            return JSON.parse(jsonStr);
        }
        catch (error) {
            console.error(`Generate TOEIC Practice Part ${part} Error, using high-quality local fallback:`, error.message || error);
            // Local fallback in case Gemini fails
            const fallbackData = {
                part: part,
                questions: []
            };
            if (part === 1) {
                fallbackData.questions = [
                    {
                        id: "q1",
                        audioDescription: "A modern kitchen with clean countertops and stainless steel appliances.",
                        context: "",
                        questionText: "Which statement best describes the picture?",
                        choices: [
                            "A. The countertops are cluttered with dishes.",
                            "B. The kitchen appliances are made of stainless steel.",
                            "C. Someone is washing dishes in the sink.",
                            "D. The kitchen is being painted."
                        ],
                        correctAnswer: "B",
                        explanation: "Bức ảnh mô tả một căn bếp hiện đại với mặt bếp sạch sẽ và các thiết bị bằng thép không gỉ. Đáp án B đúng: 'Các thiết bị nhà bếp được làm bằng thép không gỉ.' Các đáp án khác không phù hợp với mô tả cảnh vật sạch sẽ và không có người."
                    }
                ];
            }
            else if (part === 5) {
                fallbackData.questions = [
                    {
                        id: "q1",
                        audioDescription: "",
                        context: "",
                        questionText: "The management team has decided to _______ the launch of the new product until next month.",
                        choices: [
                            "A. postpone",
                            "B. postpones",
                            "C. postponing",
                            "D. postponed"
                        ],
                        correctAnswer: "A",
                        explanation: "Sau cấu trúc 'decided to' cần một động từ nguyên mẫu (V-inf). Trong các đáp án, 'postpone' (trì hoãn) là động từ nguyên mẫu. Dịch: Ban quản lý đã quyết định trì hoãn việc ra mắt sản phẩm mới cho đến tháng sau."
                    }
                ];
            }
            else {
                fallbackData.questions = [
                    {
                        id: "q1",
                        audioDescription: "",
                        context: "Attention all passengers on flight VN123 to London. Due to adverse weather conditions at the destination airport, our departure has been delayed by approximately 45 minutes. Please remain near the boarding gate for further announcements. We apologize for any inconvenience caused.",
                        questionText: "What is the main cause of the delay?",
                        choices: [
                            "A. Technical issues with the aircraft.",
                            "B. Bad weather at the destination.",
                            "C. A strike by air traffic control.",
                            "D. A scheduling conflict."
                        ],
                        correctAnswer: "B",
                        explanation: "Trong bài nói có câu: 'Due to adverse weather conditions at the destination airport' (Do điều kiện thời tiết bất lợi tại sân bay đến), do đó nguyên nhân chính là thời tiết xấu tại điểm đến (Đáp án B)."
                    }
                ];
            }
            return fallbackData;
        }
    }
    /**
     * Generate IELTS Practice Questions using Gemini
     */
    static async generateIeltsPractice(skill) {
        try {
            const model = exports.genAI.getGenerativeModel({ model: "gemini-flash-latest" });
            const prompt = `
        Bạn là chuyên gia khảo thí IELTS quốc tế. Hãy tạo một bài luyện tập IELTS cho kĩ năng "${skill}" chất lượng cao, bám sát định dạng bài thi thật.
        
        Yêu cầu chi tiết cho kĩ năng "${skill}":
        - Nếu skill là "listening": Tạo một đoạn script nghe bằng tiếng Anh trong trường "context". Tạo 5 câu hỏi trắc nghiệm hoặc điền từ liên quan.
        - Nếu skill là "reading": Tạo một đoạn văn học thuật khoảng 300 từ bằng tiếng Anh trong trường "context". Tạo 5 câu hỏi True/False/Not Given hoặc trắc nghiệm liên quan.
        - Nếu skill là "writing": Tạo đề bài viết IELTS Task 1 hoặc Task 2 trong trường "questionText". Trong trường "context", cung cấp dàn ý gợi ý (outline) và từ vựng nên dùng.
        - Nếu skill là "speaking": Tạo đề bài nói IELTS Part 1, Part 2 (Cue card) hoặc Part 3 trong trường "questionText". Cung cấp các câu hỏi gợi ý và từ vựng hữu ích trong "context".

        Trả về ĐÚNG định dạng JSON sau (không chứa bất kỳ giải thích nào khác ngoài JSON):
        {
          "skill": "${skill}",
          "questions": [
            {
              "id": "q1",
              "context": "Đoạn văn đọc/Script nghe/Gợi ý viết hoặc nói bằng tiếng Anh",
              "questionText": "Câu hỏi cụ thể hoặc đề bài viết/nói bằng tiếng Anh",
              "choices": ["A. Choice A", "B. Choice B", "C. Choice C", "D. Choice D"] (chừa trống nếu là điền từ, viết hoặc nói),
              "correctAnswer": "Đáp án đúng (hoặc dàn ý mẫu, câu trả lời mẫu cho viết/nói)",
              "explanation": "Lời giải thích chi tiết, gợi ý từ vựng, cấu trúc câu nâng cao bằng tiếng Việt."
            }
          ]
        }
      `;
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            const jsonStr = text.replace(/```json|```/g, "").trim();
            return JSON.parse(jsonStr);
        }
        catch (error) {
            console.error(`Generate IELTS Practice ${skill} Error, using local fallback:`, error.message || error);
            const fallbackData = {
                skill: skill,
                questions: []
            };
            if (skill === 'writing') {
                fallbackData.questions = [
                    {
                        id: "q1",
                        context: "Outline Suggestion:\n1. Introduction: Paraphrase the prompt.\n2. Overview: Highlight the main trends.\n3. Body 1: Detail the first group of data.\n4. Body 2: Detail the remaining data.\n\nUseful Vocabulary: fluctuate, upward trend, plummet, peak at, steadily decrease.",
                        questionText: "The chart below shows the percentage of households with internet access in three different countries between 2015 and 2025. Summarize the information by selecting and reporting the main features, and make comparisons where relevant.",
                        choices: [],
                        correctAnswer: "Sample Answer: The line graph illustrates the proportion of families having internet connectivity in Country A, Country B, and Country C over a decade-long period starting from 2015...",
                        explanation: "Bài viết Task 1 cần nêu bật được Overview (xu hướng chung) và so sánh dữ liệu giữa các quốc gia. Sử dụng các trạng từ chỉ mức độ tăng giảm như 'steadily', 'dramatically'."
                    }
                ];
            }
            else if (skill === 'speaking') {
                fallbackData.questions = [
                    {
                        id: "q1",
                        context: "Part 2 Cue Card. Preparation: 1 minute. Speaking: 2 minutes.\n\nFollow-up questions:\n- Why do you think this person is successful?\n- What qualities are needed for success in business?",
                        questionText: "Describe a successful person you admire. You should say:\n- Who this person is\n- What they do\n- How you know about them\n- And explain why you admire them.",
                        choices: [],
                        correctAnswer: "Sample Points:\n- Talk about Elon Musk or a local entrepreneur.\n- Mention their resilience, vision, and hard work.\n- Highlight their contribution to technology or society.",
                        explanation: "Đối với Part 2, hãy tận dụng 1 phút chuẩn bị để viết từ khóa (keywords) theo sơ đồ tư duy. Chú ý chia đúng thì quá khứ đơn khi kể về quá trình lập nghiệp của họ."
                    }
                ];
            }
            else {
                fallbackData.questions = [
                    {
                        id: "q1",
                        context: "The industrial revolution, which began in the late 18th century, profoundly transformed agrarian societies into industrialized, urban ones. Technological innovations, most notably the steam engine developed by James Watt, played a key role in boosting manufacturing productivity. Consequently, populations migrated in massive numbers from rural villages to cities in search of factory employment.",
                        questionText: "According to the passage, what drove population migration to cities?",
                        choices: [
                            "A. A desire for better agricultural land.",
                            "B. The development of James Watt's steam engine.",
                            "C. The search for employment in factories.",
                            "D. The beauty of industrialized cities."
                        ],
                        correctAnswer: "C",
                        explanation: "Trong đoạn văn có câu: 'Consequently, populations migrated in massive numbers from rural villages to cities in search of factory employment.' (Hệ quả là, người dân di cư số lượng lớn từ các vùng nông thôn ra thành phố để tìm kiếm việc làm trong nhà máy). Đáp án đúng là C."
                    }
                ];
            }
            return fallbackData;
        }
    }
}
exports.GeminiService = GeminiService;
