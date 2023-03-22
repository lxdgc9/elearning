import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { User } from "../../../model/user";

type SetRoleDto = {
  userIds: Types.ObjectId[];
  roleId: Types.ObjectId;
};

async function setRole(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userIds, roleId }: SetRoleDto = req.body;

  try {
    userIds.forEach(async (u) => {
      await User.findByIdAndUpdate(u, {
        role: roleId,
      });
    });

    res.json({});
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { setRole };
