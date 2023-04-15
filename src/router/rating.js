const express = require("express");
const currUser = require("../middleware/current-user");
const requireAuth = require("../middleware/require-auth");
const active = require("../middleware/active");
const access = require("../middleware/access");
const version = require("../middleware/version");
const rate = require("../handler/rating/rate");

const r = express.Router();

r.patch(
  "/:courseId",
  currUser,
  requireAuth,
  active,
  access(),
  version({
    v1: rate,
  })
);

module.exports = r;
