import {
  Document,
  model,
  Model,
  Schema,
  Types,
} from "mongoose";

interface UserByClassAttrs {
  classId: Types.ObjectId;
  users?: Types.ObjectId[];
  logs?: Types.ObjectId[];
}

type UserByClassDoc = UserByClassAttrs & Document;

type UserByClassModel = Model<UserByClassDoc> & {
  build(attrs: UserByClassAttrs): UserByClassDoc;
};

const schema = new Schema<UserByClassAttrs>(
  {
    classId: {
      type: Schema.Types.ObjectId,
      ref: "class",
      required: true,
      unique: true,
    },
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
    collection: "User By Class",
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

schema.statics.build = (attrs: UserByClassAttrs) => {
  return new UserByClass(attrs);
};

const UserByClass = model<UserByClassDoc, UserByClassModel>(
  "user-by-class",
  schema
);

export { UserByClass };
