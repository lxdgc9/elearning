import { BadReqErr } from "../../../err/bad-req.js";
import { Class } from "../../../model/class.js";
import { User } from "../../../model/user.js";

async function deleteMembers(req, res, next) {
  const { memberIds } = req.body;

  try {
    // Tiến hành cập nhật lớp học, cập nhật thành viên
    // trong lớp
    const _class = await Class.findByIdAndUpdate(
      req.params.id,
      {
        $pullAll: {
          members: memberIds,
        },
      },
      {
        new: true,
      }
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
    if (!_class) {
      throw new BadReqErr("Lớp học không tồn tại");
    }

    // Sau khi xóa thành viên ra khỏi lớp học, tiến hành
    // xóa lớp trực thuộc ra khỏi thông tin người dùng
    for await (const m of memberIds) {
      await User.findByIdAndUpdate(m.id, {
        $pull: {
          classes: _class.id,
        },
      });
    }

    res.json({
      class: _class,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { deleteMembers };
