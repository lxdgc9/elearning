import { HttpErr } from "./http";

class NotFoundErr extends HttpErr {
  constructor(msg) {
    super(404, msg);
    this.name = "Not Found";
  }
}

export { NotFoundErr };
