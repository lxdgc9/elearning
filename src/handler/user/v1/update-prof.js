import { UnauthorizedErr } from "../../../err/unauthorized";
import { User } from "../../../model/user";

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

  let avatar;
  if (req.file) {
    avatar = req.file.filename;
  }

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
          avatar,
        },
      },
      { new: true }
    ).populate([
      {
        path: "role",
        populate: [
          {
            path: "permissions",
          },
        ],
      },
    ]);
    if (!user) {
      throw new UnauthorizedErr("Người dùng không tồn tại");
    }

    res.json({
      user,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { updateProf };
