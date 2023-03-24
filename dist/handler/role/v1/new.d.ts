import { NextFunction, Request, Response } from "express";
declare function newRole(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void>;
export { newRole };
