import mongoose from "mongoose";
import { Password } from "../helpers/password";

interface UserAttrs {
  username: string;
  password: string;
  profile: mongoose.Types.ObjectId;
  role?: mongoose.Types.ObjectId;
  logs?: mongoose.Types.ObjectId[];
  hasAccess?: boolean;
}

type UserDoc = UserAttrs & mongoose.Document;

type UserModel = mongoose.Model<UserDoc> & {
  build(attrs: UserAttrs): UserDoc;
};

const schema = new mongoose.Schema<UserAttrs>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    profile: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "profile",
      required: true,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "role",
    },
    hasAccess: {
      type: Boolean,
      default: true,
    },
    logs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "log",
      },
    ],
  },
  {
    collection: "User",
    toJSON: {
      transform(_doc, ret, _options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

schema.pre("save", async function (fn) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  fn();
});

schema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("user", schema);

export { User };
