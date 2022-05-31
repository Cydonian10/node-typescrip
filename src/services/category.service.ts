import boom from "@hapi/boom";
import { category, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export class CategoryService {
  constructor() {}

  async findMany() {
    const categories = await prisma.category.findMany();
    return categories;
  }

  async findOne(id: string) {
    const category = await prisma.category.findUnique({
      where: { id: id },
      include: { product: true },
    });

    if (!category) {
      throw boom.notFound("category not found");
    }
    return category;
  }

  async create(data: category) {
    const newCategory = await prisma.category.create({ data });
    return newCategory;
  }

  async delete(value: string) {
    await this.findOne(value);

    const item = await prisma.category.delete({
      where: { id: value },
    });

    return item;
  }

  async update(id: string, body: category) {
    let item = await this.findOne(id);
    const { product, ...items } = item;
    const itemUpdate = { ...items, ...body };

    const category = await prisma.category.update({
      data: { ...itemUpdate },
      where: { id: id },
    });

    return category;
  }
}
