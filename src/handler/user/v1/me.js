const { User } = require("../../../model/user");

async function me(req, res, next) {
  const { id } = req.user;

  try {
    const user = await User.findById(id)
      .select("-logs")
      .populate([
        {
          path: "role",
          select: "permissions",
          populate: [
            {
              path: "permissions",
              select: "name description",
            },
          ],
        },
        {
          path: "classes",
          select: "name session description",
        },
      ]);

    res.json({
      user,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = { me };
