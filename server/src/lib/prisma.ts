import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const prismaClientSingleton = () => {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not defined in environment variables');
  }

  // Khởi tạo kết nối PostgreSQL truyền thống
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  
  // Sử dụng Adapter để Prisma bản 7 có thể làm việc trực tiếp
  const adapter = new PrismaPg(pool);
  
  return new PrismaClient({ adapter });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
