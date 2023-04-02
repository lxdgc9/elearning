const { Router } = require("express");
const { check, param } = require("express-validator");
const access = require("../middleware/access");
const active = require("../middleware/active");
const currUser = require("../middleware/current-user");
const requireAuth = require("../middleware/require-auth");
const validReq = require("../middleware/valid-req");
const version = require("../middleware/version");
const newGame = require("../handler/game/new.js");
const myGames = require("../handler/game/my-games");
const getGame = require("../handler/game/get-id");
const getGames = require("../handler/game/get");

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
    check("classId")
      .notEmpty()
      .withMessage("Yêu cầu lớp học")
      .isMongoId()
      .withMessage("Lớp học không hợp lệ"),
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
  [
    param("classId")
      .isMongoId()
      .withMessage("Lớp học không lợp lệ"),
  ],
  validReq,
  version({
    v1: myGames,
  })
);

r.get(
  "/api/games/detail/:id",

  currUser,
  requireAuth,
  active,
  access(),
  [
    param("id")
      .isMongoId()
      .withMessage("Không tìm thấy trò chơi"),
  ],
  validReq,
  version({
    v1: getGame,
  })
);

r.get(
  "/api/games/:classId",
  currUser,
  requireAuth,
  active,
  access(),
  [
    param("classId")
      .isMongoId()
      .withMessage("Lớp học không lợp lệ"),
  ],
  validReq,
  version({
    v1: getGames,
  })
);

module.exports = r;
