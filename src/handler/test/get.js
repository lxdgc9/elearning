const NotFoundErr = require("../../error/not-found");
const Test = require("../../model/test");

async function getTest(req, res, next) {
  try {
    const test = await Test.find({
      members: req.user.id,
    })
      .select(
        "title duration createdBy startedAt isPublish members"
      )
      .sort({ createdAt: -1 });
    if (!test.length) {
      throw new NotFoundErr("Danh sách bài thi trống");
    }

    res.json({
      testList: test,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = getTest;
