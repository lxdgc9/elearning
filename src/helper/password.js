import bcrypt from "bcryptjs";

class Password {
  static async toHash(pass) {
    return await bcrypt.hash(
      pass,
      await bcrypt.genSalt(10)
    );
  }

  static async compare(storedPass, suppliedPass) {
    return await bcrypt.compare(suppliedPass, storedPass);
  }
}

export { Password };
