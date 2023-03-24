const { HttpErr } = require("./http");

class FobiddenErr extends HttpErr {
  constructor(msg) {
    super(403, msg);
    this.name = "Fobidden Error";
  }
}

module.exports = { FobiddenErr };
