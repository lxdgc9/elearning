import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    group: {
      type: Schema.Types.ObjectId,
      ref: "gperm",
      required: true,
    },
    roles: [
      {
        type: Schema.Types.ObjectId,
        ref: "role",
      },
    ],
  },
  {
    collection: "Permission",
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
  let { code, description } = this;
  code = code.replace(/\s+/g, " ").trim();
  if (description) {
    description = description.replace(/\s+/g, " ").trim();
  }
  next();
});

const Perm = model("perm", schema);

export { Perm };
