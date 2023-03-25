const HttpErr = require("./http");

class ReqValidateErr extends HttpErr {
  constructor(msg) {
    super(400, msg);
    this.name = "Request Validation Error";
  }
}

module.exports = ReqValidateErr;
