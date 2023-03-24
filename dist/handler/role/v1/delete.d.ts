import { NextFunction, Request, Response } from "express";
declare function deleteRole(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void>;
export { deleteRole };
