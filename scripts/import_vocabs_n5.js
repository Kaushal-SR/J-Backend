// Import N5 vocabulary from JSON and upsert into the Vocabulary table
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  const vocabPath = path.join(__dirname, '../..', 'japanese-frontend-main', 'src', 'assets', 'Vocabs_N5.json');
  const vocabData = JSON.parse(fs.readFileSync(vocabPath, 'utf8'));

  for (const entry of vocabData) {
    await prisma.vocabulary.upsert({
      where: {
        word_level: {
          word: entry.word,
          level: entry.level,
        },
      },
      update: {
        meaning: entry.meaning,
        furigana: entry.furigana || null,
        romaji: entry.romaji || null,
      },
      create: {
        word: entry.word,
        meaning: entry.meaning,
        furigana: entry.furigana || null,
        romaji: entry.romaji || null,
        level: entry.level,
      },
    });
  }
  console.log('N5 vocabulary import complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
