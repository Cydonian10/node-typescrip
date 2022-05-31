import express, { NextFunction, Request, Response } from "express";
import { validatorHandler } from "../middlewares/validatorHandler";
import {
  CreateCategorySchema,
  getCateogorySchema,
  updateCategorySchema,
} from "../schemas/category.schema";
import { CategoryService } from "../services/category.service";

const router = express.Router();
const service = new CategoryService();

router.get("/", findMany);

router.get("/:id", validatorHandler(getCateogorySchema), findOne);

router.post("/", validatorHandler(CreateCategorySchema), create);

router.put("/:id", validatorHandler(updateCategorySchema), update);

router.delete("/:id", validatorHandler(getCateogorySchema), remove);

async function findMany(req: Request, res: Response, next: NextFunction) {
  const categories = await service.findMany();
  return res.status(200).json({
    message: "All Categories",
    data: categories,
  });
}

async function create(req: Request, res: Response, next: NextFunction) {
  const body = req.body;
  try {
    const newCategory = await service.create(body);
    return res.json({
      message: "Created category",
      data: newCategory,
    });
  } catch (error) {
    next(error);
  }
}
async function findOne(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  try {
    const category = await service.findOne(id);
    return res.json({
      message: "One category",
      data: category,
    });
  } catch (error) {
    next(error);
  }
}

async function remove(req: Request, res: Response, next: NextFunction) {
  const id = req.params.id;
  try {
    const rspt = await service.delete(id);
    return res.json({
      message: "Category deleted",
      data: rspt,
    });
  } catch (error) {
    next(error);
  }
}
async function update(req: Request, res: Response, next: NextFunction) {
  const body = req.body;
  const id = req.params.id;
  try {
    const category = await service.update(id, body);
    return res.json({
      message: "Category update",
      data: category,
    });
  } catch (error) {
    next(error);
  }
}
// async function findMany(req: Request, res: Response, next: NextFunction ) {}

export default router;
