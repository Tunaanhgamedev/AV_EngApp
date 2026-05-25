const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

async function test() {
  const models = ['gemini-1.5-flash', 'gemini-flash-latest', 'gemini-pro'];
  for (const m of models) {
    try {
      console.log(`Testing model: ${m}...`);
      const model = genAI.getGenerativeModel({ model: m });
      const result = await model.generateContent("Say hello in 3 words");
      const text = result.response.text();
      console.log(`  └─ Success: ${text.trim()}`);
      return m;
    } catch (err) {
      console.log(`  └─ Failed: ${err.message}`);
    }
  }
  return null;
}

test();
