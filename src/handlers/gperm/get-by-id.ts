import { NextFunction, Request, Response } from "express";
import { NotFoundErr } from "../../errors/not-found";
import { GPerm } from "../../models/gperm";

async function getGPerm(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = req.params;

  try {
    const gperm = await GPerm.findById(id).populate([
      {
        path: "permissions",
      },
    ]);
    if (!gperm) {
      throw new NotFoundErr("GROUP_PERMISSION_NOT_FOUND");
    }

    res.json({
      groupPermission: gperm,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { getGPerm };
