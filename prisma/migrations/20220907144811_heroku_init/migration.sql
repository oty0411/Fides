-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(32) NOT NULL,
    "password" VARCHAR(32) NOT NULL,
    "open" INTEGER NOT NULL,
    "type" INTEGER NOT NULL,
    "is_admin" INTEGER NOT NULL,
    "is_deleted" INTEGER NOT NULL,
    "created_at" TIMESTAMP(0) NOT NULL DEFAULT NOW(),
    "updated_at" TIMESTAMP(0) NOT NULL DEFAULT NOW(),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActorProfile" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "actress_name" VARCHAR(128) NOT NULL,
    "real_name" VARCHAR(128) NOT NULL,
    "birthday" TIMESTAMP(3) NOT NULL,
    "blood_type" INTEGER NOT NULL,
    "height" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "clothes_size" INTEGER NOT NULL,
    "shoes_size" INTEGER NOT NULL,
    "breast_size" INTEGER NOT NULL,
    "breast_top" INTEGER NOT NULL,
    "breast_under" INTEGER NOT NULL,
    "waist_size" INTEGER NOT NULL,
    "hip_size" INTEGER NOT NULL,

    CONSTRAINT "ActorProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PlayCondition1" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "honban" INTEGER NOT NULL,
    "gomunashi" INTEGER NOT NULL,
    "nakadashi" INTEGER NOT NULL,
    "ferachio" INTEGER NOT NULL,
    "iramachio" INTEGER NOT NULL,

    CONSTRAINT "PlayCondition1_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_name_key" ON "User"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ActorProfile_userId_key" ON "ActorProfile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "PlayCondition1_userId_key" ON "PlayCondition1"("userId");

-- AddForeignKey
ALTER TABLE "ActorProfile" ADD CONSTRAINT "ActorProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PlayCondition1" ADD CONSTRAINT "PlayCondition1_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
