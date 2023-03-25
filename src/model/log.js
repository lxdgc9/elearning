const mongoose = require("mongoose");
const action = require("../type/action");

const { GET, NEW, MOD, DEL } = action;

const logSchema = new mongoose.Schema(
  {
    action: {
      type: String,
      enum: [GET, NEW, MOD, DEL],
      required: true,
      uppercase: true,
      trim: true,
    },
    modBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    collection: "Log",
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

logSchema.statics.build = (attrs) => {
  return new Log(attrs);
};

const Log = mongoose.model("log", logSchema);

module.exports = Log;
