const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    class: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "class",
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
    groups: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "group",
      },
    ],
  },
  {
    collection: "Channel",
    timestamps: true,
    toJSON: {
      transform(_doc, ret, _options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
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
  return new Channel(attrs);
};

const Channel = mongoose.model("channel", schema);

module.exports = Channel;
