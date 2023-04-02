const { Router } = require("express");
const { check } = require("express-validator");
const access = require("../middleware/access");
const active = require("../middleware/active");
const currUser = require("../middleware/current-user");
const requireAuth = require("../middleware/require-auth");
const validReq = require("../middleware/valid-req");
const version = require("../middleware/version");
const newGame = require("../handler/game/new.js");
const myGames = require("../handler/game/my-games");

const r = Router();

r.post(
  "/api/games",
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
    check("questionNum")
      .notEmpty()
      .withMessage("Yêu cầu số lượng câu hỏi"),
  ],
  validReq,
  version({
    v1: newGame,
  })
);

// Lấy danh sách trò chơi do chính mình tạo ra
r.get(
  "/api/games/my-games/:classId",
  currUser,
  requireAuth,
  active,
  access(),
  version({
    v1: myGames,
  })
);

r.get(
  "/api/games/:classId",
  currUser,
  requireAuth,
  active,
  access(),
  version({
    v1: "dsa",
  })
);

module.exports = r;
