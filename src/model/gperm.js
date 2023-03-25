const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
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

// xóa khoảng trắng thừa trong tên
schema.pre("save", function (next) {
  this.name = this.name.replace(/\s+/g, " ").trim();
  next();
});

schema.statics.build = (attrs) => {
  return new GPerm(attrs);
};

const GPerm = mongoose.model("gperm", schema);

module.exports = GPerm;
