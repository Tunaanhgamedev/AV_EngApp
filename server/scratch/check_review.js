const { Pool } = require('pg');
require('dotenv').config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function check() {
  // Check learned words with their review dates
  const words = await pool.query(`
    SELECT ulw.user_id, ulw.is_favorite, ulw.mastery_level, ulw.next_review_at, ulw.last_reviewed_at, vw.word
    FROM user_learned_words ulw
    JOIN vocabulary_words vw ON ulw.word_id = vw.id
    ORDER BY ulw.user_id, ulw.next_review_at
    LIMIT 30
  `);
  console.log('LEARNED WORDS (' + words.rows.length + '):');
  words.rows.forEach(r => {
    console.log(`  [${r.user_id.substring(0,8)}] ${r.word.padEnd(15)} fav=${r.is_favorite} mastery=${r.mastery_level} next=${r.next_review_at} last=${r.last_reviewed_at}`);
  });

  // Count favorites vs non-favorites per user
  const counts = await pool.query(`
    SELECT user_id, 
           COUNT(*) as total,
           SUM(CASE WHEN is_favorite THEN 1 ELSE 0 END) as favorites,
           SUM(CASE WHEN NOT is_favorite THEN 1 ELSE 0 END) as non_favorites,
           SUM(CASE WHEN next_review_at <= NOW() THEN 1 ELSE 0 END) as due_now,
           SUM(CASE WHEN is_favorite AND next_review_at <= NOW() THEN 1 ELSE 0 END) as fav_due_now
    FROM user_learned_words
    GROUP BY user_id
  `);
  console.log('\nPER-USER COUNTS:');
  counts.rows.forEach(r => {
    console.log(`  [${r.user_id.substring(0,8)}] total=${r.total} favorites=${r.favorites} non_favorites=${r.non_favorites} due_now=${r.due_now} fav_due_now=${r.fav_due_now}`);
  });

  process.exit(0);
}
check();
