const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function testKey() {
  const key = process.env.GEMINI_API_KEY;
  if (!key) {
    console.log('KEY MISSING');
    return;
  }
  console.log('KEY EXISTS:', key.substring(0, 5) + '...' + key.substring(key.length - 3));
  
  try {
    const genAI = new GoogleGenerativeAI(key);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent("Say hello");
    console.log('RESPONSE:', result.response.text());
  } catch (err) {
    console.error('API ERROR:', err.message);
  }
}
testKey();
