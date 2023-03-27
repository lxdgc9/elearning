import { HttpErr } from "./http.js";

class ValidReqErr extends HttpErr {
  constructor(msg) {
    super(400, msg);
    this.name = "Validate Request";
  }
}

export { ValidReqErr };
