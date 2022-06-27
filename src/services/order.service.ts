import { order, PrismaClient } from "@prisma/client";

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
        customerId: data.customerId,
      },
    });

    return newOrder;
  }

  async findByUser(userId: string) {
    const orders = await prisma.order.findFirst({
      where: { customer: { userId: userId } },
      include: { customer: true, order_product_table: { include: { product: true } } },
    });

    return orders;
  }

  async addItem(data: any) {
    const newItem = await prisma.order_product_table.create({
      data: { ...data },
    });

    return newItem;
  }
}
