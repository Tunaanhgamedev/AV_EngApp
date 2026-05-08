const { Pool } = require('pg');
require('dotenv').config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function checkAudio() {
  const res = await pool.query("SELECT word, audio_us FROM vocabulary_words WHERE audio_us IS NOT NULL LIMIT 5");
  console.log('Words with audio:', res.rows);
  
  const resNull = await pool.query("SELECT COUNT(*)::int FROM vocabulary_words WHERE audio_us IS NULL");
  console.log('Words without audio:', resNull.rows[0].count);
  process.exit(0);
}
checkAudio();
