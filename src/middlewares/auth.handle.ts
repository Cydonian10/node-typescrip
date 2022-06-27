import { unauthorized } from "@hapi/boom";
import { user } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { config } from "../config/config";

export function checkApiKey(req: Request, res: Response, next: NextFunction) {
  const apiKey = req.headers["api"];
  if (apiKey === config.apiKey) {
    next();
  } else {
    next(unauthorized());
  }
}

export function checkAdminRol(req: Request, res: Response, next: NextFunction) {
  const user = req.user as user;
  if (user.email === "admin@hotmail.com") {
    next();
  } else {
    next(unauthorized());
  }
}

export function checkRol(...roles: any[]) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user as user;
    if (roles.includes(user.email)) {
      next();
    } else {
      next(unauthorized());
    }
  };
}
