/*
  Warnings:

  - The `admins` column on the `Tournament` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `participants` column on the `Tournament` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Tournament" DROP COLUMN "admins",
ADD COLUMN     "admins" INTEGER[],
DROP COLUMN "participants",
ADD COLUMN     "participants" INTEGER[];
