const User = require("../../../model/user");
const Class = require("../../../model/class");
const BadReqErr = require("../../../error/bad-req");

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
          "Danh sách thành viên không hợp lệ"
        );
      }
    }

    // Khi thông tin đầu vào hợp lệ, tiến hành tạo lớp
    const userIds = users.map((u) => u.id);
    const _class = Class.build({
      name,
      session,
      description,
      members: userIds,
    });
    await _class.save();

    res.status(201).json({
      class: _class,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = newClass;
