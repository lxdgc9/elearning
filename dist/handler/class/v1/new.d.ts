import { NextFunction, Request, Response } from "express";
declare function newClass(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void>;
export { newClass };
