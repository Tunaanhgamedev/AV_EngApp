const { Pool } = require('pg');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

async function enrichWordWithGemini(word) {
  // Use gemini-flash-latest for reliable quota availability
  const model = genAI.getGenerativeModel({ model: 'gemini-flash-latest' });
  
  const prompt = `
    As EngBot (Expert English Teacher), provide COMPLETE metadata for the English word "${word}".

    CRITICAL RULES:
    1. "meaningVi" MUST be a proper, natural Vietnamese translation (e.g. "thanh, thỏi, rào chắn" for "bar"). NEVER leave it empty, NEVER use the English word itself.
    2. "example" MUST be a real, natural English sentence using "${word}" in context.
    3. "exampleVi" MUST be the Vietnamese translation of that example sentence.
    4. "usage" MUST explain when/how to use this word (e.g., "Dùng trong văn cảnh trang trọng", "Thường dùng trong học thuật").
    5. Provide precise Vietnamese equivalents.

    Respond STRICTLY in this JSON format (no extra text, no markdown block):
    {
      "phonetic": "/IPA transcription/",
      "meaningEn": "clear English definition",
      "meaningVi": "nghĩa tiếng Việt chính xác",
      "wordType": "v/n/adj/adv/prep/conj",
      "cefrLevel": "A1/A2/B1/B2/C1/C2",
      "usage": "khi nào và cách dùng từ này",
      "example": "A natural English sentence using the word",
      "exampleVi": "Bản dịch tiếng Việt của câu ví dụ"
    }
  `;

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    const jsonStr = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(jsonStr);
    
    if (!parsed.meaningVi || parsed.meaningVi === word || !parsed.meaningEn || !parsed.example) {
      throw new Error('Incomplete or invalid JSON response from Gemini');
    }
    return parsed;
  } catch (err) {
    console.error(`Gemini failed for "${word}":`, err.message);
    return null;
  }
}

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  const client = await pool.connect();
  try {
    console.log("Querying words with dummy or missing translations...");
    const { rows: badWords } = await client.query(`
      SELECT id, word, meaning_vi 
      FROM vocabulary_words 
      WHERE meaning_vi LIKE 'từ "%' 
         OR meaning_vi = word 
         OR meaning_vi IS NULL 
         OR meaning_vi = ''
      ORDER BY word ASC
    `);

    console.log(`Found ${badWords.length} words to fix.`);

    let fixedCount = 0;
    for (let i = 0; i < badWords.length; i++) {
      const { id, word, meaning_vi } = badWords[i];
      console.log(`[${i + 1}/${badWords.length}] Fixing word: "${word}" (current: "${meaning_vi}")`);

      const data = await enrichWordWithGemini(word);
      if (data) {
        await client.query(`
          UPDATE vocabulary_words SET 
            meaning_vi = $2,
            meaning_en = $3,
            phonetic = $4,
            word_type = $5,
            usage = $6,
            example = $7,
            example_vi = $8,
            cefr_level = $9
          WHERE id = $1
        `, [
          id, 
          data.meaningVi, 
          data.meaningEn, 
          data.phonetic, 
          data.wordType, 
          data.usage, 
          data.example, 
          data.exampleVi,
          data.cefrLevel
        ]);
        console.log(`  └─ SUCCESS: meaningVi="${data.meaningVi}", level="${data.cefrLevel}"`);
        fixedCount++;
      } else {
        console.log(`  └─ FAILED to fix.`);
      }

      // Add a safe delay to avoid Gemini rate limits
      await sleep(2000);
    }

    console.log(`\n🎉 Process complete! Successfully fixed ${fixedCount}/${badWords.length} words.`);
  } catch (err) {
    console.error("Run error:", err);
  } finally {
    client.release();
    await pool.end();
  }
}

run().catch(console.error);
