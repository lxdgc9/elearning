import { BadReqErr } from "../../../err/bad-req.js";
import { Class } from "../../../model/class.js";
import { User } from "../../../model/user.js";

async function newClass(req, res, next) {
  let { name, session, description, memberIds } = req.body;

  try {
    // Đảm bảo danh sách thành viên phải bao gồm người tạo
    // nếu không tồn tại danh sách thành viên đầu vào, xem
    // như danh sách gồm người tạo
    if (!memberIds) {
      memberIds = [req.user.id];
    } else if (!memberIds.includes(req.user.id)) {
      memberIds.push(req.user.id);
    }

    // Kiểm tra danh sách thành viên có hợp lệ hay không
    // nếu tồn tại một thành viên không hợp lệ, xem như
    // danh sách này không hợp lệ, ngưng thao tác tạo lớp
    let users = [];
    if (memberIds && memberIds.length > 0) {
      users = await User.find({ _id: memberIds });
      if (memberIds.length !== users.length) {
        throw new BadReqErr(
          "Có thành viên trong danh sách không tồn tại"
        );
      }
    }

    // Khi thông tin đầu vào hợp lệ, tiến hành tạo lớp
    const userIds = users.map((u) => u.id);
    const _class = new Class({
      name,
      session,
      description,
      members: userIds,
    });
    await _class.save();

    // Cập nhật lớp học trực thuộc theo danh sách thành viên
    for await (const u of userIds) {
      await User.findByIdAndUpdate(u, {
        $addToSet: {
          classes: _class.id,
        },
      });
    }

    // Lấy thông tin chi tiết lớp học đã tạo trả về client
    const classDetail = await Class.findById(
      _class.id
    ).populate([
      {
        path: "members",
        populate: [
          {
            path: "role",
            populate: [
              {
                path: "permissions",
              },
            ],
          },
        ],
      },
    ]);

    res.status(201).json({
      class: classDetail,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { newClass };
