process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const { Client } = require('pg');
require('dotenv').config();

async function run() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  await client.connect();
  const { rows } = await client.query(
    `SELECT id, word, meaning_vi, meaning_en FROM vocabulary_words 
     WHERE LENGTH(meaning_vi) > 30`
  );
  console.log(`Found ${rows.length} words with very long meaning_vi values.`);
  rows.slice(0, 10).forEach(r => {
    console.log(`- ${r.word}: ${r.meaning_vi}`);
  });
  await client.end();
}

run().catch(console.error);
