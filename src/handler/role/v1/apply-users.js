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
      .filter((u) => u.role !== role.id)
      .map((u) => u.id);
    for await (const u of userList) {
      const user = await User.findByIdAndUpdate(u, {
        $set: {
          role: role.id,
        },
      });
      await Role.findByIdAndUpdate(user.role, {
        $pull: {
          users: user.id,
        },
      });
    }

    await role.updateOne({
      $addToSet: {
        users: userList,
      },
    });

    const detail = await Role.findById(role.id).populate([
      {
        path: "perms",
        select: "-group -roles",
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
