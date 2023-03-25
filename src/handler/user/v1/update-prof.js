const NotFoundErr = require("../../../error/not-found");
const User = require("../../../model/user");

async function updateProf(req, res, next) {
  const {
    fullName,
    gender,
    dob,
    email,
    phone,
    address,
    bio,
  } = req.body;

  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        profile: {
          fullName,
          gender,
          dob,
          email,
          phone,
          address,
          bio,
        },
      },
      { new: true }
    ).populate([
      {
        path: "role",
        populate: [
          {
            path: "permissions",
            select: "-_id name description",
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

module.exports = updateProf;
