/*
  Warnings:

  - Added the required column `people` to the `Offer` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Offer" ADD COLUMN     "people" INTEGER NOT NULL;
