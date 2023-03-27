import { HttpErr } from "./http.js";

class UnauthorizedErr extends HttpErr {
  constructor(msg) {
    super(401, msg);
    this.name = "Unauthorized";
  }
}

export { UnauthorizedErr };
