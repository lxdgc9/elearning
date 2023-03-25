const { GPerm } = require("../../../model/gperm");
const { Perm } = require("../../../model/perm");

async function newPerm(req, res, next) {
  const { name, groupId, description } = req.body;

  try {
    const perm = Perm.build({
      name,
      groupId,
      description,
    });
    await perm.save();

    // thêm 'permission' vào 'group'
    await GPerm.findByIdAndUpdate(groupId, {
      $addToSet: {
        permissions: perm.id,
      },
    });

    res.status(201).json({
      permission: perm,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = { newPerm };
