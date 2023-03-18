import {
  Document,
  model,
  Model,
  Schema,
  Types,
} from "mongoose";

interface SubAttrs {
  name: string;
  description?: string;
  teachers?: Types.ObjectId[];
  courses?: Types.ObjectId[];
  logs?: Types.ObjectId[];
}

type SubDoc = SubAttrs & Document;

type SubModel = Model<SubDoc> & {
  build(attrs: SubAttrs): SubDoc;
};

const schema = new Schema<SubAttrs>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    teachers: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
      },
    ],
    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: "course",
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
    collection: "Subject",
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

schema.statics.build = (attrs: SubAttrs) => {
  return new Subject(attrs);
};

const Subject = model<SubDoc, SubModel>("subject", schema);

export { Subject, SubDoc };
