import { NextFunction, Request, Response } from "express";
declare function deleteSubject(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void>;
export { deleteSubject };
