"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports.Role = void 0;
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
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
    collection: "Role",
    toJSON: {
      transform(_doc, ret, _options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
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
  return new Role(attrs);
};
const Role = (0, mongoose_1.model)("role", schema);
exports.Role = Role;
