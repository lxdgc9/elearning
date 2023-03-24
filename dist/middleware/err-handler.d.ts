import { NextFunction, Request, Response } from "express";
declare function errHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
): Response<any, Record<string, any>> | undefined;
export { errHandler };
