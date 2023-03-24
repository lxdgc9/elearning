import { NextFunction, Request, Response } from "express";
declare function validReq(
  req: Request,
  res: Response,
  next: NextFunction
): void;
export { validReq };
