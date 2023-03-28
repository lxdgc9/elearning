const NotFoundErr = require("../../error/not-found");
const Test = require("../../model/test");

async function getTestById(req, res, next) {
  try {
    const test = await Test.findOne(
      {
        _id: req.params.id,
        members: req.user.id,
      },
      { "questions.answers.isCorrect": 0 }
    );
    if (!test) {
      throw new NotFoundErr("Không tìm thấy bài thi");
    }

    res.json({
      test,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = getTestById;
