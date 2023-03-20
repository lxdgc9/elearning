import { NextFunction, Request, Response } from "express";
import { NotFoundErr } from "../../../error/not-found";
import { Subject } from "../../../model/subject";

async function deleteSubject(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  try {
    const subject = await Subject.findByIdAndDelete(id);
    if (!subject) {
      throw new NotFoundErr("SUBJECT_NOT_FOUND");
    }

    res.json({
      subject,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}
export { deleteSubject };
