import {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
declare function version(
  payload: Record<string, RequestHandler>
): (
  this: Record<string, RequestHandler>,
  req: Request,
  res: Response,
  next: NextFunction
) => void;
export { version };
