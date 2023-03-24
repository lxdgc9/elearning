import { NextFunction, Request, Response } from "express";
declare function updateProf(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void>;
export { updateProf };
