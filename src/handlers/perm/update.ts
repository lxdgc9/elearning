import { NextFunction, Request, Response } from "express";
import { Perm } from "../../models/perm";

type UpdatePermDto = {
  name?: string;
  desc?: string;
};

async function updatePerm(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = req.params;
  const { name, desc }: UpdatePermDto = req.body;

  try {
    const perm = await Perm.findByIdAndUpdate(
      id,
      {
        name,
        desc,
      },
      { new: true }
    );

    res.json({
      perm,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { updatePerm };
