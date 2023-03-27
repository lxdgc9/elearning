import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    action: {
      type: String,
      enum: ["GET", "NEW", "MOD", "DEL"],
      required: true,
      uppercase: true,
      trim: true,
    },
    modifiedBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    collection: "Log",
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform(_doc, ret, _options) {
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

schema.index({ createdAt: -1 });

const Log = model("log", schema);

export { Log };
