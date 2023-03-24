import { NextFunction, Request, Response } from "express";
declare function getClass(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void>;
export { getClass };
