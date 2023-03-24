import { HttpErr } from "./http";
declare class FobiddenErr extends HttpErr {
  constructor(msg: string);
}
export { FobiddenErr };
