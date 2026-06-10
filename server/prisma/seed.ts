import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
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
    }
  ];

  console.log('Seeding Oxford 3000 words...');
  
  for (const w of words) {
    const lowerWord = w.word.toLowerCase();
    await prisma.vocabularyWord.upsert({
      where: { word: lowerWord },
      update: {
        meaningEn: w.meaningEn,
        meaningVi: w.meaningVi,
        wordType: w.wordType,
        cefrLevel: w.cefrLevel,
        audioUs: w.audioUs,
      },
      create: {
        ...w,
        id: undefined,
        word: lowerWord
      }
    });
  }

  console.log('Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
