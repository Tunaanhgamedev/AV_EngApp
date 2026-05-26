process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const { Client } = require('pg');
require('dotenv').config();

// Define fallback directly in JS to keep script self-contained and fast
async function enrichWordFallback(word) {
  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    let phonetic = '';
    let meaningEn = '';
    let wordType = 'n';
    let example = '';
    let audioUs = '';
    let audioUk = '';

    if (res.ok) {
      const data = await res.json();
      const entry = data[0];
      
      phonetic = entry.phonetic || '';
      if (!phonetic && entry.phonetics && entry.phonetics.length > 0) {
        phonetic = entry.phonetics.find(p => p.text)?.text || '';
      }

      if (entry.phonetics && entry.phonetics.length > 0) {
        const usAudio = entry.phonetics.find(p => p.audio && p.audio.includes('us'));
        const ukAudio = entry.phonetics.find(p => p.audio && p.audio.includes('uk'));
        const generalAudio = entry.phonetics.find(p => p.audio);
        
        audioUs = usAudio?.audio || generalAudio?.audio || '';
        audioUk = ukAudio?.audio || generalAudio?.audio || '';
      }

      if (entry.meanings && entry.meanings.length > 0) {
        const m = entry.meanings[0];
        wordType = m.partOfSpeech || 'n';
        if (m.definitions && m.definitions.length > 0) {
          meaningEn = m.definitions[0].definition || '';
          for (const d of m.definitions) {
            if (d.example) {
              example = d.example;
              break;
            }
          }
        }
      }
    }

    if (!example) {
      example = `We should study the meaning of the word "${word}" to improve our vocabulary.`;
    }
    if (!meaningEn) {
      meaningEn = `The English word "${word}".`;
    }

    const translateText = async (text) => {
      try {
        const transRes = await fetch(`https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=vi&dt=t&q=${encodeURIComponent(text)}`);
        if (transRes.ok) {
          const transData = await transRes.json();
          return transData[0]?.map(x => x[0]).join('').trim() || '';
        }
      } catch (e) {
        console.error('Fallback translation error:', e);
      }
      return '';
    };

    const meaningVi = await translateText(word) || `từ "${word}"`;
    const exampleVi = await translateText(example) || '';

    return {
      phonetic,
      meaningEn,
      meaningVi,
      wordType: wordType.substring(0, 10),
      cefrLevel: 'B1',
      usage: 'Sử dụng phổ biến trong giao tiếp hàng ngày.',
      example,
      exampleVi,
      audioUs,
      audioUk
    };
  } catch (err) {
    console.error(`Fallback Enrichment Error for ${word}:`, err.message || err);
    return null;
  }
}

async function run() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });
  await client.connect();

  console.log('Querying incomplete words...');
  const { rows: incomplete } = await client.query(
    `SELECT id, word FROM vocabulary_words 
     WHERE meaning_vi IS NULL 
        OR meaning_vi = '' 
        OR meaning_vi = word 
        OR example IS NULL 
        OR example = '' 
        OR example_vi IS NULL 
        OR example_vi = ''`
  );

  console.log(`Found ${incomplete.length} incomplete words to enrich.`);
  
  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  let count = 0;

  for (const w of incomplete) {
    count++;
    console.log(`[${count}/${incomplete.length}] Enriching: "${w.word}"`);
    
    // Try Dictionary API + Google Translate fallback first for speed and rate-limit safety
    const data = await enrichWordFallback(w.word);
    
    if (data) {
      await client.query(
        `UPDATE vocabulary_words SET 
          meaning_vi = $2,
          meaning_en = $3,
          phonetic = $4,
          word_type = $5,
          usage = $6,
          example = $7,
          example_vi = $8,
          audio_us = $9,
          audio_uk = $10
         WHERE id = $1`,
        [
          w.id, 
          data.meaningVi, 
          data.meaningEn, 
          data.phonetic, 
          data.wordType, 
          data.usage, 
          data.example, 
          data.exampleVi,
          data.audioUs || null,
          data.audioUk || null
        ]
      );
      console.log(`  └─ Success: meaningVi="${data.meaningVi}", example="${data.example}"`);
    } else {
      console.log(`  └─ Failed to enrich.`);
    }

    // Wait a brief period to avoid hitting dictionary API rate limits
    await delay(300);
  }

  console.log('🎉 Enrichment complete!');
  await client.end();
}

run().catch(console.error);
