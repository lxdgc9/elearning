import { NextFunction, Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { BadReqErr } from "../../../error/bad-req";
import { Password } from "../../../helper/password";
import { PermDoc } from "../../../model/perm";
import { User } from "../../../model/user";

type LoginDto = {
  username: string;
  password: string;
};

async function login(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { username, password }: LoginDto = req.body;

  try {
    // kiểm tra username
    const user = await User.findOne({
      username,
    }).populate<{
      role: {
        permissions: PermDoc[];
      };
    }>([
      {
        path: "role",
        select: "permissions",
        populate: [
          {
            path: "permissions",
            select: "name description",
          },
        ],
      },
    ]);
    if (!user) {
      throw new BadReqErr("Tài Khoản Không Tồn Tại");
    }

    // kiểm tra password
    const isMatch = await Password.compare(
      user.password,
      password
    );
    if (!isMatch) {
      throw new BadReqErr("Sai Mật Khẩu");
    }

    // tạo token
    const payload = {
      id: user.id,
      perms: user.role.permissions.map((p) => p.name),
    };
    const accessToken = sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET!,
      {
        expiresIn: "3d", // Ttl
      }
    );

    res.json({
      accessToken,
      user: user,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { login };
