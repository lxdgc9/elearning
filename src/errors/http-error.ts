class HttpError extends Error {
  readonly statusCode: number;

  constructor(code: number, msg: string) {
    super(msg);
    this.name = "HttpError";
    this.statusCode = code;
  }
}

export { HttpError };
