import { NextFunction, Request, Response } from "express";
declare function getPerms(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void>;
export { getPerms };
