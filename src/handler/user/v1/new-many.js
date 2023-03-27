import { BadReqErr } from "../../../err/bad-req.js";
import { Role } from "../../../model/role.js";
import { User } from "../../../model/user.js";

async function newManyUser(req, res, next) {
  const { users } = req.body;

  try {
    const extUsers = await User.find({
      username: { $in: users.map((u) => u.username) },
    });
    if (extUsers.length > 0) {
      throw new BadReqErr(
        "Có người dùng trong danh sách đã tồn tại"
      );
    }

    const roles = await Role.find({}).select("_id");
    const extRoleIds = roles.map((r) => r.id);
    const roleIds = users.map((u) => u.roleId);
    if (roleIds.some((r) => !extRoleIds.includes(r))) {
      throw new BadReqErr(
        "Tồn tại người dùng trong danh sách có vai trò không hợp lệ"
      );
    }

    let flag = true;
    let userList = [];
    for await (const {
      username,
      password,
      fullName,
      gender,
      dob,
      email,
      phone,
      province,
      district,
      ward,
      street,
      roleId,
      hasAccess,
    } of users) {
      try {
        const user = User.build({
          username,
          password,
          profile: {
            fullName,
            gender,
            dob,
            email,
            phone,
            address: {
              province,
              district,
              ward,
              street,
            },
          },
          role: roleId,
          hasAccess,
        });
        userList.push(user);
      } catch (err) {
        console.log(err);
        flag = false;
      }
    }
    if (!flag) {
      throw new BadReqErr("Tạo nhiều người dùng thất bại");
    }

    for await (const u of userList) {
      await u.save();
    }

    const usersDetail = await User.find({
      _id: userList.map((u) => u.id),
    })
      .populate([
        {
          path: "role",
          populate: [
            {
              path: "permissions",
            },
          ],
        },
      ])
      .sort({ createdAt: -1 });

    res.status(201).json({
      users: usersDetail,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { newManyUser };
