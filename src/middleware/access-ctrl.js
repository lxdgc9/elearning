import { FobiddenErr } from "../err/forbidden.js";

function accessCtrl(...perms) {
  return async (req, _res, next) => {
    try {
      if (
        !perms ||
        !perms.length ||
        (req.user.perms &&
          req.user.perms.some((p) => perms.includes(p)))
      ) {
        next();
        return;
      }

      throw new FobiddenErr("Không có quyền truy cập");
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}

export { accessCtrl };
