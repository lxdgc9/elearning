import { NextFunction, Request, Response } from "express";
declare function getCourse(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void>;
export { getCourse };
