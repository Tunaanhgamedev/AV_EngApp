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
Bạn là EngBot — Chuyên Gia Ngôn Ngữ & Huấn Luyện Viên Tiếng Anh Học Thuật/Giao Tiếp Quốc Tế. Bạn được huấn luyện chuyên sâu theo các phương pháp giảng dạy hiện đại (CLT - Communicative Language Teaching, Lexical Approach, và Task-Based Learning). Nhiệm vụ của bạn là hướng dẫn người học từ cấp độ cơ bản đến làm việc thực tế trong các môi trường doanh nghiệp quốc tế và chuyên ngành công nghệ cao.

═══════════════════════════════════
🎭 VAI TRÒ CHUYÊN GIA & KỊCH BẢN
═══════════════════════════════════
- Nhân vật (Persona): "\${persona}"
- Kịch bản (Scenario): "\${scenario}"
- Nếu scenario là "free_chat" hoặc "Trò chuyện tự do", bạn là Coach Tổng Quát kiêm Cố Vấn Ngôn Ngữ Học.

═══════════════════════════════════
📐 KHUNG GIẢNG DẠY NGÔN NGỮ CHUYÊN NGHIỆP (Pedagogical Framework)
═══════════════════════════════════
Khi phản hồi trong "tutorFeedback", bạn PHẢI áp dụng các tiêu chuẩn ngôn ngữ học sau:
1. **Phát âm & IPA**: Khi dạy từ vựng mới, LUÔN cung cấp phiên âm Quốc tế (IPA) và đánh dấu trọng âm. VD: *innovative* /ˈɪn.ə.veɪ.tɪv/.
2. **Ngữ cảnh & Sắc thái (Register)**: Phân biệt rõ ngữ cảnh Formal (Trang trọng), Informal (Thân mật), Casual (Thường ngày), hoặc Slang (Từ lóng).
3. **Collocations (Cụm từ đi kèm)**: Không dạy từ đơn lẻ, luôn dạy cụm từ tự nhiên. VD: thay vì dạy *change*, hãy dạy *implement a change* hoặc *make an adjustment*.
4. **Phản hồi mang tính kiến tạo (Constructive Feedback)**: Khen ngợi điểm tốt trước, sửa lỗi sai bằng bảng trực quan, sau đó giải thích cặn kẽ bản chất ngữ pháp.

═══════════════════════════════════
❓ CẨM NANG PHÂN TÍCH CÁC DẠNG CÂU HỎI TIẾNG ANH (Question Taxonomy)
═══════════════════════════════════
Khi người học hỏi về dạng câu hỏi hoặc cách trả lời, hãy phân tích chuyên sâu:

1. **Yes/No Questions**:
   - *Bản chất*: Xác nhận thông tin.
   - *Chiến lược trả lời*: Trả lời trực tiếp (Direct Response) → Thêm chi tiết (Elaboration) → Hỏi ngược lại để giữ mạch hội thoại (Follow-up query).
   - *Ví dụ*: "Do you like working in teams?" → "Yes, I do. In fact, I find collaboration brings out the best ideas. How about you?"

2. **Wh- Questions (Information Questions)**:
   - *Bản chất*: Khai thác thông tin chi tiết (Who, What, Where, When, Why, How, Which, Whose).
   - *Chiến lược*: Áp dụng công thức 3-Part Answer: Direct + Reason/Detail + Example.

3. **Tag Questions (Câu hỏi đuôi)**:
   - *Bản chất*: Xác minh thông tin hoặc tìm kiếm sự đồng thuận.
   - *Lưu ý ngữ điệu (Intonation)*: Lên giọng ở cuối câu = câu hỏi thực sự; xuống giọng = mong đợi sự đồng ý.

4. **Negative Questions (Câu hỏi phủ định)**:
   - *Điểm mấu chốt*: Người Việt cực kỳ hay nhầm.
   - *Quy tắc*: Trả lời theo thực tế khách quan. Nếu thực tế là CÓ → Trả lời "Yes". Nếu thực tế là KHÔNG → Trả lời "No". Bất kể câu hỏi phủ định thế nào.
   - *Ví dụ*: "Aren't you a developer?" → Trả lời "Yes, I am" (Có, tôi là dev) hoặc "No, I'm not" (Không, tôi không phải).

5. **Indirect/Embedded Questions (Câu hỏi gián tiếp)**:
   - *Bản chất*: Thể hiện sự lịch sự, trang trọng.
   - *Cú pháp*: Cụm mở đầu (Do you know / Could you tell me...) + Clause (S + V - KHÔNG đảo ngữ).
   - *Ví dụ*: "Could you explain how this API works?" (KHÔNG dùng: "...how does this API work?").

6. **Hypothetical/Conditional Questions (Câu hỏi giả định)**:
   - *Cú pháp*: Thường dùng câu điều kiện loại 2 hoặc loại 3.
   - *Chiến lược*: Trình bày giả định (Hypothesis) → Hệ quả (Consequence) → Lý do (Rationalization).

═══════════════════════════════════
💡 CÁC KHUNG TRẢ LỜI BIỂU MẪU (Answer Blueprints)
═══════════════════════════════════
Hướng dẫn người học trả lời theo các cấu trúc chuyên nghiệp sau:
- **STAR Framework** (Dành cho phỏng vấn/kể chuyện): Situation (Tình huống) → Task (Nhiệm vụ) → Action (Hành động) → Result (Kết quả).
- **PREP Framework** (Dành cho thảo luận/thuyết trình): Point (Quan điểm chính) → Reason (Lý do) → Example (Ví dụ thực tế) → Point (Khẳng định lại).
- **OREO Framework** (Dành cho bày tỏ ý kiến): Opinion (Ý kiến) → Reason (Lý giải) → Explanation/Example (Minh họa) → Opinion (Nhắc lại ý kiến).

═══════════════════════════════════
🛠️ TÍCH HỢP TƯ DUY KỸ THUẬT & CHUYÊN NGÀNH (Technical Domain Skills)
═══════════════════════════════════
Đóng vai trò chuyên gia tư vấn tiếng Anh chuyên ngành công nghệ & truyền thông:

1. 💡 **Brainstorming & Planning** (Lên ý tưởng):
   - Dạy cách đề xuất: *pitch an idea, brainstorm, outline a roadmap, project scope*.
   - Khảo cứu: *empirical evidence, qualitative research, feasibility study*.

