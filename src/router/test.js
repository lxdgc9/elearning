const express = require("express");

const active = require("../middleware/active");
const access = require("../middleware/access");
const version = require("../middleware/version");
const currUser = require("../middleware/current-user");
const requireAuth = require("../middleware/require-auth");
const newTest = require("../handler/test/new");
const myTest = require("../handler/test/my-test");
const getTest = require("../handler/test/get");
const getTestById = require("../handler/test/get-by-id");

const r = express.Router();

// Tạo mới bài thi
r.post(
  "/api/test",
  currUser,
  requireAuth,
  active,
  access(),
  version({
    v1: newTest,
  })
);

// Lấy danh sách bài thi đã tạo của bạn
r.get(
  "/api/test/my-test",
  currUser,
  requireAuth,
  active,
  access(),
  version({
    v1: myTest,
  })
);

// Lấy chi tiết bài thi (cho thành viên)
r.get(
  "/api/test/:id",
  currUser,
  requireAuth,
  active,
  access(),
  version({
    v1: getTestById,
  })
);

// Lấy danh sách bài thi (cho thành viên)
r.get(
  "/api/test",
  currUser,
  requireAuth,
  active,
  access(),
  version({
    v1: getTest,
  })
);

// Đăng ký làm bài
r.patch(
  "/api/test/:id",
  currUser,
  requireAuth,
  active,
  access(),
  version({
    v1: getTest,
  })
);

module.exports = r;
