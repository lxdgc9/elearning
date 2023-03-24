import { NextFunction, Request, Response } from "express";
declare function getSubject(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void>;
export { getSubject };
