import { NextFunction, Request, Response } from "express";
import { Perm } from "../../models/perm";

type NewPermDto = {
  name: string;
  description?: string;
};

async function newPerm(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { name, description }: NewPermDto = req.body;

  try {
    const perm = Perm.build({
      name,
      description,
    });
    perm.save();

    res.status(201).json({
      perm,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { newPerm };
