import { HttpErr } from "./http";

class BadReqErr extends HttpErr {
  constructor(msg) {
    super(400, msg);
    this.name = "Bad Request";
  }
}

export { BadReqErr };
