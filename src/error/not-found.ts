import { HttpErr } from "./http";

class NotFoundErr extends HttpErr {
  constructor(msg: string) {
    super(404, msg);
    this.name = "Not Found Error";
  }
}

export { NotFoundErr };
