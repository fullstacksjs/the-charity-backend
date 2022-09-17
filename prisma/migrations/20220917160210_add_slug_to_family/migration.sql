/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `family` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `family` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "family" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "family_slug_key" ON "family"("slug");
