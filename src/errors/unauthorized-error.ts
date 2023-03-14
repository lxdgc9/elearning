import { HttpError } from "./http-error";

class UnauthorizedError extends HttpError {
  constructor(msg: string) {
    super(401, msg);
    this.name = "UnauthorizedError";
  }
}

export { UnauthorizedError };
