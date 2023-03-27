import { UnauthorizedErr } from "../../../err/unauthorized";
import { Password } from "../../../helper/password";
import { User } from "../../../model/user";

async function changePass(req, res, next) {
  const { password, newPassword } = req.body;

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      throw new UnauthorizedErr("Người dùng không tồn tại");
    }

    const passMatch = await Password.compare(
      user.password,
      password
    );
    if (passMatch) {
      throw new UnauthorizedErr("Sai mật khẩu");
    }

    user.password = await newPassword;
    await user.save();

    res.json({
      message: "Đổi mật khẩu thành công",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { changePass };
