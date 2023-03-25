const { Course } = require("../../../model/course");

async function getCourses(req, res, next) {
  try {
    const courses = await Course.find({});

    res.json({
      courses,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = { getCourses };
