import { NextFunction, Request, Response } from "express";
import { NotFoundErr } from "../../../error/not-found";
import { Perm } from "../../../model/perm";

async function getPerms(
  _req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const perms = await Perm.find({});
    if (!perms.length) {
      throw new NotFoundErr("Danh Sách Quyền Hạn Trống");
    }

    res.json({
      permissions: perms,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { getPerms };
