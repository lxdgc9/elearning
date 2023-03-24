import { NextFunction, Request, Response } from "express";
declare function active(
  req: Request,
  res: Response,
  next: NextFunction
): void;
export { active };
