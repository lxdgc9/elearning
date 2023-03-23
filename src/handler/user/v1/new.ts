import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { BadReqErr } from "../../../error/bad-req";
import { Role } from "../../../model/role";
import { User } from "../../../model/user";

type NewUserDto = {
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
};

async function newUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const {
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
  }: NewUserDto = req.body;

  try {
    // kiểm tra username
    const extUser = await User.findOne({ username });
    if (extUser) {
      throw new BadReqErr("Tài Khoản Đã Tồn Tại");
    }

    // kiểm tra roleId
    const role = await Role.findById(roleId);
    if (!role) {
      throw new BadReqErr("Vai Trò Không Hợp Lệ");
    }

    // tạo user
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
      role: role.id,
      hasAccess,
    });
    await user.save();

    // fetch user
    const _user = await User.findById(user.id)
      .select("-logs -classes")
      .populate<{
        role: {
          name: string;
        };
      }>("role");

    res.status(201).json({
      message: `Tạo người dùng ${
        _user!.profile!.fullName
      } với vai trò ${_user!.role!.name} thành công`,
      user: _user,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { newUser };
