import { NextFunction, Request, Response } from "express";
import { FobiddenErr } from "../error/forbidden";

function active(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.user!.hasAccess) {
    throw new FobiddenErr("Không Có Quyền Truy Cập");
  }

  next();
}

export { active };
