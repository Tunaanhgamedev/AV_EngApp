const fs = require('fs');
const path = require('path');
require('dotenv').config();

const API_KEY = process.env.GEMINI_API_KEY || "";
// Prioritize the best-performing and most stable model (gemini-3.5-flash) and fallback as needed
const MODELS_PRIORITY = ["gemini-3.5-flash", "gemini-flash-latest", "gemini-2.5-flash"];

const clientLearnDir = path.join(__dirname, '..', 'client', 'src', 'app', 'learn');
const mainPath = path.join(clientLearnDir, 'vocabularyData.ts');
const additionalPath = path.join(clientLearnDir, 'additionalVocabularyData.ts');

function loadTopics(filePath) {
  if (!fs.existsSync(filePath)) {
    throw new Error(`File does not exist: ${filePath}`);
  }
  const content = fs.readFileSync(filePath, 'utf8');
  const cleanContent = content
    .replace(/import\s+[\s\S]*?;/g, '')
    .replace(/export\s+interface\s+[\s\S]*?}/g, '')
    .replace(/:\s*VocabTopic\[\]/g, '')
    .replace(/\.\.\.ADDITIONAL_VOCABULARY_TOPICS/g, '')
    .replace(/\.\.\.ORIGINAL_VOCABULARY_TOPICS/g, '')
    .replace(/export\s+const/g, 'const')
    .replace(/export\s+default/g, 'const');
  
  const tempFile = path.join(__dirname, `temp_${path.basename(filePath)}.js`);
  fs.writeFileSync(tempFile, cleanContent + '\nmodule.exports = { ORIGINAL_VOCABULARY_TOPICS: typeof ORIGINAL_VOCABULARY_TOPICS !== "undefined" ? ORIGINAL_VOCABULARY_TOPICS : undefined, ADDITIONAL_VOCABULARY_TOPICS: typeof ADDITIONAL_VOCABULARY_TOPICS !== "undefined" ? ADDITIONAL_VOCABULARY_TOPICS : undefined };');
  
  const loaded = require(tempFile);
  fs.unlinkSync(tempFile);
  return loaded;
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function callDirectREST(modelName, prompt) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 60000); // 60 seconds strict timeout
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${API_KEY}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
          thinkingConfig: {
            thinkingBudget: 0
          }
        }
      }),
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`HTTP ${response.status}: ${errText}`);
    }
    const data = await response.json();
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      throw new Error("No text content returned");
    }
    return text;
  } catch (err) {
    clearTimeout(timeoutId);
    throw err;
  }
}

async function generateWordsForTopic(topic, numWords = 45) {
  const existingBegWords = (topic.beginner || []).map(w => w.word);
  const existingAdvWords = (topic.advanced || []).map(w => w.word);
  
  const prompt = `
You are an expert English teacher. For the topic "${topic.title}" (description: "${topic.desc}"), generate exactly ${numWords} additional English vocabulary words for the "beginner" level, and exactly ${numWords} additional English vocabulary words for the "advanced" level.

To prevent duplicate entries, DO NOT generate any of the following existing words:
Existing beginner words: ${existingBegWords.join(', ')}
Existing advanced words: ${existingAdvWords.join(', ')}

For each word, provide:
1. "word": the English word (lowercase)
2. "phonetic": the IPA pronunciation (e.g., /dɪˈlɪʃ.əs/)
3. "wordType": noun, verb, adj, adv, prep, etc.
4. "meaningEn": a short, clear definition/explanation in English
5. "meaningVi": the accurate translation/meaning in Vietnamese
6. "example": a natural English example sentence using this word in context
7. "exampleVi": translation of the example sentence in Vietnamese

Respond ONLY with a JSON object of this structure (no markdown formatting, no other text):
{
  "beginner": [
    {
      "word": "...",
      "phonetic": "...",
      "wordType": "...",
      "meaningEn": "...",
      "meaningVi": "...",
      "example": "...",
      "exampleVi": "..."
    },
    ...
  ],
  "advanced": [
    ...
  ]
}
`;

  // Try prioritized models to avoid 503/429
  for (const modelName of MODELS_PRIORITY) {
    let attempts = 2;
    while (attempts > 0) {
      try {
        console.log(`  [REST Call] Generating 45 beginner and 45 advanced words using ${modelName}...`);
        const text = await callDirectREST(modelName, prompt);
        const data = JSON.parse(text.trim());
        
        if (data.beginner && data.advanced && Array.isArray(data.beginner) && Array.isArray(data.advanced)) {
          return data;
        }
        throw new Error("Invalid structure");
      } catch (err) {
        attempts--;
        console.log(`  [REST Fail] Model ${modelName} on "${topic.id}": ${err.message}. ${attempts} left.`);
        if (attempts > 0) {
          await sleep(3000);
        }
      }
    }
  }
  return null;
}

