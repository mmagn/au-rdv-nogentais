/*
  Warnings:

  - You are about to drop the column `registrationNumber` on the `Member` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[memberNumber]` on the table `Member` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Member_registrationNumber_key";

-- AlterTable
ALTER TABLE "Member" DROP COLUMN "registrationNumber",
ADD COLUMN     "memberNumber" SERIAL NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Member_memberNumber_key" ON "Member"("memberNumber");
