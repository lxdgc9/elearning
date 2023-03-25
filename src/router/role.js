const express = require("express");
const route = require("../cfg/route");
// Middlewares
const active = require("../middleware/active");
const currUser = require("../middleware/current-user");
const version = require("../middleware/version");
const requireAuth = require("../middleware/require-auth");
// Handlers
const getRoles = require("../handler/role/v1/get");
const getRole = require("../handler/role/v1/get-by-id");
const newRole = require("../handler/role/v1/new");
const updateRole = require("../handler/role/v1/update");
const deleteRole = require("../handler/role/v1/delete");

const r = express.Router();

const { GET, GET_BY_ID, NEW, MOD, DEL } = route.API.ROLE;

// Lấy danh sách vai trò
r[GET.METHOD](
  GET.PATH,
  currUser,
  requireAuth,
  active,
  version({
    v1: getRoles,
  })
);

// Lấy chi tiết thông tin vai trò
r[GET_BY_ID.METHOD](
  GET_BY_ID.PATH,
  currUser,
  requireAuth,
  active,
  version({
    v1: getRole,
  })
);

// Định nghĩa mới vai trò
r[NEW.METHOD](
  NEW.PATH,
  currUser,
  requireAuth,
  active,
  version({
    v1: newRole,
  })
);

// Cập nhật thông tin vai trò
r[MOD.METHOD](
  MOD.PATH,
  currUser,
  requireAuth,
  active,
  version({
    v1: updateRole,
  })
);

// Xóa vai trò
r[DEL.METHOD](
  DEL.PATH,
  currUser,
  requireAuth,
  active,
  version({
    v1: deleteRole,
  })
);

module.exports = r;
