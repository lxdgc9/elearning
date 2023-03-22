import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { BadReqErr } from "../../../error/bad-req";
import { Role } from "../../../model/role";
import { User } from "../../../model/user";

type NewUserDto = {
  username: string;
  password: string;
  profile?: {
    fullName?: string;
    gender?: string;
    dob?: Date;
    email?: string;
    phone?: string;
    address?: {
      proviceId?: Types.ObjectId;
      districtId?: Types.ObjectId;
      wardId?: Types.ObjectId;
      street?: string;
    };
    bio?: string;
    avatar?: string;
  };
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
    profile: {
      fullName,
      gender,
      dob,
      email,
      phone,
      address: {
        proviceId = undefined,
        districtId = undefined,
        wardId = undefined,
        street = undefined,
      } = {},
      bio,
      avatar,
    } = {},
    roleId,
    hasAccess = true,
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
          province: proviceId,
          district: districtId,
          ward: wardId,
          street,
        },
        bio,
        avatar,
      },
      role: role.id,
      hasAccess,
    });
    await user.save();

    // fetch user đã tạo
    const fetchUser = await fetch(
      `${req.protocol}://${req.get("host")}/api/users/${
        user.id
      }`,
      {
        headers: {
          authorization: req.headers.authorization || "",
        },
      }
    );
    const { user: _user } = await fetchUser.json();

    res.status(201).json({
      user: _user,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { newUser };
