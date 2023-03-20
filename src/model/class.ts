import {
  Document,
  model,
  Model,
  Schema,
  Types,
} from "mongoose";

interface ClassAttrs {
  name: string;
  session: string;
  subjects?: Types.ObjectId[];
  users?: Types.ObjectId[];
  logs?: Types.ObjectId[];
}

type ClassDoc = ClassAttrs & Document;

type ClassModel = Model<ClassDoc> & {
  build(attrs: ClassAttrs): ClassDoc;
};

const schema = new Schema<ClassAttrs>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    session: {
      type: String,
      required: true,
      trim: true,
    },
    subjects: [
      {
        type: Schema.Types.ObjectId,
        ref: "subject",
      },
    ],
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "user",
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
    collection: "Class",
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
  this.name = this.name.replace(/\s+/g, " ").trim();

  next();
});

schema.statics.build = (attrs: ClassAttrs) => {
  return new Class(attrs);
};

const Class = model<ClassDoc, ClassModel>("class", schema);

export { Class, ClassDoc };
