import { NextFunction, Request, Response } from "express";
import { NotFoundErr } from "../../../error/not-found";
import { Course } from "../../../model/course";
import { Subject } from "../../../model/subject";

async function deleteCourse(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  try {
    const course = await Course.findByIdAndDelete(id);
    if (!course) {
      throw new NotFoundErr("COURSE_NOT_FOUND");
    }

    // Remove course from subjet
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

export { deleteCourse };
