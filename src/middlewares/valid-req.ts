import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { RequestValidationError } from "../errors/request-validation-error";

function validReq(req: Request, _res: Response, next: NextFunction) {
  const errs = validationResult(req);

  if (!errs.isEmpty()) {
    throw new RequestValidationError(errs.array()[0].msg);
  }

  next();
}

export { validReq as validateRequest };
