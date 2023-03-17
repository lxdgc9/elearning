import { NextFunction, Request, Response } from "express";
import { User } from "../../model/user";

type UpdateProfDto = {
  fullName?: string;
  gender?: string;
  dob?: Date;
  email?: string;
  phone?: string;
};

async function updateProf(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  const { id } = req.user!;
  const { fullName, gender, dob, email, phone }: UpdateProfDto = req.body;

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

    res.json({
      user,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { updateProf };
