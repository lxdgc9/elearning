import { NextFunction, Request, Response } from "express";
import { UnauthorizedError } from "../errors/unauthorized-error";

function requireAuth(req: Request, _res: Response, _next: NextFunction) {
  if (!req.user) {
    throw new UnauthorizedError("Unauthorized");
  }
}

export { requireAuth };
