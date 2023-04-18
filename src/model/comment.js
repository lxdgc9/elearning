const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
      required: true,
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    reply: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment",
    },
  },
  {
    collection: "Comment",
    timestamps: true,
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;

        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

const Comment = mongoose.model("comment", schema);

module.exports = Comment;
