import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import { BadReqErr } from "../error/bad-req";

function version(payload: Record<string, RequestHandler>) {
  return function (
    this: Record<string, RequestHandler>,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      // kiểm tra phiên bản API
      const ver = req.header("x-api-version") || "v1";
      if (!payload[ver]) {
        throw new BadReqErr("Phiên Bản API Không Tồn Tại");
      }

      payload[ver].call(this, req, res, next);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}

export { version };
