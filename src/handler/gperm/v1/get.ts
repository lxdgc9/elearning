import { NextFunction, Request, Response } from "express";
import { GPerm } from "../../../model/gperm";

async function getGPerms(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const gperms = await GPerm.find({}).populate([
      {
        path: "permissions",
      },
    ]);

    res.json({
      groupPermissions: gperms,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { getGPerms };
