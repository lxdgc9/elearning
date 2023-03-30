import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    desc: {
      type: String,
      trim: true,
    },
    perms: [
      {
        type: Schema.Types.ObjectId,
        ref: "perm",
      },
    ],
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
  },
  {
    collection: "Role",
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

schema.index({
  createdAt: -1,
});

schema.pre("save", function (next) {
  let { name, desc } = this;
  name = name.replace(/\s+/g, " ").trim();
  if (desc) {
    desc = desc.replace(/\s+/g, " ").trim();
  }
  next();
});

const Role = model("role", schema);

export { Role };
