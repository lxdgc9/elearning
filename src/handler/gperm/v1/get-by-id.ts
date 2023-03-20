import { NextFunction, Request, Response } from "express";
import { NotFoundErr } from "../../../error/not-found";
import { GPerm } from "../../../model/gperm";

async function getGPerm(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;

  try {
    const gperm = await GPerm.findById(id).populate([
      {
        path: "permissions",
      },
    ]);
    if (!gperm) {
      throw new NotFoundErr("GPERM_NOT_FOUND");
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
