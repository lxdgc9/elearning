import { UnauthorizedErr } from "../../../err/unauthorized.js";
import { User } from "../../../model/user.js";

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
        "profile.fullName": fullName,
        "profile.gender": gender,
        "profile.dob": dob,
        "profile.email": email,
        "profile.phone": phone,
        "profile.address": address,
        "profile.bio": bio,
        "profile.avatar": avatar,
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
