import { NextFunction, Request, Response } from "express";
import { sign } from "jsonwebtoken";
import { Password } from "../../../helpers/password";
import { BadRequestError } from "../../errors/bad-request-error";
import { User } from "../../models/user";

type LoginDto = {
  username: string;
  password: string;
};

function addToSet(item: { name: string }, arr: { roles: { name: string }[] }) {
  const tmpArr: string[] = [];

  if (item) {
    tmpArr.push(item.name);
  }

  for (const el of arr.roles) {
    if (!tmpArr.includes(el.name)) {
      tmpArr.push(el?.name);
    }
  }
  return tmpArr;
}

async function login(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { username, password }: LoginDto = req.body;

  try {
    const extUser = await User.findOne({ username }).populate([
      {
        path: "groupRole",
        populate: [
          {
            path: "roles",
            select: "name",
          },
        ],
      },
      {
        path: "role",
      },
    ]);
    if (!extUser) {
      throw new BadRequestError("Thông tin đăng nhập không hợp lệ");
    }

    const passMatch = await Password.compare(extUser.password, password);
    if (!passMatch) {
      throw new BadRequestError("Thông tin đăng nhập không hợp lệ");
    }

    // Generate token
    const payload = {
      id: extUser.id,
      profileId: extUser.profile,
      roles: addToSet(
        extUser.role as unknown as { name: string },
        extUser.groupRole as unknown as { roles: { name: string }[] }
      ),
    };
    const accessToken = sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: "3d", // Ttl
    });

    res.json({
      accessToken,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { login };
