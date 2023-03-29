const BadReqErr = require("../../error/bad-req");
const Submission = require("../../model/submission");
const Test = require("../../model/test");

async function result(req, res, next) {
  try {
    const sub = await Submission.findById(
      req.params.submissionId
    ).populate([
      {
        path: "test",
      },
    ]);
    if (!sub) {
      throw new BadReqErr("Bài nộp không tồn tại");
    }

    let countCorrect = 0;
    for await (const c of sub.choices) {
      const v = sub.test.questions.find(
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

    res.json({
      correctAnswer: countCorrect,
      totalAnswer: sub.test.questions.length,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = result;
