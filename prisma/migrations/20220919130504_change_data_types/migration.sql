/*
  Warnings:

  - The primary key for the `admin` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `admin` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(32)`.
  - You are about to alter the column `username` on the `admin` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(60)`.
  - The primary key for the `family` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `family` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(32)`.
  - You are about to alter the column `slug` on the `family` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "admin" DROP CONSTRAINT "admin_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(32),
ALTER COLUMN "username" SET DATA TYPE VARCHAR(60),
ADD CONSTRAINT "admin_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "family" DROP CONSTRAINT "family_pkey",
ALTER COLUMN "id" SET DATA TYPE VARCHAR(32),
ALTER COLUMN "slug" SET DATA TYPE VARCHAR(255),
ADD CONSTRAINT "family_pkey" PRIMARY KEY ("id");
