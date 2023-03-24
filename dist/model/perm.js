"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.Perm = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    groupId: {
      type: mongoose_1.Schema.Types.ObjectId,
      ref: "gperm",
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    logs: [
      {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "log",
      },
    ],
  },
  {
    collection: "Permission",
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
  return new Perm(attrs);
};
const Perm = (0, mongoose_1.model)("perm", schema);
exports.Perm = Perm;
