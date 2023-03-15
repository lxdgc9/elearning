import { HttpError } from "./http-error";

class BadRequestError extends HttpError {
  constructor(msg: string) {
    super(400, msg);
    this.name = "BadRequestError";
  }
}

export { BadRequestError };
