const fs = require('fs');

function simpleCount(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const topics = [];
  
  // Since topic structure can be slightly formatted, we match by id, title, and count curly braces inside beginner/advanced arrays
  const topicsSplit = content.split('"id":');
  // The first element is the header/import block
  for (let i = 1; i < topicsSplit.length; i++) {
    const block = topicsSplit[i];
    const idMatch = block.match(/^\s*"([^"]+)"/);
    if (!idMatch) continue;
    const id = idMatch[1];
    
    const titleMatch = block.match(/"title":\s*"([^"]+)"/);
    const title = titleMatch ? titleMatch[1] : '';
    
    // Extract beginner block
    const begStart = block.indexOf('"beginner":');
    const advStart = block.indexOf('"advanced":');
    
    if (begStart !== -1 && advStart !== -1) {
      const begBlock = block.substring(begStart, advStart);
      const advBlock = block.substring(advStart);
      
      const begWords = (begBlock.match(/"word":/g) || []).length;
      const advWords = (advBlock.match(/"word":/g) || []).length;
      
      topics.push({ id, title, beginner: begWords, advanced: advWords, total: begWords + advWords });
    }
  }
  return topics;
}

console.log('MAIN TOPICS WORD COUNTS:');
console.log(simpleCount('e:/AV_EngApp/client/src/app/learn/vocabularyData.ts'));

console.log('\nADDITIONAL TOPICS WORD COUNTS:');
console.log(simpleCount('e:/AV_EngApp/client/src/app/learn/additionalVocabularyData.ts'));
