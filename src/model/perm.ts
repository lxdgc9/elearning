import {
  Document,
  model,
  Model,
  Schema,
  Types,
} from "mongoose";

interface PermAttrs {
  name: string; // tên quyền hạn (sign)
  groupId: Types.ObjectId; // thuộc nhóm quyền nào
  description?: string; // mô tả quyền hạn
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
        delete ret.groupId;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

// xóa khoảng trắng thừa trong tên và mô tả
schema.pre("save", function (next) {
  this.name = this.name.replace(/\s+/g, " ").trim();
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
