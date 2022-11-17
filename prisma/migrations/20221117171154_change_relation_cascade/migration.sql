-- DropForeignKey
ALTER TABLE "householder" DROP CONSTRAINT "householder_family_id_fkey";

-- DropForeignKey
ALTER TABLE "member" DROP CONSTRAINT "member_family_id_fkey";

-- AddForeignKey
ALTER TABLE "member" ADD CONSTRAINT "member_family_id_fkey" FOREIGN KEY ("family_id") REFERENCES "family"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "householder" ADD CONSTRAINT "householder_family_id_fkey" FOREIGN KEY ("family_id") REFERENCES "family"("id") ON DELETE CASCADE ON UPDATE CASCADE;
