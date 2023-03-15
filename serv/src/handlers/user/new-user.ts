import { NextFunction, Response } from "express";
import { ReqUser } from "../../@types/req-user";
import { Prof } from "../../models/profile";

type NewUserDto = {
  username: string;
  password: string;
  fullName: string;
  gender: string;
  dob: Date;
  email?: string;
  phone?: string;
};

async function newUser(
  req: ReqUser,
  res: Response,
  next: NextFunction
): Promise<void> {
  const {
    username,
    password,
    fullName,
    gender,
    dob,
    email,
    phone,
  }: NewUserDto = req.body;

  try {
    const prof = Prof.build({
      fullName,
      dob,
      gender,
      email,
      phone,
    });
    // const user = User.build({
    //   username,
    //   password,
    // });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { newUser };
