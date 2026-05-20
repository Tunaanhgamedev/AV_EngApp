"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchWord = exports.submitReview = exports.learnNewWord = exports.getDueWords = void 0;
const prisma_1 = __importDefault(require("../lib/prisma"));
const srs_service_1 = require("../services/srs.service");
const ai_service_1 = require("../services/ai.service");
const getDueWords = async (req, res) => {
    const userId = req.params.userId;
    try {
        const dueWords = await prisma_1.default.userLearnedWord.findMany(srs_service_1.SRSService.getDueIntervalQuery(userId));
        res.json(dueWords);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch due words' });
    }
};
exports.getDueWords = getDueWords;
const learnNewWord = async (req, res) => {
    const { userId, wordId } = req.body;
    try {
        // Check if already learned
        const existing = await prisma_1.default.userLearnedWord.findUnique({
            where: {
                userId_wordId: { userId, wordId }
            }
        });
        if (existing) {
            return res.status(400).json({ message: 'Word already in learning list' });
        }
        const learnedWord = await prisma_1.default.userLearnedWord.create({
            data: {
                userId,
                wordId,
                masteryLevel: 0,
                nextReviewAt: new Date(), // Review immediately or very soon
            }
        });
        res.status(201).json(learnedWord);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to add word to learning list' });
    }
};
exports.learnNewWord = learnNewWord;
const submitReview = async (req, res) => {
    const { userId, wordId, isCorrect, responseTime } = req.body;
    try {
        const learnedWord = await prisma_1.default.userLearnedWord.findUnique({
            where: {
                userId_wordId: { userId, wordId }
            }
        });
        if (!learnedWord) {
            return res.status(404).json({ error: 'Learned word record not found' });
        }
        // Calculate next SRS state
        const { nextLevel, nextReviewDate } = srs_service_1.SRSService.calculateNextReview(learnedWord.masteryLevel, isCorrect);
        // Update DB within a transaction
        const result = await prisma_1.default.$transaction([
            // 1. Update learned word record
            prisma_1.default.userLearnedWord.update({
                where: { id: learnedWord.id },
                data: {
                    masteryLevel: nextLevel,
                    reviewCount: { increment: 1 },
                    lastReviewedAt: new Date(),
                    nextReviewAt: nextReviewDate,
                }
            }),
            // 2. Add to history
            prisma_1.default.reviewHistory.create({
                data: {
                    userId,
                    wordId,
                    isCorrect,
                    responseTime,
                }
            }),
            // 3. Update user XP (Bonus)
            prisma_1.default.user.update({
                where: { id: userId },
                data: {
                    xp: { increment: isCorrect ? 10 : 2 }
                }
            })
        ]);
        res.json({
            message: 'Review submitted successfully',
            updatedWord: result[0],
            xpEarned: isCorrect ? 10 : 2
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to submit review' });
    }
};
exports.submitReview = submitReview;
const searchWord = async (req, res) => {
    const word = req.params.word;
    try {
        // 1. Check if word exists in our database already
        let dbWord = await prisma_1.default.vocabularyWord.findFirst({
            where: { word: { equals: word, mode: 'insensitive' } }
        });
        if (dbWord) {
            return res.json({ word: dbWord, source: 'database' });
        }
        // 2. Fetch from Free Dictionary API for basic info
        const dictResponse = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
        const dictData = await dictResponse.json();
        let baseWordInfo = { word };
        if (dictResponse.ok && dictData.length > 0) {
            const firstEntry = dictData[0];
            const phonetic = firstEntry.phonetic || (firstEntry.phonetics && firstEntry.phonetics[0]?.text);
            const audio = firstEntry.phonetics?.find((p) => p.audio)?.audio;
            baseWordInfo = {
                word: firstEntry.word,
                phonetic: phonetic,
                meaningEn: firstEntry.meanings[0]?.definitions[0]?.definition,
                wordType: firstEntry.meanings[0]?.partOfSpeech,
                audioUs: audio,
                synonyms: firstEntry.meanings[0]?.synonyms?.slice(0, 5) || [],
                antonyms: firstEntry.meanings[0]?.antonyms?.slice(0, 5) || [],
            };
        }
        else {
            baseWordInfo = {
                word,
                meaningEn: "Definition not found in standard dictionary.",
                wordType: "unknown",
            };
        }
        // 3. Get AI Supplement
        const aiData = await ai_service_1.AIService.explainWord(word);
        // 4. Combine
        const transformedWord = {
            ...baseWordInfo,
            meaningVi: aiData.aiExplanation,
            cefrLevel: aiData.level,
            aiExplanation: aiData.aiExplanation,
            additionalExamples: aiData.examples,
        };
        res.json({ word: transformedWord, source: 'api_supplemented' });
    }
    catch (error) {
        console.error('Search Word Error:', error);
        res.status(500).json({ error: 'Failed to search word' });
    }
};
exports.searchWord = searchWord;
