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
    subject: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subject",
      required: true,
    },
    classes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "class",
        required: true,
      },
    ],
    lesson: [
      {
        title: {
          type: String,
        },
        description: {
          type: String,
        },
        resource: {
          type: String,
        },
        resourceType: {
          type: String,
        },
      },
    ],
    content: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "lesson",
      },
    ],
    publish: {
      type: Boolean,
      default: false,
    },
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    collection: "Course",
    toJSON: {
      transform(_doc, ret, _options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.groupId;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

const Course = mongoose.model("course", schema);

module.exports = Course;
