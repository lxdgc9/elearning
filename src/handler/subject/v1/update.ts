import { NextFunction, Request, Response } from "express";
import { Subject } from "../../../model/subject";

type UpdateSubDto = {
  name?: string;
  description?: string;
};

async function updateSub(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = req.params;
  const { name, description }: UpdateSubDto = req.body;

  try {
    const sub = await Subject.findByIdAndUpdate(
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
      subject: sub,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { updateSub };
