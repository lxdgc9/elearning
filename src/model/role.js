const mongoose = require("mongoose");

const schema = new mongoose.Schema(
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
        type: mongoose.Schema.Types.ObjectId,
        ref: "perm",
      },
    ],
    logs: [
      {
        type: mongoose.Schema.Types.ObjectId,
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

// khóa khoảng trắng thừa trong tên và mô tả
schema.pre("save", function (next) {
  this.name = this.name.replace(/\s+/g, " ").trim();
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

const Role = mongoose.model("role", schema);

module.exports = Role;
