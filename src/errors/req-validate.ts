import { HttpErr } from "./http";

class ReqValidateErr extends HttpErr {
  constructor(msg: string) {
    super(400, msg);
    this.name = "Request Validation Error";
  }
}

export { ReqValidateErr };
