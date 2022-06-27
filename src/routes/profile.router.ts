import { user } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";
import passport from "passport";
import { checkAdminRol } from "../middlewares/auth.handle";
import { OrderServie } from "../services/order.service";

const router = express.Router();
const service = new OrderServie();

router.get("/", passport.authenticate("jwt", { session: false }), checkAdminRol, findMany);

async function findMany(req: Request, res: Response, next: NextFunction) {
  const user = req.user as user;
  try {
    const categories = await service.findByUser(user.id);
    return res.status(200).json({
      message: "All order the user",
      data: categories,
    });
  } catch (error) {
    next(error);
  }
}

export default router;
