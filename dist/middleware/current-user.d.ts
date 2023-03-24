import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
type UserPayload = {
  id: Types.ObjectId;
  perms: string[];
  hasAccess: boolean;
};
declare global {
  namespace Express {
    interface Request {
      user?: UserPayload;
    }
  }
}
declare function currUser(
  req: Request,
  res: Response,
  next: NextFunction
): void;
export { currUser };
