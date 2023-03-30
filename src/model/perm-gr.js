import { model, Schema } from "mongoose";

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    perms: [
      {
        type: Schema.Types.ObjectId,
        ref: "perm",
      },
    ],
  },
  {
    collection: "Permission Group",
    toJSON: {
      virtuals: true,
      transform(_doc, ret, _options) {
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

schema.pre("save", function (next) {
  this.name = this.name.replace(/\s+/g, " ").trim();
  next();
});

const PermGr = model("perm-gr", schema);

export { PermGr };
