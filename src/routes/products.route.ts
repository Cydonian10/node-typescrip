import express, { NextFunction, Request, Response } from "express";
import { validatorHandler } from "../middlewares/validatorHandler";
import {
  CreateProductSchema,
  getProductSchema,
  updateProductSchema,
} from "../schemas/product.schema";
import { ProductService } from "../services/product.service";

const router = express.Router();
const service = new ProductService();

router.get("/", validatorHandler(getProductSchema), async (req: Request, res: Response) => {
  let offset = req.query.offset;
  let limit = req.query.limit;
  let max = req.query.max;
  let min = req.query.min;
  const products = await service.findMany({ offset, limit, min, max });

  res.status(200).json({
    message: "All products",
    data: products,
  });
});

router.get(
  "/:id",
  validatorHandler(getProductSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;

    try {
      const product = await service.findOne(id);

      res.status(200).json({
        message: "One product",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  "/",
  validatorHandler(CreateProductSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const data = req.body;
    try {
      const newProduct = await service.create(data);
      res.status(200).json({
        message: "Created Product",
        data: newProduct,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  validatorHandler(updateProductSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const body = req.body;

    try {
      const product = await service.update(body, id);
      res.status(200).json({
        message: "Updated Product",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:id",
  validatorHandler(getProductSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const idServi = await service.remove(id);
      res.status(200).json({
        message: "Deleted Product",
        data: idServi,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
