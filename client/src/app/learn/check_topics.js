const fs = require('fs');

try {
  const fileContent = fs.readFileSync('e:/AV_EngApp/client/src/app/learn/vocabularyData.ts', 'utf8');
  // Match topic JSON structures
  // Let's parse or match using regex
  const topics = [];
  const regex = /"id":\s*"([^"]+)"[,\s]*"title":\s*"([^"]+)"/g;
  let match;
  while ((match = regex.exec(fileContent)) !== null) {
    topics.push({ id: match[1], title: match[2] });
  }
  console.log('MAIN TOPICS COUNT:', topics.length);
  topics.forEach((t, i) => console.log(`${i+1}. ${t.id} -> ${t.title}`));
} catch (err) {
  console.error('Error reading main file:', err);
}

try {
  const fileContent = fs.readFileSync('e:/AV_EngApp/client/src/app/learn/additionalVocabularyData.ts', 'utf8');
  const topics = [];
  const regex = /"id":\s*"([^"]+)"[,\s]*"title":\s*"([^"]+)"/g;
  let match;
  while ((match = regex.exec(fileContent)) !== null) {
    topics.push({ id: match[1], title: match[2] });
  }
  console.log('\nADDITIONAL TOPICS COUNT:', topics.length);
  topics.forEach((t, i) => console.log(`${i+1}. ${t.id} -> ${t.title}`));
} catch (err) {
  console.error('Error reading additional file:', err);
}
