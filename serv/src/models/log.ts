import mongoose from "mongoose";
import { Action } from "../@types/action";

interface LogAttrs {
  action: Action;
  modBy: mongoose.Types.ObjectId;
}

type LogDoc = LogAttrs & mongoose.Document;

type LogModel = mongoose.Model<LogDoc> & {
  build(attrs: LogAttrs): LogDoc;
};

const logSchema = new mongoose.Schema<LogAttrs>(
  {
    action: {
      type: String,
      enum: [Action.READ, Action.WRITE, Action.MODIFY, Action.DELETE],
      required: true,
      uppercase: true,
      trim: true,
    },
    modBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  {
    collection: "Log",
    timestamps: true,
    toJSON: {
      transform(_doc, ret, _options) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

logSchema.statics.build = (attrs: LogAttrs) => {
  return new Log(attrs);
};

const Log = mongoose.model<LogDoc, LogModel>("log", logSchema);

export { Log };
