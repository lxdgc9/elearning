const BadReqErr = require("../../error/bad-req");
const Test = require("../../model/test");

async function changeTest(req, res, next) {
  try {
    const test = await Test.findById(req.params.id);
    if (!test) {
      throw new BadReqErr("Không tồn tại bài thi");
    }

    await test.updateOne({
      ...req.body,
    });
    await test.save();

    const detail = await Test.findById(req.params.id);

    res.json({
      test: detail,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = changeTest;
