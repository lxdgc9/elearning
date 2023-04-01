const BadReqErr = require("../../../error/bad-req");
const Group = require("../../../model/group");
const Channel = require("../../../model/channel");
const { getIO } = require("../../../sock");

async function deleteGroup(req, res, next) {
  try {
    const group = await Group.findByIdAndDelete(
      req.params.id
    );
    if (!group) {
      throw new BadReqErr("Không tồn tại nhóm");
    }

    // Kiểm tra xem bạn có phải chủ phòng hay không?
    if (!group.owner.equals(req.user.id)) {
      throw new BadReqErr("Bạn không phải chủ phòng");
    }

    await Channel.findByIdAndUpdate(group.id, {
      $pull: {
        groups: group.id,
      },
    });

    getIO().to(group._id).emit("delete-group", group);

    res.status(204).json({});
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = deleteGroup;
