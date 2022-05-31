import express, { NextFunction, Request, Response } from "express";
import { validatorHandler } from "../middlewares/validatorHandler";
import { AddItemSchema, CreateOrderSchema } from "../schemas/order.schema";
import { OrderServie } from "../services/order.service";

const router = express.Router();
const service = new OrderServie();

router.get("/", findMany);

router.post("/", validatorHandler(CreateOrderSchema), create);

router.post("/add-item", validatorHandler(AddItemSchema), addItemOrder);

async function findMany(req: Request, res: Response, next: NextFunction) {
  try {
    const orders = await service.findMany();
    return res.json({
      message: "All orders",
      data: orders,
    });
  } catch (error) {
    next(error);
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  const body = req.body;
  try {
    const newOrder = await service.create(body);
    return res.json({
      message: "Created Order",
      data: newOrder,
    });
  } catch (error) {
    next(error);
  }
}

async function addItemOrder(req: Request, res: Response, next: NextFunction) {
  const body = req.body;
  try {
    const newItem = await service.addItem(body);
    return res.json({
      message: "Created Order",
      data: newItem,
    });
  } catch (error) {
    next(error);
  }
}

export default router;
