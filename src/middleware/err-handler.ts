import { NextFunction, Request, Response } from "express";
import { HttpErr } from "../error/http";

function errHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (err instanceof HttpErr) {
    return res
      .status(err.code)
      .send({ message: err.message });
  }

  // lỗi xảy ra ngoài ràng buộc
  res.status(500).send({
    message: "Có gì đó sai sai!!!",
  });
}

export { errHandler };
