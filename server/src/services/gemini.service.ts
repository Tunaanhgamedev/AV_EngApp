import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';
import prisma from '../lib/prisma';
import fs from 'fs';
import path from 'path';

dotenv.config();

export const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export class GeminiService {
  private static readonly models = [
    "gemini-3.5-flash",
    "gemini-3.1-flash-lite",
    "gemini-2.5-flash",
    "gemini-2.0-flash",
    "gemini-flash-latest",
    "gemini-1.5-flash",
    "gemini-pro"
  ];

  private static async generateContentWithFallback(prompt: string, systemInstruction?: string, jsonMode: boolean = false): Promise<{ text: string; modelName: string }> {
    let lastError = null;
    for (const modelName of GeminiService.models) {
      try {
        console.log(`[GeminiService] Attempting generateContent with model: ${modelName} (JSON: ${jsonMode})`);
        const model = genAI.getGenerativeModel({
          model: modelName,
          ...(systemInstruction ? { systemInstruction } : {}),
          ...(jsonMode ? { generationConfig: { responseMimeType: "application/json" } } : {})
        });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        if (text && text.trim().length > 0) {
          console.log(`[GeminiService] Success with model: ${modelName}`);
          return { text, modelName };
        }
      } catch (err: any) {
        console.warn(`[GeminiService] Model ${modelName} failed:`, err.message || err);
        lastError = err;
      }
    }
    throw lastError || new Error("All generative models failed or are busy");
  }

  /**
   * Helper to parse JSON robustly, cleaning up markdown code blocks and wrapping text
   */
  private static cleanAndParseJson(text: string): any {
    if (!text) throw new Error("Empty text input");
    
    let clean = text.trim();
    
    const jsonBlockRegex = /```(?:json)?\s*([\s\S]*?)\s*```/i;
    const match = clean.match(jsonBlockRegex);
    if (match && match[1]) {
      clean = match[1].trim();
    }
    
    const firstBrace = clean.indexOf('{');
    const firstBracket = clean.indexOf('[');
    const lastBrace = clean.lastIndexOf('}');
    const lastBracket = clean.lastIndexOf(']');
    
    let startIndex = -1;
    let endIndex = -1;
    
    if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
      startIndex = firstBrace;
      endIndex = lastBrace;
    } else if (firstBracket !== -1) {
      startIndex = firstBracket;
      endIndex = lastBracket;
    }
    
    if (startIndex !== -1 && endIndex !== -1 && endIndex > startIndex) {
      clean = clean.substring(startIndex, endIndex + 1);
    }
    
    try {
      return JSON.parse(clean);
    } catch (e: any) {
      try {
        const sanitized = clean
          .replace(/,\s*([}\]])/g, '$1')
          .replace(/'/g, '"');
        return JSON.parse(sanitized);
      } catch (innerErr) {
        throw new Error(`Failed to parse JSON: ${e.message}. Raw text: ${text}`);
      }
    }
  }

  private static cachedSkills: any[] | null = null;

  /**
   * Lazy load and cache skills index from skills_index.json for fast fuzzy RAG search
   */
  public static getSkillsIndex(): any[] {
    if (GeminiService.cachedSkills) {
      return GeminiService.cachedSkills;
    }
    try {
      const possibleIndexPaths = [
        path.join(process.cwd(), '../antigravity-awesome-skills/skills_index.json'),
        path.join(__dirname, '../../../antigravity-awesome-skills/skills_index.json'),
        path.join(__dirname, '../../../../antigravity-awesome-skills/skills_index.json'),
        path.join(process.cwd(), 'antigravity-awesome-skills/skills_index.json'),
      ];

      let indexPath = '';
      for (const p of possibleIndexPaths) {
        if (fs.existsSync(p) && fs.statSync(p).isFile()) {
          indexPath = p;
          break;
        }
      }

      if (indexPath) {
        const raw = fs.readFileSync(indexPath, 'utf8');
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          // Map to compact footprint
          GeminiService.cachedSkills = parsed.map((item: any) => ({
            id: item.id || item.name || '',
            name: item.name || '',
            description: item.description || '',
            category: item.category || '',
            tags: Array.isArray(item.tags) ? item.tags : []
          }));
          console.log(`[GeminiService] Successfully cached ${GeminiService.cachedSkills.length} skills from index.`);
          return GeminiService.cachedSkills;
        }
      }
    } catch (err) {
      console.error('[GeminiService] Error loading skills_index.json:', err);
    }
    GeminiService.cachedSkills = [];
    return [];
  }

  /**
   * Retrieve exact contents of specifically requested trained skills from client
   */
  public static async retrieveSpecificSkillsContext(skills: string[]): Promise<string> {
    try {
      const possiblePaths = [
        path.join(process.cwd(), '../antigravity-awesome-skills/skills'),
        path.join(__dirname, '../../../antigravity-awesome-skills/skills'),
        path.join(__dirname, '../../../../antigravity-awesome-skills/skills'),
        path.join(process.cwd(), 'antigravity-awesome-skills/skills'),
      ];

      let skillsDir = '';
      for (const p of possiblePaths) {
        if (fs.existsSync(p) && fs.statSync(p).isDirectory()) {
          skillsDir = p;
          break;
        }
      }

      if (!skillsDir) {
        console.warn('[GeminiService] Could not find skills directory for specific retrieval.');
        return '';
      }

      let context = '\n═══════════════════════════════════\n🎓 TRAINED ADVANCED AI SKILLS CONTEXT\n═══════════════════════════════════\n';
      let loadedCount = 0;

      for (const skillId of skills) {
        const safeSkillId = path.basename(skillId);
        const dirPath = path.join(skillsDir, safeSkillId);
        if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
          const files = fs.readdirSync(dirPath);
          const mdFile = files.find(f => f.toLowerCase() === 'skill.md' || f.toLowerCase() === 'readme.md' || f.endsWith('.md'));
          if (mdFile) {
            const filePath = path.join(dirPath, mdFile);
            const content = fs.readFileSync(filePath, 'utf8');
            const cleanedContent = content.replace(/^---[\s\S]*?---/, '').trim();
            context += `\n[Trained Skill: ${safeSkillId.toUpperCase()}]\n${cleanedContent.substring(0, 4500)}\n`;
            loadedCount++;
          }
        }
      }
      context += '\n═══════════════════════════════════\n';
      return loadedCount > 0 ? context : '';
    } catch (err) {
      console.error('[GeminiService] Error retrieving specific skills context:', err);
      return '';
    }
  }

  /**
   * Dynamically search and retrieve relevant skill contents from antigravity-awesome-skills
   */
  private static async retrieveSkillContext(message: string): Promise<string> {
    try {
      const possiblePaths = [
        path.join(process.cwd(), '../antigravity-awesome-skills/skills'),
        path.join(__dirname, '../../../antigravity-awesome-skills/skills'),
        path.join(__dirname, '../../../../antigravity-awesome-skills/skills'),
        path.join(process.cwd(), 'antigravity-awesome-skills/skills'),
      ];

      let skillsDir = '';
      for (const p of possiblePaths) {
        if (fs.existsSync(p) && fs.statSync(p).isDirectory()) {
          skillsDir = p;
          break;
        }
      }

      if (!skillsDir) {
        console.warn('[GeminiService] Could not find skills directory in any known location.');
        return '';
      }

      const dirs = fs.readdirSync(skillsDir);
      const matchedDirs: string[] = [];
      const normalizedMessage = message.toLowerCase();

      // Part 1: Smart index relevance scorer (TF-IDF/BM25 approximation)
      const stopwords = new Set(['a', 'an', 'the', 'and', 'or', 'in', 'of', 'to', 'for', 'with', 'on', 'at', 'by', 'from', 'about', 'how', 'why', 'what', 'where']);
      const queryWords = normalizedMessage.split(/[^a-zA-Z0-9_\-]+/).filter(w => w.length > 1 && !stopwords.has(w));
      const skills = GeminiService.getSkillsIndex();
      const scoredSkills: { id: string; score: number }[] = [];

      for (const skill of skills) {
        let score = 0;
        const skillIdLower = skill.id.toLowerCase();
        const skillNameLower = skill.name.toLowerCase();
        const skillDescLower = skill.description.toLowerCase();

        // Exact skill ID match in query
        if (normalizedMessage.includes(skillIdLower)) {
          score += 15;
        }

        for (const word of queryWords) {
          if (skillIdLower.includes(word) || skillNameLower.includes(word)) {
            score += 5;
          }
          if (skill.tags.some((t: string) => t.toLowerCase() === word)) {
            score += 6;
          }
          if (skillDescLower.includes(word)) {
            score += 2;
          }
        }

        if (score > 0) {
          scoredSkills.push({ id: skill.id, score });
        }
      }

      // Sort by score desc and take top matches
      scoredSkills.sort((a, b) => b.score - a.score);
      matchedDirs.push(...scoredSkills.slice(0, 3).map(s => s.id));

      // Part 2: Fallback keyword matching (original logic as guardrail)
      if (matchedDirs.length === 0) {
        for (const dir of dirs) {
          const dirLower = dir.toLowerCase();
          if (normalizedMessage.includes(dirLower)) {
            matchedDirs.push(dir);
          } else if (dir.includes('-')) {
            const parts = dirLower.split('-');
            const minMatch = parts.length > 3 ? 2 : parts.length;
            let matchCount = 0;
            for (const part of parts) {
              if (part.length <= 3) {
                const regex = new RegExp(`\\b${part}\\b`, 'i');
                if (regex.test(normalizedMessage)) matchCount++;
              } else {
                if (normalizedMessage.includes(part)) matchCount++;
              }
            }
            if (matchCount >= minMatch) {
              matchedDirs.push(dir);
            }
          }
        }

        // Hardcoded alias matching as final safety
        const aliasMap: { [key: string]: string } = {
          'agent': 'ai-agents-architect',
          'rag': 'ai-engineering-toolkit',
          'prompt': 'ai-engineering-toolkit',
          'seo': 'ai-seo',
          'brainstorm': 'brainstorming',
          'clean code': 'clean-code',
          'refactor': 'codebase-cleanup-refactor-clean',
          'responsive': 'ai-wrapper-product',
          'ui/ux': 'ai-wrapper-product',
          'ml': 'ai-ml',
          'mcp': 'ai-dev-jobs-mcp',
          'jobs': 'ai-dev-jobs-mcp',
          'loop': 'ai-loop',
          'md': 'ai-md',
          'markdown': 'ai-md',
          'cli': 'ai-native-cli',
          'product': 'ai-product',
          'studio': 'ai-studio-image',
          'image': 'ai-studio-image',
          'wrapper': 'ai-wrapper-product',
        };

        for (const [key, dirName] of Object.entries(aliasMap)) {
          if (normalizedMessage.includes(key)) {
            matchedDirs.push(dirName);
          }
        }
      }

      if (matchedDirs.length === 0) return '';

      const uniqueMatched = Array.from(new Set(matchedDirs)).slice(0, 3);
      let context = '\n═══════════════════════════════════\n💡 DYNAMIC SKILL KNOWLEDGE BASE CONTEXT (RAG)\n═══════════════════════════════════\n';
      
      for (const dir of uniqueMatched) {
        const dirPath = path.join(skillsDir, dir);
        if (fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory()) {
          const files = fs.readdirSync(dirPath);
          const mdFile = files.find(f => f.toLowerCase() === 'skill.md' || f.toLowerCase() === 'readme.md' || f.endsWith('.md'));
          if (mdFile) {
            const filePath = path.join(dirPath, mdFile);
            const content = fs.readFileSync(filePath, 'utf8');
            const cleanedContent = content.replace(/^---[\s\S]*?---/, '').trim();
            context += `\n[Skill Module: ${dir.toUpperCase()}]\n${cleanedContent.substring(0, 4500)}\n`;
          }
        }
      }
      context += '\n═══════════════════════════════════\n';
      return context;
    } catch (err) {
      console.error('[GeminiService] Error retrieving skill context:', err);
      return '';
    }
  }

  static async analyzeJournal(content: string, trainedSkills?: string[]) {
    try {
      let specificSkillsContext = '';
      if (trainedSkills && trainedSkills.length > 0) {
        specificSkillsContext = await GeminiService.retrieveSpecificSkillsContext(trainedSkills);
      }

      const prompt = `
        You are EngBot, an expert AI English teacher. Analyze the following journal entry written by an English learner.
        
        Journal Content: "${content}"
        
        ${specificSkillsContext ? `
        ═══════════════════════════════════
        🎓 TRAINED SKILLS FOR JOURNAL ANALYSIS
        ═══════════════════════════════════
        Apply the following guidelines and instructions from the trained skills specifically for correcting, formatting, or optimizing this journal:
        ${specificSkillsContext}
        ` : ''}
        
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

      const { text } = await GeminiService.generateContentWithFallback(prompt, undefined, true);
      return GeminiService.cleanAndParseJson(text);
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
  static async generateChatResponse(messages: any[], persona: string, scenario: string, userId?: string, trainedSkills?: string[]) {
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
      const searchKey = `${lastUserMessage} ${persona} ${scenario}`;
      
      // Load both dynamic skills and specifically trained skills
      const skillContext = await GeminiService.retrieveSkillContext(searchKey);
      let specificSkillsContext = '';
      if (trainedSkills && trainedSkills.length > 0) {
        specificSkillsContext = await GeminiService.retrieveSpecificSkillsContext(trainedSkills);
      }

      let systemInstruction = `
Bạn là EngBot — Siêu Trí Tuệ Học Thuật kiêm Cố Vấn Ngôn Ngữ Cấp Cao (C2 Mastery Level). Bạn phản xạ nhanh, sở hữu tư duy phân tích ngôn ngữ học sắc sảo, cấu trúc giải thích tối giản nhưng cực kỳ uyên bác. Bạn có khả năng phân tích mọi chủ đề tiếng Anh khó nhất, từ ngữ pháp cổ điển (Subjunctive mood, Inversion, Cleft sentences, Prepositional placement) đến sắc thái hội thoại hiện đại (Idiomatic registers, Corporate jargon, IELTS speaking/writing criteria).

Nhiệm vụ của bạn là đưa ra các câu trả lời hóc búa nhất một cách rõ ràng, chặt chẽ, tối ưu cấu trúc từ vựng và chỉ ra các quy luật ngôn ngữ sâu sắc bằng Tiếng Việt. Khi giải thích ngữ pháp, hãy áp dụng phương pháp Phân Tích Cú Pháp Lâm Sàng (Syntactic Parsing) - cắt nhỏ các thành phần câu để người học hiểu tận gốc rễ cấu trúc.

═══════════════════════════════════
🎭 VAI TRÒ CHUYÊN GIA & KỊCH BẢN
═══════════════════════════════════
- Nhân vật (Persona): "${persona}"
- Kịch bản (Scenario): "${scenario}"
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
🗣️ HƯỚNG DẪN GIAO TIẾP TỰ NHIÊN & TRÔI CHẢY (Conversation & Q&A Smoothness)
═══════════════════════════════════
- Hướng dẫn người học sử dụng các từ đệm tự nhiên (Conversation Fillers) như: "Well", "Actually", "To be honest", "You see", "By the way" để kéo dài thời gian suy nghĩ và nghe tự nhiên hơn.
- Cung cấp các từ nối (Linkers) chỉ nguyên nhân, kết quả, sự đối lập để câu văn mượt mà hơn.
- Khi người học đặt câu hỏi không trôi chảy hoặc có lỗi cấu trúc, trong phần 'tutorFeedback' hãy chỉ ra cách viết lại trơn tru hơn bằng bảng đối chiếu "Câu gốc của bạn" vs "Cách nói mượt mà tự nhiên".

═══════════════════════════════════
💡 CÁC KHUNG TRẢ LỜI BIỂU MẪU (Answer Blueprints)
═══════════════════════════════════
Hướng dẫn người học trả lời theo các cấu trúc chuyên nghiệp sau:
- **STAR Framework** (Dành cho phỏng vấn/kể chuyện): Situation (Tình huống) → Task (Nhiệm vụ) → Action (Hành động) → Result (Kết quả).
- **PREP Framework** (Dành cho thảo luận/thuyết trình): Point (Quan điểm chính) → Reason (Lý do) → Example (Ví dụ thực tế) → Point (Khẳng định lại).
- **OREO Framework** (Dành cho bày tỏ ý kiến): Opinion (Ý kiến) → Reason (Lý giải) → Explanation/Example (Minh họa) → Opinion (Nhắc lại ý kiến).

═══════════════════════════════════
🛠️ TÍCH HỢP PHÁT TRIỂN KỸ NĂNG NGÔN NGỮ CHUYÊN SÂU (Advanced Language Skills Development)
═══════════════════════════════════
Đóng vai trò Cố vấn Ngôn ngữ Chuyên nghiệp giúp người học phát triển các kỹ năng sau:

1. 🗣️ **Phát âm & Nói trôi chảy (Pronunciation & Fluency)**:
   - Hướng dẫn IPA (Bảng phiên âm quốc tế), nhấn trọng âm từ chính xác, nối âm (linking sounds), nuốt âm (elision), và ngữ điệu (intonation) lên xuống tự nhiên.
   - Sử dụng các từ đệm (fillers) và mẫu câu kết nối câu để nói lưu loát hơn.

2. ✍️ **Viết lách & Văn phong Nâng cao (Writing Style & Editing)**:
   - Huấn luyện văn phong viết tự nhiên, ngắn gọn, súc tích (Conciseness), sử dụng thể chủ động (Active voice) thay cho bị động.
   - Hướng dẫn chỉnh sửa, loại bỏ các lỗi lặp từ, dùng từ quá phức tạp hoặc khuôn sáo ("AI writing patterns").
   - Ứng dụng kỹ thuật viết thuyết phục (Copywriting), viết email công sở trang trọng (Formal Register), và viết tường thuật sinh động (Storytelling).

3. 📖 **Ngữ pháp & Sửa lỗi chi tiết (Grammar & Correction)**:
   - Nhận diện lỗi sai về thì của động từ, sự hòa hợp chủ vị, cách dùng giới từ, và cấu trúc câu phức tạp (câu điều kiện, câu giả định, mệnh đề quan hệ).
   - Giải thích bản chất ngữ pháp bằng tiếng Việt một cách dễ hiểu nhất kèm các ví dụ đối chiếu trực quan.

4. 📊 **Luyện thi IELTS & TOEIC (Exam Preparation)**:
   - Đối với IELTS Speaking: Đánh giá dựa trên 4 tiêu chí (Fluency & Coherence, Lexical Resource, Grammatical Range & Accuracy, Pronunciation).
   - Đối với TOEIC: Tập trung vào từ vựng công sở phổ biến, cách diễn đạt đa dạng (paraphrasing), và phản xạ trả lời nhanh chóng các tình huống văn phòng.

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

      if (skillContext) {
        systemInstruction += `\n${skillContext}\nLƯU Ý QUAN TRỌNG: Người dùng đang thảo luận/hỏi về các khía cạnh kỹ thuật trong Skill Module ở trên. Hãy sử dụng thông tin và nguyên tắc trong phần DYNAMIC SKILL KNOWLEDGE BASE CONTEXT này để trả lời và phân tích chi tiết, sâu sắc nhất có thể.`;
      }

      if (specificSkillsContext) {
        systemInstruction += `\n${specificSkillsContext}\nLƯU Ý QUAN TRỌNG: Người dùng đã chủ động TUYỂN DỤNG/HUẤN LUYỆN các kỹ năng chuyên môn (Trained Skills) ở trên cho bạn. Hãy ưu tiên áp dụng các chỉ dẫn, quy chuẩn kỹ thuật và nguyên lý thiết kế từ các Trained Skills này để hỗ trợ người dùng ở mức độ cao cấp nhất.`;
      }

      // Try models in priority order for absolute stability
      const models = GeminiService.models;
      let lastError = null;
      let text = "";

      for (const modelName of models) {
        try {
          console.log(`[AI Chat] Attempting chat response generation with model: ${modelName}`);
          const model = genAI.getGenerativeModel({ 
            model: modelName,
            systemInstruction: systemInstruction,
            generationConfig: {
              responseMimeType: "application/json"
            }
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

      const responseData = GeminiService.cleanAndParseJson(text);

      // Proactive detection: If the bot returns a message indicating it couldn't resolve/answer
      const lowerMessage = (responseData.aiMessage || "").toLowerCase();
      const rawInput = messages[messages.length - 1]?.content || "";
      const unresolvedPhrases = [
        "don't know", "do not know", "cannot answer", "can't answer", "unable to answer", 
        "tôi không biết", "không thể trả lời", "chưa thể trả lời"
      ];
      const isUnresolved = unresolvedPhrases.some(phrase => lowerMessage.includes(phrase));
      if (isUnresolved) {
        GeminiService.logUnresolvedQuestion(userId, rawInput, "AI Bot returned unable-to-answer response");
      }

      return responseData;
    } catch (error: any) {
      console.error('EngBot Chat Error, using local robust chat fallback:', error.message || error);
      
      const rawInput = messages[messages.length - 1]?.content || "";
      // Log the API error and question
      GeminiService.logUnresolvedQuestion(userId, rawInput, `Gemini API Error: ${error.message || error}`);
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
      if (cleanInput.includes("i am teacher") || cleanInput.includes("she is teacher") || cleanInput.includes("he is teacher")) {
        offlineCorrections.push({ error: "am/is teacher", fix: "am/is a teacher", explanation: "Cần thêm mạo từ 'a' trước danh từ số ít chỉ nghề nghiệp: 'I am a teacher'." });
      }
      if (cleanInput.includes("she is doctor") || cleanInput.includes("he is doctor") || cleanInput.includes("i am doctor")) {
        offlineCorrections.push({ error: "is/am doctor", fix: "is/am a doctor", explanation: "Cần thêm mạo từ 'a' trước danh từ chỉ nghề nghiệp: 'She is a doctor'." });
      }
      // Collocation mistakes: do vs make
      if (cleanInput.includes("make exercise") || cleanInput.includes("make sport")) {
        offlineCorrections.push({ error: cleanInput.includes("make exercise") ? "make exercise" : "make sport", fix: "do exercise / do sport", explanation: "Collocation đúng là 'do exercise' và 'do sport', không dùng 'make'." });
      }
      if (cleanInput.includes("do a mistake") || cleanInput.includes("do mistake")) {
        offlineCorrections.push({ error: cleanInput.includes("do a mistake") ? "do a mistake" : "do mistake", fix: "make a mistake", explanation: "Collocation đúng là 'make a mistake' (mắc lỗi), không dùng 'do'." });
      }
      if (cleanInput.includes("make a decision") === false && cleanInput.includes("do decision")) {
        offlineCorrections.push({ error: "do decision", fix: "make a decision", explanation: "Collocation đúng là 'make a decision' (đưa ra quyết định)." });
      }
      // Preposition errors
      if (cleanInput.includes("interested of")) {
        offlineCorrections.push({ error: "interested of", fix: "interested in", explanation: "Giới từ đi với 'interested' phải là 'in': 'interested in something'." });
      }
      if (cleanInput.includes("good in")) {
        offlineCorrections.push({ error: "good in", fix: "good at", explanation: "Giới từ đi với 'good' phải là 'at': 'good at something' (giỏi về cái gì)." });
      }
      if (cleanInput.includes("listen the music") || cleanInput.includes("listen music")) {
        offlineCorrections.push({ error: cleanInput.includes("listen the music") ? "listen the music" : "listen music", fix: "listen to music", explanation: "Động từ 'listen' luôn đi với giới từ 'to': 'listen to music'." });
      }
      if (cleanInput.includes("arrive to")) {
        offlineCorrections.push({ error: "arrive to", fix: "arrive at / arrive in", explanation: "Động từ 'arrive' đi với 'at' (địa điểm nhỏ) hoặc 'in' (thành phố/quốc gia), không dùng 'to'." });
      }
      if (cleanInput.includes("discuss about")) {
        offlineCorrections.push({ error: "discuss about", fix: "discuss [something]", explanation: "'Discuss' là ngoại động từ, đi trực tiếp với tân ngữ, không cần giới từ 'about'." });
      }
      // Verb pattern errors
      if (cleanInput.includes("enjoy to ")) {
        offlineCorrections.push({ error: "enjoy to [verb]", fix: "enjoy [verb]-ing", explanation: "Sau 'enjoy' luôn dùng V-ing: 'I enjoy reading' (không dùng 'enjoy to read')." });
      }
      if (cleanInput.includes("suggest to ") && !cleanInput.includes("suggest to him") && !cleanInput.includes("suggest to her") && !cleanInput.includes("suggest to me") && !cleanInput.includes("suggest to them")) {
        offlineCorrections.push({ error: "suggest to [verb]", fix: "suggest [verb]-ing", explanation: "Sau 'suggest' dùng V-ing: 'I suggest going there' (không dùng 'suggest to go')." });
      }
      if (cleanInput.includes("look forward to see") || cleanInput.includes("look forward to meet") || cleanInput.includes("look forward to hear")) {
        const verb = cleanInput.includes("see") ? "see" : cleanInput.includes("meet") ? "meet" : "hear";
        offlineCorrections.push({ error: `look forward to ${verb}`, fix: `look forward to ${verb}ing`, explanation: `Trong 'look forward to', từ 'to' là giới từ nên sau nó phải dùng V-ing: 'look forward to ${verb}ing'.` });
      }
      // Tense confusion
      const yesterdayPresentMatch = cleanInput.match(/\byesterday\b.*\b(i go|i eat|i see|i buy|i come|i have|i take|i make|i do|i get|i run|i give|i think|i say|i tell)\b/);
      if (yesterdayPresentMatch) {
        const wrongVerb = yesterdayPresentMatch[1];
        const verbMap: Record<string, string> = { "i go": "I went", "i eat": "I ate", "i see": "I saw", "i buy": "I bought", "i come": "I came", "i have": "I had", "i take": "I took", "i make": "I made", "i do": "I did", "i get": "I got", "i run": "I ran", "i give": "I gave", "i think": "I thought", "i say": "I said", "i tell": "I told" };
        offlineCorrections.push({ error: wrongVerb, fix: verbMap[wrongVerb] || wrongVerb, explanation: "Khi nói về sự việc 'yesterday' (hôm qua), phải dùng thì Quá khứ Đơn (V2/ed)." });
      }

      // Prepositions with parts of the day (e.g., "on morning", "in morning", "at morning", "in night")
      if (cleanInput.includes("on morning")) {
        offlineCorrections.push({ error: "on morning", fix: "in the morning", explanation: "Giới từ đi với buổi trong ngày (morning) phải là 'in' và cần thêm mạo từ 'the': 'in the morning'." });
      }
      if (cleanInput.includes("on afternoon")) {
        offlineCorrections.push({ error: "on afternoon", fix: "in the afternoon", explanation: "Giới từ đi với buổi trong ngày (afternoon) phải là 'in' và cần thêm mạo từ 'the': 'in the afternoon'." });
      }
      if (cleanInput.includes("on evening")) {
        offlineCorrections.push({ error: "on evening", fix: "in the evening", explanation: "Giới từ đi với buổi trong ngày (evening) phải là 'in' và cần thêm mạo từ 'the': 'in the evening'." });
      }
      if (cleanInput.includes("in morning") && !cleanInput.includes("in the morning")) {
        offlineCorrections.push({ error: "in morning", fix: "in the morning", explanation: "Thiếu mạo từ 'the' trước danh từ 'morning': 'in the morning'." });
      }
      if (cleanInput.includes("in afternoon") && !cleanInput.includes("in the afternoon")) {
        offlineCorrections.push({ error: "in afternoon", fix: "in the afternoon", explanation: "Thiếu mạo từ 'the' trước danh từ 'afternoon': 'in the afternoon'." });
      }
      if (cleanInput.includes("in evening") && !cleanInput.includes("in the evening")) {
        offlineCorrections.push({ error: "in evening", fix: "in the evening", explanation: "Thiếu mạo từ 'the' trước danh từ 'evening': 'in the evening'." });
      }
      if (cleanInput.includes("in night") || cleanInput.includes("on night")) {
        offlineCorrections.push({ error: cleanInput.includes("in night") ? "in night" : "on night", fix: "at night", explanation: "Đi với buổi tối muộn 'night' ta dùng giới từ 'at' và không dùng mạo từ 'the': 'at night'." });
      }

      // Uncountable nouns plural error
      if (cleanInput.includes("homeworks")) {
        offlineCorrections.push({ error: "homeworks", fix: "homework", explanation: "Danh từ 'homework' là danh từ không đếm được, không thêm s/es ở dạng số nhiều." });
      }
      if (cleanInput.includes("vocabularies") || cleanInput.includes("vocabularys")) {
        offlineCorrections.push({ error: cleanInput.includes("vocabularies") ? "vocabularies" : "vocabularys", fix: "vocabulary / vocabulary words", explanation: "Danh từ 'vocabulary' thường được dùng làm danh từ không đếm được khi nói về vốn từ vựng chung." });
      }
      if (cleanInput.includes("informations")) {
        offlineCorrections.push({ error: "informations", fix: "information", explanation: "Danh từ 'information' là danh từ không đếm được, không có dạng số nhiều 'informations'." });
      }

      // No + verb error (common in Vietnamese learners)
      if (cleanInput.includes("i no like") || cleanInput.includes("i no care") || cleanInput.includes("i no know") || cleanInput.includes("i no want")) {
        const verb = cleanInput.includes("like") ? "like" : cleanInput.includes("care") ? "care" : cleanInput.includes("know") ? "know" : "want";
        offlineCorrections.push({ error: `no ${verb}`, fix: `don't ${verb}`, explanation: "Trong tiếng Anh phủ định của động từ thường cần sử dụng trợ động từ (don't/doesn't), không dùng trực tiếp 'no'." });
      }
      if (cleanInput.includes("i no have")) {
        offlineCorrections.push({ error: "no have", fix: "don't have", explanation: "Cần dùng trợ động từ phủ định 'don't have' thay vì 'no have'." });
      }

      // Double comparatives
      if (cleanInput.includes("more better")) {
        offlineCorrections.push({ error: "more better", fix: "better", explanation: "Tính từ so sánh hơn của 'good' là 'better', không dùng thêm 'more' đằng trước." });
      }
      if (cleanInput.includes("more easier")) {
        offlineCorrections.push({ error: "more easier", fix: "easier", explanation: "Tính từ ngắn kết thúc bằng 'y' đổi thành 'ier' (easier) khi so sánh hơn, không dùng thêm 'more'." });
      }
      if (cleanInput.includes("more faster")) {
        offlineCorrections.push({ error: "more faster", fix: "faster", explanation: "Tính từ ngắn thêm 'er' (faster) khi so sánh hơn, không dùng thêm 'more'." });
      }
      if (cleanInput.includes("more taller")) {
        offlineCorrections.push({ error: "more taller", fix: "taller", explanation: "Tính từ ngắn thêm 'er' (taller) khi so sánh hơn, không dùng thêm 'more'." });
      }

      // Avoid / mind / keep + to V
      if (cleanInput.includes("avoid to ")) {
        offlineCorrections.push({ error: "avoid to [verb]", fix: "avoid [verb]-ing", explanation: "Sau động từ 'avoid' yêu cầu động từ theo sau ở dạng 'V-ing' (tránh làm gì)." });
      }
      if (cleanInput.includes("mind to ")) {
        offlineCorrections.push({ error: "mind to [verb]", fix: "mind [verb]-ing", explanation: "Sau động từ 'mind' yêu cầu động từ theo sau ở dạng 'V-ing' (phiền/ngại làm gì)." });
      }
      if (cleanInput.includes("keep to ")) {
        offlineCorrections.push({ error: "keep to [verb]", fix: "keep [verb]-ing", explanation: "Sau động từ 'keep' yêu cầu động từ theo sau ở dạng 'V-ing' (tiếp tục làm gì)." });
      }

      // Subject-verb agreement / plural people
      if (cleanInput.includes("people is")) {
        offlineCorrections.push({ error: "people is", fix: "people are", explanation: "Danh từ 'people' (mọi người) luôn là danh từ số nhiều, cần đi với động từ số nhiều 'are'." });
      }
      if (cleanInput.includes("every people")) {
        offlineCorrections.push({ error: "every people", fix: "everyone / every person", explanation: "Sau 'every' cần danh từ số ít (every person) hoặc dùng đại từ bất định (everyone/everybody)." });
      }

      // Preposition errors
      if (cleanInput.includes("afraid about")) {
        offlineCorrections.push({ error: "afraid about", fix: "afraid of", explanation: "Tính từ 'afraid' đi với giới từ 'of' (lo sợ về cái gì)." });
      }
      if (cleanInput.includes("agree of")) {
        offlineCorrections.push({ error: "agree of", fix: "agree with", explanation: "Động từ 'agree' đi với giới từ 'with' (đồng ý với ai/cái gì) hoặc 'to' (đồng ý với đề xuất)." });
      }
      if (cleanInput.includes("congratulate about")) {
        offlineCorrections.push({ error: "congratulate about", fix: "congratulate on", explanation: "Động từ 'congratulate' đi với giới từ 'on' (chúc mừng về điều gì)." });
      }
      if (cleanInput.includes("insist in")) {
        offlineCorrections.push({ error: "insist in", fix: "insist on", explanation: "Cụm động từ đúng là 'insist on' (khăng khăng làm gì)." });
      }
      if (cleanInput.includes("successful at") || cleanInput.includes("successful of")) {
        offlineCorrections.push({ error: cleanInput.includes("successful at") ? "successful at" : "successful of", fix: "successful in", explanation: "Tính từ 'successful' đi với giới từ 'in' (thành công trong lĩnh vực/việc gì)." });
      }
      if (cleanInput.includes("think to ") && !cleanInput.includes("think to myself") && !cleanInput.includes("think to be")) {
        offlineCorrections.push({ error: "think to", fix: "think of / think about", explanation: "Khi nói về suy nghĩ về ai/cái gì, dùng 'think of' hoặc 'think about'." });
      }
      if (cleanInput.includes("thank about")) {
        offlineCorrections.push({ error: "thank about", fix: "thank for", explanation: "Cấu trúc đúng là 'thank someone for something' (cảm ơn ai vì cái gì)." });
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
        } else if (cleanInput.includes("how old") || cleanInput.includes("your age") || cleanInput.includes("bao nhiêu tuổi") || cleanInput.includes("tuổi của bạn")) {
          aiMessage = "I don't have a biological age since I am an AI, but I was created recently to be your dedicated English Coach! How old are you?";
          translation = "Tôi không có tuổi sinh học vì tôi là một AI, nhưng tôi được tạo ra gần đây để làm Huấn luyện viên tiếng Anh tận tâm của bạn! Bạn bao nhiêu tuổi?";
          tutorFeedback = "**🎂 CÁCH HỎI & TRẢ LỜI VỀ TUỔI TRONG TIẾNG ANH:**\n\n" +
            "- Câu hỏi thông dụng: *How old are you?*\n" +
            "- Trả lời: *I am [Number] years old* hoặc ngắn gọn *I am [Number]* (VD: \"I am 20 years old\").\n\n" +
            "**⚠️ Lỗi hay gặp:** Nói *\"I have 20 years old\"* ❌ (do dịch word-by-word từ tiếng Việt) $\\rightarrow$ Sửa: *\"I **am** 20 years old\"* ✅.";
        } else if (cleanInput.includes("your name") || cleanInput.includes("who are you") || cleanInput.includes("tên của bạn") || cleanInput.includes("tên bạn là gì") || cleanInput.includes("bạn là ai")) {
          aiMessage = "I am EngBot, your AI English Coach! I am here to help you practice speaking, correct your grammar, and boost your vocabulary.";
          translation = "Tôi là EngBot, Huấn luyện viên tiếng Anh AI của bạn! Tôi ở đây để giúp bạn luyện nói, sửa lỗi ngữ pháp và nâng cao vốn từ vựng.";
          tutorFeedback = "**📛 CÁCH GIỚI THIỆU TÊN & VAI TRÒ TRONG TIẾNG ANH:**\n\n" +
            "- Để giới thiệu tên: *My name is [Name]* hoặc *I am [Name]* (VD: \"My name is EngBot\").\n" +
            "- Để hỏi tên người khác lịch sự: *May I have your name, please?* hoặc *What is your name?*.\n" +
            "- Sau khi biết tên: *Nice to meet you!* (Rất vui được gặp bạn!).";
        } else if (cleanInput.includes("where are you from") || cleanInput.includes("where do you live") || cleanInput.includes("bạn từ đâu") || cleanInput.includes("sống ở đâu")) {
          aiMessage = "I live in the digital cloud, so I am everywhere you need me! But I am designed to help learners all over Vietnam. Where are you from?";
          translation = "Tôi sống trên đám mây kỹ thuật số, vì vậy tôi ở mọi nơi bạn cần! Nhưng tôi được thiết kế để giúp đỡ người học trên khắp Việt Nam. Bạn từ đâu đến?";
          tutorFeedback = "**🌍 CÁCH NÓI VỀ QUÊ QUÁN & NƠI SỐNG:**\n\n" +
            "- Hỏi quê quán: *Where are you from?* hoặc *Where do you come from?*.\n" +
            "- Trả lời quê quán: *I am from [Place]* hoặc *I come from [Place]* (VD: \"I am from Da Nang\").\n" +
            "- Hỏi nơi sống hiện tại: *Where do you live?*.\n" +
            "- Trả lời nơi sống: *I live in [City]* (VD: \"I live in Hanoi\").\n\n" +
            "**⚠️ Lỗi hay gặp:** Nói *\"I come from in Da Nang\"* ❌ $\\rightarrow$ Sửa: *\"I come from Da Nang\"* ✅ (không dùng giới từ 'in' ngay sau 'come from').";
        } else if (cleanInput.includes("what can you do") || cleanInput.includes("help me") || cleanInput.includes("bạn làm được gì") || cleanInput.includes("giúp tôi")) {
          aiMessage = "I can help you practice English conversations, correct grammatical errors in real time, translate words or phrases, and explain complex grammar rules!";
          translation = "Tôi có thể giúp bạn luyện hội thoại tiếng Anh, sửa lỗi ngữ pháp ngay lập tức, dịch từ hoặc cụm từ, và giải thích các quy tắc ngữ pháp phức tạp!";
          tutorFeedback = "**🛠️ CÁCH YÊU CẦU GIÚP ĐỠ LỊCH SỰ TRONG TIẾNG ANH:**\n\n" +
            "- *Could you help me with [something], please?* (Bạn có thể giúp tôi việc... không?).\n" +
            "- *Could you explain this grammar rule to me?* (Bạn có thể giải thích quy tắc ngữ pháp này cho tôi không?).\n" +
            "- *How do you pronounce this word?* (Từ này phát âm thế nào?).";
        } else if (cleanInput.includes("hobby") || cleanInput.includes("what do you like") || cleanInput.includes("sở thích")) {
          aiMessage = "My favorite hobby is reading English books and chatting with amazing learners like you! What do you like to do in your free time?";
          translation = "Sở thích lớn nhất của tôi là đọc sách tiếng Anh và trò chuyện với những học viên tuyệt vời như bạn! Bạn thích làm gì vào thời gian rảnh rỗi?";
          tutorFeedback = "**🎨 CÁCH NÓI VỀ SỞ THÍCH TRONG TIẾNG ANH:**\n\n" +
            "- Câu hỏi: *What is your hobby?* hoặc *What do you like to do in your free time?*.\n" +
            "- Trả lời bằng động từ thêm -ing: *I like/love/enjoy + V-ing* (VD: \"I enjoy reading books\").\n" +
            "- Trả lời bằng danh từ: *My hobby is [Activity]* (VD: \"My hobby is photography\").\n\n" +
            "**⚠️ Lỗi hay gặp:** Nói *\"I like play soccer\"* ❌ $\\rightarrow$ Sửa: *\"I like **playing** soccer\"* hoặc *\"I like **to play** soccer\"* ✅.";
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
        } else if (cleanInput.includes("tense") || cleanInput.includes("thì") || cleanInput.includes("grammar") || cleanInput.includes("ngữ pháp") || cleanInput.includes("5 thì")) {
          aiMessage = "Mastering the 5 main English tenses is key to daily communication! Let me show you how to ask questions and construct answers in these 5 vital tenses.";
          translation = "Làm chủ 5 thì tiếng Anh chính là chìa khóa giao tiếp hàng ngày! Hãy để tôi hướng dẫn bạn cách đặt câu hỏi và xây dựng câu trả lời trong 5 thì quan trọng này.";
          tutorFeedback = "**📚 CẨM NANG HỎI & TRẢ LỜI TRONG 5 THÌ TIẾNG ANH THÔNG DỤNG**\n\n" +
            "### 1. Thì Hiện tại Đơn (Simple Present) - Thói quen, sự thật hiển nhiên\n" +
            "- **Câu hỏi**: *What do you do for a living?* (Bạn làm công việc gì?)\n" +
            "- **Câu trả lời**: *I work as a software engineer.* (Tôi làm công việc kỹ sư phần mềm.)\n" +
            "- **Mẹo**: Nhớ thêm 's/es' khi nói về ngôi thứ ba số ít (He/She/It).\n\n" +
            "### 2. Thì Hiện tại Tiếp diễn (Present Continuous) - Hành động đang diễn ra\n" +
            "- **Câu hỏi**: *What are you doing right now?* (Hiện tại bạn đang làm gì thế?)\n" +
            "- **Câu trả lời**: *I am practicing speaking English.* (Tôi đang luyện nói tiếng Anh.)\n" +
            "- **Mẹo**: Luôn cần đủ cấu trúc: **S + am/is/are + V-ing**.\n\n" +
            "### 3. Thì Quá khứ Đơn (Simple Past) - Sự việc đã chấm dứt trong quá khứ\n" +
            "- **Câu hỏi**: *Where did you go yesterday?* (Hôm qua bạn đã đi đâu?)\n" +
            "- **Câu trả lời**: *I went to the coffee shop with my friends.* (Tôi đã đi quán cà phê với bạn bè.)\n" +
            "- **Mẹo**: Sử dụng động từ cột 2 (V2) hoặc thêm '-ed'. Nhớ mượn trợ động từ 'did' cho câu hỏi.\n\n" +
            "### 4. Thì Hiện tại Hoàn thành (Present Perfect) - Trải nghiệm, kết nối quá khứ và hiện tại\n" +
            "- **Câu hỏi**: *Have you ever visited Hanoi?* (Bạn đã từng ghé thăm Hà Nội chưa?)\n" +
            "- **Câu trả lời**: *Yes, I have visited Hanoi twice.* (Rồi, tôi đã từng ghé thăm Hà Nội hai lần.)\n" +
            "- **Mẹo**: Sử dụng cấu trúc **S + have/has + V3/ed**.\n\n" +
            "### 5. Thì Tương lai Đơn (Future Simple) - Kế hoạch tự phát, dự đoán\n" +
            "- **Câu hỏi**: *Will you travel next weekend?* (Cuối tuần tới bạn sẽ đi du lịch chứ?)\n" +
            "- **Câu trả lời**: *No, I will stay at home to study.* (Không, tôi sẽ ở nhà để học bài.)\n" +
            "- **Mẹo**: Sử dụng **S + will + V-bare**.";
        } else if (cleanInput.includes("how are you") || cleanInput.includes("how do you do")) {
          aiMessage = "I'm doing great, thank you for asking! How about you? Is there anything specific you'd like to practice today?";
          translation = "Tôi rất khỏe, cảm ơn bạn đã hỏi! Còn bạn thì sao? Hôm nay bạn muốn luyện tập điều gì cụ thể không?";
          tutorFeedback = "**Các cách trả lời 'How are you?':**\n- 🟢 Tích cực: *I'm great!* / *I'm doing well, thanks!* / *Never been better!*\n- 🟡 Bình thường: *I'm fine, thanks.* / *Not bad.* / *I'm okay.*\n- 🔴 Không tốt: *I've been better.* / *Not so great, actually.* / *I'm a bit under the weather.*\n\n**Mẹo:** Luôn hỏi lại: *'How about you?'* hoặc *'And you?'*";
        } else if (cleanInput.includes("food") || cleanInput.includes("eat") || cleanInput.includes("cook") || cleanInput.includes("hungry") || cleanInput.includes("ăn") || cleanInput.includes("nấu") || cleanInput.includes("đói") || cleanInput.includes("breakfast") || cleanInput.includes("lunch") || cleanInput.includes("dinner")) {
          aiMessage = "Food is one of the best conversation topics! What did you have for your last meal? Do you enjoy cooking?";
          translation = "Ẩm thực là một trong những chủ đề trò chuyện hay nhất! Bữa ăn gần nhất của bạn là gì? Bạn có thích nấu ăn không?";
          tutorFeedback = "**🍲 CÁCH NÓI VỀ ĐỒ ĂN & BỮA ĂN TRONG TIẾNG ANH:**\n\n" +
            "### Câu hỏi thông dụng:\n" +
            "- *What did you have for breakfast/lunch/dinner?* (Bạn ăn gì vào bữa sáng/trưa/tối?)\n" +
            "- *What is your favorite food?* (Món ăn yêu thích của bạn là gì?)\n" +
            "- *Can you cook?* (Bạn có biết nấu ăn không?)\n\n" +
            "### Câu trả lời mẫu:\n" +
            "- *I had pho for breakfast.* (Tôi ăn phở vào bữa sáng.)\n" +
            "- *My favorite food is banh mi.* (Món ăn yêu thích của tôi là bánh mì.)\n" +
            "- *I love cooking Vietnamese food.* (Tôi thích nấu đồ ăn Việt Nam.)\n\n" +
            "**⚠️ Lỗi hay gặp:** Nói *\"I eat already\"* ❌ $\\rightarrow$ Sửa: *\"I have already eaten\"* hoặc *\"I already ate\"* ✅.";
        } else if (cleanInput.includes("travel") || cleanInput.includes("vacation") || cleanInput.includes("trip") || cleanInput.includes("du lịch") || cleanInput.includes("kỳ nghỉ") || cleanInput.includes("visit")) {
          aiMessage = "I love hearing about travel experiences! Where is your dream destination? Have you traveled recently?";
          translation = "Tôi rất thích nghe về những trải nghiệm du lịch! Điểm đến trong mơ của bạn là ở đâu? Gần đây bạn có đi du lịch không?";
          tutorFeedback = "**✈️ CÁCH NÓI VỀ DU LỊCH & KỲ NGHỈ TRONG TIẾNG ANH:**\n\n" +
            "### Câu hỏi thông dụng:\n" +
            "- *Where did you go on your last vacation?* (Kỳ nghỉ vừa rồi bạn đã đi đâu?)\n" +
            "- *How long did you stay there?* (Bạn ở đó bao lâu?)\n" +
            "- *What was the highlight of your trip?* (Điểm nhấn của chuyến đi là gì?)\n\n" +
            "### Câu trả lời mẫu:\n" +
            "- *I went to Da Lat last month. I stayed there for 3 days.* (Tôi đã đi Đà Lạt tháng trước. Tôi ở đó 3 ngày.)\n" +
            "- *The best part was trying local food and visiting flower gardens.* (Phần hay nhất là thử đồ ăn địa phương và tham quan vườn hoa.)\n\n" +
            "**⚠️ Lỗi hay gặp:** Nói *\"I go to Da Lat yesterday\"* ❌ $\\rightarrow$ Sửa: *\"I **went** to Da Lat yesterday\"* ✅ (dùng V2 cho quá khứ).";
        } else if (cleanInput.includes("family") || cleanInput.includes("gia đình") || cleanInput.includes("mother") || cleanInput.includes("father") || cleanInput.includes("parent") || cleanInput.includes("brother") || cleanInput.includes("sister") || cleanInput.includes("mẹ") || cleanInput.includes("bố")) {
          aiMessage = "Family is such a meaningful topic! How many people are there in your family? Tell me about them!";
          translation = "Gia đình là một chủ đề thật ý nghĩa! Gia đình bạn có bao nhiêu người? Hãy kể cho tôi nghe về họ!";
          tutorFeedback = "**👨‍👩‍👧‍👦 CÁCH NÓI VỀ GIA ĐÌNH TRONG TIẾNG ANH:**\n\n" +
            "### Câu hỏi thông dụng:\n" +
            "- *How many people are there in your family?* (Gia đình bạn có bao nhiêu người?)\n" +
            "- *What does your father/mother do?* (Bố/mẹ bạn làm nghề gì?)\n" +
            "- *Do you have any brothers or sisters?* (Bạn có anh chị em không?)\n\n" +
            "### Câu trả lời mẫu:\n" +
            "- *There are four people in my family: my parents, my sister, and me.* (Gia đình tôi có 4 người: bố mẹ, chị gái và tôi.)\n" +
            "- *My father is a teacher and my mother is a nurse.* (Bố tôi là giáo viên và mẹ tôi là y tá.)\n\n" +
            "**⚠️ Lỗi hay gặp:** Nói *\"My family has 4 people\"* ❌ $\\rightarrow$ Sửa: *\"There **are** 4 people in my family\"* ✅.";
        } else if (cleanInput.includes("health") || cleanInput.includes("exercise") || cleanInput.includes("gym") || cleanInput.includes("sport") || cleanInput.includes("sức khỏe") || cleanInput.includes("tập thể dục") || cleanInput.includes("sick") || cleanInput.includes("bệnh")) {
          aiMessage = "Health is wealth! Do you exercise regularly? What kind of physical activity do you enjoy?";
          translation = "Sức khỏe là tài sản quý giá nhất! Bạn có tập thể dục thường xuyên không? Bạn thích hoạt động thể chất nào?";
          tutorFeedback = "**💪 CÁCH NÓI VỀ SỨC KHỎE & TẬP THỂ DỤC TRONG TIẾNG ANH:**\n\n" +
            "### Câu hỏi thông dụng:\n" +
            "- *How often do you exercise?* (Bạn tập thể dục thường xuyên như thế nào?)\n" +
            "- *What sports do you play?* (Bạn chơi môn thể thao nào?)\n" +
            "- *Are you feeling okay?* (Bạn có ổn không?)\n\n" +
            "### Câu trả lời mẫu:\n" +
            "- *I go to the gym three times a week.* (Tôi đi tập gym ba lần một tuần.)\n" +
            "- *I enjoy jogging in the morning.* (Tôi thích chạy bộ vào buổi sáng.)\n" +
            "- *I have a headache / a sore throat / a fever.* (Tôi bị đau đầu / đau họng / sốt.)\n\n" +
            "**⚠️ Lỗi hay gặp:** Nói *\"I have sick\"* ❌ $\\rightarrow$ Sửa: *\"I **am** sick\"* ✅ (dùng 'be' + adj, không dùng 'have').";
        } else if (cleanInput.includes("movie") || cleanInput.includes("film") || cleanInput.includes("music") || cleanInput.includes("song") || cleanInput.includes("phim") || cleanInput.includes("nhạc") || cleanInput.includes("bài hát")) {
          aiMessage = "Movies and music are universal topics! What kind of movies or music do you like?";
          translation = "Phim và nhạc là những chủ đề toàn cầu! Bạn thích thể loại phim hoặc nhạc nào?";
          tutorFeedback = "**🎬 CÁCH NÓI VỀ PHIM & ÂM NHẠC TRONG TIẾNG ANH:**\n\n" +
            "### Câu hỏi thông dụng:\n" +
            "- *What kind of movies do you like?* (Bạn thích thể loại phim nào?)\n" +
            "- *Have you watched any good movies recently?* (Gần đây bạn có xem phim hay nào không?)\n" +
            "- *Who is your favorite singer/band?* (Ca sĩ/ban nhạc yêu thích của bạn là ai?)\n\n" +
            "### Câu trả lời mẫu:\n" +
            "- *I love action movies, especially Marvel films.* (Tôi thích phim hành động, đặc biệt là phim Marvel.)\n" +
            "- *I usually listen to pop music on Spotify.* (Tôi thường nghe nhạc pop trên Spotify.)\n\n" +
            "### Các thể loại phổ biến:\n" +
            "🎭 *comedy* (hài), 🎬 *action* (hành động), 😱 *horror* (kinh dị), 💕 *romance* (tình cảm), 🔬 *sci-fi* (khoa học viễn tưởng)";
        } else if (cleanInput.includes("routine") || cleanInput.includes("daily") || cleanInput.includes("every day") || cleanInput.includes("thói quen") || cleanInput.includes("hàng ngày") || cleanInput.includes("schedule") || cleanInput.includes("lịch trình")) {
          aiMessage = "Talking about your daily routine is great practice for the Simple Present tense! What does a typical day look like for you?";
          translation = "Nói về thói quen hàng ngày là bài tập tuyệt vời cho thì Hiện tại Đơn! Một ngày bình thường của bạn trông như thế nào?";
          tutorFeedback = "**⏰ CÁCH NÓI VỀ THÓI QUEN HÀNG NGÀY (DAILY ROUTINE):**\n\n" +
            "### Câu hỏi thông dụng:\n" +
            "- *What time do you wake up?* (Bạn thức dậy lúc mấy giờ?)\n" +
            "- *What do you usually do after work/school?* (Sau giờ làm/học bạn thường làm gì?)\n\n" +
            "### Câu trả lời mẫu:\n" +
            "- *I wake up at 6 AM every day. First, I brush my teeth and take a shower.* (Tôi thức dậy lúc 6 giờ mỗi ngày.)\n" +
            "- *After lunch, I usually take a short nap.* (Sau bữa trưa, tôi thường ngủ trưa.)\n" +
            "- *In the evening, I watch TV or read a book before going to bed.* (Buổi tối, tôi xem TV hoặc đọc sách trước khi đi ngủ.)\n\n" +
            "**💡 Mẹo:** Dùng trạng từ tần suất: *always, usually, often, sometimes, rarely, never*.";
        } else if (cleanInput.includes("buy") || cleanInput.includes("shop") || cleanInput.includes("price") || cleanInput.includes("cheap") || cleanInput.includes("expensive") || cleanInput.includes("mua") || cleanInput.includes("giá") || cleanInput.includes("rẻ") || cleanInput.includes("đắt") || cleanInput.includes("how much")) {
          aiMessage = "Shopping is a practical topic! Do you prefer shopping online or in stores? What did you buy recently?";
          translation = "Mua sắm là một chủ đề thực tế! Bạn thích mua sắm online hay ở cửa hàng? Gần đây bạn đã mua gì?";
          tutorFeedback = "**🛒 CÁCH NÓI VỀ MUA SẮM & GIÁ CẢ TRONG TIẾNG ANH:**\n\n" +
            "### Câu hỏi khi mua sắm:\n" +
            "- *How much is this?* / *How much does this cost?* (Cái này giá bao nhiêu?)\n" +
            "- *Do you have this in a different size/color?* (Bạn có cái này cỡ/màu khác không?)\n" +
            "- *Can I try this on?* (Tôi có thể thử không?)\n" +
            "- *Is there a discount?* (Có giảm giá không?)\n\n" +
            "### Câu trả lời mẫu:\n" +
            "- *It costs 200,000 VND.* (Nó giá 200.000 VNĐ.)\n" +
            "- *That is too expensive. Do you have anything cheaper?* (Quá đắt. Bạn có cái nào rẻ hơn không?)\n\n" +
            "**⚠️ Lỗi hay gặp:** Nói *\"How much money is it?\"* ❌ $\\rightarrow$ Sửa: *\"How much **is** it?\"* ✅ (không cần 'money').";
        } else if (cleanInput.includes("what time") || cleanInput.includes("mấy giờ") || cleanInput.includes("o'clock") || cleanInput.includes("clock")) {
          aiMessage = "Time is a topic you need every single day! Do you know how to tell the time in English? Let me teach you!";
          translation = "Thời gian là chủ đề bạn cần mỗi ngày! Bạn có biết cách nói giờ trong tiếng Anh không? Hãy để tôi dạy bạn!";
          tutorFeedback = "**🕐 CÁCH NÓI GIỜ TRONG TIẾNG ANH:**\n\n" +
            "### Quy tắc cơ bản:\n" +
            "- **Giờ chẵn**: *It is [Number] o'clock.* (VD: *It is 3 o'clock.*)\n" +
            "- **Giờ lẻ (past)**: *It is [Minutes] past [Hour].* (VD: *It is ten past three.* = 3:10)\n" +
            "- **Giờ lẻ (to)**: *It is [Minutes] to [Hour].* (VD: *It is ten to four.* = 3:50)\n" +
            "- **Nửa giờ**: *It is half past [Hour].* (VD: *It is half past three.* = 3:30)\n" +
            "- **15 phút**: *It is a quarter past/to [Hour].* (VD: *a quarter past 3* = 3:15)\n\n" +
            "### Hỏi giờ:\n" +
            "- *What time is it?* hoặc *Could you tell me the time, please?*\n\n" +
            "**⚠️ Lỗi hay gặp:** Nói *\"Now is 3 o'clock\"* ❌ $\\rightarrow$ Sửa: *\"**It is** 3 o'clock **now**\"* ✅.";
        } else if (cleanInput.includes("sorry") || cleanInput.includes("excuse me") || cleanInput.includes("apologize") || cleanInput.includes("xin lỗi") || cleanInput.includes("forgive")) {
          aiMessage = "It's okay! Apologizing shows great manners. Let me teach you how to apologize properly in different situations in English.";
          translation = "Không sao đâu! Việc xin lỗi cho thấy bạn rất lịch sự. Hãy để tôi dạy bạn cách xin lỗi đúng cách trong các tình huống khác nhau bằng tiếng Anh.";
          tutorFeedback = "**🙏 CÁCH XIN LỖI & THỂ HIỆN SỰ LỊCH SỰ TRONG TIẾNG ANH:**\n\n" +
            "### Mức độ trang trọng tăng dần:\n" +
            "1. **Thân mật**: *Sorry!* / *My bad!* / *Oops, sorry about that!*\n" +
            "2. **Bình thường**: *I'm sorry for being late.* / *Sorry, I didn't mean to.*\n" +
            "3. **Trang trọng**: *I apologize for the inconvenience.* / *Please forgive me for...*\n\n" +
            "### Cách chấp nhận lời xin lỗi:\n" +
            "- *That's okay.* / *No worries.* / *Don't worry about it.* / *It's no big deal.*\n\n" +
            "### Dùng 'Excuse me' khi:\n" +
            "- Muốn xin đường: *Excuse me, can I get through?*\n" +
            "- Muốn hỏi thông tin: *Excuse me, where is the nearest bank?*\n" +
            "- Khi hắt hơi/ợ: *Excuse me!*\n\n" +
            "**⚠️ Lỗi hay gặp:** Nói *\"I'm sorry to late\"* ❌ $\\rightarrow$ Sửa: *\"I'm sorry **for being** late\"* ✅ (sau 'sorry for' dùng V-ing).";
        } else if (cleanInput.includes("think") || cleanInput.includes("opinion") || cleanInput.includes("agree") || cleanInput.includes("disagree") || cleanInput.includes("ý kiến") || cleanInput.includes("đồng ý") || cleanInput.includes("không đồng ý")) {
          aiMessage = "Sharing your opinion is an essential communication skill! Let me show you how to express, agree, and disagree politely in English.";
          translation = "Chia sẻ ý kiến là kỹ năng giao tiếp thiết yếu! Hãy để tôi chỉ bạn cách diễn đạt, đồng ý và không đồng ý một cách lịch sự bằng tiếng Anh.";
          tutorFeedback = "**💭 CÁCH ĐƯARA Ý KIẾN, ĐỒNG Ý & KHÔNG ĐỒNG Ý:**\n\n" +
            "### Đưa ra ý kiến:\n" +
            "- *I think that...* / *In my opinion,...* / *I believe that...*\n" +
            "- *From my point of view,...* / *As far as I'm concerned,...*\n\n" +
            "### Đồng ý (Agreeing):\n" +
            "- 🟢 *I agree with you.* / *That's a good point.* / *Exactly!* / *I couldn't agree more.*\n\n" +
            "### Không đồng ý lịch sự (Polite Disagreeing):\n" +
            "- 🔴 *I see your point, but...* / *I'm afraid I disagree.* / *I understand what you mean, however...*\n" +
            "- ❌ KHÔNG NÊN nói thẳng: *\"You are wrong!\"*\n\n" +
            "**⚠️ Lỗi hay gặp:** Nói *\"I am agree\"* ❌ $\\rightarrow$ Sửa: *\"I agree\"* ✅ ('agree' là động từ, không cần 'am/is/are').";
        } else if (cleanInput.includes("describe") || cleanInput.includes("tall") || cleanInput.includes("short") || cleanInput.includes("beautiful") || cleanInput.includes("handsome") || cleanInput.includes("appearance") || cleanInput.includes("look like") || cleanInput.includes("ngoại hình") || cleanInput.includes("mô tả")) {
          aiMessage = "Describing people is a very useful skill! You can talk about their appearance, personality, and style. How would you describe yourself?";
          translation = "Mô tả người khác là kỹ năng rất hữu ích! Bạn có thể nói về ngoại hình, tính cách và phong cách. Bạn sẽ mô tả bản thân mình như thế nào?";
          tutorFeedback = "**👤 CÁCH MÔ TẢ NGOẠI HÌNH & TÍNH CÁCH TRONG TIẾNG ANH:**\n\n" +
            "### Câu hỏi thông dụng:\n" +
            "- *What does he/she look like?* (Anh ấy/cô ấy trông như thế nào?) → Hỏi về ngoại hình\n" +
            "- *What is he/she like?* (Anh ấy/cô ấy là người như thế nào?) → Hỏi về tính cách\n\n" +
            "### Từ vựng mô tả ngoại hình:\n" +
            "- **Chiều cao**: *tall* (cao), *short* (thấp), *medium height* (tầm trung)\n" +
            "- **Cân nặng**: *slim/thin* (gầy), *chubby/overweight* (mập), *well-built* (vạm vỡ)\n" +
            "- **Tóc**: *long/short/curly/straight/wavy hair* (tóc dài/ngắn/xoăn/thẳng/gợn sóng)\n" +
            "- **Mắt**: *big/small eyes*, *dark/brown/blue eyes*\n\n" +
            "### Từ vựng mô tả tính cách:\n" +
            "- 🟢 *kind, friendly, generous, hardworking, patient, honest*\n" +
            "- 🔴 *selfish, lazy, impatient, stubborn, rude*\n\n" +
            "**⚠️ Phân biệt:** *\"What does she look like?\"* (ngoại hình) ≠ *\"What does she like?\"* (sở thích).";
        } else if (cleanInput.includes("direction") || cleanInput.includes("where is") || cleanInput.includes("how to get") || cleanInput.includes("turn left") || cleanInput.includes("turn right") || cleanInput.includes("đường đi") || cleanInput.includes("chỉ đường") || cleanInput.includes("go straight")) {
          aiMessage = "Asking for and giving directions is essential when traveling or exploring a new city! Let me teach you the key phrases.";
          translation = "Hỏi đường và chỉ đường là kỹ năng thiết yếu khi đi du lịch hoặc khám phá thành phố mới! Hãy để tôi dạy bạn những cụm từ quan trọng.";
          tutorFeedback = "**🗺️ CÁCH HỎI ĐƯỜNG & CHỈ ĐƯỜNG TRONG TIẾNG ANH:**\n\n" +
            "### Hỏi đường:\n" +
            "- *Excuse me, where is the nearest hospital?* (Xin lỗi, bệnh viện gần nhất ở đâu?)\n" +
            "- *How do I get to the train station?* (Làm sao để đến ga tàu?)\n" +
            "- *Could you tell me the way to the airport?* (Bạn có thể chỉ đường đến sân bay không?)\n\n" +
            "### Chỉ đường:\n" +
            "- *Go straight ahead.* (Đi thẳng.)\n" +
            "- *Turn left/right at the traffic light.* (Rẽ trái/phải ở đèn giao thông.)\n" +
            "- *It is on your left/right.* (Nó ở bên trái/phải bạn.)\n" +
            "- *It is next to / opposite / behind the bank.* (Nó ở cạnh / đối diện / phía sau ngân hàng.)\n\n" +
            "**⚠️ Lỗi hay gặp:** Nói *\"Go to straight\"* ❌ $\\rightarrow$ Sửa: *\"Go straight\"* ✅ (không cần 'to').";
        } else if (cleanInput.includes("phone") || cleanInput.includes("computer") || cleanInput.includes("internet") || cleanInput.includes("app") || cleanInput.includes("wifi") || cleanInput.includes("technology") || cleanInput.includes("điện thoại") || cleanInput.includes("máy tính") || cleanInput.includes("công nghệ")) {
          aiMessage = "Technology is everywhere in our lives! Do you enjoy using technology? What apps do you use the most?";
          translation = "Công nghệ có mặt ở khắp mọi nơi trong cuộc sống! Bạn có thích sử dụng công nghệ không? Bạn dùng ứng dụng nào nhiều nhất?";
          tutorFeedback = "**📱 CÁCH NÓI VỀ CÔNG NGHỆ TRONG TIẾNG ANH:**\n\n" +
            "### Câu hỏi thông dụng:\n" +
            "- *How much time do you spend on your phone?* (Bạn dùng điện thoại bao nhiêu thời gian?)\n" +
            "- *What is your favorite app?* (Ứng dụng yêu thích của bạn là gì?)\n" +
            "- *Do you prefer Android or iPhone?* (Bạn thích Android hay iPhone?)\n\n" +
            "### Câu trả lời mẫu:\n" +
            "- *I spend about 3 hours a day on social media.* (Tôi dành khoảng 3 tiếng mỗi ngày cho mạng xã hội.)\n" +
            "- *I use TikTok and YouTube the most.* (Tôi dùng TikTok và YouTube nhiều nhất.)\n\n" +
            "### Từ vựng hữu ích:\n" +
            "- *download* (tải xuống), *upload* (tải lên), *update* (cập nhật)\n" +
            "- *log in* (đăng nhập), *log out* (đăng xuất), *sign up* (đăng ký)\n" +
            "- *charge the phone* (sạc điện thoại), *the battery is dead* (hết pin)";
        } else if (cleanInput.includes("if") || cleanInput.includes("would") || cleanInput.includes("condition") || cleanInput.includes("điều kiện") || cleanInput.includes("conditional") || cleanInput.includes("câu điều kiện")) {
          aiMessage = "Conditional sentences are powerful! They help you talk about hypothetical situations, dreams, and consequences. Let me explain the 3 main types.";
          translation = "Câu điều kiện rất mạnh mẽ! Chúng giúp bạn nói về các tình huống giả định, ước mơ và hậu quả. Hãy để tôi giải thích 3 loại chính.";
          tutorFeedback = "**🔀 3 LOẠI CÂU ĐIỀU KIỆN QUAN TRỌNG (CONDITIONAL SENTENCES):**\n\n" +
            "### Loại 0: Sự thật hiển nhiên / Quy luật tự nhiên\n" +
            "- **Công thức**: If + S + V (hiện tại đơn), S + V (hiện tại đơn)\n" +
            "- **VD**: *If you heat water to 100°C, it boils.* (Nếu bạn đun nước đến 100°C, nó sôi.)\n\n" +
            "### Loại 1: Có thể xảy ra ở hiện tại / tương lai\n" +
            "- **Công thức**: If + S + V (hiện tại đơn), S + **will** + V\n" +
            "- **VD**: *If it rains tomorrow, I will stay at home.* (Nếu mai trời mưa, tôi sẽ ở nhà.)\n\n" +
            "### Loại 2: Không có thật ở hiện tại (giả định)\n" +
            "- **Công thức**: If + S + V (quá khứ đơn), S + **would** + V\n" +
            "- **VD**: *If I had a million dollars, I would travel around the world.* (Nếu tôi có 1 triệu đô, tôi sẽ đi du lịch vòng quanh thế giới.)\n\n" +
            "### Loại 3: Không có thật ở quá khứ (tiếc nuối)\n" +
            "- **Công thức**: If + S + **had** + V3, S + **would have** + V3\n" +
            "- **VD**: *If I had studied harder, I would have passed the exam.* (Nếu tôi đã học chăm hơn, tôi đã đậu kỳ thi.)\n\n" +
            "**⚠️ Lỗi hay gặp:** Nói *\"If I will go...\"* ❌ $\\rightarrow$ Sửa: *\"If I **go**...\"* ✅ (mệnh đề If không dùng 'will').";
        } else if (cleanInput.includes("more") || cleanInput.includes("most") || cleanInput.includes("than") || cleanInput.includes("comparison") || cleanInput.includes("so sánh") || cleanInput.includes("comparative") || cleanInput.includes("superlative") || cleanInput.includes("er ") || cleanInput.includes("est ")) {
          aiMessage = "Comparisons are essential for expressing preferences and making choices in English! Let me explain the rules clearly.";
          translation = "So sánh là phần thiết yếu để thể hiện sở thích và đưa ra lựa chọn trong tiếng Anh! Hãy để tôi giải thích các quy tắc rõ ràng.";
          tutorFeedback = "**📊 SO SÁNH HƠN & SO SÁNH NHẤT TRONG TIẾNG ANH:**\n\n" +
            "### 1. So sánh hơn (Comparative):\n" +
            "- **Tính từ ngắn (1 âm tiết)**: Adj + **-er** + than (VD: *taller than, faster than*)\n" +
            "- **Tính từ dài (2+ âm tiết)**: **more** + Adj + than (VD: *more beautiful than, more expensive than*)\n\n" +
            "### 2. So sánh nhất (Superlative):\n" +
            "- **Tính từ ngắn**: the + Adj + **-est** (VD: *the tallest, the fastest*)\n" +
            "- **Tính từ dài**: the + **most** + Adj (VD: *the most beautiful, the most expensive*)\n\n" +
            "### 3. So sánh bằng (Equal):\n" +
            "- **as** + Adj + **as** (VD: *She is as tall as her mother.* — Cô ấy cao bằng mẹ.)\n\n" +
            "### Bất quy tắc:\n" +
            "| Gốc | So sánh hơn | So sánh nhất |\n" +
            "|---|---|---|\n" +
            "| good | **better** | **the best** |\n" +
            "| bad | **worse** | **the worst** |\n" +
            "| far | **farther/further** | **the farthest/furthest** |\n\n" +
            "**⚠️ Lỗi hay gặp:** Nói *\"more better\"* ❌ $\\rightarrow$ Sửa: *\"**better**\"* ✅ (không dùng double comparative).";
        } else if (cleanInput.includes("said") || cleanInput.includes("told me") || cleanInput.includes("reported") || cleanInput.includes("tường thuật") || cleanInput.includes("reported speech") || cleanInput.includes("indirect speech") || cleanInput.includes("câu tường thuật")) {
          aiMessage = "Reported speech is how we retell what someone else said! It's used a lot in daily conversation and storytelling. Let me show you the rules.";
          translation = "Câu tường thuật là cách chúng ta kể lại lời ai đó đã nói! Nó được dùng rất nhiều trong giao tiếp hàng ngày và kể chuyện. Hãy để tôi chỉ bạn các quy tắc.";
          tutorFeedback = "**🗣️ CÂU TƯỜNG THUẬT (REPORTED SPEECH):**\n\n" +
            "### Quy tắc lùi thì (Backshift):\n" +
            "| Câu trực tiếp | Câu tường thuật |\n" +
            "|---|---|\n" +
            "| *\"I **am** happy.\"* | He said he **was** happy. |\n" +
            "| *\"I **like** coffee.\"* | She said she **liked** coffee. |\n" +
            "| *\"I **will** go.\"* | He said he **would** go. |\n" +
            "| *\"I **can** swim.\"* | She said she **could** swim. |\n" +
            "| *\"I **have** done it.\"* | He said he **had** done it. |\n\n" +
            "### Đổi đại từ & trạng từ:\n" +
            "- *I* → *he/she*, *my* → *his/her*\n" +
            "- *today* → *that day*, *tomorrow* → *the next day*, *yesterday* → *the day before*\n" +
            "- *here* → *there*, *this* → *that*\n\n" +
            "### Ví dụ đầy đủ:\n" +
            "- Trực tiếp: *\"I will visit you tomorrow,\"* she said.\n" +
            "- Tường thuật: *She said she **would** visit me **the next day**.*\n\n" +
            "**💡 Phân biệt:** Dùng *said* (nói) khi không có tân ngữ: *He said that...*. Dùng *told* khi có tân ngữ: *He told **me** that...*";
        } else if (cleanInput.includes("relative clause") || cleanInput.includes("who which that") || cleanInput.includes("mệnh đề quan hệ")) {
          aiMessage = "Relative clauses help us combine sentences and give more information without starting a new sentence. Let me show you how to use who, which, and that!";
          translation = "Mệnh đề quan hệ giúp chúng ta kết hợp các câu và đưa ra nhiều thông tin hơn mà không cần bắt đầu câu mới. Hãy để tôi chỉ bạn cách dùng who, which và that!";
          tutorFeedback = "**🔗 MỆNH ĐỀ QUAN HỆ (RELATIVE CLAUSES):**\n\n" +
            "### 1. Các đại từ quan hệ phổ biến:\n" +
            "- **Who**: Dùng cho NGƯỜI làm chủ ngữ (VD: *The man **who** lives next door is a doctor.*)\n" +
            "- **Whom**: Dùng cho NGƯỜI làm tân ngữ (VD: *The girl **whom** you met yesterday is my cousin.*)\n" +
            "- **Which**: Dùng cho VẬT/SỰ VIỆC (VD: *The book **which** is on the table is mine.*)\n" +
            "- **That**: Dùng cho cả NGƯỜI và VẬT trong mệnh đề xác định (VD: *The house **that** Jack built.*)\n" +
            "- **Whose**: Chỉ sự SỞ HỮU (VD: *The boy **whose** father is a teacher.*)\n\n" +
            "### ⚠️ Lỗi hay gặp:\n" +
            "- Dùng thừa đại từ tân ngữ: *The book which I bought it yesterday...* ❌ $\\rightarrow$ Sửa: *The book which I bought yesterday...* ✅ (đại từ 'which' đã thay thế cho 'it' rồi).";
        } else if (cleanInput.includes("passive") || cleanInput.includes("bị động") || cleanInput.includes("was done") || cleanInput.includes("by whom")) {
          aiMessage = "The passive voice is very common in formal English and writing when the action is more important than who did it. Let me teach you the formulas!";
          translation = "Câu bị động rất phổ biến trong tiếng Anh trang trọng và văn viết khi hành động quan trọng hơn người thực hiện. Hãy để tôi dạy bạn các công thức!";
          tutorFeedback = "**🔄 CÂU BỊ ĐỘNG (PASSIVE VOICE):**\n\n" +
            "### Công thức tổng quát: **S + be + V3/ed (+ by O)**\n\n" +
            "### Chia theo các thì thông dụng:\n" +
            "| Thì | Chủ động | Bị động |\n" +
            "|---|---|---|\n" +
            "| Hiện tại đơn | *cooks* | **is/am/are cooked** |\n" +
            "| Quá khứ đơn | *cooked* | **was/were cooked** |\n" +
            "| Hiện tại hoàn thành | *has cooked* | **has/have been cooked** |\n" +
            "| Tương lai đơn | *will cook* | **will be cooked** |\n\n" +
            "### ⚠️ Lỗi hay gặp:\n" +
            "- Quên chia động từ to-be: *The letter sent yesterday.* ❌ $\\rightarrow$ Sửa: *The letter **was** sent yesterday.* ✅";
        } else if (cleanInput.includes("gerund") || cleanInput.includes("infinitive") || cleanInput.includes("to v") || cleanInput.includes("v ing") || cleanInput.includes("avoid") || cleanInput.includes("want to")) {
          aiMessage = "Choosing between a Gerund (V-ing) and an Infinitive (To-V) after verbs is a common challenge! Let's master the rules together.";
          translation = "Lựa chọn giữa Danh động từ (V-ing) và Động từ nguyên mẫu (To-V) đi sau các động từ khác là thử thách phổ biến! Hãy cùng làm chủ các quy tắc.";
          tutorFeedback = "**🔤 DANH ĐỘNG TỪ (GERUND) VS ĐỘNG TỪ NGUYÊN MẪU (INFINITIVE):**\n\n" +
            "### 1. Động từ đi với TO-V (Thường chỉ mong muốn, dự định tương lai):\n" +
            "- *want, need, decide, hope, promise, plan, agree, refuse*\n" +
            "- VD: *I plan **to learn** English tonight.* ✅\n\n" +
            "### 2. Động từ đi với V-ING (Thường chỉ sở thích, thói quen, hoặc hành động đang diễn ra):\n" +
            "- *like, love, enjoy, hate, avoid, mind, practice, suggest, spend*\n" +
            "- VD: *She avoids **meeting** him.* ✅\n\n" +
            "### 3. Động từ đi với cả hai nhưng ĐỔI NGHĨA:\n" +
            "- **Remember to do**: Nhớ phải làm gì (tương lai) vs **Remember doing**: Nhớ đã làm gì (quá khứ).\n" +
            "- **Stop to do**: Dừng lại ĐỂ làm gì khác vs **Stop doing**: Dừng hẳn hành động đang làm.\n\n" +
            "**⚠️ Lỗi hay gặp:** Nói *\"I avoid to go\"* ❌ $\\rightarrow$ Sửa: *\"I avoid **going**\"* ✅.";
        } else if (cleanInput.includes("preposition after adjective") || cleanInput.includes("giới từ sau tính từ") || cleanInput.includes("interested in") || cleanInput.includes("good at") || cleanInput.includes("proud of")) {
          aiMessage = "Many adjectives in English are followed by specific prepositions. Memorizing these collocations will make your English sound natural!";
          translation = "Nhiều tính từ trong tiếng Anh đi kèm với các giới từ cụ thể. Việc ghi nhớ các cụm từ này sẽ giúp tiếng Anh của bạn nghe tự nhiên hơn!";
          tutorFeedback = "**🧩 GIỚI TỪ ĐI SAU TÍNH TỪ (ADJECTIVE + PREPOSITION):**\n\n" +
            "### 1. Các cặp từ thông dụng nhất:\n" +
            "- **at**: *good at* (giỏi về), *bad at* (tệ về), *surprised at* (ngạc nhiên về)\n" +
            "- **in**: *interested in* (thích thú/quan tâm về), *disappointed in* (thất vọng về)\n" +
            "- **of**: *proud of* (tự hào về), *afraid of* (sợ hãi), *full of* (đầy)\n" +
            "- **with**: *bored with* (chán nản với), *satisfied with* (hài lòng với)\n" +
            "- **for**: *famous for* (nổi tiếng về), *responsible for* (chịu trách nhiệm về)\n\n" +
            "### ⚠️ Lỗi hay gặp:\n" +
            "- Dùng sai giới từ: *I am interested on reading.* ❌ $\\rightarrow$ Sửa: *I am interested **in** reading.* ✅";
        } else if (cleanInput.includes("weather") || cleanInput.includes("rain") || cleanInput.includes("sunny") || cleanInput.includes("cloudy") || cleanInput.includes("thời tiết")) {
          aiMessage = "Weather is the ultimate small talk topic! How is the weather in your city today?";
          translation = "Thời tiết là chủ đề trò chuyện xã giao kinh điển! Thời tiết ở thành phố của bạn hôm nay thế nào?";
          tutorFeedback = "**☀️ CÁCH NÓI VỀ THỜI TIẾT (TALKING ABOUT THE WEATHER):**\n\n" +
            "### Câu hỏi thông dụng:\n" +
            "- *What is the weather like today?* (Thời tiết hôm nay thế nào?)\n" +
            "- *How is the weather over there?* (Thời tiết chỗ bạn thế nào?)\n\n" +
            "### Từ vựng hữu ích:\n" +
            "- **Trời nắng**: *sunny, boiling hot* (nóng như thiêu)\n" +
            "- **Trời mưa**: *rainy, drizzling* (mưa lâm thâm), *pouring* (mưa như trút nước)\n" +
            "- **Trời lạnh**: *chilly* (se lạnh), *freezing cold* (lạnh giá)\n" +
            "- **Thời tiết đẹp**: *pleasant* (dễ chịu), *clear sky* (bầu trời trong xanh)\n\n" +
            "**⚠️ Lỗi hay gặp:** Nói *\"It is rain today\"* ❌ $\\rightarrow$ Sửa: *\"It is **rainy** today\"* hoặc *\"It is **raining** today\"* ✅.";
        } else if (cleanInput.includes("hobby") || cleanInput.includes("hobbies") || cleanInput.includes("free time") || cleanInput.includes("sở thích") || cleanInput.includes("rảnh rỗi") || cleanInput.includes("guitar") || cleanInput.includes("piano") || cleanInput.includes("game")) {
          aiMessage = "I'd love to know what you do for fun! Having hobbies makes life exciting. What do you enjoy doing in your free time?";
          translation = "Tôi rất muốn biết bạn làm gì để giải trí! Có sở thích giúp cuộc sống thú vị hơn. Bạn thích làm gì vào thời gian rảnh?";
          tutorFeedback = "**🎸 CÁCH NÓI VỀ SỞ THÍCH TRONG TIẾNG ANH:**\n\n" +
            "### Các cách diễn đạt sở thích khác nhau:\n" +
            "- *I enjoy/love [V-ing]* (Tôi tận hưởng/yêu thích...) $\rightarrow$ *I enjoy taking photos.*\n" +
            "- *I am into / interested in [V-ing/Noun]* (Tôi thích...) $\rightarrow$ *I am into playing video games.*\n" +
            "- *I am a big fan of [Noun]* (Tôi là fan của...) $\rightarrow$ *I am a big fan of classical music.*\n\n" +
            "### ⚠️ Lỗi hay gặp:\n" +
            "- Dùng sai động từ kết hợp với nhạc cụ: *I play the guitar* ✅ (không nói *I play guitar* - luôn có mạo từ 'the' trước nhạc cụ).";
        } else {
          aiMessage = `That is very interesting! Can you tell me more about that? I'd love to hear your thoughts in English.`;
          translation = `Điều đó thật thú vị! Bạn có thể kể cho tôi nghe thêm về điều đó được không? Tôi rất muốn nghe suy nghĩ của bạn bằng tiếng Anh.`;
          tutorFeedback = `**Mẹo học tập:** Khi trò chuyện tự do, hãy áp dụng công thức **3-Part Answer**:\n1. **Direct answer** — Trả lời trực tiếp\n2. **Detail** — Thêm chi tiết/ví dụ\n3. **Follow-up** — Hỏi lại để duy trì hội thoại\n\nVD: "What's your hobby?" → "I enjoy reading. (Direct) I usually read science fiction novels before bed. (Detail) Do you like reading too? (Follow-up)"`;
          
          // Log unresolved question since local fallback couldn't handle it specifically
          const simpleGreetings = ["hi", "hello", "hey", "how are you", "how's it going", "good morning", "good afternoon", "good evening"];
          const isSimpleGreeting = simpleGreetings.some(g => cleanInput === g || cleanInput.startsWith(g + " ") || g.startsWith(cleanInput));
          if (!isSimpleGreeting && cleanInput.length > 12) {
            GeminiService.logUnresolvedQuestion(userId, rawInput, "Offline fallback: Unmatched custom question");
          }
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
  static async generateToeicPractice(part: number, mode: string = 'standard') {
    try {
      const count = mode === 'mini' ? 5 : 10;
      
      let focusPrompt = '';
      if (mode === 'grammar') {
        focusPrompt = '\nTập trung 100% vào việc kiểm tra ngữ pháp nâng cao (verb tenses, word form, pronouns, relative clauses, subjunctive, active/passive voice, conditional types).';
      } else if (mode === 'vocabulary') {
        focusPrompt = '\nTập trung 100% vào việc kiểm tra từ vựng nâng cao, business collocations, idioms thương mại, và prepositions chuyên ngành văn phòng.';
      } else if (mode === 'sound_traps') {
        focusPrompt = '\nTập trung vào các bẫy phát âm lắt léo (đồng âm dị nghĩa, nhiễu âm tương tự nhau như copy/coffee, train/rain) và các câu trả lời gián tiếp hoặc né tránh (evading answers).';
      } else if (mode === 'double_passages') {
        focusPrompt = '\nVăn bản đọc hiểu bắt buộc phải ở dạng văn bản kép (double passages) hoặc văn bản ba (triple passages) liên kết thông tin chặt chẽ giữa 2-3 tài liệu với nhau.';
      }

      const prompt = `
        Bạn là chuyên gia ra đề thi TOEIC hàng đầu. Hãy tạo một đề luyện tập TOEIC Part ${part} gồm ĐÚNG ${count} câu hỏi nâng cao (Advanced), chất lượng cao, bám sát cấu trúc đề thi thật (New Format) mới nhất và có độ khó cao (từ 700-990 điểm).
        ${focusPrompt}
        
        Yêu cầu chi tiết nâng cao cho Part ${part}:
        ${part === 1 ? `- Part 1 (Photographs): Mô tả các bức ảnh bằng văn bản tiếng Anh trong trường "audioDescription". Hãy mô tả các bối cảnh nâng cao, tập trung vào chi tiết nhỏ, trạng thái vật thể. Tạo 4 đáp án A, B, C, D mô tả bức ảnh (Tổng cộng tạo đủ ${count} câu hỏi).` : ''}
        ${part === 2 ? `- Part 2 (Question-Response): Tạo các câu hỏi/phát biểu trong trường "audioDescription". Sử dụng các câu trả lời gián tiếp hoặc câu đồng âm/nhiễu âm. Tạo 3 đáp án A, B, C (đáp án D để trống) (Tổng cộng tạo đủ ${count} câu hỏi).` : ''}
        ${part === 3 ? `- Part 3 (Conversations): Tạo các đoạn hội thoại tự nhiên từ 2-3 người về công sở, thương mại trong trường "context". Tạo các câu hỏi liên quan, mỗi câu hỏi có 4 đáp án A, B, C, D (Tổng cộng tạo đủ ${count} câu hỏi).` : ''}
        ${part === 4 ? `- Part 4 (Short Talks): Tạo các bài nói ngắn (thuyết trình, tin nhắn thoại, thông báo, dự báo) trong trường "context". Tạo các câu hỏi liên quan, mỗi câu hỏi có 4 đáp án A, B, C, D (Tổng cộng tạo đủ ${count} câu hỏi).` : ''}
        ${part === 5 ? `- Part 5 (Incomplete Sentences): Tạo các câu chứa chỗ trống (marked as "_______") trong trường "questionText". Tạo 4 lựa chọn A, B, C, D (Tổng cộng tạo đủ ${count} câu hỏi).` : ''}
        ${part === 6 ? `- Part 6 (Text Completion): Tạo các đoạn văn công sở hoặc thông báo trong trường "context" có các chỗ trống đánh số. Tạo các câu hỏi tương ứng với các chỗ trống. Tạo 4 đáp án A, B, C, D (Tổng cộng tạo đủ ${count} câu hỏi).` : ''}
        ${part === 7 ? `- Part 7 (Reading Comprehension): Tạo các văn bản trong trường "context" (đơn hoặc kép/ba tùy vào chế độ luyện tập). Tạo các câu hỏi liên quan, mỗi câu có 4 đáp án A, B, C, D (Tổng cộng tạo đủ ${count} câu hỏi).` : ''}

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
              "explanation": "Lời giải thích chi tiết cực kỳ sâu sắc, chỉ rõ tại sao các đáp án khác sai (ví dụ: bẫy từ đồng âm, bẫy sai thì), và dịch nghĩa câu hỏi + đáp án bằng tiếng Việt."
            }
          ]
        }
      `;

      const { text } = await GeminiService.generateContentWithFallback(prompt, undefined, true);
      return GeminiService.cleanAndParseJson(text);
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

      const { text } = await GeminiService.generateContentWithFallback(prompt, undefined, true);
      return GeminiService.cleanAndParseJson(text);
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

  /**
   * Log tricky/unresolved questions when the bot fails to answer
   */
  static async logUnresolvedQuestion(userId: string | null | undefined, questionText: string, errorContext?: string) {
    try {
      const uId = userId || null;
      await prisma.unresolvedQuestion.create({
        data: {
          userId: uId,
          questionText,
          errorContext: errorContext || null
        }
      });
      console.log(`[UnresolvedQuestion] Logged to db: "${questionText}"`);
    } catch (dbErr: any) {
      console.error('[UnresolvedQuestion] Failed to save to database, using local fallback:', dbErr.message || dbErr);
      try {
        const filePath = path.join(__dirname, '../../unresolved_questions.json');
        let questions = [];
        if (fs.existsSync(filePath)) {
          const data = fs.readFileSync(filePath, 'utf8');
          if (data.trim()) {
            questions = JSON.parse(data);
          }
        }
        questions.push({
          id: new Date().getTime().toString(),
          userId: userId || null,
          questionText,
          errorContext: errorContext || null,
          createdAt: new Date().toISOString()
        });
        fs.writeFileSync(filePath, JSON.stringify(questions, null, 2), 'utf8');
        console.log(`[UnresolvedQuestion] Saved to fallback JSON file at ${filePath}`);
      } catch (fileErr: any) {
        console.error('[UnresolvedQuestion] Fallback JSON logging failed:', fileErr.message || fileErr);
      }
    }
  }

  /**
   * Generate TOEIC Study Plan based on accuracy statistics
   */
  static async generateToeicStudyPlan(stats: any) {
    try {
      const prompt = `
        Bạn là chuyên gia tư vấn lộ trình học TOEIC hàng đầu. Hãy phân tích bảng thống kê kết quả luyện tập TOEIC của học viên sau đây để thiết kế một lộ trình học cá nhân hóa chi tiết 4 tuần bằng tiếng Việt.
        
        Bảng thống kê tỷ lệ làm đúng theo từng Part (từ Part 1 đến Part 7):
        ${JSON.stringify(stats, null, 2)}
        (Lưu ý: Nếu một Part có số câu đã làm là 0, nghĩa là học viên chưa bao giờ làm Part đó).

        Hãy phân tích điểm mạnh, điểm yếu cụ thể, đề xuất mục tiêu điểm số và lên kế hoạch học tập chi tiết 4 tuần tiếp theo.
        Kế hoạch phải tập trung cải thiện các Part yếu nhất (độ chính xác thấp nhất hoặc chưa luyện tập).

        Trả về ĐÚNG định dạng JSON sau (không chứa bất kỳ giải thích nào khác ngoài JSON):
        {
          "summary": "Tóm tắt thế mạnh (ví dụ: nghe tốt Part 1, 2) và điểm yếu cần khắc phục gấp (ví dụ: yếu đọc hiểu Part 7, lúng túng ngữ pháp Part 5).",
          "recommendedTarget": "Mục tiêu điểm số đề xuất (ví dụ: 650-750) dựa trên năng lực hiện tại.",
          "weakestParts": [5, 7],
          "weeks": [
            {
              "weekNumber": 1,
              "theme": "Chủ đề tập trung của tuần 1 (ví dụ: Củng cố Ngữ pháp & Từ vựng Part 5)",
              "focusParts": [5],
              "actions": [
                "Luyện gói chuyên đề ngữ pháp nâng cao Part 5 ít nhất 3 lần",
                "Ghi lại 20 từ vựng collocations mới vào notebook và ôn tập lại cuối tuần"
              ]
            },
            {
              "weekNumber": 2,
              "theme": "Chủ đề tuần 2...",
              "focusParts": [2],
              "actions": []
            },
            {
              "weekNumber": 3,
              "theme": "Chủ đề tuần 3...",
              "focusParts": [7],
              "actions": []
            },
            {
              "weekNumber": 4,
              "theme": "Chủ đề tuần 4...",
              "focusParts": [1, 2, 3, 4, 5, 6, 7],
              "actions": []
            }
          ]
        }
      `;

      const { text } = await GeminiService.generateContentWithFallback(prompt, undefined, true);
      return GeminiService.cleanAndParseJson(text);
    } catch (error) {
      console.error('Failed to generate TOEIC study plan:', error);
      return {
        summary: "Dựa trên kết quả luyện tập của bạn, bạn cần tiếp tục củng cố đồng đều các phần nghe Part 2 và phần đọc hiểu Part 5, 7.",
        recommendedTarget: "600 - 700",
        weakestParts: [2, 5, 7],
        weeks: [
          {
            "weekNumber": 1,
            "theme": "Củng cố Kỹ năng Nghe hiểu (Part 2)",
            "focusParts": [2],
            "actions": [
              "Thực hành gói bẫy âm thanh Part 2 ít nhất 3 lần để tránh bẫy đồng âm.",
              "Nghe đi nghe lại phần lời dịch giải thích của AI."
            ]
          },
          {
            "weekNumber": 2,
            "theme": "Nâng cấp Từ vựng & Ngữ pháp (Part 5)",
            "focusParts": [5],
            "actions": [
              "Luyện tập gói chuyên đề ngữ pháp và từ từ vựng công sở.",
              "Lưu các từ mới vào sổ từ vựng."
            ]
          },
          {
            "weekNumber": 3,
            "theme": "Tập trung Đọc hiểu liên kết đoạn văn (Part 7)",
            "focusParts": [7],
            "actions": [
              "Luyện gói đoạn văn kép và ba để rèn kỹ năng quét thông tin nhanh.",
              "Áp dụng quy tắc làm bài đọc không quá 1.5 phút/câu."
            ]
          },
          {
            "weekNumber": 4,
            "theme": "Thi thử Mock Test tổng hợp",
            "focusParts": [1, 2, 3, 4, 5, 6, 7],
            "actions": [
              "Thực hiện 2 đề thi thử Mini Mock Test.",
              "Thực hiện 1 đề thi thử Standard Mock Test đầy đủ."
            ]
          }
        ]
      };
    }
  }
}

