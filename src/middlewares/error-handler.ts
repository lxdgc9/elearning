import { NextFunction, Request, Response } from "express";
import { HttpErr } from "../errors/http";

function errHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof HttpErr) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  res.status(500).send({
    message: "SOMETHING_WENT_WRONG",
  });
}

export { errHandler };
