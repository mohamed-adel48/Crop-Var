-- CreateTable
CREATE TABLE `admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `admin_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `user` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `nationalId` VARCHAR(191) NOT NULL,
    `farmerCard` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(191) NOT NULL,
    `adminId` INTEGER NULL,

    UNIQUE INDEX `user_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `location` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `farmerId` INTEGER NULL,
    `adminId` INTEGER NULL,

    UNIQUE INDEX `location_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `latlong` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `lang` DECIMAL(65, 30) NOT NULL,
    `lat` DECIMAL(65, 30) NOT NULL,
    `locationId` INTEGER NULL,

    UNIQUE INDEX `latlong_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `plant` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `fertlizerConsumption` DECIMAL(65, 30) NOT NULL,

    UNIQUE INDEX `plant_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `assumption` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `plantId_farmer` INTEGER NULL,
    `plantId_ai` INTEGER NULL,
    `status` ENUM('Pending', 'Right', 'Wrong') NOT NULL DEFAULT 'Pending',
    `userId` INTEGER NULL,
    `locationId` INTEGER NOT NULL,
    `startDate` DATETIME(3) NOT NULL,

    UNIQUE INDEX `assumption_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `assumption_appeal` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `assumptionId` INTEGER NULL,
    `description` VARCHAR(191) NULL,
    `appeal_status` ENUM('Pending', 'accepted', 'denied') NOT NULL DEFAULT 'Pending',

    UNIQUE INDEX `assumption_appeal_id_key`(`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `user` ADD CONSTRAINT `user_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `admin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `location` ADD CONSTRAINT `location_farmerId_fkey` FOREIGN KEY (`farmerId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `location` ADD CONSTRAINT `location_adminId_fkey` FOREIGN KEY (`adminId`) REFERENCES `admin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `latlong` ADD CONSTRAINT `latlong_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `location`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assumption` ADD CONSTRAINT `assumption_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assumption` ADD CONSTRAINT `assumption_locationId_fkey` FOREIGN KEY (`locationId`) REFERENCES `location`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assumption` ADD CONSTRAINT `assumption_plantId_farmer_fkey` FOREIGN KEY (`plantId_farmer`) REFERENCES `plant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assumption` ADD CONSTRAINT `assumption_plantId_ai_fkey` FOREIGN KEY (`plantId_ai`) REFERENCES `plant`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `assumption_appeal` ADD CONSTRAINT `assumption_appeal_assumptionId_fkey` FOREIGN KEY (`assumptionId`) REFERENCES `assumption`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
