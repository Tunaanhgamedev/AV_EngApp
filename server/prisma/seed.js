const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');
require('dotenv').config();

// Simple seed data
const words = [
  {
    word: 'Abandon',
    phonetic: '/əˈbændən/',
    meaningEn: 'To leave a place, thing, or person, usually for ever.',
    meaningVi: 'Từ bỏ, ruồng bỏ, rời bỏ.',
    wordType: 'Verb',
    cefrLevel: 'B2',
    audioUs: 'https://www.oxfordlearnersdictionaries.com/media/english/us_pron/a/aba/aband/abandon__us_2.mp3'
  },
  {
    word: 'Ability',
    phonetic: '/əˈbɪləti/',
    meaningEn: 'The physical or mental power or skill needed to do something.',
    meaningVi: 'Khả năng, năng lực.',
    wordType: 'Noun',
    cefrLevel: 'A2',
    audioUs: 'https://www.oxfordlearnersdictionaries.com/media/english/us_pron/a/abi/abili/ability__us_1.mp3'
  },
  {
    word: 'Absolute',
    phonetic: '/ˈæbsəluːt/',
    meaningEn: 'Very great or to the largest degree possible.',
    meaningVi: 'Tuyệt đối, hoàn toàn.',
    wordType: 'Adj',
    cefrLevel: 'B2',
    audioUs: 'https://www.oxfordlearnersdictionaries.com/media/english/us_pron/a/abs/absol/absolute__us_1.mp3'
  },
  {
    word: 'Academic',
    phonetic: '/ˌækəˈdemɪk/',
    meaningEn: 'Relating to schools, colleges, and universities.',
    meaningVi: 'Thuộc về học thuật, viện hàn lâm.',
    wordType: 'Adj',
    cefrLevel: 'B1',
    audioUs: 'https://www.oxfordlearnersdictionaries.com/media/english/us_pron/a/aca/acade/academic__us_1.mp3'
  },
  {
    word: 'Accurate',
    phonetic: '/ˈækjərət/',
    meaningEn: 'Correct, exact, and without any mistakes.',
    meaningVi: 'Chính xác, đúng đắn.',
    wordType: 'Adj',
    cefrLevel: 'B1',
    audioUs: 'https://www.oxfordlearnersdictionaries.com/media/english/us_pron/a/acc/accur/accurate__us_1.mp3'
  },
  {
    word: 'Active',
    wordType: 'Adj',
    cefrLevel: 'A1',
    meaningEn: 'Busy with a particular activity',
    meaningVi: 'Năng động, chủ động',
    phonetic: '/ˈæktɪv/'
  },
  {
    word: 'Basic',
    wordType: 'Adj',
    cefrLevel: 'A1',
    meaningEn: 'Simple and useful',
    meaningVi: 'Cơ bản',
    phonetic: '/ˈbeɪsɪk/'
  }
];

async function seed() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  console.log('Seeding started...');
  try {
    for (const w of words) {
      const existing = await prisma.vocabularyWord.findFirst({
        where: { word: w.word }
      });
      if (!existing) {
        await prisma.vocabularyWord.create({ data: w });
        console.log(`Added: ${w.word}`);
      } else {
        console.log(`Exists: ${w.word}`);
      }
    }
    console.log('Seeding finished successfully.');
  } catch (err) {
    console.error('Seed error:', err);
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

seed();
