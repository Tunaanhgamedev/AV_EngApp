const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

async function main() {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${process.env.GEMINI_API_KEY}`);
    const data = await response.json();
    const geminiModels = data.models
      .filter(m => m.name.includes("gemini-"))
      .map(m => ({ name: m.name, displayName: m.displayName, methods: m.supportedGenerationMethods }));
    console.log("Gemini Models:", JSON.stringify(geminiModels, null, 2));
  } catch (err) {
    console.error("Error:", err);
  }
}

main();
