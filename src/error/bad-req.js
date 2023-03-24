const { HttpErr } = require("./http");

class BadReqErr extends HttpErr {
  constructor(msg) {
    super(400, msg);
    this.name = "Bad Request Error";
  }
}

module.exports = { BadReqErr };
