const bcrypt = require("bcryptjs");

class Password {
  // Hash mật khẩu
  static async toHash(pass) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(pass, salt);
    return hashed;
  }

  // Kiểm tra trùng khớp 2 mật khẩu
  static async compare(storedPass, suppliedPass) {
    const isMatch = await bcrypt.compare(
      suppliedPass,
      storedPass
    );
    return isMatch;
  }
}

module.exports = Password;
