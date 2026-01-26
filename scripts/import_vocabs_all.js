// Import all JLPT vocabularies (N1-N5) from JSON and upsert into the Vocabulary table
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

const levels = [1, 2, 3, 4, 5];

async function main() {
  for (const level of levels) {
    const vocabPath = path.join(__dirname, '../..', 'japanese-frontend-main', 'src', 'assets', `Vocabs_N${level}.json`);
    if (!fs.existsSync(vocabPath)) {
      console.warn(`File not found: ${vocabPath}`);
      continue;
    }
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
    console.log(`N${level} vocabulary import complete!`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
