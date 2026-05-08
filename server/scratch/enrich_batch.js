const { Pool } = require('pg');
const { GeminiService } = require('../src/services/gemini.service');
require('dotenv').config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function enrich() {
  try {
    console.log('Finding words to enrich...');
    const { rows: words } = await pool.query(`
      SELECT id, word FROM vocabulary_words 
      WHERE (phonetic IS NULL OR word_type = '' OR cefr_level = 'Oxford3000')
      LIMIT 15
    `);

    console.log(`Enriching ${words.length} words...`);

    for (const row of words) {
      console.log(`Processing: ${row.word}...`);
      const data = await GeminiService.enrichWordData(row.word);
      
      if (data) {
        await pool.query(`
          UPDATE vocabulary_words 
          SET 
            phonetic = $1,
            meaning_en = $2,
            meaning_vi = $3,
            word_type = $4,
            cefr_level = $5,
            usage = $6,
            example = $7,
            example_vi = $8
          WHERE id = $9
        `, [
          data.phonetic,
          data.meaningEn,
          data.meaningVi,
          data.wordType,
          data.cefrLevel,
          data.usage,
          data.example,
          data.exampleVi,
          row.id
        ]);
        console.log(`✅ ${row.word} enriched as ${data.cefrLevel}`);
      } else {
        console.log(`❌ Failed to enrich ${row.word}`);
      }
    }

    console.log('Batch enrichment complete!');
  } catch (err) {
    console.error('Enrichment Error:', err);
  } finally {
    await pool.end();
  }
}

enrich();
