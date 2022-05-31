import express, { NextFunction, Request, Response } from "express";

import { CustomerService } from "../services/customer.service";

import { validatorHandler } from "../middlewares/validatorHandler";

import {
  CreateCustomerSchema,
  getCustomerSchema,
  UpdateUserFullSchema,
} from "../schemas/customer.schema";
import { IFullUser } from "../interfaces/user.interfae";

const router = express.Router();
const service = new CustomerService();

router.get("/", findMany);

router.get("/:id", validatorHandler(getCustomerSchema), findOne);

router.post("/", validatorHandler(CreateCustomerSchema), create);

router.post("/full", validatorHandler(CreateCustomerSchema), createFullCustomer);

router.put("/:id/full", validatorHandler(UpdateUserFullSchema), updateFullUser);

router.get("/", (req: Request, res: Response, nex: NextFunction) => {});

async function findMany(req: Request, res: Response, next: NextFunction) {
  try {
    const customers = await service.findMany();
    return res.json({
      message: "All customer",
      data: customers,
    });
  } catch (error) {
    next(error);
  }
}

async function findOne(req: Request, res: Response, nex: NextFunction) {
  const { id } = req.params;
  try {
    const customer = await service.findOne(id);
    return res.json({
      message: "One customer",
      data: customer,
    });
  } catch (error) {
    nex(error);
  }
}

async function create(req: Request, res: Response, nex: NextFunction) {
  const body = req.body;
  try {
    const newCustomer = await service.create(body);
    return res.json({
      message: "Created Customer",
      data: newCustomer,
    });
  } catch (error) {
    nex(error);
  }
}

async function createFullCustomer(req: Request, res: Response, nex: NextFunction) {
  const body = req.body;
  try {
    const newCustomer = await service.createFullUserCustomer(body);
    return res.status(200).json({
      message: "Customer Full create",
      data: newCustomer,
    });
  } catch (error) {
    nex(error);
  }
}

async function updateFullUser(req: Request, res: Response, nex: NextFunction) {
  const body = req.body as IFullUser;
  const { id } = req.params;
  try {
    const itemUpdate = await service.updateCustomer(body, id);
    return res.status(200).json({
      message: "Customer Full upate",
      data: itemUpdate,
    });
  } catch (error) {
    nex(error);
  }
}
// async function create(req: Request, res: Response, nex: NextFunction) {}

export default router;
