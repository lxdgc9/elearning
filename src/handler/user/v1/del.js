import { BadReqErr } from "../../../err/bad-req.js";
import { Class } from "../../../model/class.js";
import { Role } from "../../../model/role.js";
import { User } from "../../../model/user.js";

async function delUser(req, res, next) {
  try {
    const user = await User.findOneAndDelete(req.params.id);
    if (!user) {
      throw new BadReqErr("Người dùng không tồn tại");
    }

    await Role.findOneAndUpdate(user.role, {
      $pull: {
        users: user._id,
      },
    });

    for await (const c of user.classes) {
      await Class.findOneAndUpdate(c, {
        $pull: {
          members: user._id,
        },
      });
    }

    res.status(204).json({});
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { delUser };
