const express = require("express");
const route = require("../cfg/route");
const version = require("../middleware/version");
const getProvinces = require("../handler/province/v1/get");

const r = express.Router();

const { GET } = route.API.PROVINCE;

// Lấy danh mục hành chính từ API có sẵn
r[GET.METHOD](
  GET.PATH,
  version({
    v1: getProvinces,
  })
);

module.exports = r;
