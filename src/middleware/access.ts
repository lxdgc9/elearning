import { NextFunction, Request, Response } from "express";
import { FobiddenErr } from "../error/forbidden";

function access(perms: string[]) {
  return (
    req: Request,
    _res: Response,
    next: NextFunction
  ) => {
    try {
      if (!perms || !perms.length) {
        next();
        return;
      }

      if (
        req.user!.perms &&
        req.user!.perms.some((p) => perms.includes(p))
      ) {
        next();
        return;
      }

      throw new FobiddenErr("PERMISSION_DENIED");
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}

export { access };
