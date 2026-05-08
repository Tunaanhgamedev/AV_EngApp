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
      SELECT * FROM vocabulary_words 
    `);
    const levels = {};
    rows.forEach(r => {
      levels[r.cefr_level] = (levels[r.cefr_level] || 0) + 1;
    });
    console.log('Level distribution:', levels);
    console.log('Sample words:', JSON.stringify(rows.slice(0, 5), null, 2));
  } catch (err) {
    console.error(err);
  } finally {
    await pool.end();
  }
}

check();
