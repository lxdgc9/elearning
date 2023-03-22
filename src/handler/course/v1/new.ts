import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { BadReqErr } from "../../../error/bad-req";
import { Course } from "../../../model/course";
import { Subject } from "../../../model/subject";

type NewCourseDto = {
  name: string;
  description?: string;
  subjectId: Types.ObjectId;
};

async function newCourse(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, description, subjectId }: NewCourseDto =
    req.body;

  try {
    const course = Course.build({
      name,
      description,
      author: req.user!.id,
      subject: subjectId,
    });
    await course.save();

    const subject = await Subject.findByIdAndUpdate(
      subjectId,
      {
        $addToSet: {
          teachers: course.id,
        },
      }
    );
    if (!subject) {
      throw new BadReqErr("INVALID_SUBJECT");
    }

    res.status(201).json({
      course,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { newCourse };
