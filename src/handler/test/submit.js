const jwt = require("jsonwebtoken");
const Submission = require("../../model/submission");
const Test = require("../../model/test");
const BadReqErr = require("../../error/bad-req");
const UnauthorizedErr = require("../../error/unauthorized");

async function submit(req, res, next) {
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

    const submission = await Submission.findById(submitId);

    let status;
    if (
      new Date() >
      new Date(
        submission.signedAt.getTime() +
          test.duration * 60000
      )
    ) {
      status = 4;
    } else {
      status = 3;
    }

    // Tính tổng số câu hỏi đúng
    let countCorrect = 0;
    for await (const c of choices) {
      const v = submission.test.questions.find(
        (q) => q._id.toString() === c.question.toString()
      );

      if (v) {
        const a = v.answers.find(
          (a) => a._id.toString() === c.answer.toString()
        );
        if (a && a.isCorrect) {
          countCorrect++;
        }
      }
    }

    await submission.updateOne({
      $set: {
        status,
        submitedAt: Date.now(),
        submitCount: submission.submitCount + 1,
        choices,
        correctNum: countCorrect,
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
