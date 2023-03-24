import { NextFunction, Request, Response } from "express";
declare function setRole(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void>;
export { setRole };
