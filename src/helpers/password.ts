import bcrypt from "bcryptjs";

class Password {
  static async toHash(password: string) {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  static async compare(storedPassword: string, suppliedPassword: string) {
    return await bcrypt.compare(suppliedPassword, storedPassword);
  }
}

export { Password };
