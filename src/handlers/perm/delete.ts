import { NextFunction, Request, Response } from "express";
import { NotFoundErr } from "../../errors/not-found";
import { GPerm } from "../../models/gperm";
import { Perm } from "../../models/perm";

async function delPerm(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = req.params;

  try {
    const perm = await Perm.findByIdAndDelete(id);
    if (!perm) {
      throw new NotFoundErr("PERMISSION_NOT_FOUND");
    }

    // Remove permission from group
    await GPerm.findByIdAndUpdate(perm.groupId, {
      $pull: { permissions: perm.id },
    });

    res.json({
      permission: perm,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { delPerm };
