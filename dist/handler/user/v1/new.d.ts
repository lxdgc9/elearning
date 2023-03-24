import { NextFunction, Request, Response } from "express";
declare function newUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void>;
export { newUser };
