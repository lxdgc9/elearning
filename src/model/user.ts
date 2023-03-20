import {
  Document,
  model,
  Model,
  Schema,
  Types,
} from "mongoose";
import { Password } from "../helper/password";
import { Gender } from "../type/gender";

interface UserAttrs {
  username: string;
  password: string;
  profile: {
    fullName: string;
    dob?: Date;
    gender?: string;
    email?: string;
    phone?: string;
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

const schema = new Schema<UserAttrs>(
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
      fullName: {
        type: String,
        required: true,
        uppercase: true,
        trim: true,
      },
      dob: {
        type: Date,
      },
      gender: {
        type: String,
        enum: [Gender.MALE, Gender.FEMALE, Gender.OTHER],
        uppercase: true,
        trim: true,
        default: Gender.OTHER,
      },
      email: {
        type: String,
        lowercase: true,
        trim: true,
      },
      phone: {
        type: String,
        trim: true,
      },
      avatar: {
        type: String,
      },
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "role",
    },
    classes: [
      {
        type: Schema.Types.ObjectId,
        ref: "class",
      },
    ],
    hasAccess: {
      type: Boolean,
      default: true,
    },
    logs: [
      {
        type: Schema.Types.ObjectId,
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

// Hash password
schema.pre("save", async function (fn) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(
      this.get("password")
    );
    this.set("password", hashed);
  }
  fn();
});

// Remove extra spaces from a string
schema.pre("save", function (next) {
  this.profile.fullName = this.profile.fullName
    .replace(/\s+/g, " ")
    .trim();

  next();
});

schema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = model<UserDoc, UserModel>("user", schema);

export { User, UserDoc };
