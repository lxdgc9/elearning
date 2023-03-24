"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.Subject = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    teachers: [
      {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    courses: [
      {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "course",
      },
    ],
    logs: [
      {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "log",
      },
    ],
  },
  {
    collection: "Subject",
    toJSON: {
      transform(_doc, ret, _options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);
// Remove extra spaces from a string
schema.pre("save", function (next) {
  if (this.description) {
    this.description = this.description
      .replace(/\s+/g, " ")
      .trim();
  }
  next();
});
schema.statics.build = (attrs) => {
  return new Subject(attrs);
};
const Subject = (0, mongoose_1.model)("subject", schema);
exports.Subject = Subject;
