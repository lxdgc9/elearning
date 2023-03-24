import { NextFunction, Request, Response } from "express";
declare function updateRole(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void>;
export { updateRole };
