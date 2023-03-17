import { NextFunction, Request, Response } from "express";
import { Perm } from "../../models/perm";

type NewPermDto = {
  name: string;
  group: string;
  description?: string;
};

async function newPerm(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { name, group, description }: NewPermDto = req.body;

  try {
    const perm = Perm.build({
      name,
      group,
      description,
    });
    await perm.save();

    res.status(201).json({
      permission: perm,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { newPerm };
