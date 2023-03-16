import { NextFunction, Request, Response } from "express";
import { NotFoundErr } from "../../errors/not-found";
import { Perm } from "../../models/perm";

async function getPerm(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = req.params;

  try {
    const perm = await Perm.findById(id);
    if (!perm) {
      throw new NotFoundErr("Permission Not Found");
    }

    res.json({
      perm,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { getPerm };
