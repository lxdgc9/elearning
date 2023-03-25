const bcrypt = require("bcryptjs");

class Password {
  // Hash mật khẩu
  static async toHash(pass) {
    return await bcrypt.hash(
      pass,
      await bcrypt.genSalt(10)
    );
  }

  // Kiểm tra trùng khớp 2 mật khẩu
  static async compare(storedPass, suppliedPass) {
    return await bcrypt.compare(suppliedPass, storedPass);
  }
}

module.exports = Password;
