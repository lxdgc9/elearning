import { NextFunction, Request, Response } from "express";
import { User } from "../../../model/user";

async function getUsers(
  _req: Request,
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

    res.json({
      users,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { getUsers };
