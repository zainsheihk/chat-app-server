/*
  Warnings:

  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `user` ADD COLUMN `about` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `profileImage` VARCHAR(191) NOT NULL DEFAULT '';
