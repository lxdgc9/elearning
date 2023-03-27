import { UnauthorizedErr } from "../err/unauthorized.js";

function requireAuth(req, _res, next) {
  if (!req.user) {
    throw new UnauthorizedErr("Không dược ủy quyền");
  }
  next();
}

export { requireAuth };
