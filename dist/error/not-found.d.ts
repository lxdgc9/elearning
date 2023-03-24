import { HttpErr } from "./http";
declare class NotFoundErr extends HttpErr {
  constructor(msg: string);
}
export { NotFoundErr };
