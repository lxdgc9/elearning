// Middleware này sẽ kiểm tra hasAccess đã giải mã trong jwt
// nếu hasAccess = false, tức người dùng bị block quyền
// truy cập, mọi thao tác với api endpoint đều vô nghĩa.
//
// Tất hiên, middleware này sẽ yêu cầu giải mã jwt(currUser)

import { NextFunction, Request, Response } from "express";
import { FobiddenErr } from "../error/forbidden";

function active(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.user!.hasAccess) {
    throw new FobiddenErr("Không có quyền truy cập");
  }
  next();
}

export { active };
