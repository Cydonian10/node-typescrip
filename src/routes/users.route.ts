import express, { NextFunction, Request, Response } from "express";
import { UserService } from "../services/user.service";
import { validatorHandler } from "../middlewares/validatorHandler";
import { CreateUserSchema, getUserSchema } from "../schemas/user.schema";
import { CreateUserDto } from "../interfaces/user.interfae";

const router = express.Router();
const service = new UserService();

router.get("/", async (req: Request, res: Response) => {
  const users = await service.findMany();
  return res.status(200).json({
    message: "All users",
    data: users,
  });
});

router.get(
  "/:id",
  validatorHandler(getUserSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    try {
      const user = await service.findOne(id);
      return res.status(200).json({
        message: "One user",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  }
);
router.post(
  "/",
  validatorHandler(CreateUserSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    try {
      const newUser = await service.create(body);
      return res.json({
        message: "Created User",
        data: newUser,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:id",
  validatorHandler(getUserSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.params;
    const body = req.body;
    try {
      const userUpdate = await service.upadte(body, id);
      return res.json({
        message: "Updated User",
        data: userUpdate,
      });
    } catch (error) {
      next(error);
    }
  }
);
router.delete(
  "/:id",
  validatorHandler(getUserSchema),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const item = await service.remove(id);
      return res.json({
        message: "Delete User",
        data: item,
      });
    } catch (error) {
      next(error);
    }
  }
);

export default router;
