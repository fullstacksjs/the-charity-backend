-- CreateEnum
CREATE TYPE "FamilySeverity" AS ENUM ('NORMAL', 'CRITICAL');

-- AlterTable
ALTER TABLE "family" ADD COLUMN     "severity" "FamilySeverity" NOT NULL DEFAULT 'NORMAL';
