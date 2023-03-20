import { NextFunction, Request, Response } from "express";
import { Subject } from "../../../model/subject";

async function getSubjects(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const subjects = await Subject.find({});

    res.json({
      subjects,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { getSubjects };
