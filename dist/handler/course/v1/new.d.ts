import { NextFunction, Request, Response } from "express";
declare function newCourse(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void>;
export { newCourse };
