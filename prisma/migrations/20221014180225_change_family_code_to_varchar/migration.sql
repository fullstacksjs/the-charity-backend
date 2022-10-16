/*
  Warnings:

  - You are about to alter the column `code` on the `family` table. The data in that column could be lost. The data in that column will be cast from `Integer` to `VarChar(6)`.

*/
-- AlterTable
ALTER TABLE "family" ALTER COLUMN "code" DROP DEFAULT,
ALTER COLUMN "code" SET DATA TYPE VARCHAR(6);
DROP SEQUENCE "family_code_seq";
