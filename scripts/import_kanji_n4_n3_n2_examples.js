// Import missing example words from Kanji_N4, N3, N2 into Vocabulary table with level 0 if not present
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();
const levels = [4, 3, 2];

async function main() {
  const seen = new Set();
  for (const level of levels) {
    const kanjiPath = path.join(__dirname, '../..', 'japanese-frontend-main', 'src', 'assets', `Kanji_N${level}.json`);
    if (!fs.existsSync(kanjiPath)) {
      console.warn(`File not found: ${kanjiPath}`);
      continue;
    }
    const kanjiData = JSON.parse(fs.readFileSync(kanjiPath, 'utf8'));
    for (const kanji of kanjiData) {
      if (!kanji.examples) continue;
      for (const ex of kanji.examples) {
        const word = ex.word;
        if (!word || seen.has(word)) continue;
        seen.add(word);
        // Check if word exists in any level
        const exists = await prisma.vocabulary.findFirst({ where: { word } });
        if (!exists) {
          await prisma.vocabulary.create({
            data: {
              word,
              meaning: ex.meaning || '',
              furigana: ex.reading || null,
              romaji: null,
              level: 0,
            },
          });
          console.log(`Added: ${word}`);
        }
      }
    }
    console.log(`Kanji N${level} example word import complete!`);
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
