import { NextFunction, Request, Response } from "express";
import { BadReqErr } from "../../../error/bad-req";
import { NotFoundErr } from "../../../error/not-found";
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
  const { currentPassword, newPassword }: ChangePassDto =
    req.body;

  try {
    const user = await User.findById(id).populate([
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
    if (!user) {
      throw new NotFoundErr("USER_NOT_FOUND");
    }

    const passMatch = await Password.comparePass(
      user.password,
      currentPassword
    );
    if (!passMatch) {
      throw new BadReqErr("WRONG_PASSWORD");
    }

    user.password = newPassword;
    await user.save();

    res.json({
      user,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { changePass };
