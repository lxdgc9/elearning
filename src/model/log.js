const { model, Schema } = require("mongoose");
const { GET, NEW, MOD, DEL } = require("../type/action");

const logSchema = new Schema(
  {
    action: {
      type: String,
      enum: [GET, NEW, MOD, DEL],
      required: true,
      uppercase: true,
      trim: true,
    },
    modBy: {
      type: Schema.Types.ObjectId,
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

const Log = model("log", logSchema);

module.exports = { Log };
