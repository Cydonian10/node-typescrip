import express, { Application } from "express";

import productRouter from "./products.route";
import usersRouter from "./users.route";

export function routerApi(app: Application) {
  const router = express.Router();

  app.use("/api/v1", router);
  router.use("/products", productRouter);
  router.use("/users", usersRouter);
}
