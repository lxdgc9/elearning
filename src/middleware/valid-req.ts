import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ReqValidateErr } from "../error/req-validate";

function validReq(req: Request, _res: Response, next: NextFunction) {
  const errs = validationResult(req);

  if (!errs.isEmpty()) {
    throw new ReqValidateErr(errs.array()[0].msg);
  }

  next();
}

export { validReq };
