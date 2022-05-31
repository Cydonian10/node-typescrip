import { notFound } from "@hapi/boom";
import { PrismaClient } from "@prisma/client";
import { IFullUser } from "../interfaces/user.interfae";

const prisma = new PrismaClient();
export class CustomerService {
  constructor() {}

  async findMany() {
    const customers = await prisma.customer.findMany();
    return customers;
  }

  async findOne(id: string) {
    const customer = await prisma.customer.findUnique({
      where: { id },
      include: { user: true, order: true },
    });

    if (!customer) {
      throw notFound("Customer not found");
    }

    return customer;
  }

  private async oneCustomer(id: string) {
    const customer = await prisma.customer.findUnique({ where: { id } });
    return customer;
  }

  private async oneUser(id: string) {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  }

  async createFullUserCustomer(data: any) {
    const newCustomer = await prisma.customer.create({
      data: {
        lastName: data.lastName,
        name: data.name,
        user: {
          create: {
            ...data.user,
          },
        },
      },
    });

    return newCustomer;
  }

  async create(data: any) {
    const newCustomer = await prisma.customer.create({ data });
    return newCustomer;
  }

  async updateCustomer(changes: IFullUser, id: string) {
    console.log(changes);
    let customer = await this.oneCustomer(id);

    if (changes.user) {
      const user = await this.oneUser(customer!.userId);

      const updateUser = await prisma.user.update({
        data: { ...user, ...changes.user },
        where: { id: user!.id },
      });
    }

    if (changes.customer) {
      customer = await prisma.customer.update({
        data: { ...customer, ...changes.customer },
        where: { id },
        include: { user: true },
      });
    }

    return customer;
  }
}
