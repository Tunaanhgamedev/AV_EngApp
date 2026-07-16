import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { AIService } from '../services/ai.service';
import { GeminiService } from '../services/gemini.service';

export const sendMessage = async (req: Request, res: Response) => {
  const { userId, message, persona, scenario, history, trainedSkills } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // 1. Prepare messages for AI (history + new message)
    const messages = [
      ...history,
      { role: "user", content: message }
    ];

    // 2. Get AI Response
    const aiResult = await AIService.generateChatResponse(messages, persona, scenario, userId, trainedSkills);

    // 3. Save to Database
    try {
      await prisma.aIChatHistory.create({
        data: {
          userId,
          userMessage: message,
          aiResponse: JSON.stringify(aiResult),
        }
      });
    } catch (dbErr) {
      console.error('Failed to save chat history:', dbErr);
    }

    res.json(aiResult);
  } catch (error) {
    console.error('Chat Controller Error:', error);
    res.status(500).json({ error: 'Failed to process chat message' });
  }
};

export const getChatHistory = async (req: Request, res: Response) => {
  const userId = req.params.userId as string;

  try {
    const history = await prisma.aIChatHistory.findMany({
      where: { userId: String(userId) },
      orderBy: { createdAt: 'asc' }
    });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch chat history' });
  }
};

export const getAvailableSkills = async (req: Request, res: Response) => {
  try {
    const skills = GeminiService.getSkillsIndex();
    res.json(skills);
  } catch (error) {
    console.error('Failed to fetch available skills:', error);
    res.status(500).json({ error: 'Failed to fetch available skills' });
  }
};
