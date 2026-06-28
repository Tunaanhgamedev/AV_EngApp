"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Must be first — disables SSL cert check for Supabase self-signed cert
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
// Phải dùng require ở đây để đảm bảo dotenv nạp ngay lập tức trước khi các import khác (ESM) chạy
require('dotenv').config();
const app_1 = __importDefault(require("./app"));
// EngBot Backend Server - Updated for Prisma 7.3 (SSL handled in prisma.ts)
const PORT = process.env.PORT || 5000;
app_1.default.listen(Number(PORT), () => {
    console.log(`Server is running on port ${PORT}`);
});
