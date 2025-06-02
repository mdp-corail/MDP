/*
  Warnings:

  - Added the required column `language` to the `Offer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sector` to the `Offer` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Sector" AS ENUM ('DEVELOPPEMENT_PROGRAMMATION', 'WEB_DESIGN', 'CREATION_DIGITALE', 'MARKETING', 'COMMUNICATION');

-- AlterTable
ALTER TABLE "Offer" ADD COLUMN     "language" "Country" NOT NULL,
ADD COLUMN     "sector" "Sector" NOT NULL;
