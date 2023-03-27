import { HttpErr } from "./http";

class ValidReqErr extends HttpErr {
  constructor(msg) {
    super(400, msg);
    this.name = "Validate Request";
  }
}

export { ValidReqErr };
