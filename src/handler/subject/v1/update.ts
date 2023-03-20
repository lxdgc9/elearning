import { NextFunction, Request, Response } from "express";
import { Subject } from "../../../model/subject";

type UpdateSubDto = {
  name?: string;
  description?: string;
};

async function updateSubject(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  const { name, description }: UpdateSubDto = req.body;

  try {
    const subject = await Subject.findByIdAndUpdate(
      id,
      {
        name,
        description,
      },
      {
        new: true,
      }
    );

    res.json({
      subject,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { updateSubject };
