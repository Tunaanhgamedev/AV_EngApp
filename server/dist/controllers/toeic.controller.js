"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStudyPlan = exports.getHistory = exports.submitPractice = exports.generatePractice = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const gemini_service_1 = require("../services/gemini.service");
const generatePractice = async (req, res) => {
    const part = parseInt(req.params.part);
    if (isNaN(part) || part < 1 || part > 7) {
        return res.status(400).json({ error: 'Part must be between 1 and 7' });
    }
    try {
        const mode = req.query.mode || 'standard';
        const data = await gemini_service_1.GeminiService.generateToeicPractice(part, mode);
        res.json(data);
    }
    catch (error) {
        console.error('TOEIC controller generate error:', error);
        res.status(500).json({ error: 'Failed to generate practice test' });
    }
};
exports.generatePractice = generatePractice;
const submitPractice = async (req, res) => {
    const { userId, part, correctCount, totalQuestions, details, listeningScore, readingScore, totalScore } = req.body;
    if (!userId || isNaN(correctCount) || isNaN(totalQuestions)) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }
    try {
        // 1. Save to Database
        const history = await prisma_1.default.toeicPracticeHistory.create({
            data: {
                userId,
                part: part !== undefined && part !== null ? Number(part) : null,
                correctCount: Number(correctCount),
                totalQuestions: Number(totalQuestions),
                listeningScore: listeningScore !== undefined ? Number(listeningScore) : null,
                readingScore: readingScore !== undefined ? Number(readingScore) : null,
                totalScore: totalScore !== undefined ? Number(totalScore) : Math.round((correctCount / totalQuestions) * 990),
                details: typeof details === 'string' ? details : JSON.stringify(details || {})
            }
        });
        // 2. Reward user with XP
        const xpReward = part !== undefined && part !== null ? correctCount * 10 : 200; // 200 XP for completing full test
        await prisma_1.default.user.update({
            where: { id: userId },
            data: {
                xp: { increment: xpReward }
            }
        });
        res.json({ success: true, history, xpRewarded: xpReward });
    }
    catch (error) {
        console.error('TOEIC controller submit error:', error);
        res.status(500).json({ error: 'Failed to submit practice test' });
    }
};
exports.submitPractice = submitPractice;
const getHistory = async (req, res) => {
    const { userId } = req.params;
    try {
        const history = await prisma_1.default.toeicPracticeHistory.findMany({
            where: { userId: String(userId) },
            orderBy: { createdAt: 'desc' }
        });
        res.json(history);
    }
    catch (error) {
        console.error('TOEIC controller history error:', error);
        res.status(500).json({ error: 'Failed to fetch history' });
    }
};
exports.getHistory = getHistory;
const generateStudyPlan = async (req, res) => {
    const { userId } = req.params;
    try {
        const history = await prisma_1.default.toeicPracticeHistory.findMany({
            where: { userId: String(userId) },
            orderBy: { createdAt: 'desc' }
        });
        // Initialize stats for Parts 1 to 7
        const stats = {};
        for (let i = 1; i <= 7; i++) {
            stats[i] = { part: i, attempts: 0, correct: 0, accuracy: 0 };
        }
        // Populate stats from practice history
        history.forEach(h => {
            if (h.part !== null && h.part >= 1 && h.part <= 7) {
                stats[h.part].attempts += h.totalQuestions;
                stats[h.part].correct += h.correctCount;
            }
        });
        // Calculate accuracy percentage
        for (let i = 1; i <= 7; i++) {
            if (stats[i].attempts > 0) {
                stats[i].accuracy = Math.round((stats[i].correct / stats[i].attempts) * 100);
            }
        }
        const studyPlan = await gemini_service_1.GeminiService.generateToeicStudyPlan(stats);
        res.json(studyPlan);
    }
    catch (error) {
        console.error('TOEIC controller generate study plan error:', error);
        res.status(500).json({ error: 'Failed to generate study plan' });
    }
};
exports.generateStudyPlan = generateStudyPlan;
