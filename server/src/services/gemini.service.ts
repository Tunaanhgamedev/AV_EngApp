import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export class GeminiService {
  /**
   * Analyze journal using EngBot (Powered by Gemini)
   */
  static async analyzeJournal(content: string) {
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      
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
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

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
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      
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
      const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
      
      const prompt = `
        As EngBot (Expert English Teacher), provide full metadata for the word "${word}".
        Include:
        - Phonetic (IPA)
        - Meaning in English
        - Meaning in Vietnamese
        - Word type (v, n, adj, adv)
        - CEFR Level (A1, A2, B1, B2, C1, C2)
        - Usage note (concise)
        - 1 Example sentence in English
        - Vietnamese translation of that example

        Respond strictly in JSON format:
        {
          "phonetic": "/.../",
          "meaningEn": "...",
          "meaningVi": "...",
          "wordType": "...",
          "cefrLevel": "...",
          "usage": "...",
          "example": "...",
          "exampleVi": "..."
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
}
