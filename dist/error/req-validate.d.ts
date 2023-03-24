import { HttpErr } from "./http";
declare class ReqValidateErr extends HttpErr {
  constructor(msg: string);
}
export { ReqValidateErr };
