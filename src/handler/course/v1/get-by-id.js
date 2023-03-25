const {
  NextFunction,
  Request,
  Response,
} = require("express");
const { NotFoundErr } = require("../../../error/not-found");
const { Course } = require("../../../model/course");

async function getCourse(req, res, next) {
  const { id } = req.params;

  try {
    const course = await Course.findById(id);
    if (!course) {
      throw new NotFoundErr("COURSE_NOT_FOUND");
    }

    res.json({
      course,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = { getCourse };
