const User = require("../../../model/user");
const NotFoundErr = require("../../../error/not-found");

async function getUsers(_req, res, next) {
  try {
    const users = await User.find({})
      .select("-logs -classes")
      .populate([
        {
          path: "role",
          select: "name description",
        },
      ])
      .sort({ createdAt: -1 });
    if (!users.length) {
      throw new NotFoundErr("Danh Sách Người Dùng Trống");
    }

    res.json({
      users,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = getUsers;
