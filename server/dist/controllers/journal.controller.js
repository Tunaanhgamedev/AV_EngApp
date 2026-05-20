"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getJournalHistory = exports.createJournalEntry = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const ai_service_1 = require("../services/ai.service");
const createJournalEntry = async (req, res) => {
    const { userId, content, title } = req.body;
    if (!content) {
        return res.status(400).json({ error: 'Content is required' });
    }
    try {
        // 1. Get AI analysis
        const analysis = await ai_service_1.AIService.analyzeJournal(content);
        // 2. Save to database
        const entry = await prisma_1.default.journalEntry.create({
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
    }
    catch (error) {
        console.error('Journal Controller Error:', error);
        res.status(500).json({ error: 'Failed to process journal entry' });
    }
};
exports.createJournalEntry = createJournalEntry;
const getJournalHistory = async (req, res) => {
    const userId = req.params.userId;
    try {
        const history = await prisma_1.default.journalEntry.findMany({
            where: { userId: String(userId) },
            orderBy: { createdAt: 'desc' }
        });
        res.json(history);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch journal history' });
    }
};
exports.getJournalHistory = getJournalHistory;
