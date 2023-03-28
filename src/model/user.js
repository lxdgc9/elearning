import { model, Schema } from "mongoose";

import { Password } from "../helper/password.js";

const schema = new Schema(
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
        uppercase: true,
        trim: true,
      },
      dob: {
        type: Date,
      },
      gender: {
        type: String,
        enum: ["MALE", "FEMALE", "OTHER"],
        uppercase: true,
        trim: true,
        default: "OTHER",
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
      address: {
        province: {
          type: String,
        },
        district: {
          type: String,
        },
        ward: {
          type: String,
        },
        street: {
          type: String,
        },
      },
      bio: {
        type: String,
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
  },
  {
    collection: "User",
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(_doc, ret, _options) {
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

schema.index({ username: -1 });
schema.index({ createdAt: -1 });

schema.pre("save", async function (fn) {
  if (this.isModified("password")) {
    this.password = await Password.toHash(this.password);
  }
  fn();
});

schema.pre("save", function (next) {
  let { fullName, bio } = this.profile;
  if (fullName) {
    fullName = fullName.replace(/\s+/g, " ").trim();
  }
  if (bio) {
    bio = bio.replace(/\s+/g, " ").trim();
  }
  next();
});

const User = model("user", schema);

export { User };
