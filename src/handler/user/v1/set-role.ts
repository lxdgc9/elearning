import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { BadReqErr } from "../../../error/bad-req";
import { NotFoundErr } from "../../../error/not-found";
import { Role } from "../../../model/role";
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
    // kiểm tra userIds
    const extUsers = await User.find({
      _id: { $in: userIds },
    });
    if (extUsers.length > 0) {
      throw new BadReqErr("Người dùng không hợp lệ");
    }

    // kiểm tra roleId
    const role = await Role.findById(roleId);
    if (!role) {
      throw new NotFoundErr("Vai trò không hợp lệ");
    }

    // cập nhật role cho users
    for await (const u of userIds) {
    }
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
