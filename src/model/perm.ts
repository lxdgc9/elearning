import {
  Document,
  model,
  Model,
  Schema,
  Types,
} from "mongoose";

interface PermAttrs {
  name: string;
  groupId: Types.ObjectId;
  description?: string;
  logs?: Types.ObjectId[];
}

type PermDoc = PermAttrs & Document;

type PermModel = Model<PermDoc> & {
  build(attrs: PermAttrs): PermDoc;
};

const schema = new Schema<PermAttrs>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    groupId: {
      type: Schema.Types.ObjectId,
      ref: "gperm",
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    logs: [
      {
        type: Schema.Types.ObjectId,
        ref: "log",
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

// Remove extra spaces from a string
schema.pre("save", function (next) {
  if (this.description) {
    this.description = this.description
      .replace(/\s+/g, " ")
      .trim();
  }

  next();
});

schema.statics.build = (attrs: PermAttrs) => {
  return new Perm(attrs);
};

const Perm = model<PermDoc, PermModel>("perm", schema);

export { Perm, PermDoc };
