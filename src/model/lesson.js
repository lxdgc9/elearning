const mongoose = require("mongoose");

const schema = new mongoose.Schema(
  {
    course: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
      required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    resource: {
      type: String,
      required: true,
    },
    resourceType: {
      type: String,
      required: true,
    },
  },
  {
    collection: "Lesson",
    toJSON: {
      transform(_doc, ret) {
        ret.id = ret._id;

        delete ret._id;
        delete ret.__v;
      },
    },
    timestamps: true,
  }
);

const Lesson = mongoose.model("lesson", schema);

module.exports = Lesson;
