// Middlware này giải mã jwt từ client
// lưu trữ thông tin giải mã qua session truyền đến các
// middleware tiếp theo xử lý

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
  res: Response,
  next: NextFunction
) {
  try {
    // tách bearer token
    const token =
      req.headers["authorization"]?.split("Bearer ")[1];
    if (!token) {
      throw new UnauthorizedErr("Yêu cầu token");
    }

    // giải mã token
    const decoded = verify(
      token,
      process.env.ACCESS_TOKEN_SECRET!
    ) as UserPayload;

    // truyền thông tin đã giải mã đến middleware tiếp theo
    req.user = decoded;
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { currUser };
