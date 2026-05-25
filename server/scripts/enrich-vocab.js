require('dotenv').config();
const { Pool } = require('pg');
const { GoogleGenerativeAI } = require('@google/generative-ai');

const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

// Enrich a batch of words in one Gemini call
async function enrichBatch(words) {
  const prompt = `For each English word below, provide a JSON array (same order).
Each object: {"word":"...","phonetic":"IPA e.g. /ˈwɜːrd/","wordType":"noun|verb|adjective|adverb|preposition|conjunction|other","meaningEn":"short English definition (max 10 words)","meaningVi":"Vietnamese meaning (2-5 words)"}
Words: ${words.join(', ')}
Reply ONLY with the JSON array, no markdown.`;

  const result = await model.generateContent(prompt);
  const text = result.response.text().replace(/```json|```/g, '').trim();
  return JSON.parse(text);
}

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function main() {
  const client = await pool.connect();
  try {
    // Get words missing phonetic or meaningEn
    const { rows: words } = await client.query(`
      SELECT id, word, meaning_vi FROM vocabulary_words
      WHERE (phonetic IS NULL OR phonetic = '' OR meaning_en IS NULL OR meaning_en = '' OR meaning_en = word OR meaning_vi LIKE 'từ "%')
      ORDER BY word ASC
    `);

    console.log(`Found ${words.length} words to enrich`);
    const BATCH = 20;
    let updated = 0, errors = 0;

    for (let i = 0; i < words.length; i += BATCH) {
      const batch = words.slice(i, i + BATCH);
      const wordList = batch.map(w => w.word);

      try {
        // Retry up to 3 times on 429
        let enriched = null;
        for (let attempt = 1; attempt <= 3; attempt++) {
          try {
            enriched = await enrichBatch(wordList);
            break;
          } catch (e) {
            if (e.message.includes('429') && attempt < 3) {
              const wait = attempt * 60000; // 60s, 120s
              console.log(`  Rate limited, waiting ${wait/1000}s before retry ${attempt+1}...`);
              await sleep(wait);
            } else throw e;
          }
        }
        if (!enriched) throw new Error('All retries failed');

        for (const item of enriched) {
          const dbWord = batch.find(w => w.word.toLowerCase() === item.word?.toLowerCase());
          if (!dbWord) continue;
          const finalVi = (dbWord.meaning_vi && dbWord.meaning_vi.length > 2 && !dbWord.meaning_vi.startsWith('từ "'))
            ? dbWord.meaning_vi : (item.meaningVi || '');
          await client.query(
            `UPDATE vocabulary_words SET phonetic=$1, word_type=$2, meaning_en=$3, meaning_vi=$4 WHERE id=$5`,
            [item.phonetic || '', item.wordType || '', item.meaningEn || '', finalVi, dbWord.id]
          );
          updated++;
        }
        console.log(`[${i + batch.length}/${words.length}] ✓ Updated ${updated} so far`);

      } catch (err) {
        console.error(`Batch ${i}–${i + BATCH} failed:`, err.message);
        errors++;
      }

      // Rate limit: wait 2s between batches
      if (i + BATCH < words.length) await sleep(2000);
    }

    const { rows: cnt } = await client.query(`SELECT COUNT(*) as c FROM vocabulary_words WHERE phonetic != '' AND meaning_en != ''`);
    console.log(`\n✅ Done! Updated: ${updated}, Errors: ${errors}`);
    console.log(`📚 Words with full data: ${cnt[0].c} / ${words.length + updated}`);
  } finally {
    client.release();
    await pool.end();
  }
}

main().catch(console.error);
