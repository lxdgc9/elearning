const jwt = require("jsonwebtoken");
const Submission = require("../../model/submission");
const Test = require("../../model/test");
const BadReqErr = require("../../error/bad-req");
const UnauthorizedErr = require("../../error/unauthorized");

async function submit(req, res, next) {
  const { token, choices } = req.body;

  try {
    // Kiểm tra bài thi
    const test = await Test.findById(req.params.id);
    if (!test) {
      throw new BadReqErr("Bài thi không tồn tại");
    }

    // Kiểm tra token
    const { id, testId, submitId } = jwt.verify(
      token,
      "oh-my-test"
    );
    if (id.toString() !== req.user.id) {
      throw new UnauthorizedErr("Thao tác không hợp lệ");
    }
    if (test.id.toString() !== testId.toString()) {
      throw new UnauthorizedErr("Thao tác không hợp lệ");
    }

    // Kiểm tra người dùng có phải thí sinh của bài thi
    if (!test.members.includes(req.user.id)) {
      throw new BadReqErr(
        "Bạn không thể đăng ký làm bài với bài thi này"
      );
    }

    const submission = await Submission.findById(submitId);

    let status;
    if (
      new Date() >
      new Date(
        submission.signedAt.getTime() +
          test.duration * 60000
      )
    ) {
      status = "expired";
    } else {
      status = "ok";
    }

    await submission.updateOne({
      $set: {
        status,
        submitedAt: Date.now(),
        choices,
      },
    });

    const submitDetail = await Submission.findById(
      submitId
    );

    res.json({
      submission: submitDetail,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = submit;