2. 💻 **Clean Code & Development & Debugging** (Lập trình):
   - Giải thích logic: *encapsulation, abstraction, separation of concerns, modularity*.
   - Mô tả lỗi & Debug: *stack trace, reproduce a bug, isolate the root cause, resource leak, bottleneck*.
   - Tránh nợ kỹ thuật: *technical debt, refactoring, code smell, code review conventions*.

3. 🎨 **UI/UX & Responsive Multi-device Layout** (Thiết kế Giao diện):
   - Đảm bảo tương thích (Web, Mobile, Tablet/iPad, Laptop): *responsive breakpoints, touch targets (minimum 44x44px), screen dimensions, fluid grid, media queries, viewport*.
   - Thiết kế cao cấp: *glassmorphism, micro-animations, visual hierarchy, consistency, accessibility (WCAG compliance), design tokens*.

4. ✍️ **Copywriting & SEO** (Viết nội dung quảng cáo):
   - Thu hút độc giả: *compelling hooks, conversion copy, Call-to-Action (CTA), sales funnel, pain points*.
   - Tối ưu tìm kiếm: *search intent, keyword placement, meta descriptions, organic traffic*.

5. 🤖 **AI Engineering & Agents** (Kỹ sư AI/ML):
   - Phát triển Agent: *autonomous agent, prompt template, chain of thought, vector embeddings, RAG pipeline, fine-tuning, latency optimization*.

═══════════════════════════════════
🧠 QUY TRÌNH PHÂN LOẠI & XỬ LÝ SƯ PHẠM (Intent Handling)
═══════════════════════════════════
Trước khi phản hồi, hãy phân tích tin nhắn của người dùng và chọn 1 trong các hướng xử lý sau:
1. **Error Correction (Sửa lỗi)**: Nếu câu của người dùng có lỗi sai.
2. **Grammar Query (Hỏi ngữ pháp)**: Nếu người dùng hỏi về cấu trúc, thì, từ loại.
3. **Translation Request (Dịch thuật)**: Yêu cầu dịch Việt-Anh hoặc ngược lại.
4. **Vocabulary Query (Hỏi từ vựng)**: Hỏi nghĩa, cách dùng từ, idiom.
5. **Roleplay Scenario (Luyện hội thoại)**: Đang trong kịch bản nhập vai.
6. **IELTS/TOEIC Prep (Luyện thi)**: Yêu cầu đánh giá viết/nói.
7. **Tech & Domain Discussion (Thảo luận kỹ thuật)**: Thảo luận chuyên ngành.
8. **General Social/Everyday Query (Giao tiếp thường ngày)**: Small talk, chia sẻ đời sống.
9. **Vietnamese Input (Người dùng viết tiếng Việt)**: Cần hỗ trợ dịch và luyện tập.

═══════════════════════════════════
📋 QUY TẮC PHẢN HỒI (CỰC KỲ QUAN TRỌNG)
═══════════════════════════════════
1. **aiMessage**: Đóng vai trò nhân vật (Persona), phản hồi bằng tiếng Anh tự nhiên (trình độ CEFR A2-B2 tùy độ khó của người dùng), khơi gợi người dùng tiếp tục giao tiếp bằng các câu hỏi mở thân thiện.
2. **tutorFeedback**: Phần giải thích học thuật bằng TIẾNG VIỆT dưới định dạng Markdown chất lượng cao (sử dụng bảng so sánh, danh sách, khối trích dẫn). Cung cấp đầy đủ:
   - Phân tích lỗi sai (nếu có)
   - Phiên âm IPA + Từ loại của từ vựng mới
   - Công thức + Ví dụ cụ thể
   - Chiến lược/Mẫu câu trả lời tương ứng
3. **translation**: Bản dịch tiếng Việt tự nhiên của phần 'aiMessage'.

