const BadReqErr = require("../../error/bad-req");
const Course = require("../../model/course");

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

    // await course.updateOne({
    //   $addToSet: {
    //     comments: newCmt._id,
    //   },
    // });

    res.json({
      comment: newCmt,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = newCmt;
