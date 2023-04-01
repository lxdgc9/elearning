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
    city,
    district,
    ward,
    bio,
  } = req.body;

  console.log(req.body);

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
        "profile.address": {
          provinceId: city.code,
          districtId: district.code,
          wardId: ward.code,
          street: address,
        },
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
