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
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      
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
      console.error('EngBot Analysis Error:', error);
      throw new Error('Failed to analyze journal entry with EngBot');
    }
  }

  /**
   * AI Chat Roleplay using EngBot
   */
  static async generateChatResponse(messages: any[], persona: string, scenario: string) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

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
    } catch (error) {
      console.error('EngBot Chat Error:', error);
      throw new Error('Failed to generate chat response with EngBot');
    }
  }

  /**
   * Explain a word using EngBot
   */
  static async explainWord(word: string) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      
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
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      
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
      return JSON.parse(jsonStr);
    } catch (error: any) {
      console.error(`EngBot Enrichment Error (${word}):`, error.message || error);
      if (error.status === 404) {
        console.error("Gemini Model Not Found (404). Check model name or API key permissions.");
      }
      return null;
    }
  }
  /**
   * Generate a contextual review question for a word
   */
  static async generateReviewQuestion(word: string) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      
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
    } catch (error) {
      console.error('Gemini Review Question Error:', error);
      return null;
    }
  }

  /**
   * Bulk translate/enrich multiple words in a single API call (fast batch mode)
   * Returns an array of { word, meaningVi, phonetic, wordType, cefrLevel, meaningEn, usage, example, exampleVi }
   */
  static async bulkTranslate(words: string[]): Promise<any[] | null> {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
      
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
    } catch (error: any) {
      console.error(`EngBot Bulk Translate Error:`, error.message || error);
      return null;
    }
  }
}
