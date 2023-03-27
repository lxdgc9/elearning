import { HttpErr } from "./http.js";

class FobiddenErr extends HttpErr {
  constructor(msg) {
    super(403, msg);
    this.name = "Fobidden";
  }
}

export { FobiddenErr };
