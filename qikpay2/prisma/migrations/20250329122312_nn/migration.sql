-- CreateEnum
CREATE TYPE "AuthType" AS ENUM ('Google', 'Github');

-- CreateEnum
CREATE TYPE "OnRampStatus" AS ENUM ('Success', 'Failure', 'Processing');

-- CreateTable
CREATE TABLE "Balance" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "locked" INTEGER NOT NULL,

    CONSTRAINT "Balance_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Merchant" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "auth_type" "AuthType" NOT NULL,

    CONSTRAINT "Merchant_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OnRampTransaction" (
    "id" SERIAL NOT NULL,
    "status" "OnRampStatus" NOT NULL,
    "token" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "OnRampTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "P2Ptransaction" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "fromUserId" TEXT NOT NULL,
    "toUserId" TEXT NOT NULL,

    CONSTRAINT "P2Ptransaction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "name" TEXT,
    "password" TEXT,
    "image" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Balance_userId_key" ON "Balance"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Merchant_email_key" ON "Merchant"("email");

-- CreateIndex
CREATE UNIQUE INDEX "OnRampTransaction_token_key" ON "OnRampTransaction"("token");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Balance" ADD CONSTRAINT "Balance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OnRampTransaction" ADD CONSTRAINT "OnRampTransaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "P2Ptransaction" ADD CONSTRAINT "P2Ptransaction_fromUserId_fkey" FOREIGN KEY ("fromUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "P2Ptransaction" ADD CONSTRAINT "P2Ptransaction_toUserId_fkey" FOREIGN KEY ("toUserId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
