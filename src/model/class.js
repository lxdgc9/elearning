const mongoose = require("mongoose");

const schema = new mongoose.Schema(
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
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    channels: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "channel",
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

// Xóa khoảng trắng thừa trong tên và mô tả
schema.pre("save", function (next) {
  let { name, description } = this;
  name = name.replace(/\s+/g, " ").trim();
  if (description) {
    description = description.replace(/\s+/g, " ").trim();
  }
  next();
});

schema.statics.build = (attrs) => {
  return new Class(attrs);
};

const Class = mongoose.model("class", schema);

module.exports = Class;
