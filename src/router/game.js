const { Router } = require("express");
const { check } = require("express-validator");
const access = require("../middleware/access");
const active = require("../middleware/active");
const currUser = require("../middleware/current-user");
const requireAuth = require("../middleware/require-auth");
const validReq = require("../middleware/valid-req");
const version = require("../middleware/version");

const r = Router();

r.post(
  "/api/games/:classId",
  currUser,
  requireAuth,
  active,
  access(),
  [
    check("name")
      .notEmpty()
      .withMessage("Yêu cầu tên trò chơi"),
    check("type")
      .notEmpty()
      .withMessage("Yêu cầu loại trò chơi")
      .isIn(["personal", "team"])
      .withMessage("Loại trò chơi không hợp lệ"),
  ],
  validReq,
  version({
    v1: "dasjdkjal",
  })
);

module.exports = r;
