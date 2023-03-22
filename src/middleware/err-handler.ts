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

  res.status(500).send({
    message: "Có Gì Đó Sai Sai",
  });
}

export { errHandler };
