import { NextFunction, Request, Response } from "express";
declare function deletePerm(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void>;
export { deletePerm };
