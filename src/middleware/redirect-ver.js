import { BadReqErr } from "../err/bad-req";

function redirectVer(payload) {
  return function (req, res, next) {
    try {
      const ver = req.header("x-api-version") || "v1";
      if (!payload[ver]) {
        throw new BadReqErr("Phiên bản API không tồn tại");
      }

      payload[ver].call(this, req, res, next);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}

export { redirectVer };
