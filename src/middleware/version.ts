// Kiểm tra phiên bản API
// hiện tại có 2 phương pháp sử dụng API theo phiên bản:
// 1: Thông qua url: /api/v1/end-point
// 2: Thông qua header(phương pháp đang sử dụng):
// với cách 2, client gọi API qua url /api/end-point và
// chỉ định phiên bản api thông qua header. Ở đây sử dụng
// [x-api-version]
//
// *** Nếu không truyền version, v1 sẽ là version mặc định
// từng phiên bản được chỉ định với từng handler

// Xem ví dụ tương tự:
// Github: https://docs.github.com/en/rest/overview/api-versions

import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import { BadReqErr } from "../error/bad-req";

function version(payload: Record<string, RequestHandler>) {
  return function (
    this: Record<string, RequestHandler>,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      // kiểm tra phiên bản API
      const ver = req.header("x-api-version") || "v1";
      if (!payload[ver]) {
        throw new BadReqErr("Phiên bản API không tồn tại");
      }

      // thực thi handler tương ứng version
      payload[ver].call(this, req, res, next);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}

export { version };
