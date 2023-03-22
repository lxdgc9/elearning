import {
  Document,
  model,
  Model,
  Schema,
  Types,
} from "mongoose";

interface DistrAttrs {
  code: number;
  name: string;
  provinceCode: number;
  wards?: Types.ObjectId[];
}

type DistrDoc = DistrAttrs & Document;

type DistrModel = Model<DistrDoc> & {
  build(attrs: DistrAttrs): DistrDoc;
};

const schema = new Schema<DistrAttrs>(
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
    provinceCode: {
      type: Number,
      required: true,
    },
    wards: [
      {
        type: Schema.Types.ObjectId,
        ref: "ward",
      },
    ],
  },
  {
    collection: "District",
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

schema.statics.build = (attrs: DistrAttrs) => {
  return new District(attrs);
};

const District = model<DistrDoc, DistrModel>(
  "district",
  schema
);

export { District, DistrDoc };
