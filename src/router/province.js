const { Router } = require("express");
const { API } = require("../cfg/route");
const {
  getProvinces,
} = require("../handler/province/v1/get");
const { version } = require("../middleware/version");

const r = Router();

const { GET } = API.PROVINCE;

// lấy danh mục hành chính từ API có sẵn
r[GET.METHOD](
  GET.PATH,
  version({
    v1: getProvinces,
  })
);

module.exports = {
  provRouter: r,
};
