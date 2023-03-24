import { NextFunction, Request, Response } from "express";
declare function login(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void>;
export { login };
