const Group = require("../../../model/group");
const BadReqErr = require("../../../error/bad-req");

async function updateGroup(req, res, next) {
  const { name, session, description, memberIds } =
    req.body;

  try {
    const group = await Group.findByIdAndUpdate(
      req.params.id,
      {
        name,
        session,
        description,
        members: memberIds,
      },
      {
        new: true,
      }
    );
    if (!group) {
      throw new BadReqErr("Không tồn tại nhóm");
    }

    res.json({
      group,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = updateGroup;
