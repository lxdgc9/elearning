const express = require("express");
const { check, param } = require("express-validator");

const active = require("../middleware/active");
const access = require("../middleware/access");
const version = require("../middleware/version");
const currUser = require("../middleware/current-user");
const requireAuth = require("../middleware/require-auth");
const validReq = require("../middleware/valid-req");
const newTest = require("../handler/test/new");
const myTest = require("../handler/test/my-test");
const getTest = require("../handler/test/get");
const getTestById = require("../handler/test/get-by-id");
const regist = require("../handler/test/regist");
const submit = require("../handler/test/submit");
const getSubmissions = require("../handler/test/get-submissions");
const updateTest = require("../handler/test/update");
const myTestById = require("../handler/test/my-test-by-id");
const deleteTest = require("../handler/test/delete");
const answer = require("../handler/test/answer");
const getAllResult = require("../handler/test/get-all-result");

const r = express.Router();

// Tạo mới bài thi
r.post(
  "/api/test",
  currUser,
  requireAuth,
  active,
  access(),
  [
    check("questions")
      .isArray()
      .withMessage("Danh sách câu hỏi không hợp lệ")
      .notEmpty()
      .withMessage("Yêu câu danh sách câu hỏi"),
  ],
  validReq,
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

// Lấy chi tiết bài thi đã tạo của bạn
r.get(
  "/api/test/my-test/:id",
  currUser,
  requireAuth,
  active,
  access(),
  version({
    v1: myTestById,
  })
);

// Lấy kết quả bài thi
r.get(
  "/api/test/result",
  currUser,
  requireAuth,
  active,
  access(),
  [],
  validReq,
  version({
    v1: getAllResult,
  })
);

// Lấy danh sách bài nộp
r.get(
  "/api/test/submissions",
  currUser,
  requireAuth,
  active,
  access(),
  [],
  validReq,
  version({
    v1: getSubmissions,
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
  "/api/test/regist/:id",
  currUser,
  requireAuth,
  active,
  access(),
  [
    check("password")
      .notEmpty()
      .withMessage("Yêu cầu mật khẩu"),
  ],
  validReq,
  version({
    v1: regist,
  })
);

r.put(
  "/api/test/:id",
  currUser,
  requireAuth,
  active,
  access(),
  version({
    v1: updateTest,
  })
);

r.patch(
  "/api/test/answer/:id",
  currUser,
  requireAuth,
  active,
  access(),
  [
    param("id")
      .isMongoId()
      .withMessage("Bài làm không hợp lệ"),
    check("token").notEmpty().withMessage("Yêu cầu token"),
  ],
  validReq,
  version({
    v1: answer,
  })
);

// Nộp bài
r.patch(
  "/api/test/submit/:id",
  currUser,
  requireAuth,
  active,
  access(),
  [check("token").notEmpty().withMessage("Yêu cầu token")],
  validReq,
  version({
    v1: submit,
  })
);

// Xóa bài kiểm tra
r.delete(
  "/api/test/:id",
  currUser,
  requireAuth,
  active,
  access(),
  version({
    v1: deleteTest,
  })
);

module.exports = r;
