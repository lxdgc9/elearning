const NotFoundErr = require("../../../error/not-found");
const User = require("../../../model/user");

async function getUser(req, res, next) {
  try {
    const user = await User.findById(req.params.id)
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
      throw new NotFoundErr("Không tìm thấy người dùng");
    }

    res.json({
      user,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = getUser;
