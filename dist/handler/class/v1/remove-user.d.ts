import { NextFunction, Request, Response } from "express";
declare function removeUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void>;
export { removeUser };
