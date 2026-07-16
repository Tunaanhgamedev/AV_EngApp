import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { AIService } from '../services/ai.service';

export const createJournalEntry = async (req: Request, res: Response) => {
  const { userId, content, title, trainedSkills } = req.body;

  if (!content) {
    return res.status(400).json({ error: 'Content is required' });
  }

  try {
    // 1. Get AI analysis
    const analysis = await AIService.analyzeJournal(content, trainedSkills);

    // 2. Save to database
    const entry = await prisma.journalEntry.create({
      data: {
        userId,
        title: title || 'Daily Journal',
        content,
        aiFeedback: JSON.stringify({
          correctedText: analysis.correctedText,
          feedback: analysis.feedback
        }),
        grammarScore: analysis.grammarScore,
        vocabularyScore: analysis.vocabularyScore,
        fluencyScore: analysis.fluencyScore,
      }
    });

    res.status(201).json({
      message: 'Journal entry analyzed and saved',
      entry
    });
  } catch (error) {
    console.error('Journal Controller Error:', error);
    res.status(500).json({ error: 'Failed to process journal entry' });
  }
};

export const getJournalHistory = async (req: Request, res: Response) => {
  const userId = req.params.userId as string;

  try {
    const history = await prisma.journalEntry.findMany({
      where: { userId: String(userId) },
      orderBy: { createdAt: 'desc' }
    });
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch journal history' });
  }
};
