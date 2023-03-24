const { model, Schema } = require("mongoose");

const schema = new Schema(
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

schema.statics.build = (attrs) => {
  return new Course(attrs);
};

const Course = model("course", schema);

module.exports = { Course };
