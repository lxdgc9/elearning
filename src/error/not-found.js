const { HttpErr } = require("./http");

class NotFoundErr extends HttpErr {
  constructor(msg) {
    super(404, msg);
    this.name = "Not Found Error";
  }
}

module.exports = { NotFoundErr };
