process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
import * as dotenv from 'dotenv';
dotenv.config();
import prisma from '../lib/prisma';

async function main() {
  console.log('--- Database Vocabulary Clean-up Script ---');
  
  // 1. Fetch all words
  const words = await prisma.vocabularyWord.findMany();
  console.log(`Fetched ${words.length} total words.`);

  // 2. Group by lowercase word
  const groups: Record<string, typeof words> = {};
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
      const userLearned = await prisma.userLearnedWord.findMany({
        where: { wordId: dup.id }
      });

      for (const ul of userLearned) {
        // Check if user already has a learning record for the survivor
        const existingSurvivorRecord = await prisma.userLearnedWord.findUnique({
          where: {
            userId_wordId: {
              userId: ul.userId,
              wordId: survivor.id
            }
          }
        });

        if (existingSurvivorRecord) {
          // Merge mastery level and delete duplicate record
          await prisma.userLearnedWord.update({
            where: { id: existingSurvivorRecord.id },
            data: {
              masteryLevel: Math.max(existingSurvivorRecord.masteryLevel, ul.masteryLevel),
              isFavorite: existingSurvivorRecord.isFavorite || ul.isFavorite
            }
          });
          
          await prisma.userLearnedWord.delete({
            where: { id: ul.id }
          });
          console.log(`    Merged and deleted user_learned_words record for user ${ul.userId}`);
        } else {
          // Simply point to survivor
          await prisma.userLearnedWord.update({
            where: { id: ul.id },
            data: { wordId: survivor.id }
          });
          console.log(`    Updated user_learned_words record to survivor wordId for user ${ul.userId}`);
        }
      }

      // Step B: Handle ReviewHistory reference
      await prisma.reviewHistory.updateMany({
        where: { wordId: dup.id },
        data: { wordId: survivor.id }
      });

      // Step C: Delete duplicate vocabularyWord
      await prisma.vocabularyWord.delete({
        where: { id: dup.id }
      });
      console.log(`    Deleted duplicate word "${dup.word}" from vocabulary_words.`);
      mergedCount++;
    }

    // Step D: Ensure survivor word representation is lowercase (or matches the key)
    if (survivor.word !== key) {
      await prisma.vocabularyWord.update({
        where: { id: survivor.id },
        data: { word: key }
      });
      console.log(`  Normalized survivor word casing to: "${key}"`);
    }
  }

  console.log(`\nClean-up finished! Merged and deleted ${mergedCount} duplicate word entries.`);
  await prisma.$disconnect();
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
