import { NextFunction, Request, Response } from "express";
import { Subject } from "../../../model/subject";

async function getSubs(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const subs = await Subject.find({});

    res.json({
      subjects: subs,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { getSubs };
