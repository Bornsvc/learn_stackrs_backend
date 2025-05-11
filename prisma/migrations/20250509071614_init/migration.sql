-- CreateTable
CREATE TABLE "cryptoData" (
    "id" SERIAL NOT NULL,
    "Conis" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "market_cap" TEXT NOT NULL,
    "volume" TEXT NOT NULL,
    "liquidity" TEXT NOT NULL,
    "allTimeHeight" TEXT NOT NULL,
    "imgUrl" TEXT NOT NULL,
    "symbol" TEXT NOT NULL,

    CONSTRAINT "cryptoData_pkey" PRIMARY KEY ("id")
);
