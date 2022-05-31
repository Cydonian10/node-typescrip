import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class OrderServie {
  constructor() {}

  async findMany() {
    const orders = await prisma.order.findMany({
      include: { customer: true, order_product_table: true },
    });
    return orders;
  }

  async create(data: any) {
    console.log(data);
    const newOrder = await prisma.order.create({
      data: {
        ...data,
      },
    });

    return newOrder;
  }

  async addItem(data: any) {
    const newItem = await prisma.order_product_table.create({
      data: { ...data },
    });

    return newItem;
  }
}
