import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined in environment variables');
}

// Singleton connection pool shared across Prisma and direct SQL queries
declare global {
  var pgPool: undefined | Pool;
  var prisma: undefined | PrismaClient;
}

export const pgPool = globalThis.pgPool ?? new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 15,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000 // 10s connection timeout for reliable cross-cloud connections
});

if (process.env.NODE_ENV !== 'production') globalThis.pgPool = pgPool;

const prismaClientSingleton = () => {
  const adapter = new PrismaPg(pgPool);
  return new PrismaClient({ adapter });
};

const prisma = globalThis.prisma ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== 'production') globalThis.prisma = prisma;
