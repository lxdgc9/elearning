import { NextFunction, Request, Response } from "express";
import { Subject } from "../../../model/subject";

type NewSubDto = {
  name: string;
  description?: string;
};

async function newSubject(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { name, description }: NewSubDto = req.body;

  try {
    // Create subject
    const subject = Subject.build({
      name,
      description,
    });
    await subject.save();

    res.status(201).json({
      subject,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { newSubject };
