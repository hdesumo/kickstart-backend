/*
  Warnings:

  - You are about to alter the column `minMonthlyUsd` on the `MembershipTier` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Integer`.
  - You are about to drop the `Association` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Campus` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Country` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Currency` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Partnership` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Student` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[externalId]` on the table `Course` will be added. If there are existing duplicate values, this will fail.
  - Made the column `answer` on table `QuizQuestion` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Association" DROP CONSTRAINT "Association_campusId_fkey";

-- DropForeignKey
ALTER TABLE "Campus" DROP CONSTRAINT "Campus_countryId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_associationId_fkey";

-- DropForeignKey
ALTER TABLE "Student" DROP CONSTRAINT "Student_tierId_fkey";

-- AlterTable
ALTER TABLE "Course" ADD COLUMN     "campus" TEXT,
ADD COLUMN     "externalId" TEXT,
ADD COLUMN     "fileUrl" TEXT,
ADD COLUMN     "level" TEXT,
ADD COLUMN     "source" TEXT,
ADD COLUMN     "url" TEXT;

-- AlterTable
ALTER TABLE "MembershipTier" ALTER COLUMN "minMonthlyUsd" SET DATA TYPE INTEGER;

-- AlterTable
ALTER TABLE "QuizQuestion" ALTER COLUMN "answer" SET NOT NULL;

-- DropTable
DROP TABLE "Association";

-- DropTable
DROP TABLE "Campus";

-- DropTable
DROP TABLE "Country";

-- DropTable
DROP TABLE "Currency";

-- DropTable
DROP TABLE "Partnership";

-- DropTable
DROP TABLE "Student";

-- CreateIndex
CREATE UNIQUE INDEX "Course_externalId_key" ON "Course"("externalId");
