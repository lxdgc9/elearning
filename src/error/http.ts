class HttpErr extends Error {
  readonly statusCode: number;

  constructor(code: number, msg: string) {
    super(msg);
    this.name = "Http Error";
    this.statusCode = code;
  }
}

export { HttpErr };
