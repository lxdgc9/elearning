import { NextFunction, Request, Response } from "express";
import { Perm } from "../../models/perm";

async function getPerms(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const perms = await Perm.find({});

    res.json({
      perms,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { getPerms };
