import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function cleanupOrphanedUserProgress() {
  const result = await prisma.$executeRaw`
    DELETE FROM "UserProgress"
    WHERE "itemType" = 'VOCAB'
      AND "itemId" NOT IN (SELECT id FROM "Vocabulary")
  `;
  console.log(`Deleted ${result} orphaned UserProgress rows.`);
}

cleanupOrphanedUserProgress()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
