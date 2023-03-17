import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { GPerm } from "../../../model/gperm";

type UpdateGPermDto = {
  name?: string;
  permissionsIds?: Types.ObjectId[];
};

async function updateGPerm(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = req.params;
  const { name, permissionsIds }: UpdateGPermDto = req.body;

  try {
    const gperm = await GPerm.findByIdAndUpdate(
      id,
      {
        name,
        permissions: permissionsIds,
      },
      { new: true }
    );

    res.json({
      groupPermission: gperm,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { updateGPerm };
