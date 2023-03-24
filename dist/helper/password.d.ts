declare class Password {
  static toHash(pass: string): Promise<string>;
  static compare(
    storedPass: string,
    suppliedPass: string
  ): Promise<boolean>;
}
export { Password };
