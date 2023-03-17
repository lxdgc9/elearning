import { HttpErr } from "./http";

class FobiddenErr extends HttpErr {
  constructor(msg: string) {
    super(403, msg);
    this.name = "Fobidden Error";
  }
}

export { FobiddenErr };
