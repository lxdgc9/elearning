"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.GPerm = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    permissions: [
      {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "perm",
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
    collection: "Group Permission",
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
  this.name = this.name.replace(/\s+/g, " ").trim();
  next();
});
schema.statics.build = (attrs) => {
  return new GPerm(attrs);
};
const GPerm = (0, mongoose_1.model)("gperm", schema);
exports.GPerm = GPerm;
