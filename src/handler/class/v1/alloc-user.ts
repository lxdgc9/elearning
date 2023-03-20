import { NextFunction, Request, Response } from "express";
import { Types } from "mongoose";
import { Class } from "../../../model/class";
import { User } from "../../../model/user";
import { BadReqErr } from "../../../error/bad-req";
import { NotFoundErr } from "../../../error/not-found";
import { UserByClass } from "../../../model/user-by-class";
import { ClassByUser } from "../../../model/class-by-user";

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

    const _class = await Class.findById(id);
    if (!_class) {
      throw new NotFoundErr("CLASS_NOT_FOUND");
    }

    await UserByClass.findOneAndUpdate(
      {
        classId: _class.id,
      },
      {
        users: users.map((u) => u.id),
      },
      {
        upsert: true,
      }
    );

    users.forEach(async (u) => {
      await ClassByUser.findOneAndUpdate(
        {
          userId: u.id,
        },
        {
          $addToSet: {
            classes: _class.id,
          },
        },
        { upsert: true }
      );
    });

    res.json({
      class: _class,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { allocUser };
