import { NextFunction, Request, Response } from "express";
import { NotFoundErr } from "../../../error/not-found";
import { User } from "../../../model/user";

type UpdateProfDto = {
  fullName?: string;
  gender?: string;
  dob?: Date;
  email?: string;
  phone?: string;
  address?: string;
  bio?: string;
};

async function updateProf(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.user!;
  const {
    fullName,
    gender,
    dob,
    email,
    phone,
    address,
    bio,
  }: UpdateProfDto = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        profile: {
          fullName,
          gender,
          dob,
          email,
          phone,
          address,
          bio,
        },
      },
      { new: true }
    ).populate([
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
      throw new NotFoundErr("Không tìm thấy người dùng");
    }

    res.json({
      user,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { updateProf };
