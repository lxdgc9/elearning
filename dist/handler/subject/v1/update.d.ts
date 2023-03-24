import { NextFunction, Request, Response } from "express";
declare function updateSubject(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void>;
export { updateSubject };
