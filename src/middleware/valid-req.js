import { validationResult } from "express-validator";

import { ValidReqErr } from "../err/valid-req.js";

function validReq(req, _res, next) {
  const errs = validationResult(req);
  if (!errs.isEmpty()) {
    throw new ValidReqErr(errs.array()[0].msg);
  }
  next();
}

export { validReq };
