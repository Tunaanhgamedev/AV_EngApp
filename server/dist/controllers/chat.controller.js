"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvailableSkills = exports.getChatHistory = exports.sendMessage = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const ai_service_1 = require("../services/ai.service");
const gemini_service_1 = require("../services/gemini.service");
const sendMessage = async (req, res) => {
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
        const aiResult = await ai_service_1.AIService.generateChatResponse(messages, persona, scenario, userId, trainedSkills);
        // 3. Save to Database
        try {
            await prisma_1.default.aIChatHistory.create({
                data: {
                    userId,
                    userMessage: message,
                    aiResponse: JSON.stringify(aiResult),
                }
            });
        }
        catch (dbErr) {
            console.error('Failed to save chat history:', dbErr);
        }
        res.json(aiResult);
    }
    catch (error) {
        console.error('Chat Controller Error:', error);
        res.status(500).json({ error: 'Failed to process chat message' });
    }
};
exports.sendMessage = sendMessage;
const getChatHistory = async (req, res) => {
    const userId = req.params.userId;
    try {
        const history = await prisma_1.default.aIChatHistory.findMany({
            where: { userId: String(userId) },
            orderBy: { createdAt: 'asc' }
        });
        res.json(history);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch chat history' });
    }
};
exports.getChatHistory = getChatHistory;
const getAvailableSkills = async (req, res) => {
    try {
        const skills = gemini_service_1.GeminiService.getSkillsIndex();
        const englishSkillIds = [
            'beautiful-prose',
            'avoid-ai-writing',
            'professional-proofreader',
            'copywriting',
            'content-creator',
            'explain-like-socrates',
            'objection-preemptor',
            'data-storytelling',
            'copywriting-psychologist',
            'headline-psychologist',
            'subject-line-psychologist',
            'scarcity-urgency-psychologist',
            'loss-aversion-designer',
            'emotional-arc-designer',
            'social-proof-architect',
            'trust-calibrator',
            'awareness-stage-mapper',
            'jobs-to-be-done-analyst',
            'lesson-generator'
        ];
        const categoriesMap = {
            'beautiful-prose': 'writing',
            'avoid-ai-writing': 'writing',
            'professional-proofreader': 'writing',
            'content-creator': 'writing',
            'lesson-generator': 'writing',
            'copywriting': 'copywriting',
            'copywriting-psychologist': 'copywriting',
            'headline-psychologist': 'copywriting',
            'subject-line-psychologist': 'copywriting',
            'scarcity-urgency-psychologist': 'copywriting',
            'loss-aversion-designer': 'copywriting',
            'emotional-arc-designer': 'copywriting',
            'social-proof-architect': 'copywriting',
            'explain-like-socrates': 'communication',
            'objection-preemptor': 'communication',
            'data-storytelling': 'communication',
            'trust-calibrator': 'communication',
            'awareness-stage-mapper': 'communication',
            'jobs-to-be-done-analyst': 'communication'
        };
        const filteredSkills = skills
            .filter(s => englishSkillIds.includes(s.id))
            .map(s => ({
            ...s,
            category: categoriesMap[s.id] || 'general'
        }));
        res.json(filteredSkills);
    }
    catch (error) {
        console.error('Failed to fetch available skills:', error);
        res.status(500).json({ error: 'Failed to fetch available skills' });
    }
};
exports.getAvailableSkills = getAvailableSkills;
