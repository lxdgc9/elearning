class HttpErr extends Error {
  readonly code: number;

  constructor(code: number, msg: string) {
    super(msg);
    this.name = "Http Error";
    this.code = code;
  }
}

export { HttpErr };
