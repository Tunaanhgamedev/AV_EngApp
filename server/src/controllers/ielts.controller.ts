import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { GeminiService } from '../services/gemini.service';

export const generatePractice = async (req: Request, res: Response) => {
  const skill = req.params.skill as string;

  if (!['listening', 'reading', 'writing', 'speaking'].includes(skill)) {
    return res.status(400).json({ error: 'Skill must be listening, reading, writing, or speaking' });
  }

  try {
    const data = await GeminiService.generateIeltsPractice(skill);
    res.json(data);
  } catch (error) {
    console.error('IELTS controller generate error:', error);
    res.status(500).json({ error: 'Failed to generate IELTS practice' });
  }
};

export const submitPractice = async (req: Request, res: Response) => {
  const { userId, skill, bandScore, correctCount, totalQuestions, aiFeedback, details } = req.body;

  if (!userId || !skill || isNaN(bandScore)) {
    return res.status(400).json({ error: 'Missing required parameters' });
  }

  try {
    // 1. Save to Database
    const history = await prisma.ieltsPracticeHistory.create({
      data: {
        userId,
        skill,
        bandScore: parseFloat(bandScore),
        correctCount: correctCount ? parseInt(correctCount) : null,
        totalQuestions: totalQuestions ? parseInt(totalQuestions) : null,
        aiFeedback: aiFeedback || '',
        details: JSON.stringify(details || {})
      }
    });

    // 2. Reward user with XP
    const xpReward = skill === 'writing' || skill === 'speaking' ? 100 : (correctCount || 0) * 15;
    await prisma.user.update({
      where: { id: userId },
      data: {
        xp: { increment: xpReward }
      }
    });

    res.json({ success: true, history, xpRewarded: xpReward });
  } catch (error) {
    console.error('IELTS controller submit error:', error);
    res.status(500).json({ error: 'Failed to submit IELTS practice' });
  }
};

export const getHistory = async (req: Request, res: Response) => {
  const userId = req.params.userId as string;

  try {
    const history = await prisma.ieltsPracticeHistory.findMany({
      where: { userId: String(userId) },
      orderBy: { createdAt: 'desc' }
    });
    res.json(history);
  } catch (error) {
    console.error('IELTS controller history error:', error);
    res.status(500).json({ error: 'Failed to fetch history' });
  }
};
