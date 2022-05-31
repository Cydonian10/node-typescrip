-- DropForeignKey
ALTER TABLE "order_product_table" DROP CONSTRAINT "order_product_table_orderId_fkey";

-- DropForeignKey
ALTER TABLE "order_product_table" DROP CONSTRAINT "order_product_table_productId_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_categoryId_fkey";

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_product_table" ADD CONSTRAINT "order_product_table_productId_fkey" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order_product_table" ADD CONSTRAINT "order_product_table_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
