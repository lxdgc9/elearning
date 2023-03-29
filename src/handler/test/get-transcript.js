const BadReqErr = require("../../error/bad-req");
const Submission = require("../../model/submission");
const Test = require("../../model/test");

async function getTransScrip(req, res, next) {
  try {
    // Kiểm tra bài thi
    const test = await Test.findById(req.params.id);
    if (!test) {
      throw new BadReqErr("Bài thi không tồn tại");
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = getTransScrip;
