import { NextFunction, Request, Response } from "express";
declare function newSubject(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void>;
export { newSubject };
