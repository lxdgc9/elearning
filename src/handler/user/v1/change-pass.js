const BadReqErr = require("../../../error/bad-req");
const Password = require("../../../helper/password");
const User = require("../../../model/user");

async function changePass(req, res, next) {
  const {
    currentPassword: currPass,
    newPassword: newPass,
  } = req.body;

  try {
    const user = await User.findById(req.user.id);

    // kiểm tra currPass
    const isMatch = await Password.compare(
      user.password,
      currPass
    );
    if (isMatch) {
      throw new BadReqErr(
        "Sai Mật Khẩu. Đổi Mật Khẩu Thất Bại"
      );
    }

    // đổi mật khẩu
    user.password = newPass;
    await user.save();

    res.json({});
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = changePass;
