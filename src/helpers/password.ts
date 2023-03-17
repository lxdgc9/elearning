import { compare, genSalt, hash } from "bcryptjs";

class Password {
  static async toHash(pass: string) {
    const salt = await genSalt(10);
    const hashedPass = await hash(pass, salt);
    return hashedPass;
  }

  static async comparePass(storedPass: string, suppliedPass: string) {
    return await compare(suppliedPass, storedPass);
  }
}

export { Password };
