declare class HttpErr extends Error {
  readonly code: number;
  constructor(code: number, msg: string);
}
export { HttpErr };
