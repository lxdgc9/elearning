const mongoose = require("mongoose");
const Password = require("../helper/password");
const gender = require("../type/gender");

const { MALE, FEMALE, OTHER } = gender;

const schema = new mongoose.Schema(
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
        enum: [MALE, FEMALE, OTHER],
        uppercase: true,
        trim: true,
        default: OTHER,
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
        provinceId: {
          type: String,
        },
        districtId: {
          type: String,
        },
        wardId: {
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "role",
    },
    classes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "class",
      },
    ],
    groups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "group",
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

// Tạo index cho user, mới nhất đứng đầu
schema.index({ createdAt: -1 });

// Mã hóa mật khẩu trước khi lưu
schema.pre("save", async function (fn) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(
      this.get("password")
    );
    this.set("password", hashed);
  }
  fn();
});

// Xóa khoảng trắng thừa trong họ tên và mô tả bản thân
schema.pre("save", function (next) {
  let {
    profile: { fullName, bio },
  } = this;
  if (fullName) {
    fullName = fullName.replace(/\s+/g, " ").trim();
  }
  if (bio) {
    bio = bio.replace(/\s+/g, " ").trim();
  }
  next();
});

schema.statics.build = (attrs) => {
  return new User(attrs);
};

const User = mongoose.model("user", schema);

module.exports = User;
