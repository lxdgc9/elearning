import { NextFunction, Request, Response } from "express";
declare function deleteGPerm(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void>;
export { deleteGPerm };
