-- DropForeignKey
ALTER TABLE "BracketScore" DROP CONSTRAINT "BracketScore_winnerId_fkey";

-- AlterTable
ALTER TABLE "BracketScore" ALTER COLUMN "winnerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "BracketScore" ADD CONSTRAINT "BracketScore_winnerId_fkey" FOREIGN KEY ("winnerId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
