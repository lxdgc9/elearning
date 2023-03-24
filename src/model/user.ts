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
  username: string; // tên tài khoản
  password: string; // mật khẩu
  profile?: {
    fullName?: string; // họ và tên
    dob?: Date; // ngày sinh
    gender?: string; // giới tính
    email?: string;
    phone?: string; // số điện thoại
    address?: {
      provinceId?: String; // mã tỉnh, thành phố
      districtId?: String; // mã quận, huyện
      wardId?: String; // mã phường, xã
      street?: string; // tên đường
    };
    bio?: string; // mô tả bản thân
    avatar?: string; // ảnh đại diện
  };
  role?: Types.ObjectId; // vai trò
  classes?: Types.ObjectId[]; // lớp học trực thuộc
  hasAccess?: boolean; // trạng thái tài khoản
  logs?: Types.ObjectId[];
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
schema.pre("save", async function (fn) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(
      this.get("password")
    );
    this.set("password", hashed);
  }
  fn();
});

// xóa khoảng trắng thừa trong họ tên và mô tả bản thân
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

schema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = model<UserDoc, UserModel>("user", schema);

export { User, UserDoc };
