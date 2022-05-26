import express, { Request, Response } from "express";
import faker, { fake } from "faker";

const router = express.Router();

router.get("/", (req: Request, res: Response) => {
  const users = new Array();

  for (let i = 0; i < 20; i++) {
    users.push({
      name: faker.name.findName(),
      id: faker.random.word(),
    });
  }

  res.json(users);
});

router.get("/", (req: Request, res: Response) => {});
router.get("/", (req: Request, res: Response) => {});
router.get("/", (req: Request, res: Response) => {});

export default router;
