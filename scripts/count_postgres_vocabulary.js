const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const count = await prisma.vocabulary.count();
  console.log('PostgreSQL vocabulary count:', count);
  await prisma.$disconnect();
}

main();
