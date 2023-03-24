import { NextFunction, Request, Response } from "express";
declare function getRole(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void>;
export { getRole };
