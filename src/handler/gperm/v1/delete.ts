import { NextFunction, Request, Response } from "express";
import { GPerm } from "../../../model/gperm";

async function delGPerm(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = req.params;

  try {
    const gperm = await GPerm.findByIdAndDelete(id);

    res.json({
      groupPermission: gperm,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { delGPerm };
