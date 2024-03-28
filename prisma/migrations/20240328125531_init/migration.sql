/*
  Warnings:

  - Changed the type of `user_type` on the `Users` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('Author', 'Guest_Author');

-- AlterTable
ALTER TABLE "Users" DROP COLUMN "user_type",
ADD COLUMN     "user_type" "UserType" NOT NULL;
