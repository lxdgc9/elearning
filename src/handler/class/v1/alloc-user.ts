import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { Class } from "../../../model/class";
import { User } from "../../../model/user";
import { BadReqErr } from "../../../error/bad-req";
import { NotFoundErr } from "../../../error/not-found";

type AllocUserDto = {
  userIds: Types.ObjectId[];
};

async function allocUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.params;
  const { userIds }: AllocUserDto = req.body;

  try {
    const users = await User.find({
      _id: { $in: userIds },
    });
    if (users.length !== userIds.length) {
      throw new BadReqErr("INVALID_USER_IDS");
    }

    const _class = await Class.findByIdAndUpdate(
      id,
      {
        $addToSet: {
          users: users.map((u) => u.id),
        },
      },
      { new: true }
    );
    if (!_class) {
      throw new NotFoundErr("CLASS_NOT_FOUND");
    }

    res.json({
      class: _class,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { allocUser };
