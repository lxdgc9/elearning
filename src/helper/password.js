// Password helper giúp hash mật khẩu và so sánh mật khẩu

const { compare, genSalt, hash } = require("bcryptjs");

class Password {
  // hash mật khẩu
  static async toHash(pass) {
    return await hash(pass, await genSalt(10));
  }

  // kiểm tra trùng khớp 2 mật khẩu
  static async compare(storedPass, suppliedPass) {
    return await compare(suppliedPass, storedPass);
  }
}

module.exports = { Password };
