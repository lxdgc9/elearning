import { NextFunction, Request, Response } from "express";
import { GPerm } from "../../../model/gperm";

type NewGPermDto = {
  name: string;
};

async function newGPerm(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { name }: NewGPermDto = req.body;

  try {
    const gperm = GPerm.build({
      name,
    });
    await gperm.save();

    res.status(201).json({
      groupPermission: gperm,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { newGPerm };
