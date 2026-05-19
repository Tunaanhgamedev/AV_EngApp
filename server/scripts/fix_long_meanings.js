process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const { Client } = require('pg');
require('dotenv').config();

async function main() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });

  await client.connect();
  console.log('Connected to database.');

  // Fetch words with meaning_vi longer than 25 characters (definitions)
  const res = await client.query(
    'SELECT id, word, meaning_vi FROM vocabulary_words WHERE LENGTH(meaning_vi) > 25'
  );
  
  const words = res.rows;
  console.log(`Found ${words.length} words with meaning_vi longer than 25 characters.`);

  const translateText = async (text) => {
    try {
      const transRes = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(text)}`
      );
      if (transRes.ok) {
        const transData = await transRes.json();
        return transData[0]?.map(x => x[0]).join('').trim() || '';
      }
    } catch (e) {
      console.error(`Translation error for "${text}":`, e);
    }
    return '';
  };

  const capitalize = (str) => {
    if (!str) return '';
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  let count = 0;
  for (const row of words) {
    const translation = await translateText(row.word);
    if (translation) {
      const formattedTranslation = capitalize(translation);
      await client.query(
        'UPDATE vocabulary_words SET meaning_vi = $1 WHERE id = $2',
        [formattedTranslation, row.id]
      );
      console.log(`Updated "${row.word}": "${row.meaning_vi}" -> "${formattedTranslation}"`);
      count++;
      // Wait 100ms between calls to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 100));
    } else {
      console.log(`Skipped "${row.word}" due to translation failure.`);
    }
  }

  console.log(`Successfully fixed ${count} words.`);
  await client.end();
}

main().catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});
