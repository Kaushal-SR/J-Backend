-- AddForeignKey
ALTER TABLE "UserProgress" ADD CONSTRAINT "UserProgress_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Vocabulary"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
