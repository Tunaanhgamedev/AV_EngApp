"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AIService = void 0;
const gemini_service_1 = require("./gemini.service");
/**
 * EngBot AI Service
 * Powered exclusively by Google Gemini
 */
class AIService {
    static async analyzeJournal(content) {
        return await gemini_service_1.GeminiService.analyzeJournal(content);
    }
    static async explainWord(word) {
        return await gemini_service_1.GeminiService.explainWord(word);
    }
    static async generateChatResponse(messages, persona, scenario, userId) {
        return await gemini_service_1.GeminiService.generateChatResponse(messages, persona, scenario, userId);
    }
}
exports.AIService = AIService;
