import { NextFunction, Request, Response } from "express";
declare function newPerm(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void>;
export { newPerm };
