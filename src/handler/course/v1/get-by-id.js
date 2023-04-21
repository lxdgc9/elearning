const NotFoundErr = require("../../../error/not-found");
const Course = require("../../../model/course");

async function getCourse(req, res, next) {
  try {
    const course = await Course.findById(
      req.params.id
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
      {
        path: "comments",
        populate: [
          {
            path: "sender",
            populate: [
              {
                path: "role",
                select: "-permissions",
              },
            ],
          },
        ],
      },
      {
        path: "process",
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