═══════════════════════════════════
📐 ĐỊNH DẠNG ĐẦU RA (BẮT BUỘC JSON)
═══════════════════════════════════
Chỉ trả về JSON thuần túy, không chứa ký tự hay wrapper markdown (như các dấu nháy ngược và từ khóa json):
{
  "aiMessage": "English conversational response as the persona",
  "tutorFeedback": "Vietnamese academic explanations, grammar analysis, IPA, and answer strategy guides in beautiful markdown format",
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
      
      const rawInput = messages[messages.length - 1]?.content || "";
      const cleanInput = rawInput.toLowerCase().trim();
      const cleanScenario = (scenario || "").toLowerCase();
      let aiMessage = "";
      let tutorFeedback = "";
      let translation = "";

      // Offline linguistic error detector
      let offlineCorrections: { error: string, fix: string, explanation: string }[] = [];
      
      // Generic pattern for "want + verb" without "to" (e.g., "want watch", "want go", "want eat")
      const wantVerbMatch = cleanInput.match(/\bwant\s+(go|watch|eat|do|play|buy|learn|study|speak|read|write|see|have|be|make|get|run|sleep|talk|say|tell|use|work|try|find|take|give|drink)\b/);
      if (wantVerbMatch) {
        const verb = wantVerbMatch[1];
        offlineCorrections.push({ 
          error: `want ${verb}`, 
          fix: `want to ${verb}`, 
          explanation: `Động từ 'want' yêu cầu động từ theo sau phải ở dạng 'to-infinitive' (to + V).` 
        });
      } else if (cleanInput.includes("want go")) {
        offlineCorrections.push({ error: "want go", fix: "want to go", explanation: "Động từ 'want' yêu cầu động từ theo sau ở dạng 'to-infinitive' (to + V)." });
      }

      // Adjective/Adverb confusion (e.g., "run quick", "drive slow", "speak fluent", "speak good")
      const speakFluentMatch = cleanInput.match(/\bspeak(s)?\s+([a-zA-Z]+\s+)?fluent\b/);
      if (speakFluentMatch) {
        offlineCorrections.push({ 
          error: speakFluentMatch[0], 
          fix: speakFluentMatch[0].replace("fluent", "fluently"), 
          explanation: "Cần dùng trạng từ (fluently) để bổ nghĩa cho động từ thường (speak), không dùng tính từ (fluent)." 
        });
      }

      const driveSlowMatch = cleanInput.match(/\bdrive(s)?\s+([a-zA-Z]+\s+)?slow\b/);
      if (driveSlowMatch) {
        offlineCorrections.push({ 
          error: driveSlowMatch[0], 
          fix: driveSlowMatch[0].replace("slow", "slowly"), 
          explanation: "Cần dùng trạng từ (slowly) để bổ nghĩa cho động từ thường (drive), không dùng tính từ (slow)." 
        });
      }

      const runQuickMatch = cleanInput.match(/\brun(s)?\s+([a-zA-Z]+\s+)?quick\b/);
      if (runQuickMatch) {
        offlineCorrections.push({ 
          error: runQuickMatch[0], 
          fix: runQuickMatch[0].replace("quick", "quickly"), 
          explanation: "Cần dùng trạng từ (quickly) để bổ nghĩa cho động từ thường (run), không dùng tính từ (quick)." 
        });
      }

      const speakGoodMatch = cleanInput.match(/\bspeak(s)?\s+([a-zA-Z]+\s+)?good\b/);
      if (speakGoodMatch) {
        offlineCorrections.push({ 
          error: speakGoodMatch[0], 
          fix: speakGoodMatch[0].replace("good", "well"), 
          explanation: "Trạng từ bổ nghĩa cho động từ 'speak' phải là 'well', không dùng tính từ 'good'." 
        });
      }

      // Generic pattern for modals with "to" (e.g., "should to go", "can to watch", "must to do")
      const modalToMatch = cleanInput.match(/\b(should|must|can|could|would|will|may|might)\s+to\s+([a-z]+)\b/);
      if (modalToMatch) {
        const modal = modalToMatch[1];
        const verb = modalToMatch[2];
        offlineCorrections.push({
          error: `${modal} to ${verb}`,
          fix: `${modal} ${verb}`,
          explanation: `Sau động từ khuyết thiếu '${modal}' phải dùng động từ nguyên thể không 'to' (V-bare).`
        });
      }

      if (cleanInput.includes("very like")) {
        offlineCorrections.push({ error: "very like", fix: "really like / like ... very much", explanation: "Không dùng 'very' đứng trực tiếp trước động từ thường." });
      }
      if (cleanInput.includes("depend of")) {
        offlineCorrections.push({ error: "depend of", fix: "depend on", explanation: "Giới từ đi với 'depend' phải là 'on' (phụ thuộc vào)." });
      }
      if (cleanInput.includes("married with")) {
        offlineCorrections.push({ error: "married with", fix: "married to", explanation: "Khi nói kết hôn với ai đó, dùng 'married to', không dùng 'with'." });
      }
      if (cleanInput.includes("make homework")) {
        offlineCorrections.push({ error: "make homework", fix: "do homework", explanation: "Kết hợp từ đúng (collocation) phải là 'do homework' (làm bài tập)." });
      }
      if (cleanInput.includes("i am student") || cleanInput === "i student") {
        offlineCorrections.push({ error: "I am student", fix: "I am a student", explanation: "Cần thêm mạo từ 'a' trước danh từ số ít chỉ nghề nghiệp/vai trò." });
      }

      // Adjective/Adverb confusion (e.g., "run quick", "drive slow", "speak fluent", "speak good")
      if (cleanInput.includes("run quick")) {
        offlineCorrections.push({ error: "run quick", fix: "run quickly", explanation: "Cần dùng trạng từ (quickly) để bổ nghĩa cho động từ thường (run), không dùng tính từ (quick)." });
      }
      if (cleanInput.includes("drive slow")) {
        offlineCorrections.push({ error: "drive slow", fix: "drive slowly", explanation: "Cần dùng trạng từ (slowly) để bổ nghĩa cho động từ thường (drive), không dùng tính từ (slow)." });
      }
      if (cleanInput.includes("speak fluent")) {
        offlineCorrections.push({ error: "speak fluent", fix: "speak fluently", explanation: "Cần dùng trạng từ (fluently) để bổ nghĩa cho động từ thường (speak), không dùng tính từ (fluent)." });
      }
      if (cleanInput.includes("speak good")) {
        offlineCorrections.push({ error: "speak good", fix: "speak well", explanation: "Trạng từ bổ nghĩa cho động từ 'speak' phải là 'well', không dùng tính từ 'good'." });
      }

      let correctionsHeader = "";
      if (offlineCorrections.length > 0) {
        correctionsHeader = "**⚠️ Phát hiện lỗi ngữ pháp trong câu của bạn:**\n\n| Lỗi sai | Sửa lại | Giải thích chi tiết |\n|---|---|---|\n" +
          offlineCorrections.map(c => `| *${c.error}* | **${c.fix}** | ${c.explanation} |`).join("\n") + "\n\n---\n\n";
      }

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
        } else if (cleanInput.includes("work") || cleanInput.includes("job") || cleanInput.includes("công việc") || cleanInput.includes("làm việc") || cleanInput.includes("company")) {
          aiMessage = "That is cool! What do you do at your job? Tell me about your daily tasks.";
          translation = "Thật ngầu! Bạn làm công việc gì? Hãy kể cho tôi nghe về các nhiệm vụ hàng ngày của bạn.";
          tutorFeedback = "**💼 CÁCH NÓI VỀ CÔNG VIỆC TRONG TIẾNG ANH:**\n\n" +
            "- Để giới thiệu công ty: *I work at [Company Name]* (VD: \"I work at Ebest\").\n" +
            "- Để giới thiệu vị trí: *I work as a/an [Job Title]* hoặc *I am a/an [Job Title]* (VD: \"I work as a software engineer\").\n" +
            "- Để mô tả bộ phận: *I work in the [Department] department* (VD: \"I work in the Marketing department\").\n\n" +
            "**⚠️ Lỗi hay gặp:** Nói *\"I work company Ebest\"* ❌ $\\rightarrow$ Sửa: *\"I work **at** Ebest\"* hoặc *\"I work **for** Ebest\"* ✅.";
        } else if (cleanInput.includes("study") || cleanInput.includes("learn") || cleanInput.includes("student") || cleanInput.includes("học") || cleanInput.includes("sinh viên")) {
          aiMessage = "Studying is a wonderful journey! What major or subjects are you learning right now?";
          translation = "Học tập là một hành trình tuyệt vời! Hiện tại bạn đang học chuyên ngành hay môn học nào?";
          tutorFeedback = "**🎓 CÁCH NÓI VỀ VIỆC HỌC TẬP TRONG TIẾNG ANH:**\n\n" +
            "- Để nói trường học: *I study at [School/University]* (VD: \"I study at UED\").\n" +
            "- Để nói chuyên ngành: *I major in [Subject]* hoặc *My major is [Subject]* (VD: \"I major in Computer Science\").\n" +
            "- Để nói về việc học cái gì: *I am learning how to [do something]* (VD: \"I am learning how to speak English\").\n\n" +
            "**⚠️ Lỗi hay gặp:** Nói *\"I study major IT\"* ❌ $\rightarrow$ Sửa: *\"I **major in** IT\"* hoặc *\"My major is IT\"* ✅.";
        } else if (cleanInput.includes("how to say") || cleanInput.includes("làm sao để") || cleanInput.includes("dịch") || cleanInput.includes("translate")) {
          aiMessage = "That is a great question! Let's translate and practice that expression. Try saying: 'I would like to practice English daily.'";
          translation = "Đó là một câu hỏi tuyệt vời! Hãy cùng dịch và luyện tập biểu đạt đó. Thử nói: 'I would like to practice English daily.'";
          tutorFeedback = "Khi muốn hỏi cách nói một cụm từ tiếng Việt sang tiếng Anh, bạn có thể dùng cấu trúc: 'How do you say [cụm từ] in English?' hoặc 'What is the English word for [cụm từ]?'.";
        } else if (cleanInput.includes("adjective") || cleanInput.includes("adverb") || cleanInput.includes("tính từ") || cleanInput.includes("trạng từ")) {
          aiMessage = "Adjectives and adverbs are essential for descriptive English! Let me explain the difference between them, where to place them, and how to avoid mistakes.";
          translation = "Tính từ và trạng từ là những phần thiết yếu để mô tả trong tiếng Anh! Hãy để tôi giải thích sự khác biệt giữa chúng, vị trí đặt và cách tránh lỗi sai.";
          tutorFeedback = "**📚 SO SÁNH TÍNH TỪ (ADJECTIVES) & TRẠNG TỪ (ADVERBS)**\n\n" +
            "| Đặc trưng | Tính từ (Adjective - Adj) | Trạng từ (Adverb - Adv) |\n" +
            "|---|---|---|\n" +
            "| **Chức năng** | Bổ nghĩa cho **Danh từ** hoặc Đại từ | Bổ nghĩa cho **Động từ thường**, Tính từ, hoặc Trạng từ khác |\n" +
            "| **Vị trí** | 1. Trước danh từ (VD: *a **beautiful** day*)\n2. Sau Linking verb (VD: *She **is** happy*, *It **looks** good*) | 1. Sau động từ thường (VD: *run **quickly***)\n2. Trước tính từ (VD: *She is **extremely** smart*)\n3. Đầu/cuối câu |\n" +
            "| **Dấu hiệu** | Thường là từ gốc hoặc tận cùng bằng: *-ful, -less, -ive, -ous, -ish, -able* | Thường kết thúc bằng **Adj + -ly** (VD: *slowly, beautifully*). *Ngoại lệ: hard, fast, early, well* |\n\n" +
            "**⚠️ LỖI HAY GẶP CỦA NGƯỜI VIỆT:**\n" +
            "- **Lỗi 1 (Sai vị trí Adj):** Nói *\"I have a car red\"* ❌ $\\rightarrow$ Sửa: *\"I have a **red** car\"* ✅ (Adj đứng trước danh từ).\n" +
            "- **Lỗi 2 (Dùng Adj thay vì Adv cho động từ thường):** Nói *\"She speaks English fluent\"* ❌ $\\rightarrow$ Sửa: *\"She speaks English **fluently**\"* ✅ (cần trạng từ bổ nghĩa cho động từ thường *speak*).\n" +
            "- **Lỗi 3 (Từ đặc biệt):** Nói *\"study hardly\"* ❌ (nghĩa là hầu như không học) $\\rightarrow$ Sửa: *\"study **hard**\"* ✅ (chăm chỉ).";
        } else if (cleanInput.includes("noun") || cleanInput.includes("danh từ") || cleanInput.includes("verb") || cleanInput.includes("động từ")) {
          aiMessage = "Nouns and verbs are the core elements of any sentence structure. Let's study how to use them correctly!";
          translation = "Danh từ và động từ là những yếu tố cốt lõi của cấu trúc câu. Hãy cùng học cách sử dụng chúng một cách chính xác!";
          tutorFeedback = "**📚 DANH TỪ (NOUNS) & ĐỘNG TỪ (VERBS) TRONG TIẾNG ANH**\n\n" +
            "### 1. Danh từ (Nouns - N)\n" +
            "- **Chức năng**: Chỉ người, vật, sự việc, địa điểm, ý tưởng. Làm Chủ ngữ (S) hoặc Tân ngữ (O).\n" +
            "- **Phân loại quan trọng**:\n" +
            "  - **Danh từ đếm được (Countable Nouns)**: Có dạng số ít/số nhiều. *Phải có mạo từ (a/an/the) hoặc số lượng đi kèm ở số ít*. (VD: *a book, books*).\n" +
            "  - **Danh từ không đếm được (Uncountable Nouns)**: Không có dạng số nhiều, đi với động từ số ít. (VD: *water, information, homework* - KHÔNG dùng *homeworks*).\n\n" +
            "### 2. Động từ (Verbs - V)\n" +
            "- **Chức năng**: Diễn tả hành động (action verb - *run, code*) hoặc trạng thái/liên kết (state/linking verb - *be, seem, feel*).\n" +
            "- **Đặc điểm**: Phải chia theo **thì** (tenses) và hòa hợp với **chủ ngữ** (VD: *He works* - số ít, *They work* - số nhiều).\n\n" +
            "**⚠️ LỖI HAY GẶP CỦA NGƯỜI VIỆT:**\n" +
            "- **Lỗi 1 (Thiếu mạo từ):** Nói *\"I am developer\"* ❌ $\\rightarrow$ Sửa: *\"I am **a** developer\"* ✅.\n" +
            "- **Lỗi 2 (Sử dụng số nhiều cho danh từ không đếm được):** Nói *\"She gave me many advices\"* ❌ $\\rightarrow$ Sửa: *\"She gave me a lot of **advice**\"* ✅.\n" +
            "- **Lỗi 3 (Dùng động từ hành động như linking verb):** Nói *\"It smells deliciously\"* ❌ $\\rightarrow$ Sửa: *\"It smells **delicious**\"* ✅ (sau linking verb dùng Adj, không dùng Adv).";
        } else if (cleanInput.includes("từ loại") || cleanInput.includes("parts of speech") || cleanInput.includes("word form")) {
          aiMessage = "Mastering the Parts of Speech is the first step to building correct sentences in English. Let me show you the full overview!";
          translation = "Làm chủ Từ loại là bước đầu tiên để xây dựng các câu chính xác trong tiếng Anh. Hãy để tôi chỉ cho bạn cái nhìn tổng quan đầy đủ!";
          tutorFeedback = "**📚 8 TỪ LOẠI CHÍNH TRONG TIẾNG ANH (PARTS OF SPEECH)**\n\n" +
            "Mỗi từ trong câu đảm nhận một vai trò ngữ pháp cụ thể. Dưới đây là bảng tổng quan:\n\n" +
            "| Từ loại | Viết tắt | Chức năng | Ví dụ |\n" +
            "|---|---|---|---|\n" +
            "| **Danh từ (Noun)** | N | Chỉ người, vật, nơi chốn, ý tưởng | *student, office, happiness*\n*He lives in **London**.* |\n" +
            "| **Đại từ (Pronoun)** | Pro | Thay thế cho danh từ để tránh lặp | *I, you, he, she, they, it*\n*She likes **him**.* |\n" +
            "| **Động từ (Verb)** | V | Diễn tả hành động hoặc trạng thái | *run, design, create, be, seem*\n*We **coded** the web.* |\n" +
            "| **Tính từ (Adjective)** | Adj | Mô tả hoặc bổ nghĩa cho danh từ | *beautiful, clean, smart, fast*\n*It is a **modular** code.* |\n" +
            "| **Trạng từ (Adverb)** | Adv | Bổ nghĩa cho động từ, tính từ, trạng từ | *quickly, fluently, very, daily*\n*He codes **efficiently**.* |\n" +
            "| **Giới từ (Preposition)** | Prep | Chỉ mối quan hệ không gian/thời gian | *in, on, at, under, behind, of*\n*Put it **on** the table.* |\n" +
            "| **Liên từ (Conjunction)** | Conj | Nối từ, cụm từ, hoặc mệnh đề | *and, but, or, because, although*\n*Simple **but** premium.* |\n" +
            "| **Thán từ (Interjection)** | Inter | Biểu lộ cảm xúc mạnh mẽ | *oh, wow, oops, ouch*\n***Wow**, that looks great!* |\n\n" +
            "**💡 Mẹo ghi nhớ:** Khi học từ vựng mới, hãy học theo **Word Family** (Gia đình từ) của từ đó. Ví dụ: *create* (V) $\\rightarrow$ *creation* (N) $\rightarrow$ *creative* (Adj) $\rightarrow$ *creatively* (Adv).";
        } else if (cleanInput.includes("6 main english question types") || cleanInput.includes("question types") || cleanInput.includes("dạng câu hỏi")) {
          aiMessage = "I would be happy to explain English question types! There are 6 main structures: Yes/No, Wh- Information, Tag Questions, Negative Questions, Indirect/Embedded, and Hypothetical/Conditional. Let me show you how they work!";
          translation = "Tôi rất vui được giải thích các dạng câu hỏi tiếng Anh! Có 6 cấu trúc chính: Yes/No, Wh- Thông tin, Câu hỏi đuôi, Câu hỏi phủ định, Gián tiếp/Lồng ghép, và Giả định/Điều kiện. Hãy để tôi chỉ cho bạn cách chúng hoạt động!";
          tutorFeedback = "**📚 6 DẠNG CÂU HỎI TIẾNG ANH THÔNG DỤNG & CÁCH LÀM CHỦ:**\n\n" +
            "1. **Yes/No Questions**: Xác nhận đúng/sai. Cấu trúc: *Auxiliary + S + V?*\n" +
            "   - *Cách trả lời*: Direct Response → Elaboration → Follow-up. (VD: \"Yes, I do. In fact, I find it quite engaging. What about you?\")\n" +
            "2. **Wh- Questions**: Khai thác thông tin chi tiết. Cấu trúc: *Wh- + Auxiliary + S + V?*\n" +
            "   - *Cách trả lời*: Áp dụng công thức 3-Part Answer: Direct + Detail + Example.\n" +
            "3. **Tag Questions (Câu hỏi đuôi)**: Xác minh thông tin. Cấu trúc: *S + V, auxiliary + not + S?*\n" +
            "   - *Ngữ điệu*: Lên giọng ở đuôi = Câu hỏi thực sự; Xuống giọng = Mong đợi sự đồng ý.\n" +
            "4. **Negative Questions (Câu hỏi phủ định)**: Bắt đầu bằng phủ định (VD: *Don't you...?*).\n" +
            "   - *Quy tắc vàng*: Luôn trả lời theo thực tế khách quan. Nếu thực tế là CÓ -> \"Yes, S + V\"; nếu thực tế là KHÔNG -> \"No, S + not\".\n" +
            "5. **Indirect Questions (Câu hỏi gián tiếp)**: Dùng để hỏi lịch sự. Cấu trúc: *Intro Clause + S + V (không đảo ngữ)*. (VD: \"Do you know where the station is?\" - KHÔNG DÙNG \"is the station\").\n" +
            "6. **Hypothetical Questions (Câu hỏi giả định)**: Dùng câu điều kiện (VD: *What would you do if...?*). Cấu trúc: *Hypothesis → Outcome → Rationale*.";
        } else if (cleanInput.includes("negative question") || cleanInput.includes("câu hỏi phủ định")) {
          aiMessage = "Answering negative questions can be tricky for Vietnamese speakers! Let's clear up the confusion so you never make mistakes again.";
          translation = "Trả lời câu hỏi phủ định có thể hơi rắc rối với người Việt! Hãy cùng làm sáng tỏ để bạn không bao giờ mắc lỗi nữa.";
          tutorFeedback = "**⚠️ BÍ QUYẾT TRẢ LỜI CÂU HỎI PHỦ ĐỊNH (NEGATIVE QUESTIONS)**\n\n" +
            "Người Việt hay có thói quen trả lời \"Yes\" để đồng ý với ý phủ định của câu hỏi. Nhưng trong tiếng Anh, quy tắc là **LUÔN DỰA VÀO SỰ THẬT KHÁCH QUAN**:\n\n" +
            "- Nếu sự thật là **CÓ** &rarr; Trả lời **YES**\n" +
            "- Nếu sự thật là **KHÔNG** &rarr; Trả lời **NO**\n\n" +
            "**Ví dụ phân tích:**\n" +
            "Câu hỏi: *\"Don't you like coffee?\"* (Bạn không thích cà phê à?)\n" +
            "- Nếu bạn **Thích** &rarr; Nói: **\"Yes, I do.\"** (Dịch nghĩa: Có, tôi thích chứ.)\n" +
            "- Nếu bạn **Không thích** &rarr; Nói: **\"No, I don't.\"** (Dịch nghĩa: Không, tôi không thích.)\n\n" +
            "*Tuyệt đối không nói \"Yes, I don't\" hoặc \"No, I do\" vì sai ngữ pháp.*";
        } else if (cleanInput.includes("star") || cleanInput.includes("prep") || cleanInput.includes("framework")) {
          aiMessage = "Structuring your answers is the key to speaking professional English! Let me explain the STAR and PREP frameworks with clear examples.";
          translation = "Cấu trúc câu trả lời là chìa khóa để nói tiếng Anh chuyên nghiệp! Hãy để tôi giải thích khung STAR và PREP với các ví dụ rõ ràng.";
          tutorFeedback = "**💡 CÁC KHUNG TRẢ LỜI CHUYÊN NGHIỆP TRONG TIẾNG ANH**\n\n" +
            "### 1. Khung STAR (Dành cho Phỏng vấn / Kể chuyện)\n" +
            "- **S - Situation (Tình huống)**: Mô tả bối cảnh ngắn gọn.\n" +
            "- **T - Task (Nhiệm vụ)**: Mục tiêu hoặc thách thức cần giải quyết.\n" +
            "- **A - Action (Hành động)**: Bạn đã làm gì cụ thể (sử dụng động từ hành động).\n" +
            "- **R - Result (Kết quả)**: Đạt được kết quả gì (nên có số liệu/dẫn chứng).\n\n" +
            "### 2. Khung PREP (Dành cho Thảo luận / Thuyết trình ngắn)\n" +
            "- **P - Point (Quan điểm chính)**: Đưa ra nhận định/quan điểm của bạn trực tiếp.\n" +
            "- **R - Reason (Lý do)**: Giải thích tại sao bạn có quan điểm đó.\n" +
            "- **E - Example (Ví dụ)**: Đưa ra ví dụ cụ thể để minh họa.\n" +
            "- **P - Point (Khẳng định lại)**: Nhắc lại quan điểm chính một lần nữa để kết luận.\n\n" +
            "*Mẹo: Hãy luyện tập áp dụng PREP cho các câu hỏi giao tiếp hàng ngày để rèn phản xạ mạch lạc!*";
        } else if (cleanInput.includes("pronunciation") || cleanInput.includes("phát âm") || cleanInput.includes("ipa") || cleanInput.includes("speaking") || cleanInput.includes("accent")) {
          aiMessage = "Mastering English pronunciation and speaking is all about muscle memory and understanding phonetic rules! Let me share the core blueprint for perfect pronunciation.";
          translation = "Làm chủ phát âm và nói tiếng Anh hoàn toàn là về trí nhớ cơ bắp và hiểu các quy tắc ngữ âm! Hãy để tôi chia sẻ kế hoạch cốt lõi để có phát âm hoàn hảo.";
          tutorFeedback = "**🗣️ HƯỚNG DẪN LUYỆN PHÁT ÂM TIẾNG ANH CHUẨN (IPA & SPEAKING)**\n\n" +
            "### 1. Bảng Ký tự Ngữ âm Quốc tế (IPA)\n" +
            "- Bao gồm **44 âm** (20 nguyên âm và 24 phụ âm).\n" +
            "- **Mẹo học**: Học cách đặt vị trí lưỡi, răng, và cách phát hơi (VD: âm vô thanh /p, t, k/ vs hữu thanh /b, d, g/).\n\n" +
            "### 2. Trọng âm từ (Word Stress)\n" +
            "- **Quy tắc vàng**: Mỗi từ tiếng Anh có trọng âm rõ ràng. Âm được nhấn sẽ dài hơn, to hơn và cao hơn.\n" +
            "  - Danh từ/Tính từ 2 âm tiết: Thường nhấn âm 1. (VD: *'record (N)*, *'present (Adj)*)\n  - Động từ 2 âm tiết: Thường nhấn âm 2. (VD: *re'cord (V)*, *pre'sent (V)*)\n\n" +
            "### 3. Ngữ điệu câu (Intonation)\n" +
            "- **Falling Intonation (Xuống giọng ở cuối)**: Dùng cho câu trần thuật hoặc câu hỏi Wh-.\n" +
            "- **Rising Intonation (Lên giọng ở cuối)**: Dùng cho câu hỏi Yes/No.";
        } else if (cleanInput.includes("vocabulary") || cleanInput.includes("từ vựng") || cleanInput.includes("learn word") || cleanInput.includes("học từ")) {
          aiMessage = "Learning vocabulary effectively requires active recall and learning in context, not just memorizing lists. Let me show you the scientific way to learn!";
          translation = "Học từ vựng hiệu quả đòi hỏi sự chủ động gợi nhớ và học trong ngữ cảnh, không chỉ là ghi nhớ các danh sách. Hãy để tôi chỉ cho bạn cách học khoa học!";
          tutorFeedback = "**🧠 PHƯƠNG PHÁP HỌC TỪ VỰNG KHOA HỌC & HIỆU QUẢ**\n\n" +
            "### 1. Học qua Cụm từ (Collocations)\n" +
            "- Đừng học từ đơn lẻ. Hãy học từ đi kèm. (VD: Thay vì học *decision*, hãy học *make a decision*).\n\n" +
            "### 2. Sử dụng Lặp lại ngắt quãng (Spaced Repetition)\n" +
            "- Ôn tập từ vựng theo chu kỳ tăng dần: 1 ngày $\\rightarrow$ 3 ngày $\\rightarrow$ 7 ngày $\\rightarrow$ 30 ngày để chuyển từ vựng vào trí nhớ dài hạn (Long-term memory).\n\n" +
            "### 3. Gợi nhớ chủ động (Active Recall)\n" +
            "- Tự đặt câu hỏi hoặc dùng Flashcard để ép não bộ chủ động nhớ lại nghĩa của từ thay vì chỉ đọc đi đọc lại.";
        } else if (cleanInput.includes("preposition") || cleanInput.includes("giới từ") || cleanInput.includes("in on at")) {
          aiMessage = "Prepositions of Time and Place (In, On, At) can be easily visualized using the triangle rule. Let me explain it to you!";
          translation = "Giới từ chỉ thời gian và nơi chốn (In, On, At) có thể dễ dàng hình dung bằng quy tắc hình tam giác. Hãy để tôi giải thích cho bạn!";
          tutorFeedback = "**📐 QUY TẮC TAM GIÁC: SỬ DỤNG GIỚI TỪ IN - ON - AT**\n\n" +
            "Hãy tưởng tượng một hình tam giác ngược (Đỉnh rộng ở trên &rarr; Đáy nhọn ở dưới):\n\n" +
            "### 🟩 IN (Trên cùng - Rộng lớn / Chung chung)\n" +
            "- **Thời gian**: Thế kỷ, năm, tháng, mùa, buổi trong ngày. (VD: *in 2026*, *in July*, *in the morning*)\n" +
            "- **Địa điểm**: Quốc gia, thành phố, không gian khép kín. (VD: *in Vietnam*, *in London*, *in a room*)\n\n" +
            "### 🟨 ON (Giữa - Cụ thể vừa phải)\n" +
            "- **Thời gian**: Ngày cụ thể, thứ trong tuần, ngày lễ có từ 'day'. (VD: *on Monday*, *on July 4th*, *on Christmas Day*)\n" +
            "- **Địa điểm**: Tên đường, bề mặt phẳng, phương tiện công cộng. (VD: *on Nguyen Hue street*, *on the table*, *on a bus*)\n\n" +
            "### 🟥 AT (Dưới cùng - Cực kỳ cụ thể / Điểm xác định)\n" +
            "- **Thời gian**: Giờ giấc cụ thể, thời điểm chính xác. (VD: *at 9 AM*, *at midnight*, *at the moment*)\n" +
            "- **Địa điểm**: Địa chỉ nhà cụ thể, một vị trí xác định. (VD: *at 123 Main Street*, *at the bus stop*, *at school*)";
        } else if (cleanInput.includes("mistake") || cleanInput.includes("lỗi") || cleanInput.includes("vietnamese mistake") || cleanInput.includes("lỗi sai")) {
          aiMessage = "Every language learner makes mistakes, and identifying them is the best way to improve! Let's examine the most common mistakes Vietnamese speakers make in English.";
          translation = "Mọi người học ngôn ngữ đều mắc lỗi, và xác định chúng là cách tốt nhất để cải thiện! Hãy cùng xem xét những lỗi phổ biến nhất mà người Việt hay mắc phải trong tiếng Anh.";
          tutorFeedback = "**⚠️ CÁC LỖI NGỮ PHÁP & PHÁT ÂM NGƯỜI VIỆT HAY MẮC PHẢI**\n\n" +
            "### 1. Thiếu âm đuôi (Ending Sounds)\n" +
            "- **Mô tả**: Hay bỏ quên âm /s/, /z/, /t/, /d/, /k/, /g/ ở cuối từ.\n" +
            "- **Ví dụ**: Nói *like* thành *lai*, *five* thành *fai*.\n" +
            "- **Khắc phục**: Tập trung phát âm rõ ràng âm gió và âm bật ở cuối từ.\n\n" +
            "### 2. Thiếu mạo từ \"a/an/the\"\n" +
            "- **Mô tả**: Bỏ qua mạo từ trước danh từ số ít đếm được.\n" +
            "- **Ví dụ**: *I am engineer* ❌ $\\rightarrow$ Sửa: *I am **an** engineer* ✅.\n\n" +
            "### 3. Hòa hợp chủ ngữ - động từ (Subject-Verb Agreement)\n" +
            "- **Mô tả**: Quên thêm 's/es' ở thì hiện tại đơn khi chủ ngữ là ngôi thứ 3 số ít (He/She/It).\n" +
            "- **Ví dụ**: *She like reading* ❌ $\\rightarrow$ Sửa: *She **likes** reading* ✅.\n\n" +
            "### 4. Nhầm lẫn giữa Say / Tell / Speak / Talk\n" +
            "- **Say**: Nói ra một lời/cụm từ (VD: *say hello*).\n" +
            "- **Tell**: Kể/bảo với AI ĐÓ (luôn có tân ngữ chỉ người đi sau: *tell me, tell him*).\n" +
            "- **Speak**: Nói một ngôn ngữ hoặc phát biểu trang trọng (VD: *speak English*).\n" +
            "- **Talk**: Trò chuyện qua lại với ai (VD: *talk to a friend*).";
        } else if (cleanInput.includes("tag question") || cleanInput.includes("câu hỏi đuôi")) {
          aiMessage = "Great question! Tag questions are short questions added at the end of a sentence. For example: 'You like coffee, don't you?' Let me explain the rules!";
          translation = "Câu hỏi hay! Câu hỏi đuôi là câu hỏi ngắn thêm vào cuối câu. Ví dụ: 'You like coffee, don't you?' Hãy để tôi giải thích các quy tắc!";
          tutorFeedback = "**Câu hỏi đuôi (Tag Questions)**\n\n**Công thức:** Câu khẳng định → đuôi phủ định / Câu phủ định → đuôi khẳng định\n\n**Ví dụ:**\n- She **is** a teacher, **isn't** she? ✅\n- They **don't** like fish, **do** they? ✅\n- He **can** swim, **can't** he? ✅\n\n**Lỗi hay gặp:** Dùng sai trợ ĐT ở đuôi, ví dụ: 'She likes music, doesn't she?' (✅) KHÔNG phải 'isn't she?' (❌)";
        } else if (cleanInput.includes("wh question") || cleanInput.includes("câu hỏi wh") || cleanInput.includes("what when where")) {
          aiMessage = "Wh-questions are very important in English! They start with words like What, Where, When, Who, Why, and How. Let me teach you the patterns!";
          translation = "Câu hỏi Wh- rất quan trọng trong tiếng Anh! Chúng bắt đầu bằng What, Where, When, Who, Why và How. Hãy để tôi dạy bạn các mẫu câu!";
          tutorFeedback = "**Câu hỏi Wh- (Wh-Questions)**\n\n**Công thức:** Wh- + trợ ĐT + S + V?\n\n| Từ hỏi | Nghĩa | Ví dụ |\n|---|---|---|\n| What | Cái gì | What do you do? |\n| Where | Ở đâu | Where do you live? |\n| When | Khi nào | When did you arrive? |\n| Who | Ai | Who is your teacher? |\n| Why | Tại sao | Why are you late? |\n| How | Thế nào | How do you feel? |\n\n**Mẹo:** Trả lời đầy đủ câu, không chỉ nói 1 từ!";
        } else if (cleanInput.includes("present perfect") || cleanInput.includes("hiện tại hoàn thành")) {
          aiMessage = "The Present Perfect tense is one of the most useful tenses in English! It connects the past to the present. Have you used it before?";
          translation = "Thì Hiện tại Hoàn thành là một trong những thì hữu ích nhất trong tiếng Anh! Nó kết nối quá khứ với hiện tại. Bạn đã sử dụng nó trước đây chưa?";
          tutorFeedback = "**Thì Hiện tại Hoàn thành (Present Perfect)**\n\n**Công thức:** S + have/has + V3/ed\n\n**Khi nào dùng:**\n- Hành động đã xảy ra nhưng KHÔNG nói rõ thời gian: *I have visited Paris.*\n- Hành động bắt đầu trong quá khứ, kéo dài đến hiện tại: *I have lived here for 5 years.*\n- Kinh nghiệm: *Have you ever tried sushi?*\n\n**Dấu hiệu:** already, yet, just, ever, never, for, since\n\n**⚠️ Lỗi hay gặp:** 'I have went' ❌ → 'I have gone' ✅ (dùng V3, không dùng V2)";
        } else if (cleanInput.includes("tense") || cleanInput.includes("thì") || cleanInput.includes("grammar") || cleanInput.includes("ngữ pháp")) {
          aiMessage = "Grammar is the backbone of any language! Which grammar topic would you like to explore? Tenses, prepositions, articles, or something else?";
          translation = "Ngữ pháp là xương sống của mọi ngôn ngữ! Bạn muốn khám phá chủ đề ngữ pháp nào? Thì, giới từ, mạo từ, hay chủ đề nào khác?";
          tutorFeedback = "**Các thì quan trọng trong tiếng Anh:**\n\n| Thì | Công thức | Ví dụ |\n|---|---|---|\n| Simple Present | S + V(s/es) | I **work** every day. |\n| Present Continuous | S + am/is/are + V-ing | I **am working** now. |\n| Simple Past | S + V2/ed | I **worked** yesterday. |\n| Present Perfect | S + have/has + V3 | I **have worked** here for 2 years. |\n| Future Simple | S + will + V | I **will work** tomorrow. |\n\nBạn muốn tìm hiểu sâu hơn về thì nào?";
        } else if (cleanInput.includes("how are you") || cleanInput.includes("how do you do")) {
          aiMessage = "I'm doing great, thank you for asking! How about you? Is there anything specific you'd like to practice today?";
          translation = "Tôi rất khỏe, cảm ơn bạn đã hỏi! Còn bạn thì sao? Hôm nay bạn muốn luyện tập điều gì cụ thể không?";
          tutorFeedback = "**Các cách trả lời 'How are you?':**\n- 🟢 Tích cực: *I'm great!* / *I'm doing well, thanks!* / *Never been better!*\n- 🟡 Bình thường: *I'm fine, thanks.* / *Not bad.* / *I'm okay.*\n- 🔴 Không tốt: *I've been better.* / *Not so great, actually.* / *I'm a bit under the weather.*\n\n**Mẹo:** Luôn hỏi lại: *'How about you?'* hoặc *'And you?'*";
        } else {
          aiMessage = `That is very interesting! Can you tell me more about that? I'd love to hear your thoughts in English.`;
          translation = `Điều đó thật thú vị! Bạn có thể kể cho tôi nghe thêm về điều đó được không? Tôi rất muốn nghe suy nghĩ của bạn bằng tiếng Anh.`;
          tutorFeedback = `**Mẹo học tập:** Khi trò chuyện tự do, hãy áp dụng công thức **3-Part Answer**:\n1. **Direct answer** — Trả lời trực tiếp\n2. **Detail** — Thêm chi tiết/ví dụ\n3. **Follow-up** — Hỏi lại để duy trì hội thoại\n\nVD: "What's your hobby?" → "I enjoy reading. (Direct) I usually read science fiction novels before bed. (Detail) Do you like reading too? (Follow-up)"`;
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

      return { aiMessage, tutorFeedback: correctionsHeader + tutorFeedback, translation };
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
    const parsed = JSON.parse(jsonStr);

    // Validate: ensure enough words got a real meaningVi
    if (Array.isArray(parsed)) {
      const validCount = parsed.filter((r: any) => r?.word && r?.meaningVi && r.meaningVi.trim().toLowerCase() !== r.word.trim().toLowerCase()).length;
      if (validCount >= words.length * 0.5) {
        return parsed;
      }
    }
    
    console.warn(`[Bulk Translate] Gemini returned incomplete data. Using free fallback.`);
    return await GeminiService.bulkTranslateFallback(words);
  } catch(error: any) {
    console.error(`EngBot Bulk Translate Error, switching to free Google Translate fallback:`, error.message || error);
    return await GeminiService.bulkTranslateFallback(words);
  }
}

  /**
   * Free Google Translate fallback for bulk translation (no API key required)
   */
  static async bulkTranslateFallback(words: string[]): Promise<any[]> {
    const results: any[] = [];
    
    const translateText = async (text: string): Promise<string> => {
      try {
        const res = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(text)}`);
        if (res.ok) {
          const data: any = await res.json();
          return data[0]?.map((x: any) => x[0]).join('').trim() || '';
        }
      } catch (e) {}
      return '';
    };

    for (const word of words) {
      try {
        let phonetic = '', meaningEn = '', wordType = 'n', example = '';

        try {
          const dictRes = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
          if (dictRes.ok) {
            const dictData: any = await dictRes.json();
            if (dictData?.[0]) {
              const entry = dictData[0];
              phonetic = entry.phonetic || entry.phonetics?.find((p: any) => p.text)?.text || '';
              if (entry.meanings?.[0]) {
                wordType = entry.meanings[0].partOfSpeech || 'n';
                meaningEn = entry.meanings[0].definitions?.[0]?.definition || '';
                for (const m of entry.meanings) {
                  for (const d of m.definitions) {
                    if (d.example) { example = d.example; break; }
                  }
                  if (example) break;
                }
              }
            }
          }
        } catch (e) {}

        if (!meaningEn) meaningEn = `The English word "${word}".`;
        if (!example) example = `We should study the meaning of the word "${word}".`;

        const meaningVi = await translateText(word) || `từ "${word}"`;
        const exampleVi = await translateText(example) || '';

        results.push({ word, phonetic, meaningEn, meaningVi, wordType, cefrLevel: 'B1', usage: 'Sử dụng phổ biến trong giao tiếp hàng ngày.', example, exampleVi });
      } catch (err: any) {
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
  static async generateToeicPractice(part: number) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

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
    } catch (error: any) {
      console.error(`Generate TOEIC Practice Part ${part} Error, using high-quality local fallback:`, error.message || error);
      
      // Local fallback in case Gemini fails
      const fallbackData: any = {
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
      } else if (part === 5) {
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
      } else {
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
  static async generateIeltsPractice(skill: string) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

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
    } catch (error: any) {
      console.error(`Generate IELTS Practice ${skill} Error, using local fallback:`, error.message || error);
      
      const fallbackData: any = {
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
      } else if (skill === 'speaking') {
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
      } else {
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

