const Class = require("../../../model/class");
const Channel = require("../../../model/channel");
const BadReqErr = require("../../../err/bad-req").default;

async function newChannel(req, res, next) {
  let { name, classId, description, memberIds } = req.body;

  try {
    // Kiểm tra lớp học có hợp lệ hay không, nhằm tạo kênh
    // thuộc lớp này
    const _class = await Class.findById(classId);
    if (!_class) {
      throw new BadReqErr("Lớp học không tồn tại");
    }

    // Kiểm tra người tạo có phải là thành viên trong lớp
    // hay không
    if (!_class.members.includes(req.user.id)) {
      throw new BadReqErr(
        `Bạn không trực thuộc lớp ${_class.name}`
      );
    }

    // Đảm bảo danh sách thành viên phải bao gồm người tạo
    // nếu không tồn tại danh sách thành viên đầu vào, xem
    // như danh sách gồm người tạo
    if (!memberIds) {
      memberIds = [req.user.id];
    } else if (!memberIds.includes(req.user.id)) {
      memberIds.push(req.user.id);
    }

    // Kiểm tra danh sách thành viên có thuộc lớp này hay
    // không, nếu tồn tại một thành viên không thuộc lớp
    // này, xem như danh sách này không hợp lệ, ngưng thao
    // tác tạo kênh
    const flag = true;
    for (const m of memberIds) {
      if (_class.members.indexOf(m) == -1) {
        flag = false;
        break;
      }
    }
    if (!flag) {
      throw new BadReqErr(
        `Tồn tại thành viên không thuộc lớp ${_class.name}`
      );
    }

    // Khi thông tin đầu vào hợp lệ, tiến hành tạo kênh,
    // người tạo chính là chủ sở hữu của kênh
    const channel = Channel.build({
      name,
      owner: req.user.id,
      class: classId,
      description,
      members: memberIds,
    });
    await channel.save();

    // Cập nhật channel vào lớp
    await _class.updateOne({
      $addToSet: {
        channels: channel.id,
      },
    });

    // Lấy thông tin chi tiết kênh đã tạo trả về client
    const channelDetail = await Channel.findById(
      channel.id
    ).populate([
      {
        path: "members",
        select: "profile role",
        populate: [
          {
            path: "role",
            populate: [
              {
                path: "permissions",
                select: "name description",
              },
            ],
          },
        ],
      },
    ]);

    res.status(201).json({
      channel: channelDetail,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = newChannel;
