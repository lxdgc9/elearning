import { NextFunction, Request, Response } from "express";
import { UnauthorizedErr } from "../error/unauthorized";

function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.user) {
    throw new UnauthorizedErr("Không dược ủy quyền");
  }
  next();
}

export { requireAuth };
