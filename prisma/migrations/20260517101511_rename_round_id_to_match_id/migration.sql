/*
  Warnings:

  - The primary key for the `BracketScore` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `roundId` on the `BracketScore` table. All the data in the column will be lost.
  - Added the required column `matchId` to the `BracketScore` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BracketScore" DROP CONSTRAINT "BracketScore_pkey",
DROP COLUMN "roundId",
ADD COLUMN     "matchId" INTEGER NOT NULL,
ADD CONSTRAINT "BracketScore_pkey" PRIMARY KEY ("tournamentId", "matchId");
