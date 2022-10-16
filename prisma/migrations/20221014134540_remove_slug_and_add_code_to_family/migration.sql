/*
  Warnings:

  - You are about to drop the column `slug` on the `family` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "family_slug_key";

-- AlterTable
ALTER TABLE "family" DROP COLUMN "slug",
ADD COLUMN     "code" SERIAL NOT NULL;

-- CreateIndex
CREATE INDEX "family_code_idx" ON "family"("code");
