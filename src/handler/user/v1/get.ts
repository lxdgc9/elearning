import { NextFunction, Request, Response } from "express";
import { NotFoundErr } from "../../../error/not-found";
import { User } from "../../../model/user";

async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await User.find({}).populate([
      {
        path: "role",
        populate: [
          {
            path: "permissions",
          },
        ],
      },
    ]);
    if (!users.length) {
      throw new NotFoundErr("Danh Sách Người Dùng Trống");
    }

    res.json({
      users,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { getUsers };
