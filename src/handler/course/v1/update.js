const NotFoundErr = require("../../../error/not-found");
const Course = require("../../../model/course");
const Subject = require("../../../model/subject");

async function updateCourse(req, res, next) {
  const { name, subjectId, description } = req.body;

  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      throw new NotFoundErr("Không tìm thấy khóa học");
    }

    // Xóa khóa học khỏi lớp cũ và thêm khóa học vào lớp mới
    if (subjectId && course.subject !== subjectId) {
      await Subject.findByIdAndUpdate(course.subject, {
        $pull: { courses: course.id },
      });
      await Subject.findByIdAndUpdate(subjectId, {
        $addToSet: { courses: course.id },
      });
    }

    await course.updateOne({
      name,
      subject: subjectId,
      description,
    });

    res.json({
      course,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = updateCourse;
