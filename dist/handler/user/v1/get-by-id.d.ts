import { NextFunction, Request, Response } from "express";
declare function getUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void>;
export { getUser };
