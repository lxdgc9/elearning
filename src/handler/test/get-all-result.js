const Test = require("../../model/test");
const BadReqErr = require("../../error/bad-req");
const Submission = require("../../model/submission");

async function getAllResult(req, res, next) {
  try {
    const tests = await Test.find({
      createdBy: req.user.id,
    });
    if (!tests.length) {
      throw new BadReqErr("Danh sách bài thi trống");
    }

    const submissions = await Submission.find({
      test: {
        $in: tests.map((t) => t._id),
      },
    })
      .populate([
        {
          path: "test",
          select: "-questions",
        },
        {
          path: "user",
        },
      ])
      .sort({ createdAt: -1 });

    res.json({
      submissions,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = getAllResult;
