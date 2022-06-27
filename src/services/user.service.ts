import { conflict, notFound } from "@hapi/boom";
import { PrismaClient, user } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export class UserService {
  constructor() {}

  private exclude<User, Key extends keyof User>(user: User, ...keys: Key[]): Omit<User, Key> {
    for (let key of keys) {
      delete user[key];
    }
    return user;
  }

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
   * @param id string
   * recupera un usuario
   */
  async findEmail(email: string) {
    const user = await prisma.user.findFirst({
      where: { email: email },
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
    const hash = await bcrypt.hash(data.password, 3);
    const newUser = await prisma.user.create({
      data: {
        ...data,
        password: hash,
      },
    });
    if (!newUser) {
      throw conflict("Product not created");
    }
    const userWithoutPassword = this.exclude(newUser, "password");
    return userWithoutPassword;
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
