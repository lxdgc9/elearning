import { Document, Model, Types } from "mongoose";
interface UserAttrs {
  username: string;
  password: string;
  profile?: {
    fullName?: string;
    dob?: Date;
    gender?: string;
    email?: string;
    phone?: string;
    address?: {
      provinceId?: String;
      districtId?: String;
      wardId?: String;
      street?: string;
    };
    bio?: string;
    avatar?: string;
  };
  role?: Types.ObjectId;
  classes?: Types.ObjectId[];
  logs?: Types.ObjectId[];
  hasAccess?: boolean;
}
type UserDoc = UserAttrs & Document;
type UserModel = Model<UserDoc> & {
  build(attrs: UserAttrs): UserDoc;
};
declare const User: UserModel;
export { User, UserDoc };
