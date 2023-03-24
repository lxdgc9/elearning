// Password helper giúp hash mật khẩu và so sánh mật khẩu

import { compare, genSalt, hash } from "bcryptjs";

class Password {
  // hash mật khẩu
  static async toHash(pass: string) {
    return await hash(pass, await genSalt(10));
  }

  // kiểm tra trùng khớp 2 mật khẩu
  static async compare(
    storedPass: string,
    suppliedPass: string
  ) {
    return await compare(suppliedPass, storedPass);
  }
}

export { Password };
