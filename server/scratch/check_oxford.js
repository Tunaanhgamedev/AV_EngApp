const { Pool } = require('pg');
require('dotenv').config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function check() {
  const { rows } = await pool.query("SELECT * FROM vocabulary_words WHERE cefr_level = 'Oxford3000' LIMIT 5");
  console.log(JSON.stringify(rows, null, 2));
  process.exit(0);
}
check();
