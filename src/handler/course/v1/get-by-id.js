const NotFoundErr = require("../../../error/not-found");
const Course = require("../../../model/course");

async function getCourse(req, res, next) {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      throw new NotFoundErr("Không tìm thấy khóa học");
    }

    res.json({
      course,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = getCourse;
