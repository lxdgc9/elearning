import { NextFunction, Request, Response } from "express";
declare function newGPerm(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void>;
export { newGPerm };
