// Phải dùng require ở đây để đảm bảo dotenv nạp ngay lập tức trước khi các import khác (ESM) chạy
require('dotenv').config();

import app from './app';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
