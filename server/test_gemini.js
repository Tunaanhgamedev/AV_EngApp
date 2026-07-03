const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

async function main() {
  const models = ["gemini-pro", "gemini-1.5-flash-latest", "gemini-1.5-pro-latest", "gemini-2.5-flash", "gemini-flash-latest"];
  for (const modelName of models) {
    try {
      console.log(`Testing Gemini API connection with model: ${modelName}...`);
      const model = genAI.getGenerativeModel({ model: modelName });
      const result = await model.generateContent("Say hello!");
      const response = await result.response;
      console.log(`Success with ${modelName}! response:`, response.text());
      return; // Stop if success
    } catch (err) {
      console.error(`Error with ${modelName}:`, err.message);
    }
  }
}

main();
