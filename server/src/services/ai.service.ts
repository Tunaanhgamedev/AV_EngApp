import { GeminiService } from './gemini.service';

/**
 * EngBot AI Service
 * Powered exclusively by Google Gemini
 */
export class AIService {
  static async analyzeJournal(content: string, trainedSkills?: string[]) {
    return await GeminiService.analyzeJournal(content, trainedSkills);
  }

  static async explainWord(word: string) {
    return await GeminiService.explainWord(word);
  }

  static async generateChatResponse(messages: any[], persona: string, scenario: string, userId?: string, trainedSkills?: string[]) {
    return await GeminiService.generateChatResponse(messages, persona, scenario, userId, trainedSkills);
  }
}
