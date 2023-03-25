const NotFoundErr = require("../../../error/not-found");
const Course = require("../../../model/course");
const Subject = require("../../../model/subject");

async function deleteCourse(req, res, next) {
  try {
    const course = await Course.findByIdAndDelete(
      req.params.id
    );
    if (!course) {
      throw new NotFoundErr("Không tìm thấy khóa học");
    }

    await Subject.findByIdAndUpdate(course.subject, {
      $pull: { courses: course.id },
    });

    res.json({
      course,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = deleteCourse;
