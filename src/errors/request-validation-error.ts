import { HttpError } from "./http-error";

class RequestValidationError extends HttpError {
  constructor(msg: string) {
    super(400, msg);
    this.name = "RequestValidationError";
  }
}

export { RequestValidationError };
