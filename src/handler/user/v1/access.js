const { NotFoundErr } = require("../../../error/not-found");
const { User } = require("../../../model/user");

async function accessUser(req, res, next) {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          hasAccess: status,
        },
      },
      { new: true }
    )
      .select("-logs -classes")
      .populate([
        {
          path: "role",
          select: "name description permissions",
          populate: [
            {
              path: "permissions",
              select: "name description",
            },
          ],
        },
      ]);
    if (!user) {
      throw new NotFoundErr("Không Tìm Thấy Người Dùng");
    }

    res.json({
      user,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = { accessUser };
