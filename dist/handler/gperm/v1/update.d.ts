import { NextFunction, Request, Response } from "express";
declare function updateGPerm(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void>;
export { updateGPerm };
