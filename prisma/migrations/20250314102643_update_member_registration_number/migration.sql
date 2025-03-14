-- CreateTable
CREATE TABLE "Member" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT,
    "phone" TEXT,
    "zip" TEXT,
    "city" TEXT,
    "address" TEXT,
    "lastRegisteredAt" TIMESTAMP(3) NOT NULL,
    "isLessThan14YearsOld" BOOLEAN NOT NULL DEFAULT false,
    "registrationNumber" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Member_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Member_registrationNumber_key" ON "Member"("registrationNumber");
