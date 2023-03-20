import { NextFunction, Request, Response } from "express";
import { Class } from "../../../model/class";

type UpdateClassDto = {
  name?: string;
  session?: string;
};

async function updateClass(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = req.params;
  const { name, session }: UpdateClassDto = req.body;

  try {
    const _class = await Class.findByIdAndUpdate(
      id,
      {
        name,
        session,
      },
      {
        new: true,
      }
    );

    res.json({
      class: _class,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { updateClass };
