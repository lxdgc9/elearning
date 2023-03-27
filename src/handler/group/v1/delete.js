const Class = require("../../../model/class");
const BadReqErr = require("../../../error/bad-req");
const Group = require("../../../model/group");
const Channel = require("../../../model/channel");

async function deleteGroup(req, res, next) {
  try {
    const group = await Group.findByIdAndDelete(
      req.params.id
    );
    if (!group) {
      throw new BadReqErr("Không tồn tại nhóm");
    }

    await Channel.findByIdAndUpdate(group.id, {
      $pull: {
        groups: group.id,
      },
    });

    res.status(204).json({});
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = deleteGroup;
