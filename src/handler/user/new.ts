import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { User } from "../../model/user";

type NewUserDto = {
  username: string;
  password: string;
  roleId?: Types.ObjectId;
  fullName: string;
};

async function newUser(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const {
    username,
    password,
    roleId,
    fullName,
  }: NewUserDto = req.body;

  try {
    const user = User.build({
      username,
      password,
      profile: {
        fullName,
      },
      role: roleId,
    });
    await user.save();

    res.status(201).json({
      user,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { newUser };
