import { HttpErr } from "./http";
declare class UnauthorizedErr extends HttpErr {
  constructor(msg: string);
}
export { UnauthorizedErr };
