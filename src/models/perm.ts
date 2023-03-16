import mongoose from "mongoose";

interface PermAttrs {
  name: string;
  description?: string;
  logs?: mongoose.Types.ObjectId[];
}

type PermDoc = PermAttrs & mongoose.Document;

type PermModel = mongoose.Model<PermDoc> & {
  build(attrs: PermAttrs): PermDoc;
};

const schema = new mongoose.Schema<PermAttrs>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    logs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "log",
        required: true,
      },
    ],
  },
  {
    collection: "Permission",
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

schema.statics.build = (attrs: PermAttrs) => {
  return new Perm(attrs);
};

const Perm = mongoose.model<PermDoc, PermModel>("permission", schema);

export { Perm };
