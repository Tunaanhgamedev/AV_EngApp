const { Pool } = require('pg');
require('dotenv').config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function check() {
  const counts = await pool.query(`
    SELECT user_id, 
           COUNT(*) FILTER (WHERE is_favorite) as notebook_total,
           COUNT(*) FILTER (WHERE is_favorite AND next_review_at <= NOW()) as notebook_due,
           COUNT(*) FILTER (WHERE NOT is_favorite) as learn_page_only,
           COUNT(*) as all_learned
    FROM user_learned_words
    GROUP BY user_id
  `);
  console.log('=== REVIEW SYSTEM STATUS (Notebook-only) ===');
  counts.rows.forEach(r => {
    console.log(`  User [${r.user_id.substring(0,8)}]:`);
    console.log(`    📓 Notebook words: ${r.notebook_total}`);
    console.log(`    ⏰ Notebook due now: ${r.notebook_due}`);
    console.log(`    📚 Learn-page only (NOT reviewed): ${r.learn_page_only}`);
    console.log(`    🔢 Total all learned: ${r.all_learned}`);
  });

  // Show actual notebook words
  const notebookWords = await pool.query(`
    SELECT ulw.user_id, vw.word, ulw.mastery_level, ulw.next_review_at, ulw.last_reviewed_at
    FROM user_learned_words ulw
    JOIN vocabulary_words vw ON ulw.word_id = vw.id
    WHERE ulw.is_favorite = true
    ORDER BY ulw.user_id, ulw.next_review_at
  `);
  console.log('\n=== NOTEBOOK WORDS (to be reviewed) ===');
  notebookWords.rows.forEach(r => {
    const due = r.next_review_at && new Date(r.next_review_at) <= new Date() ? '⚠️ DUE' : '✅ OK';
    console.log(`  [${r.user_id.substring(0,8)}] ${r.word.padEnd(15)} mastery=${r.mastery_level} next=${r.next_review_at || 'null'} ${due}`);
  });

  process.exit(0);
}
check();
