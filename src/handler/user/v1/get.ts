import { NextFunction, Request, Response } from "express";
import { NotFoundErr } from "../../../error/not-found";
import { User } from "../../../model/user";

async function getUsers(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const users = await User.find({})
      .select("-logs -classes")
      .populate([
        {
          path: "role",
          select: "name description",
        },
      ])
      .sort({ createdAt: -1 });
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
