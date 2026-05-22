const { Pool } = require('pg');
require('dotenv').config();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
const pool = new Pool({ connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } });

async function check() {
  const users = await pool.query('SELECT id, username, email, xp FROM users');
  console.log('USERS:', users.rows);
  const activities = await pool.query('SELECT * FROM user_daily_activity');
  console.log('ACTIVITIES:', activities.rows);
  process.exit(0);
}
check();
