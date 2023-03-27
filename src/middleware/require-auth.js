import { UnauthorizedErr } from "../err/unauthorized";

function requireAuth(req, _res, next) {
  if (!req.user) {
    throw new UnauthorizedErr("Không dược ủy quyền");
  }
  next();
}

export { requireAuth };
