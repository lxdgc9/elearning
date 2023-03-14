import mongoose from "mongoose";

interface UserAttrs {
  username: string;
  password: string;
  profile: mongoose.Types.ObjectId;
  groupRole: mongoose.Types.ObjectId;
  role?: mongoose.Types.ObjectId;
  logs: mongoose.Types.ObjectId[];
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
    groupRole: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "group-role",
      required: true,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "role",
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
        delete ret.__v;
      },
    },
  }
);

schema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>("user", schema);

export { User };
