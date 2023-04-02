const BadReqErr = require("../../../error/bad-req");
const Role = require("../../../model/role");
const User = require("../../../model/user");

async function newUser(req, res, next) {
  const {
    username,
    password,
    fullName,
    gender,
    dob,
    email,
    phone,
    province,
    district,
    ward,
    street,
    roleId,
    hasAccess,
  } = req.body;

  try {
    // kiểm tra username
    const extUser = await User.findOne({ username });
    if (extUser) {
      throw new BadReqErr("Tài Khoản Đã Tồn Tại");
    }

    // kiểm tra roleId
    const role = await Role.findById(roleId);
    if (!role) {
      throw new BadReqErr("Vai Trò Không Hợp Lệ");
    }

    // tạo user
    const user = User.build({
      username,
      password,
      profile: {
        fullName,
        gender,
        dob,
        email,
        phone,
        address: {
          province,
          district,
          ward,
          street,
        },
      },
      role: role.id,
      hasAccess,
    });
    await user.save();

    // fetch user
    const _user = await User.findById(user.id)
      .select("-logs -classes")
      .populate("role");

    res.status(201).json({
      user: _user,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = newUser;
