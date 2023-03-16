import { NextFunction, Request, Response } from "express";
import { Perm } from "../../models/perm";

async function delPerm(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = req.params;

  try {
    const perm = await Perm.findByIdAndDelete(id);

    res.json({
      permission: perm,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { delPerm };
