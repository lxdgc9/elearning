const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    volume: {
      type: Number,
      default: 0,
    },
  },
  {
    collection: "Process",
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

schema.index({ course: 1 });

const Process = mongoose.model("process", schema);

module.exports = Process;
