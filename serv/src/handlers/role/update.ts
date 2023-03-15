import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { Role } from "../../models/role";

type UpdateRoleDto = {
  name?: string;
  permIds?: Types.ObjectId[];
};

async function updateRole(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = req.params;
  const { name, permIds }: UpdateRoleDto = req.body;

  try {
    const role = await Role.findByIdAndUpdate(
      id,
      {
        name,
        permIds,
      },
      { new: true }
    );

    res.json({
      role,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { updateRole };
