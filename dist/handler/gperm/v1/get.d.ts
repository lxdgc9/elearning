import { NextFunction, Request, Response } from "express";
declare function getGPerms(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void>;
export { getGPerms };
