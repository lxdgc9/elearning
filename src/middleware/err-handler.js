import { HttpErr } from "../err/http.js";

function errHandler(err, _req, res, _next) {
  console.log(err);

  if (err instanceof HttpErr) {
    res.status(err.code).send({ msg: err.message });
    return;
  }

  res.status(500).send({
    msg: "Có gì đó sai sai!!!",
  });
}

export { errHandler };
