import { NextFunction, Request, Response } from "express";
import { HttpError } from "../errors/http-error";

function errorHandler(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof HttpError) {
    return res.status(err.statusCode).send({ message: err.message });
  }

  res.status(500).send({
    message: "Something went wrong",
  });
}

export { errorHandler };
