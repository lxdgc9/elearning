const { Router } = require("express");
const currUser = require("../middleware/current-user");
const requireAuth = require("../middleware/require-auth");
const active = require("../middleware/active");
const access = require("../middleware/access");
const version = require("../middleware/version");
const newCmt = require("../handler/comment/new");

const r = Router();

r.post(
  "/api/comments/:courseId",
  currUser,
  requireAuth,
  active,
  access(),
  version({
    v1: newCmt,
  })
);

module.exports = r;
