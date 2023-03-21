import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { NotFoundErr } from "../../../error/not-found";
import { User } from "../../../model/user";

type SetRoleDto = {
  roleId: Types.ObjectId;
};

async function setRole(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.user!;
  const { roleId }: SetRoleDto = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        role: roleId,
      },
      { new: true }
    ).populate([
      {
        path: "role",
        populate: [
          {
            path: "permissions",
            select: "-_id name description",
          },
        ],
      },
    ]);
    if (!user) {
      throw new NotFoundErr("USER_NOT_FOUND");
    }

    res.json({
      user,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { setRole };
