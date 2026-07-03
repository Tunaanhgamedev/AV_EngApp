require('dotenv').config();

const models = [
  "gemini-2.5-flash",
  "gemini-3.5-flash",
  "gemini-2.5-flash-lite",
  "gemini-1.5-flash",
  "gemini-1.5-flash-latest",
  "gemini-flash-latest",
  "gemini-pro"
];

async function testModel(modelName) {
  const prompt = "Say hello in 5 words.";
  console.log(`\nTesting REST endpoint for model: ${modelName}...`);
  const startTime = Date.now();
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${process.env.GEMINI_API_KEY}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      }),
      signal: AbortSignal.timeout(10000)
    });
    
    const duration = Date.now() - startTime;
    console.log(`  Status: ${response.status} (took ${duration}ms)`);
    const data = await response.json();
    if (response.ok) {
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      console.log(`  Success! Text: "${text.trim()}"`);
    } else {
      console.log(`  Error: ${data.error?.message}`);
    }
  } catch (err) {
    const duration = Date.now() - startTime;
    console.log(`  Failed (took ${duration}ms): ${err.message}`);
  }
}

async function run() {
  for (const m of models) {
    await testModel(m);
  }
}

run();
