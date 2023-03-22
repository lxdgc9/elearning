import {
  Document,
  model,
  Model,
  Schema,
  Types,
} from "mongoose";

interface CourseAttrs {
  name: string;
  author: Types.ObjectId;
  subject: Types.ObjectId;
  description?: string;
  sections?: Types.ObjectId[];
  logs?: Types.ObjectId[];
}

type CourseDoc = CourseAttrs & Document;

type CourseModel = Model<CourseDoc> & {
  build(attrs: CourseAttrs): CourseDoc;
};

const schema = new Schema<CourseAttrs>(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    description: {
      type: String,
      trim: true,
    },
    subject: {
      type: Schema.Types.ObjectId,
      ref: "subject",
      required: true,
    },
    sections: [
      {
        type: Schema.Types.ObjectId,
        ref: "section",
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
    collection: "Course",
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

// Remove extra spaces from a string
schema.pre("save", function (next) {
  if (this.description) {
    this.description = this.description
      .replace(/\s+/g, " ")
      .trim();
  }

  next();
});

schema.statics.build = (attrs: CourseAttrs) => {
  return new Course(attrs);
};

const Course = model<CourseDoc, CourseModel>(
  "course",
  schema
);

export { Course, CourseDoc };
