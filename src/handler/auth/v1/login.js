import jwt from "jsonwebtoken";

import { BadReqErr } from "../../../err/bad-req";
import { NotFoundErr } from "../../../err/not-found";
import { Password } from "../../../helper/password";
import { User } from "../../../model/user";

async function login(req, res, next) {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({
      username,
    })
      .select("-logs")
      .populate([
        {
          path: "role",
          select: "permissions",
          populate: [
            {
              path: "permissions",
              select: "name description",
            },
          ],
        },
        {
          path: "classes",
          select: "name session description",
        },
      ]);
    if (!user) {
      throw new NotFoundErr("Tài khoản không tồn tại");
    }

    const passMatch = await Password.compare(
      user.password,
      password
    );
    if (!passMatch) {
      throw new BadReqErr("Sai mật khẩu");
    }

    const accessToken = jwt.sign(
      {
        id: user.id,
        perms: user.role.permissions.map((p) => p.name),
        hasAccess: user.hasAccess,
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "3d",
      }
    );

    res.json({
      accessToken,
      user,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { login };
