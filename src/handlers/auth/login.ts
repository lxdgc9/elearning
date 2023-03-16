import { NextFunction, Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { BadReqErr } from "../../errors/bad-req";
import { Password } from "../../helpers/password";
import { RoleDoc } from "../../models/role";
import { User } from "../../models/user";

type LoginDto = {
  username: string;
  password: string;
};

async function login(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { username, password }: LoginDto = req.body;

  try {
    const extUser = await User.findOne({ username }).populate<{
      role: RoleDoc;
    }>([
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
    if (!extUser) {
      throw new BadReqErr("Tài Khoản Không Tồn Tại");
    }

    const passMatch = await Password.comparePass(extUser.password, password);
    if (!passMatch) {
      throw new BadReqErr("Mật Khẩu Không Đúng");
    }

    // Generate token
    const payload = {
      id: extUser.id,
      roles: extUser.role.permissions,
    };
    const accessToken = sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: "3d", // Ttl
    });

    res.json({
      accessToken,
      user: extUser,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { login };
