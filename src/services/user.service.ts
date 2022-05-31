import { conflict, notFound } from "@hapi/boom";
import { PrismaClient, user } from "@prisma/client";

const prisma = new PrismaClient();

export class UserService {
  constructor() {}

  async findMany() {
    const products = await prisma.user.findMany({
      include: {
        customer: { select: { name: true, lastName: true } },
      },
    });
    return products;
  }

  /**
   * @param id string
   * recupera un usuario
   */
  async findOne(id: string) {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { customer: { select: { name: true, lastName: true } } },
    });

    if (!user) {
      throw notFound("User not found");
    }
    return user;
  }

  /**
   * Es para crear un usuario
   * @param data {email,password}
   * @returns user
   */
  async create(data: user) {
    const newUser = await prisma.user.create({ data });
    if (!newUser) {
      throw conflict("Product not created");
    }
    return newUser;
  }

  async upadte(changes: user, id: string) {
    const { customer, ...rest } = await this.findOne(id);
    if (!rest) {
      throw notFound("User not found");
    }
    const dataUpdate = { ...rest, ...changes };
    const userUpdate = await prisma.user.update({
      data: { ...dataUpdate },
      where: { id },
    });

    return userUpdate;
  }

  async remove(id: string) {
    const { customer, ...rest } = await this.findOne(id);
    if (!rest) {
      throw notFound("User not found");
    }
    const item = await prisma.user.delete({
      where: { id },
    });

    return item;
  }
}
