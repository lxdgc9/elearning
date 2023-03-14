import mongoose from "mongoose";

interface RoleAttrs {
  name: string;
  description?: string;
  logs?: mongoose.Types.ObjectId[];
}

type RoleDoc = RoleAttrs & mongoose.Document;

type RoleModel = mongoose.Model<RoleDoc> & {
  build(attrs: RoleAttrs): RoleDoc;
};

const schema = new mongoose.Schema<RoleAttrs>(
  {
    name: {
      type: String,
      required: true,
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
    collection: "Role",
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

schema.statics.build = (attrs: RoleAttrs) => {
  return new Role(attrs);
};

const Role = mongoose.model<RoleDoc, RoleModel>("role", schema);

export { Role };
