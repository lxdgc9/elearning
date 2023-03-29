const jwt = require("jsonwebtoken");
const Submission = require("../../model/submission");
const Test = require("../../model/test");
const BadReqErr = require("../../error/bad-req");
const Password = require("../../helper/password");

async function regist(req, res, next) {
  const { password } = req.body;

  try {
    // Kiểm tra bài nộp
    const submission = await Submission.findById(
      req.params.id
    );
    if (!submission) {
      throw new BadReqErr("Bài thi không tồn tại");
    }

    // Kiểm tra bài thi
    const test = await Test.findById(submission.test);
    if (!test) {
      throw new BadReqErr("Bài thi không tồn tại");
    }

    // Kiểm tra người dùng có phải thí sinh của bài thi
    if (!test.members.includes(req.user.id)) {
      throw new BadReqErr(
        "Bạn không thể đăng ký làm bài với bài thi này"
      );
    }

    // Kiểm tra mật khẩu
    const passMatch = await Password.compare(
      test.password,
      password
    );
    if (!passMatch) {
      throw new BadReqErr("Sai mật khẩu");
    }

    await submission.updateOne({
      $set: {
        status: 2,
        signedAt: Date.now(),
      },
    });

    // Tạo token, token sẽ gửi lên kèm theo khi nộp bài
    const token = jwt.sign(
      {
        id: req.user.id,
        testId: test.id,
        submitId: submission.id,
      },
      "oh-my-test"
    );

    res.status(201).json({
      token,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = regist;