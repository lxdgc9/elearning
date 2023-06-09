const mongoose = require("mongoose");
const Password = require("../helper/password");

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
    },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "class",
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    duration: {
      type: Number,
    },
    startedAt: {
      type: Date,
    },
    isPublish: {
      type: Boolean,
      default: false,
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    questions: [
      {
        content: {
          type: String,
        },
        answers: [
          {
            content: {
              type: String,
            },
            isCorrect: {
              type: Boolean,
              default: false,
            },
          },
        ],
      },
    ],
    submissions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "sub",
      },
    ],
    remake: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    collection: "Test",
    toJSON: {
      virtuals: true,
      transform(_doc, ret, _options) {
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

// // Mã hóa mật khẩu trước khi lưu
// schema.pre("save", async function (fn) {
//   if (this.isModified("password")) {
//     const hashed = await Password.toHash(
//       this.get("password")
//     );
//     this.set("password", hashed);
//   }
//   fn();
// });

const Test = mongoose.model("test", schema);

module.exports = Test;
