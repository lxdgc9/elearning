import { NextFunction, Request, Response } from "express";
import { NotFoundErr } from "../../../error/not-found";
import { Subject } from "../../../model/subject";

async function getSubject(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  try {
    const subject = await Subject.findById(id);
    if (!subject) {
      throw new NotFoundErr("SUBJECT_NOT_FOUND");
    }

    res.json({
      subject
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { getSubject };
