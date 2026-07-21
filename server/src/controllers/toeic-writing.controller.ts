import { Request, Response } from 'express';
import prisma from '../lib/prisma';
import { GeminiService } from '../services/gemini.service';

export const getChallenge = async (req: Request, res: Response) => {
  try {
    const challenge = await GeminiService.generateToeicWritingChallenge();
    res.json(challenge);
  } catch (error) {
    console.error('Failed to get TOEIC writing challenge:', error);
    res.status(500).json({ error: 'Failed to generate TOEIC writing challenge' });
  }
};

export const evaluateChallenge = async (req: Request, res: Response) => {
  const { challenge, userText, userId } = req.body;

  if (!challenge || typeof userText !== 'string') {
    return res.status(400).json({ error: 'Missing required challenge data or user writing' });
  }

  try {
    const evaluation = await GeminiService.evaluateToeicWriting(challenge, userText);

    // Reward user with XP based on their overall score
    if (userId && userId !== 'anonymous') {
      const xpReward = Math.max(5, Math.round(evaluation.overallScore / 10)); // Min 5 XP, max 10 XP per writing
      await prisma.user.update({
        where: { id: userId },
        data: {
          xp: { increment: xpReward }
        }
      });
      evaluation.xpRewarded = xpReward;
    } else {
      evaluation.xpRewarded = 0;
    }

    res.json(evaluation);
  } catch (error) {
    console.error('Failed to evaluate TOEIC writing challenge:', error);
    res.status(500).json({ error: 'Failed to evaluate TOEIC writing challenge' });
  }
};
