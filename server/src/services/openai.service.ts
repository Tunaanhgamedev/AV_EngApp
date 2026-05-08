import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export class OpenAIService {
  /**
   * Analyze an English journal entry and provide feedback and scores
   */
  static async analyzeJournal(content: string) {
    try {
      const prompt = `
        As an expert English teacher, analyze the following journal entry written by an English learner.
        
        Journal Content: "${content}"
        
        Please provide the following in JSON format:
        1. correctedText: The complete corrected version of the journal.
        2. feedback: A concise summary of the mistakes and suggestions for improvement (in Vietnamese).
        3. grammarScore: A score from 0 to 100 for grammar accuracy.
        4. vocabularyScore: A score from 0 to 100 for vocabulary range and usage.
        5. fluencyScore: A score from 0 to 100 for naturalness and flow.
        
        Respond ONLY with the JSON object.
      `;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
      });

      const result = JSON.parse(response.choices[0].message.content || '{}');
      return result;
    } catch (error) {
      console.error('OpenAI Analysis Error:', error);
      throw new Error('Failed to analyze journal entry');
    }
  }

  /**
   * Get AI explanation for a word with context
   */
  static async explainWord(word: string) {
    try {
      const prompt = `
        As an expert English teacher, explain the English word "${word}".
        
        Please provide the following in JSON format:
        1. aiExplanation: A simple, friendly explanation for an English learner (in Vietnamese). Use analogies if possible.
        2. examples: Two additional natural example sentences using this word.
        3. level: The estimated CEFR level (A1, A2, B1, B2, C1, C2).
        
        Respond ONLY with the JSON object.
      `;

      const response = await openai.chat.completions.create({
        model: "gpt-4o",
        messages: [{ role: "user", content: prompt }],
        response_format: { type: "json_object" },
      });

      return JSON.parse(response.choices[0].message.content || '{}');
    } catch (error) {
      console.error('OpenAI Word Explanation Error:', error);
      return {
        aiExplanation: "Không thể lấy lời giải thích từ AI lúc này.",
        examples: [],
        level: "N/A"
      };
    }
  }
}
