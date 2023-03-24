const { HttpErr } = require("../error/http");

function errHandler(err, req, res, next) {
  if (err instanceof HttpErr) {
    return res
      .status(err.code)
      .send({ message: err.message });
  }

  // lỗi xảy ra ngoài ràng buộc
  res.status(500).send({
    message: "Có gì đó sai sai!!!",
  });
}

module.exports = { errHandler };
