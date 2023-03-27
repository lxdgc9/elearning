class HttpErr extends Error {
  constructor(code, msg) {
    super(msg);
    this.code = code;
    this.name = "Http";
  }
}

export { HttpErr };
