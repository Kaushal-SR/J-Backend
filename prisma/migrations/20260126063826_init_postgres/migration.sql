-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "ProgressType" AS ENUM ('HIRAGANA', 'KATAKANA', 'KANJI', 'VOCAB');

-- CreateTable
CREATE TABLE "Hiragana" (
    "id" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "romaji" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "example" TEXT,
    "imageUrl" TEXT,
    "audioUrl" TEXT,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Hiragana_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Katakana" (
    "id" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,
    "romaji" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "example" TEXT,
    "imageUrl" TEXT,
    "audioUrl" TEXT,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Katakana_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserProgress" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "itemType" "ProgressType" NOT NULL,
    "learned" BOOLEAN NOT NULL DEFAULT false,
    "bookmarked" BOOLEAN NOT NULL DEFAULT false,
    "quizScore" INTEGER,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserProgress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Vocabulary" (
    "id" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "meaning" TEXT NOT NULL,
    "furigana" TEXT,
    "romaji" TEXT,
    "level" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Vocabulary_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Hiragana_symbol_key" ON "Hiragana"("symbol");

-- CreateIndex
CREATE UNIQUE INDEX "Katakana_symbol_key" ON "Katakana"("symbol");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserProgress_userId_itemId_itemType_key" ON "UserProgress"("userId", "itemId", "itemType");

-- CreateIndex
CREATE UNIQUE INDEX "Vocabulary_word_level_key" ON "Vocabulary"("word", "level");

-- AddForeignKey
ALTER TABLE "UserProgress" ADD CONSTRAINT "UserProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
