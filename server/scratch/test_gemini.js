const { GeminiService } = require('../src/services/gemini.service');
require('dotenv').config();

async function test() {
  const data = await GeminiService.enrichWordData('ceremony');
  console.log(JSON.stringify(data, null, 2));
}
test();
