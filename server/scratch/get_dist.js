const { Pool } = require('pg');
require('dotenv').config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });
pool.query('SELECT cefr_level, count(*)::int FROM vocabulary_words GROUP BY cefr_level').then(res => {
  console.log(JSON.stringify(res.rows, null, 2));
  process.exit(0);
});
