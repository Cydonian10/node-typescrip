-- DropForeignKey
ALTER TABLE "customer" DROP CONSTRAINT "customer_user_id_fkey";

-- AddForeignKey
ALTER TABLE "customer" ADD CONSTRAINT "customer_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
