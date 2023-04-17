const BadReqErr = require("../../../error/bad-req");
const Course = require("../../../model/course");
const Subject = require("../../../model/subject");
const Class = require("../../../model/class");
const Lesson = require("../../../model/lesson");

async function newCourse(req, res, next) {
  let {
    title,
    description,
    classIds,
    subjectId,
    lessons,
    publish,
  } = req.body;

  req.files.forEach((file, index) => {
    if (lessons[index]) {
      lessons[index].resource = file.filename;
    }
  });

  try {
    const classes = await Class.find({ _id: classIds });
    if (classes.length !== classIds.length) {
      throw new BadReqErr(
        "Tồn tại một lớp học không hợp lệ"
      );
    }

    const subject = await Subject.findById(subjectId);
    if (!subject) {
      throw new BadReqErr("Môn học không tồn tại");
    }

    const course = new Course({
      title,
      description,
      publish,
      author: req.user.id,
      classes: classes.map((c) => c._id),
      subject: subjectId,
    });
    await course.save();

    lessons.forEach((l) => {
      l.course = course._id;
    });
    await Lesson.insertMany(lessons);

    await subject.updateOne({
      $addToSet: {
        courses: course._id,
      },
    });

    const lessonList = await Lesson.find({
      course: course._id,
    });

    await Course.findByIdAndUpdate(course._id, {
      $addToSet: {
        lessons: lessonList.map((l) => l._id),
      },
    });

    res.status(201).json({
      course,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = newCourse;
