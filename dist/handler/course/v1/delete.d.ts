import { NextFunction, Request, Response } from "express";
declare function deleteCourse(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void>;
export { deleteCourse };
