import { HttpErr } from "../err/http.js";

function errHandler(err, _req, res, _next) {
  if (err instanceof HttpErr) {
    return res.status(err.code).send({
      msg: err.message,
    });
  }

  res.status(500).send({
    msg: "Có gì đó sai sai!!!",
  });
}

export { errHandler };
