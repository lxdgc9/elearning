import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { BadReqErr } from "../../../error/bad-req";
import { Course } from "../../../model/course";
import { Subject } from "../../../model/subject";

type NewCourseDto = {
  title: string;
  description?: string;
  subjectId?: Types.ObjectId;
  classesId?: Types.ObjectId;
  publish?: boolean;
};

async function newCourse(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { title, description, subjectId }: NewCourseDto =
    req.body;

  try {
    const course = Course.build({
      title,
      description,
      author: req.user!.id,
      subject: subjectId,
    });
    await course.save();

    // kiểm tra giáo viên có trực thuộc môn học hay không
    const subject = await Subject.findByIdAndUpdate(
      subjectId,
      {
        $addToSet: {
          teachers: course.id,
        },
      }
    );
    if (!subject) {
      throw new BadReqErr(
        "Môn học của khóa học không hợp lệ"
      );
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
