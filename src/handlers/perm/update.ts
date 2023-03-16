import { NextFunction, Request, Response } from "express";
import { Perm } from "../../models/perm";

type UpdatePermDto = {
  name?: string;
  description?: string;
};

async function updatePerm(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = req.params;
  const { name, description }: UpdatePermDto = req.body;

  try {
    const perm = await Perm.findByIdAndUpdate(
      id,
      {
        name,
        description,
      },
      { new: true }
    );

    res.json({
      permission: perm,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { updatePerm };
