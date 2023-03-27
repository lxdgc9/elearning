import { BadReqErr } from "../../../err/bad-req";
import { Role } from "../../../model/role";
import { User } from "../../../model/user";

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
    const user = await User.findOne({ username });
    if (user) {
      throw new BadReqErr("Tài khoản đã tồn tại");
    }

    const role = await Role.findById(roleId);
    if (!role) {
      throw new BadReqErr("Vai trò không tồn tại");
    }

    const newUser = new User({
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
    await newUser.save();

    const userDetail = await User.findById(
      newUser.id
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

    res.status(201).json({
      user: userDetail,
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

export { newUser };
