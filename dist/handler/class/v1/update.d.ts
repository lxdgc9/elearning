import { NextFunction, Request, Response } from "express";
declare function updateClass(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void>;
export { updateClass };
