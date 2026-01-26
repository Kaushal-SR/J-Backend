const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function clearTables() {
  // Order matters due to foreign key constraints
  await prisma.userProgress.deleteMany();
  await prisma.vocabulary.deleteMany();
  await prisma.hiragana.deleteMany();
  await prisma.katakana.deleteMany();
  await prisma.user.deleteMany();
  console.log('All relevant tables have been cleared.');
  await prisma.$disconnect();
}

clearTables().catch((e) => {
  console.error(e);
  process.exit(1);
});
