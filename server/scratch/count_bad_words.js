const { Pool } = require('pg');
require('dotenv').config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

async function check() {
  try {
    const { rows } = await pool.query(`
      SELECT COUNT(*)::int as count 
      FROM vocabulary_words 
      WHERE meaning_vi LIKE 'từ "%'
    `);
    console.log("Number of words with dummy translation 'từ \"...\":", rows[0].count);

    const { rows: samples } = await pool.query(`
      SELECT word, meaning_vi, cefr_level 
      FROM vocabulary_words 
      WHERE meaning_vi LIKE 'từ "%'
      LIMIT 10
    `);
    console.log("Samples:", samples);
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

check();
