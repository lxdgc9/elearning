const jwt = require("jsonwebtoken");
const Submission = require("../../model/submission");
const Test = require("../../model/test");
const BadReqErr = require("../../error/bad-req");
const UnauthorizedErr = require("../../error/unauthorized");

async function answer(req, res, next) {
  const { token, choices } = req.body;

  try {
    // Lấy bài làm
    const extSub = await Submission.findById(req.params.id);
    if (!extSub) {
      throw new BadReqErr("Không tồn tại bài làm");
    }

    // Kiểm tra bài thi
    const test = await Test.findById(extSub.test);
    if (!test) {
      throw new BadReqErr("Bài thi không tồn tại");
    }

    // Kiểm tra người dùng có trong danh sách cho phép thi
    // lại hay không, nếu không => kiểm tra người dùng đã
    // nộp bài hay chưa?
    if (!test.remake.includes(req.user.id)) {
      if (extSub.status > 2) {
        throw new BadReqErr("Bạn không thể nộp bài");
      }
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

    const submission = await Submission.findById(
      submitId
    ).populate("test");

    await submission.updateOne({
      $set: {
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

module.exports = answer;
