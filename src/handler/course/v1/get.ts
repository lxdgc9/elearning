import { NextFunction, Request, Response } from "express";
import { Course } from "../../../model/course";

async function getCourses(
  _req: Request,
  res: Response,
  next: NextFunction
) {
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

export { getCourses };
