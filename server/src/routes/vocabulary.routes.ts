import { Router } from 'express';
import { Pool } from 'pg';
import { authenticate } from '../middleware/auth.middleware';
import prisma from '../lib/prisma';
import { randomUUID } from 'crypto';
import { GeminiService } from '../services/gemini.service';

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const router = Router();

// Direct pg pool for reliable raw SQL (Prisma v7 ORM methods are unstable)
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

// Get user learning stats
router.get('/stats', authenticate, async (req: any, res) => {
  try {
    const userId = req.user.uid;
    const { rows } = await pool.query(
      `SELECT COUNT(*)::int as "wordsLearned" FROM user_learned_words WHERE user_id = $1`,
      [userId]
    );
    // Get Oxford 3000 progress (words learned that are part of Oxford)
    const { rows: oxRows } = await pool.query(
      `SELECT COUNT(*)::int as "oxfordLearned" 
       FROM user_learned_words ulw
       JOIN vocabulary_words vw ON ulw.word_id = vw.id
       WHERE ulw.user_id = $1 AND vw.cefr_level IN ('A1', 'A2', 'B1', 'B2', 'C1', 'C2')`,
      [userId]
    );
    res.json({ 
      wordsLearned: rows[0].wordsLearned || 0,
      oxfordLearned: oxRows[0].oxfordLearned || 0,
      totalOxford: 3000
    });
  } catch (error: any) {
    console.error('Stats error:', error.message);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

// Get words for learning (Oxford 3000 words not yet in user list)
router.get('/learn-new', authenticate, async (req: any, res) => {
  try {
    const userId = req.user.uid;
    const { level = 'B1', limit = 10 } = req.query;

    // Get IDs of words user is already learning
    const learnedWords = await prisma.userLearnedWord.findMany({
      where: { userId },
      select: { wordId: true }
    });

    // Auto-seed if empty (OPTIMIZED Bulk Insert via Prisma)
    const countResult: any = await prisma.$queryRawUnsafe('SELECT COUNT(*) as count FROM vocabulary_words');
    const count = parseInt(countResult[0].count);
    
    if (count === 0) {
      console.log('DB empty, seeding Oxford words (Bulk via Prisma)...');
        const sampleWords = [
          { word: 'abandon', phonetic: '/əˈbændən/', type: 'v', meaningEn: 'to leave a place, thing, or person forever', meaningVi: 'từ bỏ, bỏ rơi', level: 'B2', usage: 'Often used with physical places or emotional ties.', example: 'They had to abandon their car in the snow.', exampleVi: 'Họ đã phải bỏ lại chiếc xe của mình trong tuyết.' },
          { word: 'ability', phonetic: '/əˈbɪl.ə.ti/', type: 'n', meaningEn: 'the physical or mental power to do something', meaningVi: 'khả năng, năng lực', level: 'A2', usage: 'Followed by "to" + infinitive.', example: 'She has the ability to speak three languages.', exampleVi: 'Cô ấy có khả năng nói được ba ngôn ngữ.' },
          { word: 'able', phonetic: '/ˈeɪ.bəl/', type: 'adj', meaningEn: 'having the power, skill, or means to do something', meaningVi: 'có thể, có khả năng', level: 'A1', usage: 'Used in the phrase "be able to".', example: 'Will you be able to come to the party?', exampleVi: 'Bạn có thể đến dự bữa tiệc không?' },
          { word: 'about', phonetic: '/əˈbaʊt/', type: 'prep', meaningEn: 'on the subject of; or close to', meaningVi: 'về, khoảng', level: 'A1', usage: 'Used for topics or estimations.', example: 'Tell me about your family.', exampleVi: 'Hãy kể cho tôi nghe về gia đình của bạn.' },
          { word: 'above', phonetic: '/əˈbʌv/', type: 'prep', meaningEn: 'in or to a higher position than something else', meaningVi: 'ở trên, phía trên', level: 'A1', usage: 'Refers to vertical position.', example: 'The planes were flying high above the clouds.', exampleVi: 'Những chiếc máy bay đang bay cao trên những đám mây.' },
          { word: 'accept', phonetic: '/əkˈsept/', type: 'v', meaningEn: 'to agree to take something', meaningVi: 'chấp nhận', level: 'A2', usage: 'Used for offers, invitations, or facts.', example: 'Do you accept credit cards?', exampleVi: 'Bạn có chấp nhận thẻ tín dụng không?' },
          { word: 'accident', phonetic: '/ˈæk.sɪ.dənt/', type: 'n', meaningEn: 'something bad that happens that is not expected', meaningVi: 'tai nạn', level: 'A2', usage: 'Usually negative events.', example: 'He was injured in a car accident.', exampleVi: 'Anh ấy đã bị thương trong một vụ tai nạn ô tô.' },
          { word: 'achieve', phonetic: '/əˈtʃiːv/', type: 'v', meaningEn: 'to succeed in finishing something or reaching a goal', meaningVi: 'đạt được', level: 'B1', usage: 'Used for success after effort.', example: 'She achieved her goal of becoming a doctor.', exampleVi: 'Cô ấy đã đạt được mục tiêu trở thành bác sĩ.' },
        ];
        
        const values = sampleWords.map(w => {
          const id = randomUUID();
          return `('${id}', '${w.word.replace(/'/g, "''")}', '${w.phonetic}', '${w.meaningEn.replace(/'/g, "''")}', '${w.meaningVi.replace(/'/g, "''")}', '${w.type}', '${w.level}', '${w.usage.replace(/'/g, "''")}', '${w.example.replace(/'/g, "''")}', '${w.exampleVi.replace(/'/g, "''")}')`;
        }).join(',');

        await prisma.$executeRawUnsafe(`
          INSERT INTO vocabulary_words (id, word, phonetic, meaning_en, meaning_vi, word_type, cefr_level, usage, example, example_vi) 
          VALUES ${values} 
          ON CONFLICT (word) DO NOTHING
        `);
        console.log('Auto-seed (Bulk via Prisma) complete');
    }

    const learnedWordIds = learnedWords.map(w => w.wordId);
    const excludeIds = learnedWordIds.length > 0 ? learnedWordIds.map(id => `'${id}'`).join(',') : "'00000000-0000-0000-0000-000000000000'";

    // Step 1: Try level-specific fetch
    const levelWords: any = await prisma.$queryRawUnsafe(
      `SELECT id, word, phonetic, meaning_en as "meaningEn", meaning_vi as "meaningVi", word_type as "wordType", cefr_level as "cefrLevel", audio_us as "audioUs", usage, example, example_vi as "exampleVi"
       FROM vocabulary_words 
       WHERE cefr_level = $1 AND id NOT IN (${excludeIds}) 
       ORDER BY RANDOM()
       LIMIT $2`,
      level, Number(limit)
    );

    let finalWords = levelWords;

    // Step 2: Fallback if specific level is empty
    if (finalWords.length === 0) {
      finalWords = await prisma.$queryRawUnsafe(
        `SELECT id, word, phonetic, meaning_en as "meaningEn", meaning_vi as "meaningVi", word_type as "wordType", cefr_level as "cefrLevel", audio_us as "audioUs", usage, example, example_vi as "exampleVi"
         FROM vocabulary_words 
         WHERE id NOT IN (${excludeIds}) 
         ORDER BY RANDOM()
         LIMIT $1`,
        Number(limit)
      );
    }

    // On-the-fly enrichment (Sequential to avoid rate limits)
    const enrichedWords = [];
    for (const word of finalWords) {
      if (!word.phonetic || !word.usage || !word.example) {
        console.log(`Lazy-enriching: ${word.word}...`);
        try {
          const aiData = await GeminiService.enrichWordData(word.word);
          if (aiData) {
            // Update DB in background
            prisma.vocabularyWord.update({
              where: { id: word.id },
              data: {
                phonetic: aiData.phonetic,
                meaningEn: aiData.meaningEn,
                meaningVi: aiData.meaningVi,
                wordType: aiData.wordType,
                cefrLevel: aiData.cefrLevel,
                usage: aiData.usage,
                example: aiData.example,
                exampleVi: aiData.exampleVi
              }
            }).catch(err => console.error(`Failed to update DB for ${word.word}:`, err));
            
            enrichedWords.push({
              ...word,
              phonetic: aiData.phonetic,
              meaningEn: aiData.meaningEn,
              meaningVi: aiData.meaningVi,
              wordType: aiData.wordType,
              cefrLevel: aiData.cefrLevel,
              usage: aiData.usage,
              example: aiData.example,
              exampleVi: aiData.exampleVi
            });
            continue;
          }
        } catch (err) {
          console.error(`Enrichment failed for ${word.word}:`, err);
        }
      }
      enrichedWords.push(word);
    }

    res.json({ words: enrichedWords });
  } catch (error: any) {
    console.error('Error in learn-new:', error);
    res.status(500).json({ error: error.message });
  }
});

// Save progress after learning (Start SRS)
router.post('/save', authenticate, async (req: any, res) => {
  try {
    const userId = req.user.uid;
    const { wordId } = req.body;

    const entry = await prisma.userLearnedWord.upsert({
      where: {
        userId_wordId: { userId, wordId }
      },
      update: {
        masteryLevel: { increment: 1 },
        lastReviewedAt: new Date(),
        nextReviewAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // Test tomorrow
      },
      create: {
        userId,
        wordId,
        masteryLevel: 1,
        nextReviewAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
      }
    });

    // Add 15 XP for learning a new word
    await prisma.user.update({
      where: { id: userId },
      data: { xp: { increment: 15 } }
    });

    res.json({ success: true, entry });
  } catch (error) {
    console.error('Save Word Progress Error:', error);
    res.status(500).json({ error: 'Failed to save word progress' });
  }
});

// Get due reviews (The "Test tomorrow" logic)
router.get('/due-reviews', authenticate, async (req: any, res) => {
  try {
    const userId = req.user.uid;
    const now = new Date();

    const dueWords = await prisma.userLearnedWord.findMany({
      where: {
        userId,
        nextReviewAt: { lte: now }
      },
      include: {
        word: true
      },
      orderBy: {
        nextReviewAt: 'asc'
      }
    });

    res.json({ words: dueWords.map(d => d.word) });
  } catch (error) {
    console.error('Fetch Reviews Error:', error);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

// Search for a word with fuzzy matching (e.g. "abando" -> "abandon")
router.get('/search', async (req, res) => {
  try {
    const { word } = req.query;
    if (!word) return res.status(400).json({ error: 'Search term is required' });

    // Step 1: Try exact match first
    let result = await pool.query(
      `SELECT id, word, phonetic, meaning_en as "meaningEn", meaning_vi as "meaningVi", word_type as "wordType", cefr_level as "cefrLevel", audio_us as "audioUs", additional_examples as "additionalExamples", synonyms, antonyms
       FROM vocabulary_words 
       WHERE LOWER(word) = LOWER($1) LIMIT 1`,
      [word]
    );

    // Step 2: If no exact match, try prefix match (fuzzy)
    if (result.rows.length === 0) {
      result = await pool.query(
        `SELECT id, word, phonetic, meaning_en as "meaningEn", meaning_vi as "meaningVi", word_type as "wordType", cefr_level as "cefrLevel", audio_us as "audioUs", additional_examples as "additionalExamples", synonyms, antonyms
         FROM vocabulary_words 
         WHERE word ILIKE $1 
         ORDER BY LENGTH(word) ASC LIMIT 1`,
        [`${word}%`]
      );
    }

    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Word not found' });
    }

    res.json({ word: result.rows[0] });
  } catch (error: any) {
    console.error('Search error:', error.message);
    res.status(500).json({ error: 'Failed to search word' });
  }
});

// Oxford 3000 Style Wordlist API
router.get('/wordlist', async (req, res) => {
  try {
    const { letter, level, search, page = 1 } = req.query;
    const limit = 50;
    const offset = (Number(page) - 1) * limit;

    const conditions: string[] = ['1=1'];
    const params: any[] = [];
    let i = 1;

    if (letter) { conditions.push(`LOWER(word) LIKE LOWER($${i++})`); params.push(`${letter}%`); }
    if (level)  { conditions.push(`cefr_level = $${i++}`);            params.push(level); }
    if (search) {
      conditions.push(`(word ILIKE $${i} OR meaning_en ILIKE $${i} OR meaning_vi ILIKE $${i})`);
      params.push(`%${search}%`); i++;
    }

    const where = conditions.join(' AND ');
    const { rows: words } = await pool.query(
      `SELECT id, word, phonetic, meaning_en as "meaningEn", meaning_vi as "meaningVi", word_type as "wordType", cefr_level as "cefrLevel", audio_us as "audioUs"
       FROM vocabulary_words WHERE ${where} ORDER BY word ASC LIMIT $${i++} OFFSET $${i++}`,
      [...params, limit, offset]
    );
    const { rows: cnt } = await pool.query(
      `SELECT COUNT(*)::int as total FROM vocabulary_words WHERE ${where}`, params
    );

    res.json({ words, total: cnt[0].total, pages: Math.ceil(cnt[0].total / limit) });
  } catch (error: any) {
    console.error('Wordlist error:', error.message);
    res.status(500).json({ error: 'Failed to fetch wordlist', message: error.message });
  }
});



// ──────────────────────────────────────────────
// NOTEBOOK: Personal Word Journal
// ──────────────────────────────────────────────

// GET /notebook - List all words user has personally saved
router.get('/notebook', authenticate, async (req: any, res) => {
  try {
    const userId = req.user.uid;

    const entries = await prisma.userLearnedWord.findMany({
      where: { userId, isFavorite: true },
      include: { word: true },
      orderBy: { lastReviewedAt: 'desc' }
    });

    res.json({ words: entries.map(e => ({ ...e.word, masteryLevel: e.masteryLevel, nextReviewAt: e.nextReviewAt, savedAt: e.lastReviewedAt })) });
  } catch (error) {
    console.error('Notebook GET error:', error);
    res.status(500).json({ error: 'Failed to fetch notebook' });
  }
});

// POST /notebook - Add a new word to personal notebook (with AI auto-lookup)
router.post('/notebook', authenticate, async (req: any, res) => {
  try {
    const userId = req.user.uid;
    const { word, context, meaningEn, meaningVi, wordType, phonetic } = req.body;

    if (!word || !word.trim()) {
      return res.status(400).json({ error: 'Word is required' });
    }

    const normalizedWord = word.trim();

    // Step 1: Check if word already exists in global vocabulary
    let vocabWord = await prisma.vocabularyWord.findFirst({
      where: { word: { equals: normalizedWord, mode: 'insensitive' } }
    });

    // Step 2: If not in global DB, try AI lookup or use user-provided data
    if (!vocabWord) {
      let finalMeaningEn = meaningEn || '';
      let finalMeaningVi = meaningVi || '';
      let finalWordType = wordType || 'Unknown';
      let finalPhonetic = phonetic || '';

      // Auto-lookup via Gemini if no meaning provided
      if (!finalMeaningEn) {
        try {
          const { GeminiService } = await import('../services/gemini.service');
          const aiResult = await GeminiService.explainWord(normalizedWord);
          if (aiResult) {
            finalMeaningEn = aiResult.meaning || '';
            finalMeaningVi = aiResult.meaningVi || '';
            finalWordType  = aiResult.wordType || 'Unknown';
            finalPhonetic  = aiResult.phonetic || '';
          }
        } catch (aiErr) {
          console.warn('AI lookup failed, using user-provided data:', aiErr);
        }
      }

      const id = require('crypto').randomUUID();
      await (prisma as any).$executeRawUnsafe(
        `INSERT INTO vocabulary_words (id, word, phonetic, meaning_en, meaning_vi, word_type, cefr_level)
         VALUES ($1, $2, $3, $4, $5, $6, $7)
         ON CONFLICT (word) DO NOTHING`,
        id, normalizedWord, finalPhonetic, finalMeaningEn, finalMeaningVi, finalWordType, 'Custom'
      );

      vocabWord = await prisma.vocabularyWord.findFirst({
        where: { word: { equals: normalizedWord, mode: 'insensitive' } }
      });
    }

    if (!vocabWord) {
      return res.status(500).json({ error: 'Could not create vocabulary entry' });
    }

    // Step 3: Add to user's personal notebook (isFavorite = true marks it as "user-added")
    const entry = await prisma.userLearnedWord.upsert({
      where: { userId_wordId: { userId, wordId: vocabWord.id } },
      update: { isFavorite: true, lastReviewedAt: new Date() },
      create: {
        userId,
        wordId: vocabWord.id,
        isFavorite: true,
        masteryLevel: 0,
        lastReviewedAt: new Date(),
        nextReviewAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // Review tomorrow
      }
    });

    // Step 4: Award 5 XP for adding a new word
    await prisma.user.update({
      where: { id: userId },
      data: { xp: { increment: 5 } }
    });

    res.json({ success: true, word: vocabWord, entry, context });
  } catch (error: any) {
    console.error('Notebook POST error:', error);
    res.status(500).json({ error: 'Failed to add word', message: error.message });
  }
});

// DELETE /notebook/:wordId - Remove a word from personal notebook
router.delete('/notebook/:wordId', authenticate, async (req: any, res) => {
  try {
    const userId = req.user.uid;
    const { wordId } = req.params;

    await prisma.userLearnedWord.updateMany({
      where: { userId, wordId },
      data: { isFavorite: false }
    });

    res.json({ success: true });
  } catch (error) {
    console.error('Notebook DELETE error:', error);
    res.status(500).json({ error: 'Failed to remove word' });
  }
});

export default router;

