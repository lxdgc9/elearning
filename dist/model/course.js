"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.Course = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    author: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    subject: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: "subject",
      required: true,
    },
    classes: [
      {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "class",
        required: true,
      },
    ],
    lessons: [
      {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "lesson",
      },
    ],
    publish: {
      type: Boolean,
      default: false,
    },
    logs: [
      {
        type: mongoose_1.Schema.Types.ObjectId,
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
// xóa khoảng trắng thừa trong mô tả
schema.pre("save", function (next) {
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
const Course = (0, mongoose_1.model)("course", schema);
exports.Course = Course;
