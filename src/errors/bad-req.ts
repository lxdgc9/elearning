import { HttpErr } from "./http";

class BadReqErr extends HttpErr {
  constructor(msg: string) {
    super(400, msg);
    this.name = "Bad Request Error";
  }
}

export { BadReqErr };
