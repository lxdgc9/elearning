import { Document, model, Model, Schema } from "mongoose";

interface WardAttrs {
  name: string;
  code: number;
  districtCode: number;
}

type WardDoc = WardAttrs & Document;

type WardModel = Model<WardDoc> & {
  build(attrs: WardAttrs): WardDoc;
};

const schema = new Schema<WardAttrs>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    code: {
      type: Number,
      required: true,
    },
    districtCode: {
      type: Number,
      required: true,
    },
  },
  {
    collection: "Ward",
    toJSON: {
      transform(_doc, ret, _options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

// xóa khoảng trắng thừa
schema.pre("save", function (next) {
  let { name } = this;
  name = name.replace(/\s+/g, " ").trim();
  next();
});

schema.statics.build = (attrs: WardAttrs) => {
  return new Ward(attrs);
};

const Ward = model<WardDoc, WardModel>("ward", schema);

export { Ward, WardDoc };
