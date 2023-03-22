import { NextFunction, Request, Response } from "express";
import { NotFoundErr } from "../../../error/not-found";
import { Course } from "../../../model/course";

async function getCourse(
  req: Request,
  res: Response,
  next: NextFunction
) {
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

export { getCourse };
