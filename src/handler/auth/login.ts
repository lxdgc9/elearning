import { NextFunction, Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { BadReqErr } from "../../error/bad-req";
import { Password } from "../../helper/password";
import { PermDoc } from "../../model/perm";
import { User } from "../../model/user";

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
      role: {
        permissions: PermDoc[];
      };
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
      throw new BadReqErr("USER_NOT_FOUND");
    }

    const passMatch = await Password.comparePass(extUser.password, password);
    if (!passMatch) {
      throw new BadReqErr("WRONG_PASSWORD");
    }

    // Generate token
    const payload = {
      id: extUser.id,
      perms: extUser.role.permissions.map((p) => p.name),
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
