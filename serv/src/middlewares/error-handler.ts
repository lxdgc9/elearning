import { NextFunction, Request, Response } from "express";
import { HttpError } from "../errors/http-error";

function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof HttpError) {
    return res.status(err.statusCode).send({ msg: err.message });
  }

  res.status(500).send({
    msg: "Something went wrong",
  });
}

export { errorHandler };
