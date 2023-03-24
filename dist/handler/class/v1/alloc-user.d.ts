import { NextFunction, Request, Response } from "express";
declare function allocUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void>;
export { allocUser };
