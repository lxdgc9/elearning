import {
  Document,
  model,
  Model,
  Schema,
  Types,
} from "mongoose";

interface ProviAttrs {
  code: Number;
  name: string;
  districts?: Types.ObjectId[];
}

type ProvinDoc = ProviAttrs & Document;

type ProvinModel = Model<ProvinDoc> & {
  build(attrs: ProviAttrs): ProvinDoc;
};

const schema = new Schema<ProviAttrs>(
  {
    code: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    districts: [
      {
        type: Schema.Types.ObjectId,
        ref: "district",
      },
    ],
  },
  {
    collection: "Province",
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

schema.statics.build = (attrs: ProviAttrs) => {
  return new Province(attrs);
};

const Province = model<ProvinDoc, ProvinModel>(
  "province",
  schema
);

export { Province, ProvinDoc };
