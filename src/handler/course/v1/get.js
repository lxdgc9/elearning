const Course = require("../../../model/course");

async function getCourses(req, res, next) {
  try {
    const courses = await Course.find({}).populate([
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
      courses,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = getCourses;
