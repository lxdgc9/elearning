const jwt = require("jsonwebtoken");
const User = require("../../../model/user");
const BadReqErr = require("../../../error/bad-req");
const Password = require("../../../helper/password");

async function login(req, res, next) {
  const { username, password } = req.body;

  try {
    // Kiểm tra username
    const user = await User.findOne({
      username,
    })
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
          select: "name session description",
        },
      ]);
    if (!user) {
      throw new BadReqErr("Tài khoản không tồn tại");
    }

    // Kiểm tra password
    const isMatch = await Password.compare(
      user.password,
      password
    );
    if (!isMatch) {
      throw new BadReqErr("Sai mật khẩu");
    }

    // Tạo token
    const payload = {
      id: user.id,
      perms: user.role.permissions.map((p) => p.name),
      hasAccess: user.hasAccess,
    };
    const accessToken = jwt.sign(
      payload,
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "3d", // Token hết hạn sau 3 ngày
      }
    );

    res.json({
      accessToken,
      user: user,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

module.exports = login;
