import mongoose from "mongoose";

interface GRoleAttrs {
  name: string;
  roles?: mongoose.Types.ObjectId[];
  logs?: mongoose.Types.ObjectId[];
}

type GRoleDoc = GRoleAttrs & mongoose.Document;

type GRoleModel = mongoose.Model<GRoleDoc> & {
  build(attrs: GRoleAttrs): GRoleDoc;
};

const schema = new mongoose.Schema<GRoleAttrs>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    roles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "role",
      },
    ],
    logs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "log",
      },
    ],
  },
  {
    collection: "Group Role",
    toJSON: {
      transform(_doc, ret, _options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

schema.statics.build = (attrs: GRoleAttrs) => {
  return new GRole(attrs);
};

const GRole = mongoose.model<GRoleDoc, GRoleModel>("group-role", schema);

export { GRole };
