import { NextFunction, Request, Response } from "express";
declare function newManyUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void>;
export { newManyUser };
