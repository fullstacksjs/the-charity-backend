/*
  Warnings:

  - You are about to drop the column `familyId` on the `householder` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[family_id]` on the table `householder` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `family_id` to the `householder` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "householder" DROP CONSTRAINT "householder_familyId_fkey";

-- DropIndex
DROP INDEX "householder_familyId_key";

-- AlterTable
ALTER TABLE "householder" DROP COLUMN "familyId",
ADD COLUMN     "family_id" VARCHAR(32) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "householder_family_id_key" ON "householder"("family_id");

-- AddForeignKey
ALTER TABLE "householder" ADD CONSTRAINT "householder_family_id_fkey" FOREIGN KEY ("family_id") REFERENCES "family"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
