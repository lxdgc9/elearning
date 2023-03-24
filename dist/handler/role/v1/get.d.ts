import { NextFunction, Request, Response } from "express";
declare function getRoles(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void>;
export { getRoles };
