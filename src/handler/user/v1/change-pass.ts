import { NextFunction, Request, Response } from "express";
import { BadReqErr } from "../../../error/bad-req";
import { Password } from "../../../helper/password";
import { User } from "../../../model/user";

type ChangePassDto = {
  currentPassword: string;
  newPassword: string;
};

async function changePass(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.user!;
  const {
    currentPassword: currPass,
    newPassword: newPass,
  }: ChangePassDto = req.body;

  try {
    const user = await User.findById(id);

    // kiểm tra currPass
    const isMatch = await Password.compare(
      user!.password,
      currPass
    );
    if (!isMatch) {
      throw new BadReqErr(
        "Sai Mật Khẩu. Đổi Mật Khẩu Thất Bại"
      );
    }

    // đổi mật khẩu
    user!.password = newPass;
    await user!.save();

    res.json({});
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { changePass };
