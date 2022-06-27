import { user } from "@prisma/client";
import express, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import { config } from "../config/config";

const router = express.Router();

router.post("/login", passport.authenticate("local", { session: false }), login);

async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const user = req.user! as user;
    const payload = {
      sub: user.id,
      email: user.email,
    };
    const token = jwt.sign(payload, config.jwtsecret!);
    res.json({
      token,
    });
  } catch (error) {
    next(error);
  }
}

export default router;
