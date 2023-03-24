import { NextFunction, Request, Response } from "express";
declare function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
): void;
export { requireAuth };
