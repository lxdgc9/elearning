import { HttpErr } from "./http";

class UnauthorizedErr extends HttpErr {
  constructor(msg: string) {
    super(401, msg);
    this.name = "Unauthorized Error";
  }
}

export { UnauthorizedErr };
