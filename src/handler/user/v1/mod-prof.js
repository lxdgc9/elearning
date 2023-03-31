import { BadReqErr } from "../../../err/bad-req.js";
import { UnauthorizedErr } from "../../../err/unauthorized.js";
import { User } from "../../../model/user.js";

async function modProf(req, res, next) {
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
    if (!Object.keys(req.body).length && !req.file) {
      throw new BadReqErr("Yêu cầu không hợp lệ");
    }

    let avatar;
    if (req.file) {
      avatar = req.file.filename;
    }

    console.log(req.file);

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
        select: "-perms -users",
      },
      {
        path: "classes",
        select: "-members -channels",
        options: {
          sort: {
            createdAt: -1,
          },
        },
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

export { modProf };
