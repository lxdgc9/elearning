import { NextFunction, Request, Response } from "express";
declare function getPerm(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void>;
export { getPerm };
