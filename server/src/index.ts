// Must be first — disables SSL cert check for Supabase self-signed cert
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
// Phải dùng require ở đây để đảm bảo dotenv nạp ngay lập tức trước khi các import khác (ESM) chạy
require('dotenv').config();


import app from './app';

// EngBot Backend Server - Updated for Prisma 7.3 (SSL handled in prisma.ts)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
