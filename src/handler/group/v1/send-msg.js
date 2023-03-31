const BadReqErr = require("../../../error/bad-req");
const Group = require("../../../model/group");
const Msg = require("../../../model/message");
const { getIO } = require("../../../sock");

async function sendMsg(req, res, next) {
  const { content, resourceType } = req.body;

  try {
    // kiểm tra nhóm
    const group = await Group.findById(req.params.id);
    if (!group) {
      throw new BadReqErr("Nhóm không tồn tại");
    }

    let atm;
    if (req.file) {
      atm = {
        name: req.file.filename,
        size: req.file.size,
      };
    }

    const msg = new Msg({
      content,
      sender: req.user.id,
      attachment: atm || undefined,
      resourceType,
    });
    await msg.save();

    // thêm msg này vào nhóm
    await group.updateOne({
      $addToSet: {
        messages: msg.id,
      },
      $set: {
        unread: group.members.filter(
          (m) => !m.equals(req.user.id)
        ),
      },
    });

    // get detail
    let msgDetail = await Msg.findById(msg.id).populate([
      {
        path: "sender",
      },
    ]);
    // if (msgDetail.attachment) {
    //   msgDetail.attachment.name = `${
    //     req.protocol
    //   }://${req.get("host")}/upload/${
    //     msgDetail.attachment.name
    //   }`;
    // }
    //

    getIO().to(group.id).emit("new-msg", msgDetail);

    res.json({
      message: msgDetail,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = sendMsg;
