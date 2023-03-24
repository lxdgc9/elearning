import {
  Document,
  model,
  Model,
  Schema,
  Types,
} from "mongoose";

interface CourseAttrs {
  title: string; // tên khóa học
  author: Types.ObjectId; // tác giả
  subject?: Types.ObjectId; // môn học đại diện
  classes?: Types.ObjectId[]; // danh sách lớp được try cập
  description?: string; // mô tả
  content?: Types.ObjectId[]; // nội dung: danh sách bài giảng
  publish?: boolean; // chế độ khóa/công khai
  logs?: Types.ObjectId[];
}

type CourseDoc = CourseAttrs & Document;

type CourseModel = Model<CourseDoc> & {
  build(attrs: CourseAttrs): CourseDoc;
};

const schema = new Schema<CourseAttrs>(
  {
    title: {
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
    classes: [
      {
        type: Schema.Types.ObjectId,
        ref: "class",
        required: true,
      },
    ],
    content: [
      {
        type: Schema.Types.ObjectId,
        ref: "lesson",
      },
    ],
    publish: {
      type: Boolean,
      default: false,
    },
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

// xóa khoảng trắng thừa trong tiêu đề và mô tả
schema.pre("save", function (next) {
  this.title = this.title.replace(/\s+/g, " ").trim();
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
