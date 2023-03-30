import { BadReqErr } from "../../../err/bad-req.js";
import { Role } from "../../../model/role.js";
import { User } from "../../../model/user.js";

async function applyUsers(req, res, next) {
  const { userIds } = req.body;

  try {
    const role = await Role.findById(req.params.id);
    if (!role) {
      throw new BadReqErr("Vai trò không tồn tại");
    }

    const users = await User.find({ _id: permissionIds });
    if (users.length !== userIds.length) {
      throw new BadReqErr(
        "Có người dùng trong danh sách không tồn tại"
      );
    }

    const userList = users
      .filter((u) => !role._id.equals(u.role))
      .map((u) => u._id);
    for await (const u of userList) {
      const user = await User.findByIdAndUpdate(u, {
        $set: {
          role: role._id,
        },
      });
      await Role.findByIdAndUpdate(user.role, {
        $pull: {
          users: user._id,
        },
      });
    }

    await role.updateOne({
      $addToSet: {
        users: userList,
      },
    });

    const detail = await Role.findById(role._id).populate([
      {
        path: "perms",
        select: "-group -roles",
        options: {
          sort: {
            _id: -1,
          },
        },
      },
      {
        path: "users",
        select: "-role -classes",
      },
    ]);

    res.json({
      role: detail,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { applyUsers };
