import { FobiddenErr } from "../err/forbidden.js";

function checkUser(req, _res, next) {
  if (process.env.NODE_ENV === "dev") {
    next();
    return;
  }

  if (!req.user.hasAccess) {
    throw new FobiddenErr("Tài khoản bị từ chối");
  }
  next();
}

export { checkUser };