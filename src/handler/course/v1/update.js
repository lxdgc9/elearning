const Course = require("../../../model/course");
const Lesson = require("../../../model/lesson");
const Subject = require("../../../model/subject");

async function updateCourse(req, res, next) {
  const {
    title,
    description,
    classIds,
    subjectId,
    lessons,
    publish,
  } = req.body;

  if (req.files) {
    req.files.forEach((file, index) => {
      if (lessons[index]) {
        lessons[index].resource = file.filename;
      }
    });
  }

  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      throw new NotFoundErr("Khóa học không tồn tại");
    }

    // Cập nhật môn học
    if (!course.subject.equals(subjectId)) {
      await Subject.findByIdAndUpdate(course.subject, {
        $pull: {
          courses: course._id,
        },
      });
      await Subject.findByIdAndUpdate(subjectId, {
        $addToSet: {
          courses: course._id,
        },
      });
    }

    await course.updateOne({
      $set: {
        title,
        description,
        classes: classIds,
        subject: subjectId,
        publish,
      },
    });

    lessons.forEach(async (l) => {
      if (l.isDeleted) {
        // Xóa bài học
        const lesson = await Lesson.findByIdAndDelete(l.id);
        await course.updateOne({
          $pull: {
            lessons: lesson._id,
          },
        });
      } else {
        if (l.id) {
          // Cập nhật bài học
          await Lesson.findByIdAndUpdate(l.id, {
            ...l,
          });
        } else {
          // Tạo mới bài học trong khóa học đang cập nhật
          const newLesson = new Lesson({
            ...l,
            course: course._id,
          });
          await newLesson.save();
          await course.updateOne({
            $addToSet: {
              lessons: newLesson._id,
            },
          });
        }
      }
    });

    const detail = await Course.findById(
      course._id
    ).populate([
      {
        path: "author",
        select: "-classes -groups",
        populate: [
          {
            path: "role",
            select: "-permissions",
          },
        ],
      },
      {
        path: "lessons",
      },
      {
        path: "classes",
      },
      {
        path: "subject",
      },
      {
        path: "ratings",
        populate: [
          {
            path: "user",
            populate: [
              {
                path: "role",
                select: "-permissions",
              },
            ],
          },
        ],
      },
    ]);

    res.json({
      course: detail,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = updateCourse;
