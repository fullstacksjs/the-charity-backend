-- CreateEnum
CREATE TYPE "HouseholderStatus" AS ENUM ('DRAFT', 'COMPLETED');

-- AlterTable
ALTER TABLE "householder" ADD COLUMN     "status" "HouseholderStatus" NOT NULL DEFAULT 'DRAFT';
