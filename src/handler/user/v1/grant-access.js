import { BadReqErr } from "../../../err/bad-req.js";
import { User } from "../../../model/user.js";

async function grantAccess(req, res, next) {
  const { status } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          hasAccess: status,
        },
      },
      { new: true }
    ).populate([
      {
        path: "role",
        select: "-perms -users",
      },
      {
        path: "classes",
        select: "-members -channels",
        options: {
          sort: {
            createdAt: -1,
          },
        },
      },
    ]);
    if (!user) {
      throw new BadReqErr("Người dùng không tồn tại");
    }

    res.json({
      user,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { grantAccess };
