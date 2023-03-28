const User = require("../../../model/user");

async function me(req, res, next) {
  try {
    const user = await User.findById(req.user.id)
      .select("-logs")
      .populate([
        {
          path: "role",
          populate: [
            {
              path: "permissions",
            },
          ],
        },
        {
          path: "classes",
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

module.exports = me;
