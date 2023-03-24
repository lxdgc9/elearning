import { NextFunction, Request, Response } from "express";
declare function me(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void>;
export { me };
