"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (
      resolve,
      reject
    ) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step(
        (generator = generator.apply(
          thisArg,
          _arguments || []
        )).next()
      );
    });
  };
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.User = void 0;
const mongoose_1 = require("mongoose");
const password_1 = require("../helper/password");
const gender_1 = require("../type/gender");
const schema = new mongoose_1.Schema(
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
        enum: [
          gender_1.Gender.MALE,
          gender_1.Gender.FEMALE,
          gender_1.Gender.OTHER,
        ],
        uppercase: true,
        trim: true,
        default: gender_1.Gender.OTHER,
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
      avatar: {
        type: String,
      },
      bio: {
        type: String,
      },
    },
    role: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: "role",
    },
    classes: [
      {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "class",
      },
    ],
    hasAccess: {
      type: Boolean,
      default: true,
    },
    logs: [
      {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "log",
      },
    ],
  },
  {
    collection: "User",
    timestamps: true,
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
// tạo index cho user, mới nhất đứng đầu
schema.index({ createdAt: -1 });
// mã hóa mật khẩu trước khi lưu
schema.pre("save", function (fn) {
  return __awaiter(this, void 0, void 0, function* () {
    if (this.isModified("password")) {
      const hashed = yield password_1.Password.toHash(
        this.get("password")
      );
      this.set("password", hashed);
    }
    fn();
  });
});
// xóa khoảng trắng thừa
schema.pre("save", function (next) {
  let {
    profile: { fullName = undefined, bio = undefined } = {},
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
const User = (0, mongoose_1.model)("user", schema);
exports.User = User;
