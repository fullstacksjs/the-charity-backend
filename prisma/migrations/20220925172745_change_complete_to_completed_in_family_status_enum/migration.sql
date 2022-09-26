/*
  Warnings:

  - The values [COMPLETE] on the enum `FamilyStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "FamilyStatus_new" AS ENUM ('DRAFT', 'COMPLETED');
ALTER TABLE "family" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "family" ALTER COLUMN "status" TYPE "FamilyStatus_new" USING ("status"::text::"FamilyStatus_new");
ALTER TYPE "FamilyStatus" RENAME TO "FamilyStatus_old";
ALTER TYPE "FamilyStatus_new" RENAME TO "FamilyStatus";
DROP TYPE "FamilyStatus_old";
ALTER TABLE "family" ALTER COLUMN "status" SET DEFAULT 'DRAFT';
COMMIT;
