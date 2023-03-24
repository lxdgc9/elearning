"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.getProvinces = void 0;
function getProvinces(req, res, next) {
  try {
    res.redirect(
      "https://provinces.open-api.vn/api/?depth=3"
    );
  } catch (err) {
    console.log(err);
    next(err);
  }
}
exports.getProvinces = getProvinces;
