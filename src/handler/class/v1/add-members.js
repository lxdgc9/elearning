const User = require("../../../model/user");
const Class = require("../../../model/class");
const BadReqErr = require("../../../error/bad-req");

async function addMembers(req, res, next) {
  const { classId } = req.params;
  const { memberIds } = req.body;

  try {
    // Kiểm tra lớp học có hợp lệ hay không
    const _class = await Class.findById(classId);
    if (!_class) {
      throw new BadReqErr("Không tồn tại lớp học");
    }

    // Kiểm tra danh sách thành viên có hợp lệ hay không
    // nếu tồn tại một memberId không hợp lệ, xem như danh
    // sách này không hợp lệ, ngưng thao tác tạo kênh
    let users = [];
    if (memberIds && memberIds.length > 0) {
      users = await User.find({
        _id: { $in: memberIds },
      });
      if (memberIds.length !== users.length) {
        throw new BadReqErr(
          "Danh sách thành viên không hợp lệ"
        );
      }
    }

    // Sau khi đầu vào hợp lệ, tiến hành thêm thành viên
    const userIds = users.map((u) => u.id);
    await _class.updateOne({
      $addToSet: {
        members: userIds,
      },
    });

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
      class: _class,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = addMembers;
