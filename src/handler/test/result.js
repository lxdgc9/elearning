const BadReqErr = require("../../error/bad-req");
const Submission = require("../../model/submission");
const Test = require("../../model/test");

async function result(req, res, next) {
  try {
    const submission = await Submission.findById(
      req.params.submissionId
    );
    if (!submission) {
      throw new BadReqErr("Bài nộp không tồn tại");
    }

    const test = await Test.findById(submission.test);
    console.log(test);
    res.json({});
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = result;
