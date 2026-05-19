process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const { Client } = require('pg');
require('dotenv').config();

async function check() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  await client.connect();
  const res = await client.query("SELECT * FROM vocabulary_words WHERE word = 'age'");
  console.log('WORD AGE:', JSON.stringify(res.rows[0], null, 2));
  
  const total = await client.query("SELECT COUNT(*) FROM vocabulary_words WHERE meaning_vi IS NULL OR meaning_vi = '' OR example IS NULL OR example = ''");
  console.log('INCOMPLETE WORDS COUNT:', total.rows[0].count);

  await client.end();
}

check().catch(console.error);
