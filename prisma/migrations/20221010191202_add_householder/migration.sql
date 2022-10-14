-- CreateTable
CREATE TABLE "householder" (
    "id" VARCHAR(32) NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "familyId" VARCHAR(32) NOT NULL,

    CONSTRAINT "householder_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "householder_familyId_key" ON "householder"("familyId");

-- AddForeignKey
ALTER TABLE "householder" ADD CONSTRAINT "householder_familyId_fkey" FOREIGN KEY ("familyId") REFERENCES "family"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
