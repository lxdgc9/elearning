import { NextFunction, Request, Response } from "express";
declare function access(
  perms: string[]
): (
  req: Request,
  res: Response,
  next: NextFunction
) => Promise<void>;
export { access };
