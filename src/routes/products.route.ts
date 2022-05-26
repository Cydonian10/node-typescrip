import express, { NextFunction, Request, Response } from "express";
import { preprocess } from "zod";
import { validatorHandler } from "../middlewares/validatorHandler";
import { CreateProductSchema, updateProductSchema } from "../schemas/product.schema";
import { ProductService } from "../services/product.service";

const router = express.Router();
const service = new ProductService();

router.get("/pruebas", async (req: Request, res: Response) => {
  const prueba = await service.prueba();
  console.log(prueba);
  return res.status(200).json(prueba);
});

router.get("/", (req: Request, res: Response) => {
  const products = service.findMany();

  res.status(200).json({
    message: "All products",
    data: products,
  });
});

router.get("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const product = service.findOne(id);

  if (!product) {
    res.status(404).json({
      message: "not found",
    });
  }

  res.status(200).json({
    message: "One product",
    data: product,
  });
});

router.post("/", validatorHandler(CreateProductSchema), (req: Request, res: Response) => {
  const data = req.body;
  const newProduct = service.create(data);
  res.status(200).json({
    message: "Created Product",
    data: newProduct,
  });
});

router.patch(
  "/:id",
  validatorHandler(updateProductSchema),
  (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const body = req.body;

    try {
      const product = service.update(id, body);
      res.status(200).json({
        message: "Updated Product",
        data: product,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete("/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const body = req.body;

  const idServi = service.delete(id);
  res.status(200).json({
    message: "Updated Product",
    data: idServi,
  });
});

export default router;
