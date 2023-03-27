import { BadReqErr } from "../../../err/bad-req.js";
import { Class } from "../../../model/class.js";
import { User } from "../../../model/user.js";

async function addMembers(req, res, next) {
  const { memberIds } = req.body;

  try {
    // Kiểm tra lớp học có hợp lệ hay không
    const _class = await Class.findById(req.params.id);
    if (!_class) {
      throw new BadReqErr("Lớp học không tồn tại");
    }

    // Kiểm tra danh sách thành viên có hợp lệ hay không
    // nếu tồn tại một thành viên không hợp lệ, xem như
    // danh sách này không hợp lệ, ngưng thao tác tạo kênh
    let users = [];
    if (memberIds && memberIds.length > 0) {
      users = await User.find({
        _id: { $in: memberIds },
      });
      if (memberIds.length !== users.length) {
        throw new BadReqErr(
          "Có thành viên trong danh sách không tồn tại"
        );
      }
    }

    // Sau khi đầu vào hợp lệ, tiến hành thêm thành viên
    const userIds = users.map((u) => u.id);
    const _classUpdated = await Class.findByIdAndUpdate(
      _class.id,
      {
        $addToSet: {
          members: userIds,
        },
      },
      { new: true }
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

    // Tiến hành thêm danh sách lớp học trực thuộc cho
    // người dùng
    for await (const u of users) {
      await User.findByIdAndUpdate(u.id, {
        $addToSet: {
          classes: _class.id,
        },
      });
    }

    res.json({
      class: _classUpdated,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { addMembers };
