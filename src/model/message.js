const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    content: {
      type: String,
      trim: true,
    },
    group: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "group",
    },
    attachment: {
      name: {
        type: String,
      },
      size: {
        type: Number,
      },
    },
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    resourceType: {
      type: String,
      enum: ["text", "image", "audio", "file"],
      lowercase: true,
      trim: true,
      default: "text",
    },
  },
  {
    collection: "Message",
    toJSON: {
      virtuals: true,
      transform(_doc, ret, _options) {
        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

schema.index({ createdAt: -1 });

const Msg = mongoose.model("msg", schema);

module.exports = Msg;
