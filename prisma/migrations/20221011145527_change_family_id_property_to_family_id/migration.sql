/*
  Warnings:

  - You are about to drop the column `familyId` on the `member` table. All the data in the column will be lost.
  - Added the required column `family_id` to the `member` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "member" DROP CONSTRAINT "member_familyId_fkey";

-- AlterTable
ALTER TABLE "member" DROP COLUMN "familyId",
ADD COLUMN     "family_id" VARCHAR(32) NOT NULL;

-- AddForeignKey
ALTER TABLE "member" ADD CONSTRAINT "member_family_id_fkey" FOREIGN KEY ("family_id") REFERENCES "family"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
