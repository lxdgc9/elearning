import { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../../errors/not-found-error";
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
      throw new NotFoundError("Permission Not Found");
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
