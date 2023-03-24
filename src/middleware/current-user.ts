import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { Types } from "mongoose";
import { UnauthorizedErr } from "../error/unauthorized";

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

function currUser(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  try {
    const token =
      req.headers["authorization"]?.split("Bearer ")[1];
    if (!token) {
      throw new UnauthorizedErr("Yêu Cầu Token");
    }

    const decoded = verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!
    ) as UserPayload;

    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { currUser };
