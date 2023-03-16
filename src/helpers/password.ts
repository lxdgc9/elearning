import { compare, genSalt, hash } from "bcryptjs";

class Password {
  static async toHash(password: string) {
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
  }

  static async comparePass(storedPass: string, suppliedPass: string) {
    return await compare(suppliedPass, storedPass);
  }
}

export { Password };
