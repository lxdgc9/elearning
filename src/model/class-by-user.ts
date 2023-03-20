import {
  Document,
  model,
  Model,
  Schema,
  Types,
} from "mongoose";

interface ClassByUserAttrs {
  userId: Types.ObjectId;
  classes?: Types.ObjectId[];
  logs?: Types.ObjectId[];
}

type ClassByUserDoc = ClassByUserAttrs & Document;

type ClassByUserModel = Model<ClassByUserDoc> & {
  build(attrs: ClassByUserAttrs): ClassByUserDoc;
};

const schema = new Schema<ClassByUserAttrs>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
    },
    classes: [
      {
        type: Schema.Types.ObjectId,
        ref: "class",
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
    collection: "Class By User",
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

schema.statics.build = (attrs: ClassByUserAttrs) => {
  return new ClassByUser(attrs);
};

const ClassByUser = model<ClassByUserDoc, ClassByUserModel>(
  "class-by-user",
  schema
);

export { ClassByUser };
