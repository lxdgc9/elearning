import { NextFunction, Request, Response } from "express";
declare function accessUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void>;
export { accessUser };
