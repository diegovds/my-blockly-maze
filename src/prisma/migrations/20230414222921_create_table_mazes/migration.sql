-- CreateTable
CREATE TABLE "mazes" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "levels" JSONB NOT NULL,
    "userId" TEXT NOT NULL,
    "executions" INTEGER NOT NULL,
    "urlImage" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mazes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "mazes_code_key" ON "mazes"("code");

-- AddForeignKey
ALTER TABLE "mazes" ADD CONSTRAINT "mazes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
