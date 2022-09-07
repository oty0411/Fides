-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(32) NOT NULL,
    `password` VARCHAR(32) NOT NULL,
    `open` INTEGER NOT NULL,
    `type` INTEGER NOT NULL,
    `is_admin` INTEGER NOT NULL,
    `is_deleted` INTEGER NOT NULL,
    `created_at` TIMESTAMP(0) NOT NULL DEFAULT NOW(),
    `updated_at` TIMESTAMP(0) NOT NULL DEFAULT NOW() ON UPDATE CURRENT_TIMESTAMP,

    UNIQUE INDEX `User_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ActorProfile` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `actress_name` VARCHAR(128) NOT NULL,
    `real_name` VARCHAR(128) NOT NULL,
    `birthday` DATETIME(3) NOT NULL,
    `blood_type` INTEGER NOT NULL,
    `height` INTEGER NOT NULL,
    `weight` INTEGER NOT NULL,
    `clothes_size` INTEGER NOT NULL,
    `shoes_size` INTEGER NOT NULL,
    `breast_size` INTEGER NOT NULL,
    `breast_top` INTEGER NOT NULL,
    `breast_under` INTEGER NOT NULL,
    `waist_size` INTEGER NOT NULL,
    `hip_size` INTEGER NOT NULL,

    UNIQUE INDEX `ActorProfile_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PlayCondition1` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NOT NULL,
    `honban` INTEGER NOT NULL,
    `gomunashi` INTEGER NOT NULL,
    `nakadashi` INTEGER NOT NULL,
    `ferachio` INTEGER NOT NULL,
    `iramachio` INTEGER NOT NULL,

    UNIQUE INDEX `PlayCondition1_userId_key`(`userId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ActorProfile` ADD CONSTRAINT `ActorProfile_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PlayCondition1` ADD CONSTRAINT `PlayCondition1_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
