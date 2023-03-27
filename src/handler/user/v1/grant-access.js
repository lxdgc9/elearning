import { BadReqErr } from "../../../err/bad-req";
import { User } from "../../../model/user";

async function grantAccessUser(req, res, next) {
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
        populate: [
          {
            path: "permissions",
          },
        ],
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

export { grantAccessUser };
