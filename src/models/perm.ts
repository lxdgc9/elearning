import mongoose from "mongoose";

interface PermAttrs {
  name: string;
  group: string;
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
    group: {
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
      },
    ],
  },
  {
    collection: "Group Permission",
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

// Remove extra spaces from a string
schema.pre("save", function (next) {
  this.group = this.group.replace(/\s+/g, " ").trim();

  if (this.description) {
    this.description = this.description.replace(/\s+/g, " ").trim();
  }

  next();
});

schema.statics.build = (attrs: PermAttrs) => {
  return new Perm(attrs);
};

const Perm = mongoose.model<PermDoc, PermModel>("permission", schema);

export { Perm };
