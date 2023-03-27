import { HttpErr } from "./http.js";

class BadReqErr extends HttpErr {
  constructor(msg) {
    super(400, msg);
    this.name = "Bad Request";
  }
}

export { BadReqErr };
