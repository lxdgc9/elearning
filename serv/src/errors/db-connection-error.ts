import { HttpError } from "./http-error";

class DbConnectionError extends HttpError {
  constructor(msg: string) {
    super(500, msg);
    this.name = "DbConnectionError";
  }
}

export { DbConnectionError };
