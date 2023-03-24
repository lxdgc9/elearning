import { NextFunction, Request, Response } from "express";
declare function getCourses(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void>;
export { getCourses };
