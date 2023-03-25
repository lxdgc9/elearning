const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
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
    logs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "log",
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

// xóa khoảng trắng thừa trong tiêu đề và mô tả
schema.pre("save", function (next) {
  this.title = this.title.replace(/\s+/g, " ").trim();
  if (this.description) {
    this.description = this.description
      .replace(/\s+/g, " ")
      .trim();
  }
  next();
});

schema.statics.build = (attrs) => {
  return new Course(attrs);
};

const Course = mongoose.model("course", schema);

module.exports = Course;
