import jwt from "jsonwebtoken";

import { UnauthorizedErr } from "../err/unauthorized.js";

function decodeJwt(req, _res, next) {
  if (process.env.NODE_ENV === "dev") {
    return next();
  }

  try {
    const token =
      req.headers["authorization"]?.split("Bearer ")[1];
    if (!token) {
      throw new UnauthorizedErr("Yêu cầu token");
    }

    req.user = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET
    );
    next();
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { decodeJwt };
