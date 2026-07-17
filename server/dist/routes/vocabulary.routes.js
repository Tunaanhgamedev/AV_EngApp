"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pg_1 = require("pg");
const auth_middleware_1 = require("../middleware/auth.middleware");
const prisma_1 = __importDefault(require("../lib/prisma"));
const crypto_1 = require("crypto");
const gemini_service_1 = require("../services/gemini.service");
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const router = (0, express_1.Router)();
// Direct pg pool for reliable raw SQL (Prisma v7 ORM methods are unstable)
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});
// Get user learning stats
router.get('/stats', auth_middleware_1.authenticate, async (req, res) => {
    try {
        const userId = req.user.uid;
        const { rows } = await pool.query(`SELECT COUNT(*)::int as "wordsLearned" FROM user_learned_words WHERE user_id = $1`, [userId]);
        // Get Oxford 3000 progress (words learned that are part of Oxford)
        const { rows: oxRows } = await pool.query(`SELECT COUNT(*)::int as "oxfordLearned" 
       FROM user_learned_words ulw
       JOIN vocabulary_words vw ON ulw.word_id = vw.id
       WHERE ulw.user_id = $1 AND vw.cefr_level IN ('A1', 'A2', 'B1', 'B2', 'C1', 'C2')`, [userId]);
        res.json({
            wordsLearned: rows[0].wordsLearned || 0,
            oxfordLearned: oxRows[0].oxfordLearned || 0,
            totalOxford: 3000
        });
    }
    catch (error) {
        console.error('Stats error:', error.message);
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
});
// Get words for learning (Oxford 3000 words not yet in user list)
router.get('/learn-new', auth_middleware_1.authenticate, async (req, res) => {
    try {
        const userId = req.user.uid;
        const { level = 'B1', limit = 10 } = req.query;
        // Get IDs of words user is already learning
        const learnedWords = await prisma_1.default.userLearnedWord.findMany({
            where: { userId },
            select: { wordId: true }
        });
        // Auto-seed if empty (OPTIMIZED Bulk Insert via Prisma)
        const countResult = await prisma_1.default.$queryRawUnsafe('SELECT COUNT(*) as count FROM vocabulary_words');
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
                const id = (0, crypto_1.randomUUID)();
                return `('${id}', '${w.word.replace(/'/g, "''")}', '${w.phonetic}', '${w.meaningEn.replace(/'/g, "''")}', '${w.meaningVi.replace(/'/g, "''")}', '${w.type}', '${w.level}', '${w.usage.replace(/'/g, "''")}', '${w.example.replace(/'/g, "''")}', '${w.exampleVi.replace(/'/g, "''")}')`;
            }).join(',');
            await prisma_1.default.$executeRawUnsafe(`
          INSERT INTO vocabulary_words (id, word, phonetic, meaning_en, meaning_vi, word_type, cefr_level, usage, example, example_vi) 
          VALUES ${values} 
          ON CONFLICT (word) DO NOTHING
        `);
            console.log('Auto-seed (Bulk via Prisma) complete');
        }
        const learnedWordIds = learnedWords.map((w) => w.wordId);
        const excludeIds = learnedWordIds.length > 0 ? learnedWordIds.map((id) => `'${id}'`).join(',') : "'00000000-0000-0000-0000-000000000000'";
        // Step 1: Try level-specific fetch
        const levelWords = await prisma_1.default.$queryRawUnsafe(`SELECT id, word, phonetic, meaning_en as "meaningEn", meaning_vi as "meaningVi", word_type as "wordType", cefr_level as "cefrLevel", audio_us as "audioUs", usage, example, example_vi as "exampleVi"
       FROM vocabulary_words 
       WHERE cefr_level = $1 AND id NOT IN (${excludeIds}) 
       ORDER BY RANDOM()
       LIMIT $2`, level, Number(limit));
        let finalWords = levelWords;
        // Step 2: Fallback if specific level is empty
        if (finalWords.length === 0) {
            finalWords = await prisma_1.default.$queryRawUnsafe(`SELECT id, word, phonetic, meaning_en as "meaningEn", meaning_vi as "meaningVi", word_type as "wordType", cefr_level as "cefrLevel", audio_us as "audioUs", usage, example, example_vi as "exampleVi"
         FROM vocabulary_words 
         WHERE id NOT IN (${excludeIds}) 
         ORDER BY RANDOM()
         LIMIT $1`, Number(limit));
        }
        // Send response IMMEDIATELY (no blocking!)
        res.json({ words: finalWords });
        // Background enrichment: fire-and-forget
        const incompleteWords = finalWords.filter((w) => !w.meaningVi || w.meaningVi === w.word || !w.phonetic || !w.usage || !w.example || !w.exampleVi);
        if (incompleteWords.length > 0) {
            (async () => {
                const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
                let enrichCount = 0;
                for (const w of incompleteWords) {
                    try {
                        if (enrichCount > 0)
                            await delay(1500); // Rate limit buffer
                        console.log(`[BG Learn Enrich] ${w.word}`);
                        const aiData = await gemini_service_1.GeminiService.enrichWordData(w.word);
                        if (aiData) {
                            enrichCount++;
                            await pool.query(`UPDATE vocabulary_words SET 
                  meaning_vi = COALESCE(NULLIF($2, ''), meaning_vi),
                  meaning_en = COALESCE(NULLIF($3, ''), meaning_en),
                  phonetic = COALESCE(NULLIF($4, ''), phonetic),
                  word_type = COALESCE(NULLIF($5, ''), word_type),
                  usage = COALESCE(NULLIF($6, ''), usage),
                  example = COALESCE(NULLIF($7, ''), example),
                  example_vi = COALESCE(NULLIF($8, ''), example_vi),
                  cefr_level = CASE WHEN cefr_level IN ('Custom', 'OXFORD3000', '') OR cefr_level IS NULL THEN $9 ELSE cefr_level END
                WHERE id = $1`, [w.id, aiData.meaningVi, aiData.meaningEn, aiData.phonetic, aiData.wordType, aiData.usage, aiData.example, aiData.exampleVi, aiData.cefrLevel || w.cefrLevel || 'B1']);
                        }
                    }
                    catch (err) {
                        if (err?.message?.includes('429'))
                            break;
                        console.error(`[BG Learn Enrich] Failed ${w.word}:`, err.message);
                    }
                }
                if (enrichCount > 0)
                    console.log(`[BG Learn Enrich] Done: ${enrichCount} words`);
            })().catch(() => { });
        }
    }
    catch (error) {
        console.error('Error in learn-new:', error);
        res.status(500).json({ error: error.message });
    }
});
// Save progress after learning (Start SRS)
router.post('/save', auth_middleware_1.authenticate, async (req, res) => {
    try {
        const userId = req.user.uid;
        const { wordId } = req.body;
        const entry = await prisma_1.default.userLearnedWord.upsert({
            where: {
                userId_wordId: { userId, wordId }
            },
            update: {
                isFavorite: true,
                masteryLevel: { increment: 1 },
                lastReviewedAt: new Date(),
                nextReviewAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // Test tomorrow
            },
            create: {
                userId,
                wordId,
                isFavorite: true,
                masteryLevel: 1,
                nextReviewAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
            }
        });
        // Add 15 XP for learning a new word
        await prisma_1.default.user.update({
            where: { id: userId },
            data: { xp: { increment: 15 } }
        });
        res.json({ success: true, entry });
    }
    catch (error) {
        console.error('Save Word Progress Error:', error);
        res.status(500).json({ error: 'Failed to save word progress' });
    }
});
// Get due reviews (only notebook/favorite words)
router.get('/due-reviews', auth_middleware_1.authenticate, async (req, res) => {
    try {
        const userId = req.user.uid;
        const now = new Date();
        const dueWords = await prisma_1.default.userLearnedWord.findMany({
            where: {
                userId,
                isFavorite: true,
                nextReviewAt: { lte: now }
            },
            include: {
                word: true
            },
            orderBy: {
                nextReviewAt: 'asc'
            }
        });
        res.json({ words: dueWords.map((d) => d.word) });
    }
    catch (error) {
        console.error('Fetch Reviews Error:', error);
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
});
// Search for a word with fuzzy matching (e.g. "abando" -> "abandon")
router.get('/search', async (req, res) => {
    try {
        const { word } = req.query;
        if (!word)
            return res.status(400).json({ error: 'Search term is required' });
        // Step 1: Try exact match first
        let result = await pool.query(`SELECT id, word, phonetic, meaning_en as "meaningEn", meaning_vi as "meaningVi", word_type as "wordType", cefr_level as "cefrLevel", audio_us as "audioUs", audio_uk as "audioUk", usage, example, example_vi as "exampleVi"
       FROM vocabulary_words 
       WHERE LOWER(word) = LOWER($1) LIMIT 1`, [word]);
        // Step 2: If no exact match, try prefix match (fuzzy)
        if (result.rows.length === 0) {
            result = await pool.query(`SELECT id, word, phonetic, meaning_en as "meaningEn", meaning_vi as "meaningVi", word_type as "wordType", cefr_level as "cefrLevel", audio_us as "audioUs", audio_uk as "audioUk", usage, example, example_vi as "exampleVi"
         FROM vocabulary_words 
         WHERE word ILIKE $1 
         ORDER BY LENGTH(word) ASC LIMIT 1`, [`${word}%`]);
        }
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Word not found' });
        }
        const matchedWord = result.rows[0];
        const needsEnrichment = !matchedWord.meaningVi || matchedWord.meaningVi === matchedWord.word || !matchedWord.phonetic || !matchedWord.usage || !matchedWord.example || !matchedWord.exampleVi;
        if (needsEnrichment) {
            try {
                console.log(`[Search-On-Demand Enrich] Enriching word: ${matchedWord.word}`);
                const aiData = await gemini_service_1.GeminiService.enrichWordData(matchedWord.word);
                if (aiData) {
                    await pool.query(`UPDATE vocabulary_words SET 
              meaning_vi = COALESCE(NULLIF($2, ''), meaning_vi),
              meaning_en = COALESCE(NULLIF($3, ''), meaning_en),
              phonetic = COALESCE(NULLIF($4, ''), phonetic),
              word_type = COALESCE(NULLIF($5, ''), word_type),
              usage = COALESCE(NULLIF($6, ''), usage),
              example = COALESCE(NULLIF($7, ''), example),
              example_vi = COALESCE(NULLIF($8, ''), example_vi),
              cefr_level = CASE WHEN cefr_level IN ('Custom', 'OXFORD3000', '') OR cefr_level IS NULL THEN $9 ELSE cefr_level END
            WHERE id = $1`, [matchedWord.id, aiData.meaningVi, aiData.meaningEn, aiData.phonetic, aiData.wordType, aiData.usage, aiData.example, aiData.exampleVi, aiData.cefrLevel || matchedWord.cefrLevel || 'B1']);
                    return res.json({
                        word: {
                            ...matchedWord,
                            meaningVi: aiData.meaningVi || matchedWord.meaningVi,
                            meaningEn: aiData.meaningEn || matchedWord.meaningEn,
                            phonetic: aiData.phonetic || matchedWord.phonetic,
                            wordType: aiData.wordType || matchedWord.wordType,
                            usage: aiData.usage || matchedWord.usage,
                            example: aiData.example || matchedWord.example,
                            exampleVi: aiData.exampleVi || matchedWord.exampleVi,
                            cefrLevel: aiData.cefrLevel || matchedWord.cefrLevel
                        }
                    });
                }
            }
            catch (err) {
                console.error(`[Search-On-Demand Enrich] Failed:`, err.message);
            }
        }
        res.json({ word: matchedWord });
    }
    catch (error) {
        console.error('Search error:', error.message);
        res.status(500).json({ error: 'Failed to search word' });
    }
});
// Oxford 3000 Style Wordlist API (with lazy enrichment)
router.get('/wordlist', async (req, res) => {
    try {
        const { letter, level, search, page = 1, enrich = 'true' } = req.query;
        const limit = 50;
        const offset = (Number(page) - 1) * limit;
        const conditions = ['1=1'];
        const params = [];
        let i = 1;
        if (letter) {
            conditions.push(`LOWER(word) LIKE LOWER($${i++})`);
            params.push(`${letter}%`);
        }
        if (level) {
            conditions.push(`cefr_level = $${i++}`);
            params.push(level);
        }
        if (search) {
            conditions.push(`(word ILIKE $${i} OR meaning_en ILIKE $${i} OR meaning_vi ILIKE $${i})`);
            params.push(`%${search}%`);
            i++;
        }
        const where = conditions.join(' AND ');
        const { rows: words } = await pool.query(`SELECT id, word, phonetic, meaning_en as "meaningEn", meaning_vi as "meaningVi", word_type as "wordType", cefr_level as "cefrLevel", audio_us as "audioUs", usage, example, example_vi as "exampleVi"
       FROM vocabulary_words WHERE ${where} ORDER BY word ASC LIMIT $${i++} OFFSET $${i++}`, [...params, limit, offset]);
        const { rows: cnt } = await pool.query(`SELECT COUNT(*)::int as total FROM vocabulary_words WHERE ${where}`, params);
        // Send response IMMEDIATELY (no blocking)
        res.json({ words, total: cnt[0].total, pages: Math.ceil(cnt[0].total / limit) });
        // Background enrichment: fire-and-forget AFTER response is sent
        const shouldEnrich = enrich !== 'false';
        if (shouldEnrich && words.length > 0) {
            const incompleteWords = words.filter((w) => !w.meaningVi || w.meaningVi === w.word || !w.phonetic || !w.usage || !w.wordType || w.wordType === '-').slice(0, 2); // Max 2 per background run
            if (incompleteWords.length > 0) {
                // Run in background — does NOT block the response
                (async () => {
                    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
                    let enrichCount = 0;
                    for (const w of incompleteWords) {
                        try {
                            if (enrichCount > 0)
                                await delay(1500);
                            console.log(`[BG Enrich] ${w.word}`);
                            const aiData = await gemini_service_1.GeminiService.enrichWordData(w.word);
                            if (aiData) {
                                enrichCount++;
                                pool.query(`UPDATE vocabulary_words SET 
                    meaning_vi = COALESCE(NULLIF($2, ''), meaning_vi),
                    meaning_en = COALESCE(NULLIF($3, ''), meaning_en),
                    phonetic = COALESCE(NULLIF($4, ''), phonetic),
                    word_type = COALESCE(NULLIF($5, ''), word_type),
                    usage = COALESCE(NULLIF($6, ''), usage),
                    example = COALESCE(NULLIF($7, ''), example),
                    example_vi = COALESCE(NULLIF($8, ''), example_vi),
                    cefr_level = CASE WHEN cefr_level IN ('Custom', 'OXFORD3000', '') OR cefr_level IS NULL THEN $9 ELSE cefr_level END
                  WHERE id = $1`, [w.id, aiData.meaningVi, aiData.meaningEn, aiData.phonetic, aiData.wordType, aiData.usage, aiData.example, aiData.exampleVi, aiData.cefrLevel || 'B1']).catch(err => console.error(`[BG Enrich] DB fail ${w.word}:`, err.message));
                            }
                        }
                        catch (err) {
                            if (err?.message?.includes('429'))
                                break;
                            console.error(`[BG Enrich] Failed ${w.word}:`, err.message);
                        }
                    }
                    if (enrichCount > 0)
                        console.log(`[BG Enrich] Done: ${enrichCount} words on page ${page}`);
                })().catch(() => { }); // Swallow any unhandled errors
            }
        }
    }
    catch (error) {
        console.error('Wordlist error:', error.message);
        if (!res.headersSent) {
            res.status(500).json({ error: 'Failed to fetch wordlist', message: error.message });
        }
    }
});
// Predefined fallbacks for game categories
const FALLBACK_OXFORD_WORDS = [
    { id: 'f-ox1', word: 'abundant', phonetic: '/əˈbʌndənt/', meaningEn: 'existing or available in large quantities; overflowing.', meaningVi: 'phong phú, dồi dào, nhiều.', wordType: 'Adjective', cefrLevel: 'B1', example: 'The river provides an abundant supply of fresh water.', exampleVi: 'Con sông cung cấp nguồn nước ngọt dồi dào.' },
    { id: 'f-ox2', word: 'diligent', phonetic: '/ˈdɪlɪdʒənt/', meaningEn: 'having or showing care and conscientiousness in one\'s work or duties.', meaningVi: 'cần cũ, chăm chỉ, siêng năng.', wordType: 'Adjective', cefrLevel: 'B1', example: 'She is a diligent student who always completes her homework.', exampleVi: 'Cô ấy là một học sinh chăm chỉ luôn hoàn thành bài tập về nhà.' },
    { id: 'f-ox3', word: 'resilient', phonetic: '/rɪˈzɪliənt/', meaningEn: 'able to withstand or recover quickly from difficult conditions.', meaningVi: 'kiên cường, nhanh phục hồi, đàn hồi.', wordType: 'Adjective', cefrLevel: 'B2', example: 'Babies are more resilient than people realize.', exampleVi: 'Trẻ em thường kiên cường hơn những gì mọi người nghĩ.' },
    { id: 'f-ox4', word: 'eloquent', phonetic: '/ˈeləkwənt/', meaningEn: 'fluent or persuasive in speaking or writing.', meaningVi: 'hùng hồn, lưu loát, có tài hùng biến.', wordType: 'Adjective', cefrLevel: 'B2', example: 'His eloquent speech moved the audience to tears.', exampleVi: 'Bài phát biểu hùng hồn của anh ấy đã làm khán giả xúc động rơi nước mắt.' },
    { id: 'f-ox5', word: 'sincere', phonetic: '/sɪnˈsɪr/', meaningEn: 'free from pretense or deceit; proceeding from genuine feelings.', meaningVi: 'chân thành, thật lòng.', wordType: 'Adjective', cefrLevel: 'B1', example: 'Please accept my sincere apologies for the mistake.', exampleVi: 'Xin vui lòng chấp nhận lời xin lỗi chân thành của tôi vì sai sót này.' },
    { id: 'f-ox6', word: 'generous', phonetic: '/ˈdʒenərəs/', meaningEn: 'showing a readiness to give more of something than is strictly necessary.', meaningVi: 'hào phóng, rộng lượng.', wordType: 'Adjective', cefrLevel: 'A2', example: 'It was very generous of you to pay for the dinner.', exampleVi: 'Bạn thật hào phóng khi trả tiền cho bữa tối.' },
    { id: 'f-ox7', word: 'ambiguous', phonetic: '/æmˈbɪɡjuəs/', meaningEn: 'open to more than one interpretation; having a double meaning.', meaningVi: 'mơ hồ, nước đôi, không rõ ràng.', wordType: 'Adjective', cefrLevel: 'B2', example: 'The instructions she left were ambiguous and confusing.', exampleVi: 'Những lời hướng dẫn cô ấy để lại rất mơ hồ và khó hiểu.' },
    { id: 'f-ox8', word: 'benevolent', phonetic: '/bəˈnevələnt/', meaningEn: 'well meaning and kindly; serving a charitable purpose.', meaningVi: 'nhân từ, tốt bụng, từ thiện.', wordType: 'Adjective', cefrLevel: 'B2', example: 'The benevolent old man donated a lot of money to the orphanage.', exampleVi: 'Người đàn ông lớn tuổi nhân từ đã quyên góp nhiều tiền cho trại trẻ mồ côi.' },
    { id: 'f-ox9', word: 'meticulous', phonetic: '/məˈtɪkjələs/', meaningEn: 'showing great attention to detail; very careful and precise.', meaningVi: 'tỉ mỉ, kỹ càng, quá kỹ lưỡng.', wordType: 'Adjective', cefrLevel: 'B2', example: 'He is meticulous in keeping his desk and papers clean.', exampleVi: 'Anh ấy rất tỉ mỉ trong việc giữ sạch sẽ bàn làm việc và các giấy tờ.' },
    { id: 'f-ox10', word: 'optimistic', phonetic: '/ˌɑːptɪˈmɪstɪk/', meaningEn: 'hopeful and confident about the future.', meaningVi: 'lạc quan, tràn đầy hy vọng.', wordType: 'Adjective', cefrLevel: 'B1', example: 'She remains optimistic about the project\'s success.', exampleVi: 'Cô ấy vẫn lạc quan về cơ hội thành công của dự án.' },
    { id: 'f-ox11', word: 'pragmatic', phonetic: '/præɡˈmætɪk/', meaningEn: 'dealing with things sensibly and realistically based on practical ideas.', meaningVi: 'thực tế, thực dụng.', wordType: 'Adjective', cefrLevel: 'B2', example: 'We need a pragmatic approach to solving this crisis.', exampleVi: 'Chúng ta cần một hướng tiếp cận thực tế để giải quyết cuộc khủng hoảng này.' },
    { id: 'f-ox12', word: 'vibrant', phonetic: '/ˈvaɪbrənt/', meaningEn: 'full of energy and life; bright or vivid.', meaningVi: 'sôi động, đầy sức sống, rực rỡ.', wordType: 'Adjective', cefrLevel: 'B1', example: 'The city has a vibrant nightlife that attracts young tourists.', exampleVi: 'Thành phố có cuộc sống ban đêm sôi động thu hút các du khách trẻ.' },
    { id: 'f-ox13', word: 'accurate', phonetic: '/ˈækjərət/', meaningEn: 'correct, exact, and without any mistakes.', meaningVi: 'chính xác, đúng đắn.', wordType: 'Adjective', cefrLevel: 'B1', example: 'She gave an accurate description of the suspect.', exampleVi: 'Cô ấy đã đưa ra một mô tả chính xác về nghi phạm.' },
    { id: 'f-ox14', word: 'courageous', phonetic: '/kəˈreɪdʒəs/', meaningEn: 'not deterred by danger or pain; brave.', meaningVi: 'dũng cảm, quả cảm.', wordType: 'Adjective', cefrLevel: 'B1', example: 'The courageous firefighter saved the family from the burning building.', exampleVi: 'Người lính cứu hỏa dũng cảm đã cứu gia đình khỏi tòa nhà đang cháy.' },
    { id: 'f-ox15', word: 'compassion', phonetic: '/kəmˈpæʃn/', meaningEn: 'sympathetic pity and concern for the sufferings or misfortunes of others.', meaningVi: 'lòng trắc ẩn, lòng thương cảm.', wordType: 'Noun', cefrLevel: 'B2', example: 'We must show compassion for the homeless and needy.', exampleVi: 'Chúng ta cần thể hiện lòng trắc ẩn đối với những người vô gia cư và khó khăn.' }
];
const FALLBACK_TOEIC_WORDS = [
    { id: 'f-to1', word: 'collaborate', phonetic: '/kəˈlæbəreɪt/', meaningEn: 'work jointly on an activity or project.', meaningVi: 'hợp tác, cộng tác.', wordType: 'Verb', cefrLevel: 'B2', example: 'Our teams need to collaborate to solve this problem quickly.', exampleVi: 'Các đội ngũ của chúng ta cần hợp tác để giải quyết vấn đề này nhanh chóng.' },
    { id: 'f-to2', word: 'negotiate', phonetic: '/nɪˈɡoʊʃieɪt/', meaningEn: 'obtain or bring about by discussion.', meaningVi: 'thương lượng, đàm phán.', wordType: 'Verb', cefrLevel: 'B2', example: 'He is trying to negotiate a better salary with his new manager.', exampleVi: 'Anh ấy đang cố gắng đàm phán một mức lương tốt hơn với quản lý mới.' },
    { id: 'f-to3', word: 'revenue', phonetic: '/ˈrevənuː/', meaningEn: 'income, especially of a company or organization.', meaningVi: 'doanh thu, lợi tức.', wordType: 'Noun', cefrLevel: 'B2', example: 'The company\'s annual revenue increased by fifteen percent.', exampleVi: 'Doanh thu hàng năm của công ty đã tăng mười lăm phần trăm.' },
    { id: 'f-to4', word: 'delegate', phonetic: '/ˈdelɪɡeɪt/', meaningEn: 'entrust (a task or responsibility) to another person.', meaningVi: 'ủy thác, giao phó công việc.', wordType: 'Verb', cefrLevel: 'B2', example: 'A good manager knows how to delegate tasks to team members.', exampleVi: 'Một quản lý tốt biết cách giao phó công việc cho các thành viên trong đội.' },
    { id: 'f-to5', word: 'invoice', phonetic: '/ˈɪnvɔɪ/', meaningEn: 'a list of goods sent or services provided with the sum due.', meaningVi: 'hóa đơn thanh toán.', wordType: 'Noun', cefrLevel: 'B1', example: 'Please send the invoice to our accounting department directly.', exampleVi: 'Vui lòng gửi trực tiếp hóa đơn thanh toán đến bộ phận kế toán của chúng tôi.' },
    { id: 'f-to6', word: 'implement', phonetic: '/ˈɪmplɪment/', meaningEn: 'put (a decision, plan, agreement, etc.) into effect.', meaningVi: 'thực thi, áp dụng, triển khai.', wordType: 'Verb', cefrLevel: 'B2', example: 'We will implement the new policy starting next Monday.', exampleVi: 'Chúng tôi sẽ triển khai chính sách mới bắt đầu từ thứ Hai tới.' },
    { id: 'f-to7', word: 'terminate', phonetic: '/ˈtɜːrmɪneɪt/', meaningEn: 'bring to an end.', meaningVi: 'chấm dứt, kết thúc hợp đồng.', wordType: 'Verb', cefrLevel: 'B2', example: 'The client decided to terminate the contract earlier than expected.', exampleVi: 'Khách hàng quyết định chấm dứt hợp đồng sớm hơn dự kiến.' },
    { id: 'f-to8', word: 'compile', phonetic: '/kəmˈpaɪl/', meaningEn: 'produce by assembling information collected from other sources.', meaningVi: 'biên soạn, thu thập, tổng hợp tài liệu.', wordType: 'Verb', cefrLevel: 'B2', example: 'She needs to compile all sales reports before the meeting.', exampleVi: 'Cô ấy cần tổng hợp tất cả báo cáo bán hàng trước cuộc họp.' },
    { id: 'f-to9', word: 'executive', phonetic: '/ɪɡˈzekjətɪv/', meaningEn: 'having the power to put plans or actions into effect.', meaningVi: 'ủy viên ban điều hành, cấp quản lý.', wordType: 'Noun', cefrLevel: 'C1', example: 'The chief executive officer made the final decision.', exampleVi: 'Giám đốc điều hành đã đưa ra quyết định cuối cùng.' },
    { id: 'f-to10', word: 'strategy', phonetic: '/ˈstrætədʒi/', meaningEn: 'a plan of action designed to achieve a major aim.', meaningVi: 'chiến lược.', wordType: 'Noun', cefrLevel: 'B1', example: 'We need a clear strategy to win market share.', exampleVi: 'Chúng ta cần một chiến lược rõ ràng để giành thị phần.' },
    { id: 'f-to11', word: 'accumulate', phonetic: '/əˈkjuːmjəleɪt/', meaningEn: 'gather or build up a slowly larger amount of something.', meaningVi: 'tích lũy, gom góp.', wordType: 'Verb', cefrLevel: 'B2', example: 'We have managed to accumulate wealth over generations.', exampleVi: 'Chúng tôi đã có thể tích lũy tài sản qua nhiều thế hệ.' },
    { id: 'f-to12', word: 'acquire', phonetic: '/əˈkwaɪər/', meaningEn: 'buy or obtain (an asset or object).', meaningVi: 'mua lại, đạt được.', wordType: 'Verb', cefrLevel: 'B2', example: 'The corporation plans to acquire two smaller software companies.', exampleVi: 'Tập đoàn có kế hoạch mua lại hai công ty phần mềm nhỏ hơn.' },
    { id: 'f-to13', word: 'comply', phonetic: '/kəmˈplaɪ/', meaningEn: 'act in accordance with a wish or command.', meaningVi: 'tuân thủ, chấp hành.', wordType: 'Verb', cefrLevel: 'B2', example: 'All employees must comply with the new safety regulations.', exampleVi: 'Tất cả nhân viên phải tuân thủ các quy định an toàn mới.' },
    { id: 'f-to14', word: 'franchise', phonetic: '/ˈfræntʃaɪz/', meaningEn: 'an authorization granted by a company to an individual enabling them to carry out specified commercial activities.', meaningVi: 'nhượng quyền thương hiệu.', wordType: 'Noun', cefrLevel: 'B2', example: 'They decided to open a fast-food franchise in the city center.', exampleVi: 'Họ quyết định mở một cửa hàng nhượng quyền đồ ăn nhanh ở trung tâm thành phố.' },
    { id: 'f-to15', word: 'subsidiary', phonetic: '/səbˈsɪdieri/', meaningEn: 'a company controlled by a holding or parent company.', meaningVi: 'công ty con.', wordType: 'Noun', cefrLevel: 'C1', example: 'The German firm is a subsidiary of a larger multinational corporation.', exampleVi: 'Công ty Đức này là công ty con của một tập đoàn đa quốc gia lớn hơn.' }
];
const FALLBACK_IELTS_WORDS = [
    { id: 'f-ie1', word: 'advocate', phonetic: '/ˈædvəkeɪt/', meaningEn: 'publicly recommend or support a particular cause or policy.', meaningVi: 'biện hộ, ủng hộ công khai.', wordType: 'Verb', cefrLevel: 'C1', example: 'Many environmentalists advocate using renewable energy sources.', exampleVi: 'Nhiều nhà môi trường học ủng hộ công khai việc sử dụng nguồn năng lượng tái tạo.' },
    { id: 'f-ie2', word: 'fluctuate', phonetic: '/ˈflʌktʃueɪt/', meaningEn: 'rise and fall irregularly in number or amount.', meaningVi: 'dao động, biến động liên tục.', wordType: 'Verb', cefrLevel: 'B2', example: 'The stock prices fluctuate wildly based on political news.', exampleVi: 'Giá cổ phiếu biến động dữ dội dựa trên các tin tức chính trị.' },
    { id: 'f-ie3', word: 'hypothesis', phonetic: '/haɪˈpɑːθəsɪs/', meaningEn: 'a proposed explanation made on the basis of limited evidence.', meaningVi: 'giả thuyết khoa học.', wordType: 'Noun', cefrLevel: 'C1', example: 'The researchers proposed a new hypothesis to explain the phenomenon.', exampleVi: 'Các nhà nghiên cứu đã đưa ra một giả thuyết mới để giải thích hiện tượng này.' },
    { id: 'f-ie4', word: 'synthesize', phonetic: '/ˈsɪnθəsaɪz/', meaningEn: 'combine (a number of things) into a coherent whole.', meaningVi: 'tổng hợp, kết hợp các yếu tố.', wordType: 'Verb', cefrLevel: 'C1', example: 'In the essay, students must synthesize information from three sources.', exampleVi: 'Trong bài luận, học sinh phải tổng hợp thông tin từ ba nguồn tài liệu.' },
    { id: 'f-ie5', word: 'validate', phonetic: '/ˈvælɪdeɪt/', meaningEn: 'check or prove the validity or accuracy of (something).', meaningVi: 'phê chuẩn, xác thực, làm cho có hiệu lực.', wordType: 'Verb', cefrLevel: 'C1', example: 'We need further experiments to validate these initial findings.', exampleVi: 'Chúng ta cần các thí nghiệm thêm để xác thực các kết quả ban đầu này.' },
    { id: 'f-ie6', word: 'coordinate', phonetic: '/koʊˈɔːrdɪneɪt/', meaningEn: 'bring the different elements of a complex activity into harmony.', meaningVi: 'phối hợp, điều phối.', wordType: 'Verb', cefrLevel: 'B2', example: 'She was hired to coordinate the volunteer activities.', exampleVi: 'Cô ấy đã được thuê để điều phối các hoạt động tình nguyện.' },
    { id: 'f-ie7', word: 'empirical', phonetic: '/ɪmˈpɪrɪkl/', meaningEn: 'based on observation or experience rather than theory or logic.', meaningVi: 'thực chứng, dựa trên kinh nghiệm thực tế.', wordType: 'Adjective', cefrLevel: 'C1', example: 'The scientist presented empirical evidence to support his theory.', exampleVi: 'Nhà khoa học đã trình bày bằng chứng thực chứng để hỗ trợ thuyết của mình.' },
    { id: 'f-ie8', word: 'paradigm', phonetic: '/ˈpærədaɪm/', meaningEn: 'a typical example or pattern of something; a model.', meaningVi: 'mô hình, hệ hình mẫu.', wordType: 'Noun', cefrLevel: 'C2', example: 'This discovery represents a paradigm shift in physics research.', exampleVi: 'Phát hiện này đại diện cho một sự chuyển dịch hệ hình trong nghiên cứu vật lý.' },
    { id: 'f-ie9', word: 'qualitative', phonetic: '/ˈkwɑːlɪteɪtɪv/', meaningEn: 'relating to the quality of something rather than quantity.', meaningVi: 'định tính, thuộc tính chất.', wordType: 'Adjective', cefrLevel: 'C1', example: 'The company conducted qualitative research on user experience.', exampleVi: 'Công ty đã thực hiện nghiên cứu định tính về trải nghiệm người dùng.' },
    { id: 'f-ie10', word: 'rational', phonetic: '/ˈræʃnəl/', meaningEn: 'based on or in accordance with reason or logic.', meaningVi: 'hợp lý, có lý trí.', wordType: 'Adjective', cefrLevel: 'B2', example: 'Let\'s have a rational discussion instead of getting emotional.', exampleVi: 'Chúng ta hãy thảo luận có lý trí thay vì trở nên xúc động.' },
    { id: 'f-ie11', word: 'diminish', phonetic: '/dɪˈmɪnɪʃ/', meaningEn: 'make or become less.', meaningVi: 'giảm bớt, thu nhỏ.', wordType: 'Verb', cefrLevel: 'C1', example: 'The threat of inflation has begun to diminish.', exampleVi: 'Mối đe dọa lạm phát đã bắt đầu giảm bớt.' },
    { id: 'f-ie12', word: 'equivocal', phonetic: '/ɪˈkwɪvəkl/', meaningEn: 'open to more than one interpretation; ambiguous.', meaningVi: 'lập lờ, hai nghĩa, mơ hồ.', wordType: 'Adjective', cefrLevel: 'C2', example: 'The politician gave an equivocal answer to the journalist.', exampleVi: 'Chính trị gia đã đưa ra một câu trả lời lập lờ trước nhà báo.' },
    { id: 'f-ie13', word: 'scrutinize', phonetic: '/ˈskruːtənaɪz/', meaningEn: 'examine or inspect closely and thoroughly.', meaningVi: 'xem xét kỹ lưỡng, săm soi.', wordType: 'Verb', cefrLevel: 'C1', example: 'Customers should scrutinize the terms of the agreement before signing.', exampleVi: 'Khách hàng nên xem xét kỹ lưỡng các điều khoản hợp đồng trước khi ký.' },
    { id: 'f-ie14', word: 'deviate', phonetic: '/ˈdiːvieɪt/', meaningEn: 'depart from an established course.', meaningVi: 'lệch hướng, đi chệch khỏi quy chuẩn.', wordType: 'Verb', cefrLevel: 'C1', example: 'You must not deviate from the agreed safety plan.', exampleVi: 'Bạn tuyệt đối không được đi chệch khỏi kế hoạch an toàn đã thỏa thuận.' },
    { id: 'f-ie15', word: 'facilitate', phonetic: '/fəˈsɪlɪteɪt/', meaningEn: 'make (an action or process) easy or easier.', meaningVi: 'tạo điều kiện thuận lợi.', wordType: 'Verb', cefrLevel: 'C1', example: 'Modern technology is designed to facilitate communication.', exampleVi: 'Công nghệ hiện đại được thiết kế để tạo điều kiện thuận lợi cho giao tiếp.' }
];
// GET random vocabulary words for games (Vocab Match, Speed Quiz, Word Scramble, Sentence Builder)
router.get('/game-data', auth_middleware_1.authenticate, async (req, res) => {
    try {
        const limit = Math.min(Number(req.query.limit) || 35, 50);
        const category = req.query.category || 'all';
        const userId = req.user.uid;
        let words = [];
        if (category === 'notebook') {
            // Fetch user's saved words from notebook
            const dbUser = await prisma_1.default.user.findUnique({
                where: { email: req.user.email }
            });
            if (dbUser) {
                const entries = await prisma_1.default.userLearnedWord.findMany({
                    where: { userId: dbUser.id, isFavorite: true },
                    include: { word: true },
                    take: limit
                });
                words = entries.map((e) => ({
                    id: e.word.id,
                    word: e.word.word,
                    phonetic: e.word.phonetic,
                    meaningEn: e.word.meaningEn,
                    meaningVi: e.word.meaningVi,
                    wordType: e.word.wordType,
                    cefrLevel: e.word.cefrLevel,
                    example: e.word.example,
                    exampleVi: e.word.exampleVi
                }));
            }
            // If user's notebook has less than 10 words, mix in Oxford words to avoid empty game state
            if (words.length < 10) {
                const needed = 15 - words.length;
                const extra = FALLBACK_OXFORD_WORDS.slice(0, needed);
                words = [...words, ...extra];
            }
        }
        else {
            // Query from global vocabulary list
            let whereClause = `WHERE meaning_vi IS NOT NULL AND meaning_vi != '' AND meaning_vi != word AND example IS NOT NULL AND example != ''`;
            if (category === 'oxford') {
                whereClause += ` AND cefr_level IN ('A1', 'A2', 'B1')`;
            }
            else if (category === 'toeic') {
                // Find business vocabulary or B1/B2
                whereClause += ` AND cefr_level IN ('B1', 'B2')`;
            }
            else if (category === 'ielts') {
                // Academic advanced words
                whereClause += ` AND cefr_level IN ('B2', 'C1', 'C2')`;
            }
            const { rows } = await pool.query(`SELECT id, word, phonetic, meaning_en as "meaningEn", meaning_vi as "meaningVi", 
                word_type as "wordType", cefr_level as "cefrLevel", example, example_vi as "exampleVi"
         FROM vocabulary_words 
         ${whereClause}
         ORDER BY RANDOM()
         LIMIT $1`, [limit]);
            words = rows || [];
            // Fallbacks if database is empty or has too few words matching criteria
            if (words.length < 10) {
                let fallbackPool = FALLBACK_OXFORD_WORDS;
                if (category === 'toeic')
                    fallbackPool = FALLBACK_TOEIC_WORDS;
                else if (category === 'ielts')
                    fallbackPool = FALLBACK_IELTS_WORDS;
                const existingWords = new Set(words.map(w => w.word.toLowerCase()));
                const extra = fallbackPool.filter(w => !existingWords.has(w.word.toLowerCase()));
                words = [...words, ...extra].slice(0, limit);
            }
        }
        res.json({ words });
    }
    catch (error) {
        console.error('Game data error:', error.message);
        res.status(500).json({ error: 'Failed to fetch game vocabulary words' });
    }
});
// ──────────────────────────────────────────────
// BATCH ENRICHMENT: Fix all incomplete Dictionary words
// ──────────────────────────────────────────────
router.post('/enrich-batch', async (req, res) => {
    try {
        const batchSize = Math.min(Number(req.body?.batchSize) || 10, 15); // Max 15 per batch
        // Find words missing critical data
        const { rows: incomplete } = await pool.query(`SELECT id, word, phonetic, meaning_en as "meaningEn", meaning_vi as "meaningVi", 
              word_type as "wordType", cefr_level as "cefrLevel", usage, example, example_vi as "exampleVi"
       FROM vocabulary_words 
       WHERE meaning_vi IS NULL 
          OR meaning_vi = '' 
          OR meaning_vi = word 
          OR phonetic IS NULL 
          OR phonetic = '' 
          OR word_type IS NULL 
          OR word_type = '' 
          OR word_type = '-'
          OR usage IS NULL 
          OR usage = ''
       ORDER BY word ASC
       LIMIT $1`, [batchSize]);
        if (incomplete.length === 0) {
            // Also count remaining
            const { rows: countRows } = await pool.query(`SELECT COUNT(*)::int as remaining FROM vocabulary_words 
         WHERE meaning_vi IS NULL OR meaning_vi = '' OR meaning_vi = word 
            OR phonetic IS NULL OR phonetic = '' 
            OR word_type IS NULL OR word_type = '' OR word_type = '-'
            OR usage IS NULL OR usage = ''`);
            return res.json({
                success: true,
                enriched: 0,
                remaining: countRows[0].remaining,
                message: 'Tất cả từ vựng đã được bổ sung đầy đủ!'
            });
        }
        const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
        let enriched = 0;
        const results = [];
        for (const w of incomplete) {
            try {
                if (enriched > 0)
                    await delay(1500); // Rate limit buffer
                console.log(`[Batch Enrich] Processing: ${w.word}`);
                const aiData = await gemini_service_1.GeminiService.enrichWordData(w.word);
                if (aiData) {
                    await pool.query(`UPDATE vocabulary_words SET 
              meaning_vi = COALESCE(NULLIF($2, ''), meaning_vi),
              meaning_en = COALESCE(NULLIF($3, ''), meaning_en),
              phonetic = COALESCE(NULLIF($4, ''), phonetic),
              word_type = COALESCE(NULLIF($5, ''), word_type),
              usage = COALESCE(NULLIF($6, ''), usage),
              example = COALESCE(NULLIF($7, ''), example),
              example_vi = COALESCE(NULLIF($8, ''), example_vi),
              cefr_level = CASE WHEN cefr_level IN ('Custom', 'OXFORD3000', '') OR cefr_level IS NULL THEN $9 ELSE cefr_level END,
              audio_us = COALESCE(NULLIF($10, ''), audio_us),
              audio_uk = COALESCE(NULLIF($11, ''), audio_uk)
            WHERE id = $1`, [w.id, aiData.meaningVi, aiData.meaningEn, aiData.phonetic, aiData.wordType, aiData.usage, aiData.example, aiData.exampleVi, aiData.cefrLevel || 'B1', aiData.audioUs || '', aiData.audioUk || '']);
                    enriched++;
                    results.push({ word: w.word, status: '✅ OK' });
                }
                else {
                    results.push({ word: w.word, status: '⚠️ AI returned null' });
                }
            }
            catch (err) {
                if (err?.message?.includes('429') || err?.status === 429) {
                    console.log(`[Batch Enrich] Rate limited at ${w.word}, stopping batch`);
                    results.push({ word: w.word, status: '⏳ Rate limited' });
                    break;
                }
                results.push({ word: w.word, status: `❌ ${err.message?.slice(0, 50)}` });
            }
        }
        // Count remaining
        const { rows: countRows } = await pool.query(`SELECT COUNT(*)::int as remaining FROM vocabulary_words 
       WHERE meaning_vi IS NULL OR meaning_vi = '' OR meaning_vi = word 
          OR phonetic IS NULL OR phonetic = '' 
          OR word_type IS NULL OR word_type = '' OR word_type = '-'
          OR usage IS NULL OR usage = ''`);
        console.log(`[Batch Enrich] Done: ${enriched}/${incomplete.length} enriched, ${countRows[0].remaining} remaining`);
        res.json({
            success: true,
            enriched,
            total: incomplete.length,
            remaining: countRows[0].remaining,
            results
        });
    }
    catch (error) {
        console.error('Batch enrich error:', error.message);
        res.status(500).json({ error: 'Batch enrichment failed', message: error.message });
    }
});
// ──────────────────────────────────────────────
// BULK TRANSLATE: Fast batch translation for Oxford3000 words (20 words per API call)
// ──────────────────────────────────────────────
router.post('/bulk-translate', async (req, res) => {
    try {
        const batchSize = Math.min(Number(req.body?.batchSize) || 20, 25);
        const level = req.body?.level; // Optional: target specific CEFR level
        // Find untranslated words
        const levelFilter = level ? `AND (cefr_level = '${level}' OR cefr_level = 'OXFORD3000' OR cefr_level = 'Custom')` : '';
        const { rows: untranslated } = await pool.query(`SELECT id, word, cefr_level as "cefrLevel"
       FROM vocabulary_words 
       WHERE (meaning_vi IS NULL OR meaning_vi = '' OR meaning_vi = word)
       ${levelFilter}
       ORDER BY word ASC
       LIMIT $1`, [batchSize]);
        if (untranslated.length === 0) {
            const { rows: cnt } = await pool.query(`SELECT COUNT(*)::int as remaining FROM vocabulary_words 
         WHERE meaning_vi IS NULL OR meaning_vi = '' OR meaning_vi = word`);
            return res.json({
                success: true,
                translated: 0,
                remaining: cnt[0].remaining,
                message: 'Tất cả từ vựng đã được dịch sang tiếng Việt!'
            });
        }
        // Use bulkTranslate (single API call for all words!)
        const wordList = untranslated.map((w) => w.word);
        console.log(`[Bulk Translate] Processing ${wordList.length} words: ${wordList.slice(0, 5).join(', ')}...`);
        const aiResults = await gemini_service_1.GeminiService.bulkTranslate(wordList);
        let translated = 0;
        const results = [];
        if (aiResults && Array.isArray(aiResults)) {
            for (const ai of aiResults) {
                if (!ai?.word || !ai?.meaningVi) {
                    results.push({ word: ai?.word || '?', status: '⚠️ Missing data' });
                    continue;
                }
                // Find matching DB record
                const dbWord = untranslated.find((w) => w.word.toLowerCase() === ai.word.toLowerCase());
                if (!dbWord) {
                    results.push({ word: ai.word, status: '⚠️ Not found in DB' });
                    continue;
                }
                try {
                    await pool.query(`UPDATE vocabulary_words SET 
              meaning_vi = COALESCE(NULLIF($2, ''), meaning_vi),
              meaning_en = COALESCE(NULLIF($3, ''), meaning_en),
              phonetic = COALESCE(NULLIF($4, ''), phonetic),
              word_type = COALESCE(NULLIF($5, ''), word_type),
              usage = COALESCE(NULLIF($6, ''), usage),
              example = COALESCE(NULLIF($7, ''), example),
              example_vi = COALESCE(NULLIF($8, ''), example_vi),
              cefr_level = CASE WHEN cefr_level IN ('Custom', 'OXFORD3000', '') OR cefr_level IS NULL THEN $9 ELSE cefr_level END
            WHERE id = $1`, [dbWord.id, ai.meaningVi, ai.meaningEn, ai.phonetic, ai.wordType, ai.usage, ai.example, ai.exampleVi, ai.cefrLevel || 'B1']);
                    translated++;
                    results.push({ word: ai.word, status: '✅ OK', meaningVi: ai.meaningVi });
                }
                catch (dbErr) {
                    results.push({ word: ai.word, status: `❌ DB error: ${dbErr.message?.slice(0, 40)}` });
                }
            }
        }
        else {
            results.push({ word: 'batch', status: '❌ AI returned invalid data' });
        }
        // Count remaining
        const { rows: countRows } = await pool.query(`SELECT COUNT(*)::int as remaining FROM vocabulary_words 
       WHERE meaning_vi IS NULL OR meaning_vi = '' OR meaning_vi = word`);
        console.log(`[Bulk Translate] Done: ${translated}/${untranslated.length} translated, ${countRows[0].remaining} remaining`);
        res.json({
            success: true,
            translated,
            total: untranslated.length,
            remaining: countRows[0].remaining,
            results
        });
    }
    catch (error) {
        console.error('Bulk translate error:', error.message);
        res.status(500).json({ error: 'Bulk translation failed', message: error.message });
    }
});
// ──────────────────────────────────────────────
// NOTEBOOK: Personal Word Journal
// ──────────────────────────────────────────────
// GET /notebook - List all words user has personally saved
router.get('/notebook', auth_middleware_1.authenticate, async (req, res) => {
    try {
        const userId = req.user.uid;
        const entries = await prisma_1.default.userLearnedWord.findMany({
            where: { userId, isFavorite: true },
            include: { word: true },
            orderBy: { lastReviewedAt: 'desc' }
        });
        res.json({ words: entries.map((e) => ({ ...e.word, masteryLevel: e.masteryLevel, nextReviewAt: e.nextReviewAt, savedAt: e.lastReviewedAt })) });
    }
    catch (error) {
        console.error('Notebook GET error:', error);
        res.status(500).json({ error: 'Failed to fetch notebook' });
    }
});
// POST /notebook - Add a new word to personal notebook (with FULL Dictionary sync)
router.post('/notebook', auth_middleware_1.authenticate, async (req, res) => {
    try {
        const userId = req.user.uid;
        const { word, context, meaningEn, meaningVi, wordType, phonetic } = req.body;
        if (!word || !word.trim()) {
            return res.status(400).json({ error: 'Word is required' });
        }
        const normalizedWord = word.trim().toLowerCase();
        const wordCount = normalizedWord.split(/\s+/).filter(Boolean).length;
        if (wordCount > 1) {
            return res.status(400).json({
                error: 'Chỉ lưu từ vựng đơn lẻ vào notebook. Cụm từ hoặc câu không được hỗ trợ lưu tại đây.'
            });
        }
        // Step 1: Check if word already exists in global vocabulary (Dictionary)
        let vocabWord = await prisma_1.default.vocabularyWord.findFirst({
            where: { word: { equals: normalizedWord, mode: 'insensitive' } }
        });
        // Step 2: Determine if the word needs full enrichment for Dictionary quality
        const isNewWord = !vocabWord;
        const needsFullEnrichment = isNewWord ||
            !vocabWord?.meaningVi ||
            !vocabWord?.usage ||
            !vocabWord?.example ||
            !vocabWord?.exampleVi ||
            !vocabWord?.phonetic ||
            vocabWord?.cefrLevel === 'Custom';
        // Step 3: Use enrichWordData() for FULL Dictionary-quality data (not just explainWord)
        let finalMeaningEn = meaningEn || (vocabWord?.meaningEn) || '';
        let finalMeaningVi = meaningVi || (vocabWord?.meaningVi) || '';
        let finalWordType = wordType || (vocabWord?.wordType) || 'Unknown';
        let finalPhonetic = phonetic || (vocabWord?.phonetic) || '';
        let finalCefrLevel = (vocabWord?.cefrLevel && vocabWord.cefrLevel !== 'Custom') ? vocabWord.cefrLevel : '';
        let finalUsage = vocabWord?.usage || '';
        let finalExample = vocabWord?.example || '';
        let finalExampleVi = vocabWord?.exampleVi || '';
        let syncedToDictionary = false;
        if (needsFullEnrichment) {
            try {
                console.log(`[Dictionary Sync] Full enrichment for: "${normalizedWord}" (new=${isNewWord})`);
                const aiData = await gemini_service_1.GeminiService.enrichWordData(normalizedWord);
                if (aiData) {
                    if (!finalMeaningEn || finalMeaningEn.length < 5)
                        finalMeaningEn = aiData.meaningEn || finalMeaningEn;
                    if (!finalMeaningVi || finalMeaningVi === normalizedWord)
                        finalMeaningVi = aiData.meaningVi || finalMeaningVi;
                    if (finalWordType === 'Unknown')
                        finalWordType = aiData.wordType || finalWordType;
                    if (!finalPhonetic)
                        finalPhonetic = aiData.phonetic || '';
                    if (!finalCefrLevel)
                        finalCefrLevel = aiData.cefrLevel || 'B1';
                    if (!finalUsage)
                        finalUsage = aiData.usage || '';
                    if (!finalExample)
                        finalExample = aiData.example || '';
                    if (!finalExampleVi)
                        finalExampleVi = aiData.exampleVi || '';
                    syncedToDictionary = true;
                }
            }
            catch (aiErr) {
                console.warn('[Dictionary Sync] AI enrichment failed, using partial data:', aiErr);
            }
        }
        // Ensure CEFR level is always valid (never leave as 'Custom')
        if (!finalCefrLevel || finalCefrLevel === 'Custom') {
            finalCefrLevel = 'B1'; // Default to B1 if AI didn't provide one
        }
        // Step 4: Insert or update the global vocabulary_words table (= the Dictionary)
        if (!vocabWord) {
            const id = require('crypto').randomUUID();
            await prisma_1.default.$executeRawUnsafe(`INSERT INTO vocabulary_words (id, word, phonetic, meaning_en, meaning_vi, word_type, cefr_level, usage, example, example_vi)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
         ON CONFLICT (word) DO NOTHING`, id, normalizedWord, finalPhonetic, finalMeaningEn, finalMeaningVi, finalWordType, finalCefrLevel, finalUsage, finalExample, finalExampleVi);
            vocabWord = await prisma_1.default.vocabularyWord.findFirst({
                where: { word: { equals: normalizedWord, mode: 'insensitive' } }
            });
            syncedToDictionary = true;
            console.log(`[Dictionary Sync] NEW word "${normalizedWord}" added to Dictionary as ${finalCefrLevel}`);
        }
        else {
            // Update existing Dictionary entry with enriched data
            await prisma_1.default.vocabularyWord.update({
                where: { id: vocabWord.id },
                data: {
                    meaningVi: finalMeaningVi,
                    wordType: finalWordType,
                    phonetic: finalPhonetic,
                    meaningEn: finalMeaningEn,
                    cefrLevel: finalCefrLevel,
                    usage: finalUsage || undefined,
                    example: finalExample || undefined,
                    exampleVi: finalExampleVi || undefined
                }
            });
            syncedToDictionary = true;
            console.log(`[Dictionary Sync] UPDATED word "${normalizedWord}" in Dictionary (${finalCefrLevel})`);
        }
        if (!vocabWord) {
            return res.status(500).json({ error: 'Could not create vocabulary entry' });
        }
        // Step 5: Add to user's personal notebook (isFavorite = true marks it as "user-added")
        const entry = await prisma_1.default.userLearnedWord.upsert({
            where: { userId_wordId: { userId, wordId: vocabWord.id } },
            update: { isFavorite: true, lastReviewedAt: new Date(), nextReviewAt: new Date(Date.now() + 24 * 60 * 60 * 1000) },
            create: {
                userId,
                wordId: vocabWord.id,
                isFavorite: true,
                masteryLevel: 0,
                lastReviewedAt: new Date(),
                nextReviewAt: new Date(Date.now() + 24 * 60 * 60 * 1000) // Review tomorrow
            }
        });
        // Step 6: Award 5 XP for adding a new word
        await prisma_1.default.user.update({
            where: { id: userId },
            data: { xp: { increment: 5 } }
        });
        res.json({
            success: true,
            word: vocabWord,
            entry,
            context,
            syncedToDictionary, // Tell frontend the word is now in Dictionary
            cefrLevel: finalCefrLevel
        });
    }
    catch (error) {
        console.error('Notebook POST error:', error);
        res.status(500).json({ error: 'Failed to add word', message: error.message });
    }
});
// DELETE /notebook/:wordId - Remove a word from personal notebook
router.delete('/notebook/:wordId', auth_middleware_1.authenticate, async (req, res) => {
    try {
        const userId = req.user.uid;
        const { wordId } = req.params;
        await prisma_1.default.userLearnedWord.updateMany({
            where: { userId, wordId },
            data: { isFavorite: false }
        });
        res.json({ success: true });
    }
    catch (error) {
        console.error('Notebook DELETE error:', error);
        res.status(500).json({ error: 'Failed to remove word' });
    }
});
// PUT /notebook/:wordId - Update word details in notebook
router.put('/notebook/:wordId', auth_middleware_1.authenticate, async (req, res) => {
    try {
        const userId = req.user.uid;
        const { wordId } = req.params;
        const { meaningVi, meaningEn, wordType, phonetic, example, exampleVi } = req.body;
        const entry = await prisma_1.default.userLearnedWord.findUnique({
            where: { userId_wordId: { userId, wordId } }
        });
        if (!entry || !entry.isFavorite) {
            return res.status(404).json({ error: 'Từ vựng không tồn tại trong notebook của bạn.' });
        }
        const updatedWord = await prisma_1.default.vocabularyWord.update({
            where: { id: wordId },
            data: {
                meaningVi: meaningVi !== undefined ? meaningVi : undefined,
                meaningEn: meaningEn !== undefined ? meaningEn : undefined,
                wordType: wordType !== undefined ? wordType : undefined,
                phonetic: phonetic !== undefined ? phonetic : undefined,
                example: example !== undefined ? example : undefined,
                exampleVi: exampleVi !== undefined ? exampleVi : undefined,
            }
        });
        res.json({ success: true, word: updatedWord });
    }
    catch (error) {
        console.error('Notebook PUT error:', error);
        res.status(500).json({ error: 'Không thể cập nhật từ vựng', message: error.message });
    }
});
// ──────────────────────────────────────────────
// SRS REVIEW SYSTEM
// ──────────────────────────────────────────────
// GET /review/session - Get words due for review with AI-generated contextual questions
router.get('/review/session', auth_middleware_1.authenticate, async (req, res) => {
    try {
        const userId = req.user.uid;
        const now = new Date();
        let dueEntries = await prisma_1.default.userLearnedWord.findMany({
            where: {
                userId,
                isFavorite: true,
                nextReviewAt: { lte: now }
            },
            include: { word: true },
            take: 10,
            orderBy: { nextReviewAt: 'asc' }
        });
        // Fallback: If no notebook words are strictly due, get the oldest-reviewed notebook ones for "Early Practice"
        if (dueEntries.length === 0) {
            dueEntries = await prisma_1.default.userLearnedWord.findMany({
                where: {
                    userId,
                    isFavorite: true
                },
                include: { word: true },
                take: 10,
                orderBy: { nextReviewAt: 'asc' }
            });
        }
        if (dueEntries.length === 0) {
            return res.json({ words: [], message: 'All caught up! Check back tomorrow.' });
        }
        // Get some random words from user's learned vocab AND global vocab for fallback distractors
        const allLearnedWords = await prisma_1.default.userLearnedWord.findMany({
            where: { userId },
            include: { word: true },
            take: 20
        });
        const globalRandomWords = await pool.query(`SELECT meaning_vi as "meaningVi" FROM vocabulary_words ORDER BY RANDOM() LIMIT 20`);
        const distractorsPool = [
            ...allLearnedWords.map((n) => n.word.meaningVi),
            ...globalRandomWords.rows.map((r) => r.meaningVi)
        ].filter(Boolean);
        // Enhance with AI questions for each word sequentially to prevent Gemini 429 rate limit errors
        const sessionWords = [];
        for (const entry of dueEntries) {
            const word = entry.word;
            let context = '';
            let question = `Từ "${word.word}" có nghĩa tiếng Việt là gì?`;
            let options = [word.meaningVi];
            let correctAnswer = word.meaningVi;
            try {
                // Add a tiny delay between Gemini API requests
                if (sessionWords.length > 0) {
                    await new Promise(resolve => setTimeout(resolve, 150));
                }
                const aiQuestion = await gemini_service_1.GeminiService.generateReviewQuestion(word.word);
                if (aiQuestion && aiQuestion.options && aiQuestion.options.length === 4 && aiQuestion.answer) {
                    context = aiQuestion.context || '';
                    question = aiQuestion.question || `Từ cần điền có nghĩa tiếng Việt là gì?`;
                    options = aiQuestion.options;
                    const match = options.find(opt => opt.trim().toLowerCase() === aiQuestion.answer.trim().toLowerCase());
                    correctAnswer = match || aiQuestion.answer;
                }
                else {
                    throw new Error('Invalid AI response');
                }
            }
            catch (e) {
                // Fallback: Use distractors from pool
                const others = distractorsPool.filter(d => d !== word.meaningVi).sort(() => Math.random() - 0.5);
                options = [word.meaningVi, ...others.slice(0, 3)];
                correctAnswer = word.meaningVi;
                context = '';
                while (options.length < 4) {
                    options.push(`Nghĩa khác ${options.length}`);
                }
            }
            sessionWords.push({
                id: entry.id,
                wordId: word.id,
                word: word.word,
                phonetic: word.phonetic,
                meaningVi: correctAnswer,
                meaningEn: word.meaningEn,
                wordType: word.wordType,
                masteryLevel: entry.masteryLevel,
                context,
                question,
                options: options.sort(() => Math.random() - 0.5)
            });
        }
        res.json({ words: sessionWords });
    }
    catch (error) {
        console.error('Review session error:', error);
        res.status(500).json({ error: 'Failed to create review session' });
    }
});
// GET /daily-review-status - Check if user has completed daily vocabulary review
router.get('/daily-review-status', auth_middleware_1.authenticate, async (req, res) => {
    try {
        const userId = req.user.uid;
        const now = new Date();
        // Convert to Vietnam ICT (UTC+7) for consistent day boundary
        const utcTime = now.getTime() + (now.getTimezoneOffset() * 60000);
        const ictTime = new Date(utcTime + (3600000 * 7));
        const yyyy = ictTime.getFullYear();
        const mm = ictTime.getMonth();
        const dd = ictTime.getDate();
        // Correctly align start and end of Vietnam's day with UTC timestamps
        const todayStart = new Date(Date.UTC(yyyy, mm, dd, 0, 0, 0, 0) - 7 * 3600000);
        const todayEnd = new Date(Date.UTC(yyyy, mm, dd, 23, 59, 59, 999) - 7 * 3600000);
        // Count how many notebook words (isFavorite) are due for review
        const dueCount = await prisma_1.default.userLearnedWord.count({
            where: {
                userId,
                isFavorite: true,
                nextReviewAt: { lte: now }
            }
        });
        // Count total notebook words
        const totalNotebook = await prisma_1.default.userLearnedWord.count({
            where: { userId, isFavorite: true }
        });
        // Check if user has reviewed any notebook word today (by checking reviewHistory)
        const reviewedToday = await prisma_1.default.reviewHistory.count({
            where: {
                userId,
                reviewedAt: {
                    gte: todayStart,
                    lte: todayEnd
                }
            }
        });
        const hasReviewedToday = reviewedToday > 0;
        const hasWordsToReview = dueCount > 0;
        // Remind user daily only if they have words due today and haven't reviewed today
        const needsReminder = dueCount > 0 && !hasReviewedToday;
        res.json({
            hasWordsToReview,
            dueCount,
            totalNotebook,
            hasReviewedToday,
            isCompleted: dueCount === 0 && reviewedToday > 0,
            reviewedToday,
            needsReminder
        });
    }
    catch (error) {
        console.error('Daily review status error:', error);
        res.status(500).json({ error: 'Failed to check daily review status' });
    }
});
// POST /review/submit - Update SRS status for a word
router.post('/review/submit', auth_middleware_1.authenticate, async (req, res) => {
    try {
        const userId = req.user.uid;
        const { wordId, isCorrect } = req.body;
        const entry = await prisma_1.default.userLearnedWord.findUnique({
            where: { userId_wordId: { userId, wordId } }
        });
        if (!entry)
            return res.status(404).json({ error: 'Entry not found' });
        // Spaced Repetition Logic (Leitner inspired)
        // Intervals: 1, 3, 7, 14, 30, 90, 180 days
        const intervals = [1, 3, 7, 14, 30, 90, 180];
        let newLevel = entry.masteryLevel;
        if (isCorrect) {
            newLevel = Math.min(newLevel + 1, intervals.length - 1);
        }
        else {
            newLevel = Math.max(newLevel - 1, 0); // Slip back one level
        }
        const nextDays = intervals[newLevel];
        const nextReviewAt = new Date();
        nextReviewAt.setDate(nextReviewAt.getDate() + nextDays);
        await prisma_1.default.userLearnedWord.update({
            where: { id: entry.id },
            data: {
                masteryLevel: newLevel,
                lastReviewedAt: new Date(),
                nextReviewAt
            }
        });
        // Create a ReviewHistory entry for this review
        try {
            await prisma_1.default.reviewHistory.create({
                data: {
                    userId,
                    wordId,
                    isCorrect: !!isCorrect,
                    responseTime: 0
                }
            });
        }
        catch (historyErr) {
            console.warn('Failed to record review history entry:', historyErr);
        }
        // Reward XP for correct review
        if (isCorrect) {
            await prisma_1.default.user.update({
                where: { id: userId },
                data: { xp: { increment: 10 } }
            });
        }
        // Record daily activity for review tracking (use ICT timezone)
        const actNow = new Date();
        const actUtc = actNow.getTime() + (actNow.getTimezoneOffset() * 60000);
        const actIct = new Date(actUtc + (3600000 * 7));
        const ayyyy = actIct.getFullYear();
        const amm = String(actIct.getMonth() + 1).padStart(2, '0');
        const add = String(actIct.getDate()).padStart(2, '0');
        const today = new Date(`${ayyyy}-${amm}-${add}T00:00:00.000Z`);
        try {
            await prisma_1.default.userDailyActivity.upsert({
                where: {
                    userId_activityDate: { userId, activityDate: today }
                },
                update: {
                    totalMinutes: { increment: 1 }
                },
                create: {
                    userId,
                    activityDate: today,
                    totalMinutes: 1
                }
            });
        }
        catch (actErr) {
            // Non-critical — don't fail the review submission
            console.warn('Daily activity upsert warning:', actErr);
        }
        res.json({ success: true, nextReviewAt, newLevel });
    }
    catch (error) {
        console.error('Review submit error:', error);
        res.status(500).json({ error: 'Failed to submit review' });
    }
});
exports.default = router;
