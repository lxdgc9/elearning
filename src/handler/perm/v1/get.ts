import { NextFunction, Request, Response } from "express";
import { Perm } from "../../../model/perm";

async function getPerms(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const perms = await Perm.find({});

    res.json({
      permissions: perms,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { getPerms };
