const BadReqErr = require("../../../error/bad-req");
const Course = require("../../../model/course");
const Subject = require("../../../model/subject");

async function newCourse(req, res, next) {
  const { title, description, subjectId } = req.body;

  try {
    const course = Course.build({
      title,
      description,
      author: req.user.id,
      subject: subjectId,
    });
    await course.save();

    // kiểm tra giáo viên có trực thuộc môn học hay không
    const subject = await Subject.findByIdAndUpdate(
      subjectId,
      {
        $addToSet: {
          teachers: course.id,
        },
      }
    );
    if (!subject) {
      throw new BadReqErr(
        "Môn học của khóa học không hợp lệ"
      );
    }

    res.status(201).json({
      course,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = newCourse;
