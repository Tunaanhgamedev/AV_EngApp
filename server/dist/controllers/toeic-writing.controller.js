"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.evaluateChallenge = exports.getChallenge = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const gemini_service_1 = require("../services/gemini.service");
const getChallenge = async (req, res) => {
    try {
        const challenge = await gemini_service_1.GeminiService.generateToeicWritingChallenge();
        res.json(challenge);
    }
    catch (error) {
        console.error('Failed to get TOEIC writing challenge:', error);
        res.status(500).json({ error: 'Failed to generate TOEIC writing challenge' });
    }
};
exports.getChallenge = getChallenge;
const evaluateChallenge = async (req, res) => {
    const { challenge, userText, userId } = req.body;
    if (!challenge || typeof userText !== 'string') {
        return res.status(400).json({ error: 'Missing required challenge data or user writing' });
    }
    try {
        const evaluation = await gemini_service_1.GeminiService.evaluateToeicWriting(challenge, userText);
        // Reward user with XP based on their overall score
        if (userId && userId !== 'anonymous') {
            const xpReward = Math.max(5, Math.round(evaluation.overallScore / 10)); // Min 5 XP, max 10 XP per writing
            await prisma_1.default.user.update({
                where: { id: userId },
                data: {
                    xp: { increment: xpReward }
                }
            });
            evaluation.xpRewarded = xpReward;
        }
        else {
            evaluation.xpRewarded = 0;
        }
        res.json(evaluation);
    }
    catch (error) {
        console.error('Failed to evaluate TOEIC writing challenge:', error);
        res.status(500).json({ error: 'Failed to evaluate TOEIC writing challenge' });
    }
};
exports.evaluateChallenge = evaluateChallenge;
