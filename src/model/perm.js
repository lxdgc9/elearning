import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    desc: {
      type: String,
      trim: true,
    },
    group: {
      type: Schema.Types.ObjectId,
      ref: "perm-gr",
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
  code: -1,
});

schema.pre("save", function (next) {
  let { code, desc } = this;
  code = code.replace(/\s+/g, " ").trim();
  if (desc) {
    desc = desc.replace(/\s+/g, " ").trim();
  }
  next();
});

const Perm = model("perm", schema);

export { Perm };
