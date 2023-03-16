import { NextFunction, Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { BadReqErr } from "../../errors/bad-req";
import { Password } from "../../helpers/password";
import { ProfDoc } from "../../models/profile";
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
      profile: ProfDoc;
      role: RoleDoc;
    }>([
      {
        path: "profile",
      },
      {
        path: "role",
        populate: [
          {
            path: "permissions",
          },
        ],
      },
    ]);
    if (!extUser) {
      throw new BadReqErr("Thông tin đăng nhập không hợp lệ");
    }

    const passMatch = await Password.compare(extUser.password, password);
    if (!passMatch) {
      throw new BadReqErr("Thông tin đăng nhập không hợp lệ");
    }

    // Generate token
    const payload = {
      id: extUser.id,
      profileId: extUser.profile,
      roles: extUser.role.permissions?.map((el) => el.id),
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