async function run() {
  console.log("=== STARTING VOCABULARY EXPANSION SYSTEM ===");
  
  // 1. Load Main Topics
  const mainData = loadTopics(mainPath);
  const mainTopics = mainData.ORIGINAL_VOCABULARY_TOPICS;
  console.log(`Loaded ${mainTopics.length} main topics.`);
  
  // 2. Load Additional Topics
  const addData = loadTopics(additionalPath);
  const addTopics = addData.ADDITIONAL_VOCABULARY_TOPICS;
  console.log(`Loaded ${addTopics.length} additional topics.`);
  
  // Combine all topics to process
  const allTopics = [...mainTopics, ...addTopics];
  
  // Process topics sequentially
  for (let i = 0; i < allTopics.length; i++) {
    const topic = allTopics[i];
    console.log(`\n[${i+1}/${allTopics.length}] Processing topic: "${topic.id}" (${topic.title})`);
    console.log(`  Current counts - Beginner: ${topic.beginner.length}, Advanced: ${topic.advanced.length}`);
    
    // Generate both beginner and advanced words
    const newWords = await generateWordsForTopic(topic, 45);
    
    if (newWords) {
      // Merge and deduplicate beginner
      const beginnerMap = new Map();
      topic.beginner.forEach(w => beginnerMap.set(w.word.toLowerCase(), w));
      newWords.beginner.forEach(w => {
        if (!w.word) return;
        const normalized = w.word.trim().toLowerCase();
        if (!beginnerMap.has(normalized)) {
          beginnerMap.set(normalized, {
            word: normalized,
            phonetic: w.phonetic || '',
            wordType: w.wordType || 'noun',
            meaningEn: w.meaningEn || '',
            meaningVi: w.meaningVi || '',
            example: w.example || '',
            exampleVi: w.exampleVi || ''
          });
        }
      });
      topic.beginner = Array.from(beginnerMap.values());
      
      // Merge and deduplicate advanced
      const advancedMap = new Map();
      topic.advanced.forEach(w => advancedMap.set(w.word.toLowerCase(), w));
      newWords.advanced.forEach(w => {
        if (!w.word) return;
        const normalized = w.word.trim().toLowerCase();
        if (!advancedMap.has(normalized)) {
          advancedMap.set(normalized, {
            word: normalized,
            phonetic: w.phonetic || '',
            wordType: w.wordType || 'noun',
            meaningEn: w.meaningEn || '',
            meaningVi: w.meaningVi || '',
            example: w.example || '',
            exampleVi: w.exampleVi || ''
          });
        }
      });
      topic.advanced = Array.from(advancedMap.values());
      
      console.log(`  => Expanded! New counts - Beginner: ${topic.beginner.length}, Advanced: ${topic.advanced.length}`);
    } else {
      console.log(`  ❌ Failed to generate words for topic: "${topic.id}". Skipping...`);
    }
    
    // Warm sleep to prevent RPM limits
    await sleep(4000);
  }
  
  // 3. Write back to vocabularyData.ts
  const newMainTopics = allTopics.slice(0, mainTopics.length);
  const mainTsContent = `export interface VocabWord {
  word: string;
  phonetic: string;
  wordType: string;
  meaningEn: string;
  meaningVi: string;
  example: string;
  exampleVi: string;
}

export interface VocabTopic {
  id: string;
  title: string;
  desc: string;
  color: string;
  beginner: VocabWord[];
  advanced: VocabWord[];
}

import { ADDITIONAL_VOCABULARY_TOPICS } from './additionalVocabularyData';

const ORIGINAL_VOCABULARY_TOPICS: VocabTopic[] = ${JSON.stringify(newMainTopics, null, 2)};

export const VOCABULARY_TOPICS: VocabTopic[] = [
  ...ORIGINAL_VOCABULARY_TOPICS,
  ...ADDITIONAL_VOCABULARY_TOPICS
];
`;
  fs.writeFileSync(mainPath, mainTsContent, 'utf8');
  console.log(`\nSuccessfully wrote main topics back to: ${mainPath}`);
  
  // 4. Write back to additionalVocabularyData.ts
  const newAddTopics = allTopics.slice(mainTopics.length);
  const addTsContent = `import { VocabTopic } from './vocabularyData';

export const ADDITIONAL_VOCABULARY_TOPICS: VocabTopic[] = ${JSON.stringify(newAddTopics, null, 2)};
`;
  fs.writeFileSync(additionalPath, addTsContent, 'utf8');
  console.log(`Successfully wrote additional topics back to: ${additionalPath}`);
  
  console.log("=== VOCABULARY EXPANSION COMPLETED SUCCESSFULLY ===");
}

run().catch(console.error);
