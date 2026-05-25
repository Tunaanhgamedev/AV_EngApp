const { Pool } = require('pg');
require('dotenv').config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function translateText(text) {
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      return data[0]?.map(x => x[0]).join('').trim() || '';
    } else {
      console.warn(`    [Translate API warning] Status ${res.status} for "${text}"`);
    }
  } catch (e) {
    console.error(`    [Translate API error] for "${text}":`, e.message);
  }
  return '';
}

async function run() {
  const client = await pool.connect();
  try {
    console.log("Querying words needing translation check...");
    const { rows: badWords } = await client.query(`
      SELECT id, word, meaning_vi, example, example_vi 
      FROM vocabulary_words 
      WHERE meaning_vi LIKE 'từ "%' 
         OR meaning_vi = word 
         OR meaning_vi IS NULL 
         OR meaning_vi = ''
      ORDER BY word ASC
    `);

    console.log(`Found ${badWords.length} words to process.`);

    let fixedCount = 0;
    for (let i = 0; i < badWords.length; i++) {
      const { id, word, meaning_vi, example, example_vi } = badWords[i];
      console.log(`[${i + 1}/${badWords.length}] Word: "${word}"`);

      // 1. Translate meaning_vi if it is bad or empty
      let updatedMeaningVi = meaning_vi;
      if (!meaning_vi || meaning_vi === word || meaning_vi.startsWith('từ "')) {
        const translatedMeaning = await translateText(word);
        if (translatedMeaning && !translatedMeaning.toLowerCase().startsWith('từ "') && translatedMeaning.toLowerCase() !== word.toLowerCase()) {
          updatedMeaningVi = translatedMeaning;
          console.log(`  ├─ Translated meaning: "${meaning_vi}" -> "${updatedMeaningVi}"`);
        }
        await delay(1200); // safety gap
      }

      // 2. Translate example_vi if empty or invalid
      let updatedExampleVi = example_vi;
      if (example && (!example_vi || example_vi.trim() === '')) {
        const translatedExample = await translateText(example);
        if (translatedExample) {
          updatedExampleVi = translatedExample;
          console.log(`  ├─ Translated example: "${updatedExampleVi}"`);
        }
        await delay(1200); // safety gap
      }

      // 3. Update database if anything changed
      if (updatedMeaningVi !== meaning_vi || updatedExampleVi !== example_vi) {
        await client.query(`
          UPDATE vocabulary_words 
          SET meaning_vi = $2, example_vi = $3 
          WHERE id = $1
        `, [id, updatedMeaningVi, updatedExampleVi]);
        console.log(`  └─ ✅ Database updated!`);
        fixedCount++;
      } else {
        console.log(`  └─ ⚪ No change necessary or translation failed.`);
      }

      // Safe cooling period between words
      await delay(1500);
    }

    console.log(`\n🎉 Process complete! Fixed ${fixedCount}/${badWords.length} words.`);
  } catch (err) {
    console.error("Run error:", err);
  } finally {
    client.release();
    await pool.end();
  }
}

run().catch(console.error);
