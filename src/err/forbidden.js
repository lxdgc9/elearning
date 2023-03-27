import { HttpErr } from "./http";

class FobiddenErr extends HttpErr {
  constructor(msg) {
    super(403, msg);
    this.name = "Fobidden";
  }
}

export { FobiddenErr };
