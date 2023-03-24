import { NextFunction, Request, Response } from "express";
declare function getUsers(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void>;
export { getUsers };
