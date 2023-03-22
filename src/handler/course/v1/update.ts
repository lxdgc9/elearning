import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { NotFoundErr } from "../../../error/not-found";
import { Course } from "../../../model/course";
import { Subject } from "../../../model/subject";

type UpdateCourseDto = {
  name?: string;
  subjectId?: Types.ObjectId;
  description?: string;
};

async function updateCourse(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  const { name, subjectId, description }: UpdateCourseDto =
    req.body;

  try {
    const course = await Course.findById(id);
    if (!course) {
      throw new NotFoundErr("COURSE_NOT_FOUND");
    }

    // Remove course from previous subject,
    // and add course to new subject
    if (subjectId && course.subject !== subjectId) {
      await Subject.findByIdAndUpdate(course.subject, {
        $pull: { courses: course.id },
      });
      await Subject.findByIdAndUpdate(subjectId, {
        $addToSet: { courses: course.id },
      });
    }

    await course.updateOne({
      name,
      subject: subjectId,
      description,
    });

    res.json({
      course,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { updateCourse };
