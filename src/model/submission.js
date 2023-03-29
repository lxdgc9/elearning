const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    signedAt: {
      type: Date,
      default: Date.now(),
    },
    submitedAt: {
      type: Date,
    },
    status: {
      type: Number,
      // 1: Chưa làm
      // 2: Đang làm
      // 3: Hoàn thành
      // 4: Trễ hạn
      enum: [1, 2, 3, 4],
      default: 1,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    test: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "test",
    },
    choices: [
      {
        question: {
          type: mongoose.Schema.Types.ObjectId,
        },
        answer: {
          type: mongoose.Schema.Types.ObjectId,
        },
      },
    ],
    submitCount: {
      type: Number,
      default: 0,
    },
    correctNum: {
      type: Number,
      default: 0,
    },
    totalQuestion: {
      type: Number,
      default: 0,
    },
  },
  {
    collection: "Submission",
    toJSON: {
      virtuals: true,
      transform(_doc, ret, _options) {
        delete ret._id;
        delete ret.password;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

const Submission = mongoose.model("sub", schema);

module.exports = Submission;
