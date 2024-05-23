/*
  Warnings:

  - A unique constraint covering the columns `[installationCode]` on the table `Installation` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `installationCode` to the `Installation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Installation" ADD COLUMN     "installationCode" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Installation_installationCode_key" ON "Installation"("installationCode");
