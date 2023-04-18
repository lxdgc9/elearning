const BadReqErr = require("../../error/bad-req");
const Comment = require("../../model/comment");
const Course = require("../../model/course");
const { getIO } = require("../../sock");

async function newCmt(req, res, next) {
  const { content } = req.body;

  try {
    const course = await Course.findById(
      req.params.courseId
    );
    if (!course) {
      throw new BadReqErr("Khóa học không tồn tại");
    }

    const newCmt = new Comment({
      course: course._id,
      sender: req.user.id,
      content,
    });
    await newCmt.save();

    await course.updateOne({
      $addToSet: {
        comments: newCmt._id,
      },
    });

    getIO()
      .of("/course")
      .to(course._id)
      .emit("cmt", newCmt);

    getIO().emit("cmt", newCmt);

    res.json({
      comment: newCmt,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = newCmt;
