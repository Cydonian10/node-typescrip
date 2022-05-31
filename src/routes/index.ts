import express, { Application } from "express";

import productRouter from "./products.route";
import usersRouter from "./users.route";
import customerRouter from "./customer.route";
import categoryRouter from "./category.route";
import orderRouter from "./order.route";

export function routerApi(app: Application) {
  const router = express.Router();

  app.use("/api/v1", router);
  router.use("/products", productRouter);
  router.use("/users", usersRouter);
  router.use("/customers", customerRouter);
  router.use("/categories", categoryRouter);
  router.use("/orders", orderRouter);
}
