import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    channel: {
      type: Schema.Types.ObjectId,
      ref: "channel",
    },
    description: {
      type: String,
      trim: true,
    },
    members: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    collection: "Group",
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

schema.pre("save", function (next) {
  let { name, description } = this;
  name = name.replace(/\s+/g, " ").trim();
  if (description) {
    description = description.replace(/\s+/g, " ").trim();
  }
  next();
});

const Group = model("group", schema);

export { Group };
