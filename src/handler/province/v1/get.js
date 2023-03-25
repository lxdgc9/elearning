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

module.exports = getProvinces;
