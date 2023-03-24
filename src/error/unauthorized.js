const { HttpErr } = require("./http");

class UnauthorizedErr extends HttpErr {
  constructor(msg) {
    super(401, msg);
    this.name = "Unauthorized Error";
  }
}

module.exports = { UnauthorizedErr };
