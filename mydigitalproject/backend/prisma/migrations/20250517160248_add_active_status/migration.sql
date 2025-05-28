-- AlterTable
ALTER TABLE "CompanyProfile" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "token" TEXT;

-- AlterTable
ALTER TABLE "WorkerProfile" ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "token" TEXT;
