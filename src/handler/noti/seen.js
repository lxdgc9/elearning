const BadReqErr = require("../../error/bad-req");
const Noti = require("../../model/noti");

async function seenNoti(req, res, next) {
  try {
    const noti = await Noti.findById(req.params.id);
    if (!noti) {
      throw new BadReqErr("Thông báo không tồn tại");
    }

    if (!noti.user.equals(req.user.id)) {
      throw new BadReqErr(
        "Không có quyền truy cập thông báo này"
      );
    }

    await noti.updateOne({
      $set: {
        isRead: true,
      },
    });

    res.json({
      notification: noti,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = seenNoti;
