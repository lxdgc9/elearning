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
    status: String,
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
        answers: {
          type: mongoose.Schema.Types.ObjectId,
        },
      },
    ],
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
