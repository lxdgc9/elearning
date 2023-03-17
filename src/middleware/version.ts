import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";

function version(payload: Record<string, RequestHandler>) {
  return function (
    this: Record<string, RequestHandler>,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const version = req.header("x-api-version") || "v1";
      if (!payload[version]) {
        throw new Error("VERSION_NOT_FOUND");
      }

      payload[version].call(this, req, res, next);
    } catch (err) {
      console.log(err);
      next(err);
    }
  };
}

export { version };
