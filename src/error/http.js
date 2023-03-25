class HttpErr extends Error {
  constructor(code, msg) {
    super(msg);
    this.name = "Http Error";
    this.code = code;
  }
}

module.exports = HttpErr;
