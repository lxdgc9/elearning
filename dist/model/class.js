"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.Class = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    session: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    users: [
      {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "user",
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
    collection: "Class",
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
// xóa khoảng trắng thừa trong tên
schema.pre("save", function (next) {
  this.name = this.name.replace(/\s+/g, " ").trim();
  next();
});
schema.statics.build = (attrs) => {
  return new Class(attrs);
};
const Class = (0, mongoose_1.model)("class", schema);
exports.Class = Class;
