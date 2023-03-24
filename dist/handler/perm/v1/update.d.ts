import { NextFunction, Request, Response } from "express";
declare function updatePerm(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void>;
export { updatePerm };
