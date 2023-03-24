import { HttpErr } from "./http";
declare class BadReqErr extends HttpErr {
  constructor(msg: string);
}
export { BadReqErr };
