const Test = require("../../model/test");
const BadReqErr = require("../../error/bad-req");
const Submission = require("../../model/submission");

async function deleteTest(req, res, next) {
  try {
    const test = await Test.findByIdAndDelete(
      req.params.id
    );
    if (!test) {
      throw new BadReqErr("Không tồn tại bài thi");
    }

    for await (const s of test.submissions) {
      await Submission.findByIdAndUpdate(s, {
        $set: {
          test: null,
        },
      });
    }

    res.status(204).json({});
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = deleteTest;
