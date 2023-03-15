import { NextFunction, Request, Response } from "express";
import { User } from "../../models/user";

async function getUsers(
  _req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const users = await User.find({});

    res.json({
      users,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { getUsers };
