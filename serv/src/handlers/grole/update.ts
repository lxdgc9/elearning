import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { Role } from "../../models/role";

type UpdateRoleDto = {
  name?: string;
  roleIds?: Types.ObjectId[];
};

async function updateGRole(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = req.params;
  const { name, roleIds }: UpdateRoleDto = req.body;

  try {
    const role = await Role.findByIdAndUpdate(
      id,
      {
        name,
        roles: roleIds,
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

export { updateGRole };
