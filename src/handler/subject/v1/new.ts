import { NextFunction, Request, Response } from "express";
import { Subject } from "../../../model/subject";

type NewSubDto = {
  name: string;
  description?: string;
  type?: string; //
  rules?: string[]; //
};

async function newSub(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { name, description, type, rules }: NewSubDto =
    req.body;

  try {
    // Create subject
    const sub = Subject.build({
      name,
      description,
      type,
      rules,
    });
    await sub.save();

    res.status(201).json({
      subject: sub,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { newSub };
