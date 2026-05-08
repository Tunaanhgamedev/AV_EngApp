const { Pool } = require('pg');
require('dotenv').config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function fix() {
  await pool.query(`
    UPDATE vocabulary_words 
    SET 
      phonetic = '/ˌser.ɪ.mə.ni/', 
      meaning_en = 'a formal religious or public occasion, typically one celebrating a particular event or anniversary.', 
      meaning_vi = 'nghi lễ, buổi lễ', 
      usage = 'Used for formal events like weddings or graduations.', 
      example = 'The wedding ceremony was beautiful.', 
      example_vi = 'Buổi lễ kết hôn thật đẹp.', 
      cefr_level = 'B2' 
    WHERE word = 'ceremony'
  `);
  console.log('Ceremony fixed');
  process.exit(0);
}
fix();
