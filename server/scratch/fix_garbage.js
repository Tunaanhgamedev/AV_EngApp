const { Pool } = require('pg');
require('dotenv').config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function fix() {
  const res = await pool.query(`
    UPDATE vocabulary_words 
    SET meaning_vi = '', meaning_en = word, phonetic = NULL, usage = NULL, example = NULL, example_vi = NULL, word_type = ''
    WHERE cefr_level = 'Oxford3000' OR meaning_vi LIKE '%khác%'
  `);
  console.log(`Updated ${res.rowCount} rows`);
  process.exit(0);
}
fix();
