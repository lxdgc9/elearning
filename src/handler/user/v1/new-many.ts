import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { BadReqErr } from "../../../error/bad-req";
import { Role } from "../../../model/role";
import { User, UserDoc } from "../../../model/user";

type NewUserDto = {
  users: {
    username: string;
    password: string;
    fullName?: string;
    gender?: string;
    dob?: Date;
    email?: string;
    phone?: string;
    provinceId?: string;
    districtId?: string;
    wardId?: string;
    street?: string;
    roleId?: Types.ObjectId;
    hasAccess?: boolean;
  }[];
};

async function newManyUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { users }: NewUserDto = req.body;

  try {
    // kiểm tra username
    const extUsers = await User.find({
      username: { $in: users.map((u) => u.username) },
    });
    if (extUsers.length > 0) {
      throw new BadReqErr("Tên Người Dùng Đã Tồn Tại");
    }

    // kiểm tra roleId
    const roles = await Role.find({}).select("_id");
    const extRoleIds = roles.map((r) => r.id);
    const roleIds = users.map((u) => u.roleId);
    if (roleIds.some((r) => !extRoleIds.includes(r))) {
      throw new BadReqErr("Không Tìm Thấy Vai Trò");
    }

    // tạo nhiều user
    let flag = true;
    let userList: UserDoc[] = [];
    for await (const {
      username,
      password,
      fullName,
      gender,
      dob,
      email,
      phone,
      provinceId,
      districtId,
      wardId,
      street,
      roleId,
      hasAccess,
    } of users) {
      try {
        const user = User.build({
          username,
          password,
          profile: {
            fullName,
            gender,
            dob,
            email,
            phone,
            address: {
              provinceId,
              districtId,
              wardId,
              street,
            },
          },
          role: roleId,
          hasAccess,
        });
        userList.push(user);
      } catch (err) {
        console.log(err);
        flag = false;
      }
    }
    // tiến hành tạo lưu những user đã tạo
    if (flag) {
      userList.forEach(async (u) => {
        console.log(u);
        await u.save();
      });
    } else {
      throw new BadReqErr("Tạo Nhiều Người Dùng Thất Bại");
    }

    res.status(201).json({
      message: "Tạo Thành Công",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { newManyUser };
