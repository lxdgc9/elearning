import { NextFunction, Request, Response } from "express";
import { UnauthorizedErr } from "../errors/unauthorized";

function requireAuth(req: Request, _res: Response, next: NextFunction) {
  if (!req.user) {
    throw new UnauthorizedErr("Không Được Ủy Quyền");
  }

  next();
}

export { requireAuth };
