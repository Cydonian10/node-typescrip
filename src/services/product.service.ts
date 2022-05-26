import { CreateProductDto, IProduct, UpdateProductDto } from "../interfaces/product.interface";
import faker from "faker";
import boom from "@hapi/boom";

import { getConnection } from "../lib/postgres";
import { pool } from "../lib/postgres.pool";
import { Pool } from "pg";

export class ProductService {
  private products: IProduct[] = [];
  private pool: Pool;

  constructor() {
    this.generate();
    this.pool = pool;
    this.pool.on("error", (err) => console.error(err));
  }

  generate() {
    const limit = 5;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  create(data: CreateProductDto) {
    const newProduct = { id: faker.datatype.uuid(), ...data };
    this.products.push(newProduct);
    return newProduct;
  }

  async prueba() {
    // const client = await getConnection();
    const rta = await this.pool.query("SELECT * FROM task");
    return rta.rows;
  }

  findMany() {
    return this.products;
  }

  findOne(id: string): IProduct {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw boom.notFound("Product not found");
    }
    if (product.isBlock) {
      throw boom.conflict("Product is block");
    }
    return product;
  }

  update(id: string, changes: UpdateProductDto) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound("Product not found");
    }
    this.products[index] = { ...this.products[index], ...changes };
    return this.products[index];
  }

  delete(id: string) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound("Product not found");
    }
    this.products.splice(index, 1);
    return id;
  }
}
