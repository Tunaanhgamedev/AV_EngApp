"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateStudyPlan = exports.getHistory = exports.submitPractice = exports.generatePractice = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const gemini_service_1 = require("../services/gemini.service");
const generatePractice = async (req, res) => {
    const skill = req.params.skill;
    if (!['listening', 'reading', 'writing', 'speaking'].includes(skill)) {
        return res.status(400).json({ error: 'Skill must be listening, reading, writing, or speaking' });
    }
    try {
        const mode = req.query.mode;
        const data = await gemini_service_1.GeminiService.generateIeltsPractice(skill, mode);
        res.json(data);
    }
    catch (error) {
        console.error('IELTS controller generate error:', error);
        res.status(500).json({ error: 'Failed to generate IELTS practice' });
    }
};
exports.generatePractice = generatePractice;
const submitPractice = async (req, res) => {
    const { userId, skill, bandScore, correctCount, totalQuestions, aiFeedback, details } = req.body;
    if (!userId || !skill || isNaN(bandScore)) {
        return res.status(400).json({ error: 'Missing required parameters' });
    }
    try {
        // 1. Save to Database
        const history = await prisma_1.default.ieltsPracticeHistory.create({
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
        await prisma_1.default.user.update({
            where: { id: userId },
            data: {
                xp: { increment: xpReward }
            }
        });
        res.json({ success: true, history, xpRewarded: xpReward });
    }
    catch (error) {
        console.error('IELTS controller submit error:', error);
        res.status(500).json({ error: 'Failed to submit IELTS practice' });
    }
};
exports.submitPractice = submitPractice;
const getHistory = async (req, res) => {
    const userId = req.params.userId;
    try {
        const history = await prisma_1.default.ieltsPracticeHistory.findMany({
            where: { userId: String(userId) },
            orderBy: { createdAt: 'desc' }
        });
        res.json(history);
    }
    catch (error) {
        console.error('IELTS controller history error:', error);
        res.status(500).json({ error: 'Failed to fetch history' });
    }
};
exports.getHistory = getHistory;
const generateStudyPlan = async (req, res) => {
    const userId = req.params.userId;
    try {
        // Aggregate band scores by skill from history
        const history = await prisma_1.default.ieltsPracticeHistory.findMany({
            where: { userId: String(userId) },
            select: { skill: true, bandScore: true }
        });
        const skillScores = { listening: [], reading: [], writing: [], speaking: [] };
        for (const entry of history) {
            if (skillScores[entry.skill]) {
                skillScores[entry.skill].push(entry.bandScore);
            }
        }
        const avg = (arr) => arr.length > 0 ? arr.reduce((a, b) => a + b, 0) / arr.length : 5.0;
        const stats = {
            listening: avg(skillScores.listening),
            reading: avg(skillScores.reading),
            writing: avg(skillScores.writing),
            speaking: avg(skillScores.speaking),
            overallAvg: 0
        };
        stats.overallAvg = (stats.listening + stats.reading + stats.writing + stats.speaking) / 4;
        const plan = await gemini_service_1.GeminiService.generateIeltsStudyPlan(stats);
        res.json(plan);
    }
    catch (error) {
        console.error('IELTS study plan error:', error);
        res.status(500).json({ error: 'Failed to generate IELTS study plan' });
    }
};
exports.generateStudyPlan = generateStudyPlan;
