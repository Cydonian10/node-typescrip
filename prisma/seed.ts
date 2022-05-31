import { PrismaClient } from "@prisma/client";
import faker from "faker";

const prisma = new PrismaClient();
const categories = ["x", "y", "z", "a", "b"];

async function main() {
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  for (let i = 0; i < categories.length; i++) {
    await prisma.category.create({
      data: {
        name: categories[i],
      },
    });
  }

  const categorias = await prisma.category.findMany();

  for (let i = 0; i < 40; i++) {
    let random = Math.floor(Math.random() * (5 - 0) + 0);

    await prisma.product.create({
      data: {
        name: faker.commerce.productName(),
        image: faker.image.imageUrl(),
        price: parseInt(faker.commerce.price()),
        categoryId: categorias[random].id,
      },
    });
  }

  for (let i = 0; i < 20; i++) {
    await prisma.customer.create({
      data: {
        lastName: faker.name.lastName(),
        name: faker.name.firstName(),
        user: {
          create: {
            email: faker.internet.email(),
            password: faker.internet.password(),
          },
        },
      },
    });
  }
}

main()
  .catch((e) => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
