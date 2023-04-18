const BadReqErr = require("../../../error/bad-req");
const Lesson = require("../../../model/lesson");

async function complete(req, res, next) {
  try {
    const lesson = await Lesson.findByIdAndUpdate(
      req.params.lessonId
    );
    if (!lesson) {
      throw new BadReqErr("Bài học không tồn tại");
    }

    await lesson.updateOne({
      $addToSet: {
        completed: req.user.id,
      },
    });

    res.json({});
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = complete;
