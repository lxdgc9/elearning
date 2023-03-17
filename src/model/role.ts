import { Document, model, Model, Schema, Types } from "mongoose";

interface RoleAttrs {
  name: string;
  description?: string;
  permissions?: Types.ObjectId[];
  logs?: Types.ObjectId[];
}

type RoleDoc = RoleAttrs & Document;

type RoleModel = Model<RoleDoc> & {
  build(attrs: RoleAttrs): RoleDoc;
};

const schema = new Schema<RoleAttrs>(
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
    permissions: [
      {
        type: Schema.Types.ObjectId,
        ref: "perm",
      },
    ],
    logs: [
      {
        type: Schema.Types.ObjectId,
        ref: "log",
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
  }
);

// Remove extra spaces from a string
schema.pre("save", function (next) {
  if (this.description) {
    this.description = this.description.replace(/\s+/g, " ").trim();
  }

  next();
});

schema.statics.build = (attrs: RoleAttrs) => {
  return new Role(attrs);
};

const Role = model<RoleDoc, RoleModel>("role", schema);

export { Role, RoleDoc };
