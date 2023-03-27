import { BadReqErr } from "../../../err/bad-req.js";
import { Role } from "../../../model/role.js";
import { User } from "../../../model/user.js";

async function applyUsers(req, res, next) {
  const { userIds } = req.body;

  try {
    // Kiểm tra vai trò
    const role = await Role.findById(req.params.id);
    if (!role) {
      throw new BadReqErr("Vai trò không tồn tại");
    }

    // Kiểm tra danh sách người dùng từ yêu cầu, thao tác
    // sẽ nhưng nếu tồn tại bất kỳ người dùng không hợp lệ
    let users = [];
    if (userIds && userIds.length > 0) {
      users = await User.find({ _id: permissionIds });
      if (users.length !== userIds.length) {
        throw new BadReqErr(
          "Có người dùng trong danh sách không tồn tại"
        );
      }
    }

    // Tiến hành thêm vào vai trò những người dùng đang có
    // vai trò hiện tại, đồng thời gán vai trò cho những
    // người dùng này
    for await (const u of users) {
      await role.updateOne({
        $addToSet: {
          users: u.id,
        },
      });
      await User.findByIdAndUpdate(u.id, {
        $set: {
          role: role.id,
        },
      });
    }

    const roleDetail = await Role.findById(
      role.id
    ).populate([
      {
        path: "permissions",
      },
      {
        path: "users",
      },
    ]);

    res.json({
      role: roleDetail,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { applyUsers };
