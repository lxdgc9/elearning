import {
  Document,
  model,
  Model,
  Schema,
  Types,
} from "mongoose";

interface GPermAttrs {
  name: string; // tên nhóm quyền
  permissions?: Types.ObjectId[]; // danh sách quyền hạn
  logs?: Types.ObjectId[];
}

type GPermDoc = GPermAttrs & Document;

type GPermModel = Model<GPermDoc> & {
  build(attrs: GPermAttrs): GPermDoc;
};

const schema = new Schema<GPermAttrs>(
  {
    name: {
      type: String,
      required: true,
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

// xóa khoảng trắng thừa trong tên
schema.pre("save", function (next) {
  this.name = this.name.replace(/\s+/g, " ").trim();
  next();
});

schema.statics.build = (attrs: GPermAttrs) => {
  return new GPerm(attrs);
};

const GPerm = model<GPermDoc, GPermModel>("gperm", schema);

export { GPerm, GPermDoc };
