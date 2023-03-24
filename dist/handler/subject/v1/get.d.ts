import { NextFunction, Request, Response } from "express";
declare function getSubjects(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void>;
export { getSubjects };
