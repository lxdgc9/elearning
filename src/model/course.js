const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    publish: {
      type: Boolean,
      default: false,
    },
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subject",
      required: true,
    },
    classes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "class",
      },
    ],
    lessons: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "lesson",
      },
    ],
    ratings: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "rating",
      },
    ],
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comment",
      },
    ],
    process: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "process",
      },
    ],
  },
  {
    collection: "Course",
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;

        delete ret._id;
        delete ret.course;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

const Course = mongoose.model("course", schema);

module.exports = Course;
