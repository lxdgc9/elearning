import { compare, genSalt, hash } from "bcryptjs";

class Password {
  static async toHash(pass: string) {
    return await hash(pass, await genSalt(10));
  }

  static async compare(
    storedPass: string,
    suppliedPass: string
  ) {
    return await compare(suppliedPass, storedPass);
  }
}

export { Password };
