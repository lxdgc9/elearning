import { HttpError } from "./http-error";

class NotFoundError extends HttpError {
  constructor(msg: string) {
    super(404, msg);
    this.name = "NotFoundError";
  }
}

export { NotFoundError };
