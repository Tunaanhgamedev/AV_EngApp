"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const prisma_1 = __importDefault(require("../lib/prisma"));
async function main() {
    console.log('--- Database Vocabulary Clean-up Script ---');
    // 1. Fetch all words
    const words = await prisma_1.default.vocabularyWord.findMany();
    console.log(`Fetched ${words.length} total words.`);
    // 2. Group by lowercase word
    const groups = {};
    for (const w of words) {
        const key = w.word.toLowerCase();
        if (!groups[key]) {
            groups[key] = [];
        }
        groups[key].push(w);
    }
    // Find duplicates
    const duplicateGroups = Object.entries(groups).filter(([_, list]) => list.length > 1);
    console.log(`Found ${duplicateGroups.length} duplicate word groups.`);
    let mergedCount = 0;
    for (const [key, list] of duplicateGroups) {
        console.log(`\nProcessing group for "${key}":`);
        // Sort words in the group:
        // We want the one with meaning_vi, phonetic, or example first.
        // If equal, we prefer the lowercase word.
        const sorted = [...list].sort((a, b) => {
            const scoreA = (a.meaningVi ? 2 : 0) + (a.phonetic ? 1 : 0) + (a.example ? 1 : 0) + (a.word === key ? 1 : 0);
            const scoreB = (b.meaningVi ? 2 : 0) + (b.phonetic ? 1 : 0) + (b.example ? 1 : 0) + (b.word === key ? 1 : 0);
            return scoreB - scoreA; // Descending score
        });
        const survivor = sorted[0];
        const duplicates = sorted.slice(1);
        console.log(`  Survivor: "${survivor.word}" (ID: ${survivor.id}, Level: ${survivor.cefrLevel})`);
        for (const dup of duplicates) {
            console.log(`  Duplicate to merge/delete: "${dup.word}" (ID: ${dup.id})`);
            // Step A: Handle user_learned_words reference
            const userLearned = await prisma_1.default.userLearnedWord.findMany({
                where: { wordId: dup.id }
            });
            for (const ul of userLearned) {
                // Check if user already has a learning record for the survivor
                const existingSurvivorRecord = await prisma_1.default.userLearnedWord.findUnique({
                    where: {
                        userId_wordId: {
                            userId: ul.userId,
                            wordId: survivor.id
                        }
                    }
                });
                if (existingSurvivorRecord) {
                    // Merge mastery level and delete duplicate record
                    await prisma_1.default.userLearnedWord.update({
                        where: { id: existingSurvivorRecord.id },
                        data: {
                            masteryLevel: Math.max(existingSurvivorRecord.masteryLevel, ul.masteryLevel),
                            isFavorite: existingSurvivorRecord.isFavorite || ul.isFavorite
                        }
                    });
                    await prisma_1.default.userLearnedWord.delete({
                        where: { id: ul.id }
                    });
                    console.log(`    Merged and deleted user_learned_words record for user ${ul.userId}`);
                }
                else {
                    // Simply point to survivor
                    await prisma_1.default.userLearnedWord.update({
                        where: { id: ul.id },
                        data: { wordId: survivor.id }
                    });
                    console.log(`    Updated user_learned_words record to survivor wordId for user ${ul.userId}`);
                }
            }
            // Step B: Handle ReviewHistory reference
            await prisma_1.default.reviewHistory.updateMany({
                where: { wordId: dup.id },
                data: { wordId: survivor.id }
            });
            // Step C: Delete duplicate vocabularyWord
            await prisma_1.default.vocabularyWord.delete({
                where: { id: dup.id }
            });
            console.log(`    Deleted duplicate word "${dup.word}" from vocabulary_words.`);
            mergedCount++;
        }
        // Step D: Ensure survivor word representation is lowercase (or matches the key)
        if (survivor.word !== key) {
            await prisma_1.default.vocabularyWord.update({
                where: { id: survivor.id },
                data: { word: key }
            });
            console.log(`  Normalized survivor word casing to: "${key}"`);
        }
    }
    console.log(`\nClean-up finished! Merged and deleted ${mergedCount} duplicate word entries.`);
    await prisma_1.default.$disconnect();
}
main().catch(async (e) => {
    console.error(e);
    await prisma_1.default.$disconnect();
    process.exit(1);
});
