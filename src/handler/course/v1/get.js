const Course = require("../../../model/course");

async function getCourses(req, res, next) {
  try {
    const courses = await Course.find({}).populate([
      {
        path: "author",
        select: "-classes -groups",
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
