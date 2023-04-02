const BadReqErr = require("../../error/bad-req");
const Submission = require("../../model/submission");
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

    await Submission.updateMany(
      {
        test: test._id,
      },
      {
        $set: {
          totalQuestion: req.body.questions.length || 0,
        },
      }
    );

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
