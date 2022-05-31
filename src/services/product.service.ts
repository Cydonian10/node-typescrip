import boom from "@hapi/boom";
import { PrismaClient, product } from "@prisma/client";

// import { getConnection } from "../lib/postgres";// import { pool } from "../lib/postgres.pool";
// import { Pool } from "pg";
const prisma = new PrismaClient();

export class ProductService {
  // private pool: Pool;

  constructor() {
    // this.pool = pool; // this.pool.on("error", (err) => console.error(err));
  }

  async findMany(query: { limit?: any; offset?: any; min?: any; max?: any }) {
    let options: any = {
      include: {
        category: {
          select: { name: true },
        },
      },
    };

    if (query.limit !== undefined && query.offset !== undefined) {
      options.skip = parseInt(query.offset, 10);
      options.take = parseInt(query.limit, 10);
    }

    if (query.min !== undefined && query.max !== undefined) {
      options.where = {
        price: {
          lt: parseFloat(query.max),
          gt: parseFloat(query.min),
        },
      };
    }

    const products = await prisma.product.findMany(options);
    return products;
  }

  async create(data: product) {
    try {
      const newProduct = await prisma.product.create({ data });
      return newProduct;
    } catch (error) {
      throw boom.internal("Server error");
    }
  }

  async findOne(id: string) {
    const product = await prisma.product.findUnique({
      where: { id },
      include: { category: { select: { name: true } } },
    });
    if (!product) {
      throw boom.notFound("Product not found");
    }

    return product;
  }

  async update(changes: product, id: string) {
    const { category, ...rest } = await this.findOne(id);

    if (!category) {
      throw boom.notFound("Product not found");
    }

    const changesProduct = { ...rest, ...changes };
    const productUpdate = await prisma.product.update({
      data: changesProduct,
      where: { id },
    });

    return productUpdate;
  }

  async remove(id: string) {
    const { category, ...rest } = await this.findOne(id);

    if (!category) {
      throw boom.notFound("Product not found");
    }

    const item = await prisma.product.delete({
      where: { id },
    });

    return item;
  }
}
