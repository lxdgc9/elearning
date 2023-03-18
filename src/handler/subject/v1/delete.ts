import { NextFunction, Request, Response } from "express";
import { NotFoundErr } from "../../../error/not-found";
import { Subject } from "../../../model/subject";

async function delSub(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = req.params;

  try {
    const sub = await Subject.findByIdAndDelete(id);
    if (!sub) {
      throw new NotFoundErr("SUBJECT_NOT_FOUND");
    }

    res.json({
      subject: sub,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}
export { delSub };
